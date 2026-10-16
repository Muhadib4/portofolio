import type { ComponentType, CSSProperties } from 'react';

declare const SplashCursor: ComponentType<{
  colors?: string[];
  rainbow?: boolean;
  colorSpeed?: number;
  intensity?: number;
  size?: number;
  force?: number;
  swirl?: number;
  trail?: number;
  momentum?: number;
  shading?: number;
  glow?: number;
  quality?: 'low' | 'medium' | 'high';
  clickSplash?: boolean;
  intro?: boolean;
  contained?: boolean;
  theme?: 'dark' | 'light';
  zIndex?: number;
  className?: string;
  style?: CSSProperties;
}>;

export default SplashCursor;