'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { PortfolioCopy, PortfolioLanguage } from '@/app/portfolio-copy';
import { socialLinks } from '@/app/social-links';
import StaggeredMenu from '@/components/StaggeredMenu';
import SplashCursor from '@/components/SplashCursor';
import Topography, { type TopographyProps } from '@/components/Topography';

type EffectCategory = 'cursor' | 'background';
type EffectSelections = Record<EffectCategory, string | null>;

const MemoizedSplashCursor = memo(SplashCursor);
const MemoizedTopography = memo(Topography);

const SPLASH_CURSOR_COLORS = ['#4F7CFF', '#FFFFFF', '#4F7CFF'];

const TOPOGRAPHY_SETTINGS = {
  color: '#4F7CFF',
  lineCount: 60,
  lineWidth: 0.6,
  elevation: 0.15,
  foreground: 0.5,
  tilt: 15,
  speed: 0.35,
  direction: 'forward',
  glow: 0.2,
  depthOfField: 1,
  fog: 0,
  hoverEffect: 'lift',
  clickEffect: 'pulse',
  scale: 0.4,
  detail: 1,
  morph: 2.5,
  brightness: 2,
  mouseRadius: 0.3,
  mouseStrength: 1.5,
  trail: 0.25,
  parallax: 1
} satisfies TopographyProps;

const TOPOGRAPHY_STYLE = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  opacity: 0.16,
  pointerEvents: 'none'
} as const;

type PortfolioEffectsProps = {
  language: PortfolioLanguage;
  onLanguageChange: (language: PortfolioLanguage) => void;
  copy: PortfolioCopy['menu'];
  navigation: PortfolioCopy['navigation'];
};

export default function PortfolioEffects({ language, onLanguageChange, copy, navigation }: PortfolioEffectsProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.22);
  const [selectedEffects, setSelectedEffects] = useState<EffectSelections>({
    cursor: 'splash-cursor',
    background: 'topography'
  });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    updatePreference();
    preference.addEventListener('change', updatePreference);
    return () => preference.removeEventListener('change', updatePreference);
  }, []);

  const handleEffectSelect = useCallback((category: EffectCategory, effectId: string | null) => {
    setSelectedEffects(current => ({ ...current, [category]: effectId }));
  }, []);

  const interactionAudioRef = useRef<AudioContext | null>(null);
  const lastMouseSoundRef = useRef(0);
  const lastMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!soundEnabled) return;

    const playInteractionTone = (kind: 'topography' | 'splash' | 'click') => {
      try {
        const AudioContextClass = window.AudioContext;
        if (!AudioContextClass) return;
        if (!interactionAudioRef.current || interactionAudioRef.current.state === 'closed') {
          interactionAudioRef.current = new AudioContextClass();
        }
        const audio = interactionAudioRef.current;
        if (audio.state === 'suspended') void audio.resume();

        const now = audio.currentTime;
        const isTopo = kind === 'topography';
        const isClick = kind === 'click';
        const oscillator = audio.createOscillator();
        const filter = audio.createBiquadFilter();
        const gain = audio.createGain();
        oscillator.type = isTopo ? 'sine' : 'triangle';
        oscillator.frequency.setValueAtTime(isTopo ? 185 : isClick ? 720 : 310, now);
        oscillator.frequency.exponentialRampToValueAtTime(isTopo ? 245 : isClick ? 420 : 185, now + (isClick ? 0.16 : 0.13));
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isTopo ? 520 : 1600, now);
        gain.gain.setValueAtTime(Math.max(0.001, soundVolume * (isClick ? 0.2 : isTopo ? 0.065 : 0.075)), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (isClick ? 0.18 : 0.14));
        oscillator.connect(filter);
        filter.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(now);
        oscillator.stop(now + (isClick ? 0.18 : 0.14));
        oscillator.onended = () => {
          oscillator.disconnect();
          filter.disconnect();
          gain.disconnect();
        };
      } catch {
        // Sound is optional and must never interrupt the visual effect.
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const activeEffect = selectedEffects.background === 'topography'
        ? 'topography'
        : selectedEffects.cursor === 'splash-cursor' ? 'splash' : null;
      if (!activeEffect) return;

      const previous = lastMousePositionRef.current;
      const distance = Math.hypot(event.clientX - previous.x, event.clientY - previous.y);
      lastMousePositionRef.current = { x: event.clientX, y: event.clientY };
      const now = performance.now();
      const interval = activeEffect === 'topography' ? 190 : 145;
      if (distance < 8 || now - lastMouseSoundRef.current < interval) return;
      lastMouseSoundRef.current = now;
      playInteractionTone(activeEffect);
    };

    const onPointerDown = (event: PointerEvent) => {
      // Topography has its own independent click sound, even with SplashCursor disabled.
      if (selectedEffects.background === 'topography') {
        playInteractionTone('click');
        return;
      }
      if (selectedEffects.cursor === 'splash-cursor') playInteractionTone('click');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [soundEnabled, soundVolume, selectedEffects.background, selectedEffects.cursor]);

  useEffect(() => () => {
    if (interactionAudioRef.current) void interactionAudioRef.current.close();
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
      {selectedEffects.cursor === 'splash-cursor' && !reducedMotion && (
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
        className="portfolio-menu"
        isFixed
        position="right"
        displaySocials
        displayItemNumbering
        menuButtonColor="#FFFFFF"
        openMenuButtonColor="#FFFFFF"
        changeMenuColorOnOpen
        colors={[
          '#000000',
          'rgba(255,255,255,0.12)',
          '#000000',
          '#4F7CFF',
          'rgba(255,255,255,0.36)',
          '#FFFFFF'
        ]}
        accentColor="#4F7CFF"
        items={[
          { label: navigation.home, link: '#top' },
          { label: navigation.about, link: '#about' },
          { label: navigation.interests, link: '#interests' },
          { label: navigation.connect, link: '#connect' }
        ]}
        socialItems={socialLinks.map(social => ({ label: social.platform, link: social.href, platform: social.platform }))}
        language={language}
        onLanguageChange={onLanguageChange}
        copy={copy}
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
