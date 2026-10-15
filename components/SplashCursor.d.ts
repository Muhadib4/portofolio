import type { ComponentType } from 'react';

declare const SplashCursor: ComponentType<{
  rainbow?: boolean;
  size?: number;
  force?: number;
  swirl?: number;
  trail?: number;
  clickSplash?: boolean;
  zIndex?: number;
}>;

export default SplashCursor;
