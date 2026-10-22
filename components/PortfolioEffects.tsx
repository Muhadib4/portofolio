'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
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
  elevation: 0.15,
  foreground: 0.5,
  tilt: 15,
  speed: 0.35,
  direction: 'forward',
  glow: 0.6,
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
  position: 'absolute',
  inset: 0,
  zIndex: 0,
  width: '100%',
  height: '100%',
  opacity: 0.5,
  pointerEvents: 'none'
} as const;

export default function PortfolioEffects() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundVolume, setSoundVolume] = useState(0.22);
  const [selectedEffects, setSelectedEffects] = useState<EffectSelections>({
    cursor: 'splash-cursor',
    background: null
  });

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
        soundEnabled={soundEnabled}
        soundVolume={soundVolume}
        onSoundEnabledChange={setSoundEnabled}
        onSoundVolumeChange={setSoundVolume}
      />
    </>
  );
}
