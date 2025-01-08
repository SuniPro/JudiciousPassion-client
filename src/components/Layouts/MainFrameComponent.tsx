import { useEffect, useRef, useState } from "react";

export function MainFrameComponent(selectedIndex: number) {
  const liRefs = useRef<HTMLLIElement[]>([]);
  const slide1Ref = useRef<HTMLLIElement>(null);
  const slide2Ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const slide1 = slide1Ref.current;
    const slide2 = slide2Ref.current;
    const selectedLi = liRefs.current[selectedIndex];

    if (!slide1 || !slide2) return;

    const rect = selectedLi.getBoundingClientRect();
    const parentRect = selectedLi.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    const left = rect.left - parentRect.left;
    const width = rect.width;

    // slide1 위치 및 크기 업데이트
    slide1.style.left = `${left}px`;
    slide1.style.width = `${width}px`;

    // slide2는 비활성화 애니메이션용
    slide2.style.opacity = "0";
    slide2.style.left = `${left}px`;
    slide2.style.width = `${width}px`;
  }, [selectedIndex]);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { width, liRefs, slide1Ref, slide2Ref };
}
