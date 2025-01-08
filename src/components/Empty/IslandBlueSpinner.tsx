/** @jsxImportSource @emotion/react */
import { PageContainer } from "../Layouts/Layouts";
import { css } from "@emotion/react";
import { useWindowContext } from "../../context/WindowContext";

export function IslandBlueSpinner(props: { className?: string }) {
  const { windowWidth } = useWindowContext();
  return (
    <PageContainer className={props.className} width={windowWidth}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        css={css`
          shape-rendering: auto;
          display: block;
          background: rgb(255, 255, 255);
        `}
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <circle fill="#85c8f2" r="10" cy="50" cx="84">
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1"
              values="10;0"
              keyTimes="0;1"
              calcMode="spline"
              dur="0.3571428571428571s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="0s"
              values="#85c8f2;#e6eef3;#b8edfd;#88d4f2;#85c8f2"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="discrete"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="fill"
            ></animate>
          </circle>
          <circle fill="#85c8f2" r="10" cy="50" cx="16">
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="0s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#88d4f2" r="10" cy="50" cx="50">
            <animate
              begin="-0.3571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.3571428571428571s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#b8edfd" r="10" cy="50" cx="84">
            <animate
              begin="-0.7142857142857142s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-0.7142857142857142s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <circle fill="#e6eef3" r="10" cy="50" cx="16">
            <animate
              begin="-1.0714285714285714s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="0;0;10;10;10"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="r"
            ></animate>
            <animate
              begin="-1.0714285714285714s"
              keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
              values="16;16;16;50;84"
              keyTimes="0;0.25;0.5;0.75;1"
              calcMode="spline"
              dur="1.4285714285714284s"
              repeatCount="indefinite"
              attributeName="cx"
            ></animate>
          </circle>
          <g></g>
        </g>
      </svg>
    </PageContainer>
  );
}
