import { useEffect, useState } from "react";

/** 독립변수의 변화에 따라 변화해야하는 종속 변수를 비례로 계산하기 위한 함수입니다.
 * windowWidth, 컴포넌트의 기본 사이즈값, 변경기준 사이즈를 받습니다.
 * */
export const useProportionHook = (
  independent: number,
  dependent: number,
  parameter: number,
) => {
  const [size, setSize] = useState<number>(dependent);
  useEffect(() => {
    setSize(
      independent <= parameter
        ? (independent / parameter) * dependent
        : dependent,
    );
  }, [dependent, independent, parameter]);
  return { size };
};
