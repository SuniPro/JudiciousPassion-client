/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from "react";
import {
  motion,
  useAnimationControls,
  AnimatePresence,
  AnimationControls,
} from "framer-motion";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

const variantsForBubble = {
  animationOnCountChange: {
    scale: [0.1, 1.5, 0, 0],
    borderColor: ["#E2264D", "#DD4688", "#CC8EF5"],
    borderWidth: [24, 24, 8, 0, 0, 0, 0, 0],
    transition: {
      duration: 1,
    },
  },
};

const variantsForHeart = {
  init: {
    scale: 0,
    transition: { duration: 0.1 },
  },
  end: {
    scale: 1,
    transition: {
      delay: 0.16,
      type: "spring",
      stiffness: 600,
      damping: 20,
      mass: 1,
    },
  },
};

type VariantsForHeartType = typeof variantsForHeart;

const variantsForSparkWrapper = {
  init: (custom: number) => ({
    rotate: custom,
    scale: 0.8,
    transition: {
      duration: 0,
    },
  }),
  end: (custom: number) => ({
    rotate: custom - 5,
    scale: 1.1,
    transition: {
      duration: 1,
    },
  }),
};

const variantsForSparkGroup = {
  init: () => ({
    rotate: 20,
    y: 0,
    scale: 0,
    transition: {
      duration: 0,
      delay: 0,
    },
  }),
  end: () => ({
    rotate: -360,
    y: -5,
    scale: 0.9,
    transition: {
      duration: 0.24,
      delay: 0.1,
      type: "spring",
      stiffness: 200,
      damping: 40,
      mass: 1,
    },
  }),
};

const variantsForSpark = {
  init: (custom: string[]) => ({
    scale: 1,
    margin: 0,
    // backgroundColor: "yellow",
    backgroundColor: custom[1],
    transition: {
      duration: 0,
      delay: 0,
    },
  }),
  end: (custom: [number, string, string]) => ({
    scale: 0,
    margin: 2,
    // backgroundColor: "red",
    backgroundColor: custom[2],
    transition: {
      duration: custom[0],
      delay: 0.32,
      backgroundColor: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  }),
};

export function LikeButton() {
  const controlsForCountChange = useAnimationControls();

  const [count, setCount] = useState(0);
  const [countActive, setCountActive] = useState(false);
  const [isContainerHovered, setContainerHovered] = useState(false);
  const numbers = [0];
  const [theArray, setTheArray] = useState(numbers);

  useEffect(() => {
    const sequence = async () => {
      await controlsForCountChange.start("init");
      return await controlsForCountChange.start("end");
    };

    if (count !== 0) {
      controlsForCountChange.start("animationOnCountChange");
      sequence();
    }
  }, [controlsForCountChange, count]);

  const addEntryClick = () => {
    if (!countActive) {
      setCountActive(true);
      setCount(count + 1);
      setTheArray((oldArray) => [...oldArray, oldArray.length]);
    } else {
      setCountActive(false);
      setCount(count - 1);
    }
  };

  return (
    <Container
      className="container"
      onClick={() => addEntryClick()}
      onMouseEnter={() => setContainerHovered(true)}
      onMouseLeave={() => setContainerHovered(false)}
    >
      {sparkSpecs.map((spark) => {
        const customValue = (360 / sparkSpecs.length) * spark.id;

        return (
          <SparkWrapper
            key={spark.id}
            className="sparkWrapper"
            custom={customValue}
            style={{ rotate: (360 / sparkSpecs.length) * spark.id, scale: 0 }}
            variants={variantsForSparkWrapper}
            animate={controlsForCountChange}
          >
            <SparkGroup
              className="sparkGroup"
              style={{ rotate: 20, scale: 0 }}
              variants={variantsForSparkGroup}
              animate={controlsForCountChange}
            >
              <Spark
                className="spark sparkA"
                style={{ backgroundColor: spark.childColorA, scale: 0 }}
                variants={variantsForSpark}
                custom={[0.8, spark.childColorA, spark.childColorB]}
                animate={controlsForCountChange}
              />
              <Spark
                className="spark sparkB"
                style={{ backgroundColor: spark.childColorB, scale: 0 }}
                variants={variantsForSpark}
                custom={[0.32, spark.childColorA, spark.childColorB]}
                animate={controlsForCountChange}
              />
            </SparkGroup>
          </SparkWrapper>
        );
      })}
      {/*<HeartBackdrop*/}
      {/*  className="heartBackdrop"*/}
      {/*  style={{*/}
      {/*    backgroundColor: isContainerHovered ? "#DD2E44" : "transparent",*/}
      {/*    transform: isContainerHovered ? "scale(2)" : "scale(0)",*/}
      {/*  }}*/}
      {/*/>*/}
      <HeartIcon
        className="heart"
        initial="end"
        animate={controlsForCountChange}
        variants={variantsForHeart}
        heartColor={count !== 0 ? "#DD2E44" : "transparent"}
        borderColor={
          isContainerHovered
            ? "#DD2E44"
            : count !== 0
              ? ""
              : `${theme.islandBlueTheme.gray}`
        }
      />
      <LabelClipper className="labelClipper">
        <AnimatePresence>
          {theArray.map((number) => (
            <motion.div
              initial={{
                height: 0,
              }}
              animate={{
                height: "auto",
              }}
              transition={{
                height: {
                  duration: 0.32,
                },
              }}
              className="label"
              key={number.toString()}
              data-value={number}
              css={css`
                color: ${isContainerHovered ? "#DD2E44" : "black"};
                font-size: 14px;
                transition: color 0.32s ease;
                transform: translateX(30%);
                width: 100px;
                font-weight: bold;
              `}
            >
              {count}
            </motion.div>
          ))}
        </AnimatePresence>
      </LabelClipper>
    </Container>
  );
}

const sparkSpecs = [
  { id: 1, childColorA: "#CC8EF5", childColorB: "#F2B930" },
  { id: 2, childColorA: "#8CE8C3", childColorB: "#C3B789" },
  { id: 3, childColorA: "#F48EA7", childColorB: "#339EEE" },
  { id: 4, childColorA: "#91D2FA", childColorB: "#B0D5A5" },
  { id: 5, childColorA: "#91D2FA", childColorB: "#B0D5A5" },
  { id: 6, childColorA: "#8CE8C3", childColorB: "#D97ACA" },
  { id: 7, childColorA: "#91D2FA", childColorB: "#D59BF3" },
];

function HeartIcon(props: {
  className: string;
  initial: string;
  animate: AnimationControls;
  variants: VariantsForHeartType;
  heartColor: string;
  borderColor: string;
}) {
  const { heartColor, borderColor } = props;
  return (
    <div
      css={css`
        transform: translate(15%, 20%);
      `}
    >
      <motion.svg
        width={26}
        height={26}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        transform="18px 17.999500274658203px"
        viewBox="0 0 50 50" // 내부 좌표계를 확장
        preserveAspectRatio="xMidYMid meet" // 비율 유지하며 중앙 정렬
        css={css`
          position: relative;
          transform: scale(0.6); // 80% 크기로 스케일링
          transform-origin: center; // 중심 기준
        `}
        {...props}
      >
        <motion.path
          d="M35.885 11.833c0-5.45-4.418-9.868-9.867-9.868-3.308 0-6.227 1.633-8.018 4.129-1.791-2.496-4.71-4.129-8.017-4.129-5.45 0-9.868 4.417-9.868 9.868 0 .772.098 1.52.266 2.241C1.751 22.587 11.216 31.568 18 34.034c6.783-2.466 16.249-11.447 17.617-19.959.17-.721.268-1.469.268-2.242z"
          // fill={`#DD2E44`}
          fill={heartColor || `#DD2E44`}
          stroke={borderColor || `#DD2E44`}
        />
      </motion.svg>
    </div>
  );
}

const Container = styled(motion.div)`
  width: 60px;
  position: relative;
  /* background: rgba(255, 255, 255, 0.05); */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: start;
  /* gap: 2rem; */
  /* padding: 2rem 3rem; */
  /* border-radius: 1rem; */
  user-select: none;

  transition: stroke 0.32s ease;

  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;

const HeartBackdrop = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: green; */
  width: 26px;
  height: 26px;
  /* padding: 1rem; */
  border-radius: 100%;
  transform: scale(2.2) translateY(-0.25px);
  opacity: 0.1;
  transition: all 0.32s ease;
`;

const BubbleWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
`;

const Bubble = styled(motion.div)`
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: 2rem;
  min-width: 3rem;
  height: 3rem;
  /* background-color: chartreuse; */
  /* border: 2px solid transparent; */
  border-style: solid;
  /* border-color: teal; */
  border-width: 0px;
  border-radius: 100%;
  opacity: 1;
  pointer-events: none;
`;

const SparkWrapper = styled(motion.div)`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  position: absolute;
  /* border: 1px dotted rgba(255, 42, 255, 0.582); */
  width: 26px;
  height: 26px;
  opacity: 1;
  scale: 2;
  border-radius: 100%;
`;

const Spark = styled(motion.div)`
  width: 3px;
  height: 3px;
  /* background: red; */
  /* border: 1px solid red; */
  border-radius: 100%;
`;

const SparkGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1px;
  height: min-content;
  /* background: yellow; */
  overflow: hidden;
`;

const LabelClipper = styled.div`
  position: absolute;
  /* right: -3rem; */
  top: 0;
  transform: translateY(10%);
  height: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  /* background: green; */
  overflow: hidden;
`;