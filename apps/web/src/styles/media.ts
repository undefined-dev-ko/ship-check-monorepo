import { CSSObject, css } from 'styled-components';

type DeviceType = 'desktop' | 'tablet' | 'mobile';

export const breakpoints: Record<DeviceType, string> = {
  mobile: '@media (max-width: 768px)',
  tablet: '@media (max-width: 992px)',
  desktop: '@media (max-width: 1200px)',
};

const media = Object.entries(breakpoints).reduce((acc, [key, value]) => {
  return {
    ...acc,
    [key]: (
      first: CSSObject | TemplateStringsArray,
      ...interpolations: any[]
    ) => css`
      ${value} {
        ${css(first, ...interpolations)}
      }
    `,
  };
}, {}) as Record<DeviceType, any>;

export { media };
