'use client';

import { useCallback, useState } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import Topography, { type TopographyProps } from '@/components/Topography';

type EffectCategory = 'cursor' | 'background';
type EffectSelections = Partial<Record<EffectCategory, string | null>>;

const TOPOGRAPHY_SETTINGS = {
  color: '#4F7CFF',
  lineCount: 52,
  lineWidth: 0.55,
  elevation: 0.12,
  foreground: 0.24,
  tilt: 15,
  speed: 0.22,
  direction: 'forward',
  glow: 0.16,
  depthOfField: 1,
  fog: 0,
  hoverEffect: 'lift',
  clickEffect: 'pulse',
  scale: 0.42,
  detail: 1,
  morph: 2.5,
  brightness: 0.9,
  mouseRadius: 0.3,
  mouseStrength: 0.65,
  trail: 0.18,
  parallax: 0.35
} satisfies TopographyProps;

const TOPOGRAPHY_STYLE = {
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  opacity: 0.22,
  pointerEvents: 'none'
} as const;

export default function PortfolioEffects() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.18);
  const [selectedEffects, setSelectedEffects] = useState<EffectSelections>({
    background: null
  });

  const handleEffectSelect = useCallback((category: EffectCategory, effectId: string | null) => {
    setSelectedEffects(current => ({ ...current, [category]: effectId }));
  }, []);

  return (
    <>
      {selectedEffects.background === 'topography' && (
        <Topography
          {...TOPOGRAPHY_SETTINGS}
          className="portfolio-topography"
          style={TOPOGRAPHY_STYLE}
        />
      )}
      <StaggeredMenu
        isFixed
        position="right"
        displaySocials
        displayItemNumbering
        menuButtonColor="#F2F4FA"
        openMenuButtonColor="#F2F4FA"
        changeMenuColorOnOpen
        colors={[
          '#0B0D14',
          '#111827',
          '#171D2B',
          '#202B42',
          '#2D4169',
          '#4F7CFF',
          '#AFC3FF',
          '#F2F4FA'
        ]}
        accentColor="#4F7CFF"
        items={[{ label: 'Home', link: '#top', ariaLabel: 'Return to homepage' }]}
        socialItems={[{ label: 'GitHub', link: 'https://github.com/Muhadib4/portofolio' }]}
        selectedEffects={selectedEffects}
        onEffectSelect={handleEffectSelect}
        soundEnabled={soundEnabled}
        soundVolume={soundVolume}
        onSoundEnabledChange={setSoundEnabled}
        onSoundVolumeChange={setSoundVolume}
      />
    </>
  );
}
