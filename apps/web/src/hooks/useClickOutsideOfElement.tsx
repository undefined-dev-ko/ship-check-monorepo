import { RefObject, useEffect, useRef } from 'react';

export default function useClickOutsideOfElement({
  onClickOutside,
  onClickInside,
  includeElementRefList,
}: {
  onClickOutside?: () => void;
  onClickInside?: () => void;
  /**
   * targetElementRef 이외에 내부 영역으로 지정할 요소 리스트
   */
  includeElementRefList?: RefObject<HTMLElement>[];
}) {
  const targetElementRef = useRef<HTMLDivElement>(null);

  // 내/외부 영역을 클릭하면, 상황에 맞는 callback 함수가 호출됨
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!targetElementRef.current) return;

      if (
        targetElementRef.current.contains(e.target as Node) ||
        includeElementRefList?.some((ref) =>
          ref.current?.contains(e.target as Node),
        )
      ) {
        onClickInside && onClickInside();
      } else {
        onClickOutside && onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [targetElementRef, onClickOutside, onClickInside, includeElementRefList]);

  return { targetElementRef };
}
