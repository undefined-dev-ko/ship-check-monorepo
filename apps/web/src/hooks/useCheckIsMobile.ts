import { useLayoutEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * 모바일 최대 너비
 */
const MOBILE_MAX_WIDTH = 767.98;

/**
 * isMobile: CSS 미디어쿼리와 같이 max-width체크
 */
export default function useCheckIsMobile() {
  const [isBrowser, setIsBrowser] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: MOBILE_MAX_WIDTH });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsBrowser(true);
  }, []);

  return {
    isMobile: isBrowser ? isMobile : false,
  };
}
