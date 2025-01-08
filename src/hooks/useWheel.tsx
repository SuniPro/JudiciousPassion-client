import { useEffect } from "react";

/** ref로 전달된 컴포넌트가 현재 오버스크롤(최상단에서 위스크롤, 최하단에서 아래스크롤) 상태인지 확인합니다. */
export function isOverScrolling(
  ref: React.RefObject<HTMLElement>,
  e: WheelEvent,
) {
  const scrollElement = ref.current;
  if (!scrollElement) return false;
  const scrollableHeight =
    scrollElement.scrollHeight - scrollElement.offsetHeight;
  const currentScrollTop = scrollElement.scrollTop;
  const isBottomOverScrolling =
    currentScrollTop >= scrollableHeight && e.deltaY > 0;
  const isTopOverScrolling = currentScrollTop <= 0 && e.deltaY < 0;
  return isBottomOverScrolling || isTopOverScrolling;
}

export function isBottomOverScrolling(
  ref: React.RefObject<HTMLElement>,
  e: WheelEvent,
) {
  const scrollElement = ref.current;
  if (!scrollElement) return false;

  //스크롤이 가능한 높이
  const scrollableHeight =
    scrollElement.scrollHeight - scrollElement.offsetHeight;
  const currentScrollTop = scrollElement.scrollTop;

  return currentScrollTop >= scrollableHeight && e.deltaY > 0;
}

export function useBodyScrollBottomOver(
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
) {
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const scrollTop = document.documentElement.scrollTop || window.scrollY; // 현재 스크롤 위치
      const scrollHeight = document.documentElement.scrollHeight; // 전체 콘텐츠 높이
      const clientHeight = document.documentElement.clientHeight; // 화면 보이는 높이

      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1; // 최하단 도달 여부
      const isScrollingDown = e.deltaY > 0; // 스크롤 방향

      if (isFetchingNextPage) return;

      // 조건 충족 시 fetchNextPage 실행
      if (isAtBottom && isScrollingDown) {
        fetchNextPage();
      }
    };

    window.addEventListener("wheel", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [fetchNextPage, isFetchingNextPage]); // fetchNextPage가 변경될 때만 다시 설정
}
