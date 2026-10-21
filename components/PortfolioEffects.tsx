'use client';

import { memo, useCallback, useState } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import SplashCursor from '@/components/SplashCursor';
import Topography, { type TopographyProps } from '@/components/Topography';

type EffectCategory = 'cursor' | 'background';
type EffectSelections = Record<EffectCategory, string | null>;

const MemoizedSplashCursor = memo(SplashCursor);
const MemoizedTopography = memo(Topography);

const SPLASH_CURSOR_COLORS = [
  '#160D10', '#241014', '#35151A', '#481A20', '#5A2027', '#70262D', '#3D1018', '#561923',
  '#2B1118', '#40151F', '#190C12', '#30101B', '#471522', '#601B2A', '#762436', '#4D1828',
  '#36121E', '#21101B', '#0D1713', '#12231A', '#193024', '#203D2B', '#294A32', '#34563A',
  '#3D6040', '#17251D', '#26362A', '#344438', '#3E4A30', '#4A512F', '#292F1D', '#20291D',
  '#332D16', '#49401B', '#5B4C20', '#6B5927', '#75612F', '#50472B', '#28271B', '#111522',
  '#151D30', '#1A2640', '#202F50', '#273B60', '#30466D', '#394F79', '#20243D', '#292747',
  '#332B53', '#3D315F', '#49376A', '#28203E', '#35234A', '#432853', '#512D5B', '#2D1938',
  '#391F47', '#482653', '#572C5D', '#211729', '#302039', '#3D2949', '#493354', '#171C20',
  '#252A2D', '#34383A', '#444643', '#55544C', '#32291F', '#463629', '#59422E', '#6A4A30',
  '#773C25', '#8A4528', '#A04B29', '#5B2A1D', '#6B3020', '#7A3822', '#49241D', '#3D211C',
  '#281B19', '#35211B', '#46271D', '#572C1D', '#682F1D', '#782F1A', '#20291F', '#2C3522',
  '#384329', '#45502F', '#514C2B', '#302F25', '#423B2B', '#514635', '#292C27', '#000000'
];

const TOPOGRAPHY_SETTINGS = {
  color: '#4f7cff',
  lineCount: 60,
  lineWidth: 0.6,
  elevation: 0.5,
  foreground: 1,
  tilt: 15,
  speed: 0.35,
  direction: 'forward',
  glow: 0.6,
  depthOfField: 1,
  fog: 0,
  hoverEffect: 'lift',
  clickEffect: 'pulse',
  scale: 0.4,
  detail: 0,
  morph: 0,
  brightness: 2,
  mouseRadius: 0.3,
  mouseStrength: 1.5,
  trail: 0.25,
  parallax: 1
} satisfies TopographyProps;

const TOPOGRAPHY_STYLE = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  opacity: 0.5,
  pointerEvents: 'none'
} as const;

export default function PortfolioEffects() {
  const [selectedEffects, setSelectedEffects] = useState<EffectSelections>({
    cursor: 'splash-cursor',
    background: null
  });

  const handleEffectSelect = useCallback((category: EffectCategory, effectId: string | null) => {
    setSelectedEffects(current => ({ ...current, [category]: effectId }));
  }, []);

  return (
    <>
      {selectedEffects.background === 'topography' && (
        <MemoizedTopography
          {...TOPOGRAPHY_SETTINGS}
          className="portfolio-topography"
          style={TOPOGRAPHY_STYLE}
        />
      )}
      {selectedEffects.cursor === 'splash-cursor' && (
        <MemoizedSplashCursor
          rainbow={false}
          size={1}
          force={3}
          swirl={10}
          trail={5}
          clickSplash
          colors={SPLASH_CURSOR_COLORS}
          colorSpeed={4}
          intensity={3}
          momentum={2.5}
          glow={0}
          zIndex={1}
        />
      )}
      <StaggeredMenu
        isFixed
        position="right"
        displaySocials
        displayItemNumbering
        menuButtonColor="#FFFFFF"
        openMenuButtonColor="#000000"
        changeMenuColorOnOpen
        colors={[
          '#000000',
          '#050B1F',
          '#0A1B4D',
          '#123A8C',
          '#155EEF',
          '#3B82F6',
          '#BFDBFE',
          '#FFFFFF'
        ]}
        accentColor="#155EEF"
        items={[{ label: 'Home', link: '#top', ariaLabel: 'Return to homepage' }]}
        socialItems={[{ label: 'GitHub', link: 'https://github.com/Muhadib4/portofolio' }]}
        selectedEffects={selectedEffects}
        onEffectSelect={handleEffectSelect}
      />
    </>
  );
}
