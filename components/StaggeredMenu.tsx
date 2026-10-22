// @ts-nocheck
'use client';

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

type MenuItem = { label: string; link: string; ariaLabel?: string };
type SocialItem = { label: string; link: string };
type EffectCategory = 'cursor' | 'background';
type EffectSelections = Partial<Record<EffectCategory, string | null>>;
type StaggeredMenuProps = {
  position?: 'left' | 'right';
  colors?: string[];
  items?: MenuItem[];
  socialItems?: SocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  selectedEffects?: EffectSelections;
  onEffectSelect?: (category: EffectCategory, effectId: string | null) => void;
  soundEnabled?: boolean;
  soundVolume?: number;
  onSoundEnabledChange?: (enabled: boolean) => void;
  onSoundVolumeChange?: (volume: number) => void;
};

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '',
  menuButtonColor = '#ffffff',
  openMenuButtonColor = '#000000',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
  selectedEffects = {},
  onEffectSelect,
  soundEnabled = true,
  soundVolume = 0.22,
  onSoundEnabledChange,
  onSoundVolumeChange
}: StaggeredMenuProps) => {
  const [open, setOpen] = useState(false);
  const [effectSelectorOpen, setEffectSelectorOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const plusHRef = useRef(null);
  const plusVRef = useRef(null);
  const iconRef = useRef(null);
  const textInnerRef = useRef(null);
  const textWrapRef = useRef(null);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const spinTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const colorTweenRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const busyRef = useRef(false);
  const itemEntranceTweenRef = useRef(null);
  const effectSelectorRef = useRef(null);
  const effectsButtonRef = useRef(null);
  const audioContextRef = useRef(null);
  const lastHoverSoundRef = useRef(0);

  const playUiSound = useCallback((kind = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioContextRef.current) audioContextRef.current = new AudioContextClass();
      const context = audioContextRef.current;
      if (context.state === 'suspended') void context.resume();
      const now = context.currentTime;
      const gain = context.createGain();
      gain.gain.setValueAtTime(Math.max(0.001, soundVolume), now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (kind === 'magic' ? 0.42 : 0.16));
      gain.connect(context.destination);
      const oscillator = context.createOscillator();
      const filter = context.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(kind === 'magic' ? 1700 : 1200, now);
      oscillator.type = kind === 'magic' ? 'sine' : 'triangle';
      oscillator.frequency.setValueAtTime(kind === 'magic' ? 660 : 520, now);
      oscillator.frequency.exponentialRampToValueAtTime(kind === 'magic' ? 990 : 360, now + (kind === 'magic' ? 0.3 : 0.12));
      oscillator.connect(filter);
      filter.connect(gain);
      oscillator.start(now);
      oscillator.stop(now + (kind === 'magic' ? 0.42 : 0.16));
      oscillator.onended = () => { oscillator.disconnect(); filter.disconnect(); gain.disconnect(); };
    } catch {
      // Audio is an optional enhancement; never interrupt UI interactions.
    }
  }, [soundEnabled, soundVolume]);

  React.useEffect(() => () => {
    if (audioContextRef.current) void audioContextRef.current.close();
  }, []);

  const effectCategories = [
    { id: 'cursor', label: 'Cursor', effects: [{ id: 'splash-cursor', label: 'SplashCursor' }] },
    { id: 'background', label: 'Background', effects: [{ id: 'topography', label: 'Topography' }] }
  ];

  const handleEffectSelect = useCallback((category, effectId) => {
    const selected = selectedEffects?.[category] === effectId;
    onEffectSelect?.(category, selected ? null : effectId);
    playUiSound('magic');
  }, [onEffectSelect, selectedEffects, playUiSound]);

  React.useEffect(() => {
    if (!open) setEffectSelectorOpen(false);
  }, [open]);

  React.useEffect(() => {
    if (open && effectSelectorOpen) {
      effectSelectorRef.current?.querySelector('button')?.focus();
    }
  }, [effectSelectorOpen, open]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer'));
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }
      gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
      gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

    const offscreen = position === 'left' ? -100 : 100;
    const layerStates = layers.map(el => ({ el, start: offscreen }));
    const panelStart = offscreen;

    if (itemEls.length) {
      gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    }
    if (numberEls.length) {
      gsap.set(numberEls, { '--sm-num-opacity': 0 });
    }
    if (socialTitle) {
      gsap.set(socialTitle, { opacity: 0 });
    }
    if (socialLinks.length) {
      gsap.set(socialLinks, { y: 25, opacity: 0 });
    }

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStartRatio = 0.15;
      const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );
      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle) {
        tl.to(
          socialTitle,
          {
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out'
          },
          socialsStart
        );
      }
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: 'power3.out',
            stagger: { each: 0.08, from: 'start' },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: 'opacity' });
            }
          },
          socialsStart + 0.04
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback('onComplete', () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: () => {
        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
        if (itemEls.length) {
          gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        if (numberEls.length) {
          gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
        busyRef.current = false;
      }
    });
  }, [position]);

  const animateIcon = useCallback(opening => {
    const icon = iconRef.current;
    if (!icon) return;
    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap.to(icon, { rotate: 225, duration: 0.8, ease: 'power4.out', overwrite: 'auto' });
    } else {
      spinTweenRef.current = gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power3.inOut', overwrite: 'auto' });
    }
  }, []);

  const animateColor = useCallback(
    opening => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  React.useEffect(() => {
    if (toggleBtnRef.current) {
      if (changeMenuColorOnOpen) {
        const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
        gsap.set(toggleBtnRef.current, { color: targetColor });
      } else {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback(opening => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? 'Menu' : 'Close';
    const targetLabel = opening ? 'Close' : 'Menu';
    const cycles = 3;
    const seq = [currentLabel];
    let last = currentLabel;
    for (let i = 0; i < cycles; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: 'power4.out'
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    playUiSound(target ? 'magic' : 'click');
    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }
    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [playOpen, playClose, animateIcon, animateColor, animateText, onMenuOpen, onMenuClose, playUiSound]);

  React.useEffect(() => {
    if (!soundEnabled) return;
    const onPointerOver = event => {
      const target = event.target;
      if (!(target instanceof Element) || !target.closest('button, a, [role="button"]')) return;
      const now = performance.now();
      if (now - lastHoverSoundRef.current < 110) return;
      lastHoverSoundRef.current = now;
      playUiSound('hover');
    };
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    return () => document.removeEventListener('pointerover', onPointerOver);
  }, [soundEnabled, playUiSound]);

  const closeMenu = useCallback(() => {
    if (openRef.current) {
      openRef.current = false;
      setOpen(false);
      playUiSound('click');
      onMenuClose?.();
      playClose();
      animateIcon(false);
      animateColor(false);
      animateText(false);
    }
  }, [playClose, animateIcon, animateColor, animateText, onMenuClose, playUiSound]);

  React.useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = event => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeOnClickAway, open, closeMenu]);

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
      style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {(() => {
          const arr = colors && colors.length
            ? [...colors]
            : ['#000000', '#050B1F', '#0A1B4D', '#123A8C', '#155EEF', '#3B82F6', '#BFDBFE', '#FFFFFF'];
          return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
        })()}
      </div>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <div className="sm-logo" aria-hidden="true" />
        <button
          ref={toggleBtnRef}
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
        >
          <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
            <span ref={textInnerRef} className="sm-toggle-textInner">
              {textLines.map((l, i) => (
                <span className="sm-toggle-line" key={i}>
                  {l}
                </span>
              ))}
            </span>
          </span>
          <span ref={iconRef} className="sm-icon" aria-hidden="true">
            <span ref={plusHRef} className="sm-icon-line" />
            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((it, idx) => (
                <li className="sm-panel-itemWrap" key={it.label + idx}>
                  <a className="sm-panel-item" href={it.link} aria-label={it.ariaLabel} data-index={idx + 1}>
                    <span className="sm-panel-itemLabel">{it.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i} className="sm-socials-item">
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="sm-effects-anchor">
            <div
              id="sm-effects-selector"
              ref={effectSelectorRef}
              className="sm-effects-selector"
              role="dialog"
              aria-label="Visual effects"
              hidden={!effectSelectorOpen}
              onKeyDown={event => {
                if (event.key === 'Escape') {
                  setEffectSelectorOpen(false);
                  effectsButtonRef.current?.focus();
                }
              }}
            >
              {effectCategories.map(category => (
                <section className="sm-effects-category" key={category.id} aria-labelledby={`sm-effects-${category.id}`}>
                  <h3 id={`sm-effects-${category.id}`}>{category.label}</h3>
                  <div role="group" aria-label={`${category.label} effects`}>
                    {category.effects.map(effect => {
                      const selected = selectedEffects?.[category.id] === effect.id;
                      return (
                        <button
                          className="sm-effect-option"
                          key={effect.id}
                          type="button"
                          aria-pressed={selected}
                          tabIndex={open && effectSelectorOpen ? 0 : -1}
                          onClick={() => handleEffectSelect(category.id, effect.id)}
                        >
                          <span>{effect.label}</span>
                          <span className="sm-effect-option__indicator" aria-hidden="true">{selected ? '✓' : ''}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
              <section className="sm-effects-category sm-sound-settings" aria-labelledby="sm-effects-sound">
                <h3 id="sm-effects-sound">Interaction sound</h3>
                <label className="sm-sound-toggle">
                  <span>Sound effects</span>
                  <input type="checkbox" checked={soundEnabled} onChange={event => { onSoundEnabledChange?.(event.target.checked); if (event.target.checked) playUiSound('magic'); }} />
                </label>
                <label className="sm-sound-volume">
                  <span>Volume</span>
                  <input type="range" min="0" max="0.5" step="0.01" value={soundVolume} disabled={!soundEnabled} onChange={event => onSoundVolumeChange?.(Number(event.target.value))} />
                </label>
              </section>
            </div>
            <button
              ref={effectsButtonRef}
              className="sm-effects-button"
              type="button"
              aria-label="Open visual effects settings"
              aria-haspopup="dialog"
              aria-expanded={effectSelectorOpen}
              aria-controls="sm-effects-selector"
              tabIndex={open ? 0 : -1}
              onClick={() => { setEffectSelectorOpen(value => !value); playUiSound('click'); }}
            >
              <span>Effects</span>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
                <path d="m19.4 13.5 1.1.8-1.1 1.9-1.3-.5a7.5 7.5 0 0 1-1.3.8l-.2 1.4h-2.2l-.3-1.4a7.5 7.5 0 0 1-1.5 0l-.7 1.2-1.9-1.1.5-1.3a7.5 7.5 0 0 1-.8-1.3l-1.4-.2v-2.2l1.4-.3a7.5 7.5 0 0 1 0-1.5l-1.2-.7 1.1-1.9 1.3.5a7.5 7.5 0 0 1 1.3-.8l.2-1.4h2.2l.3 1.4a7.5 7.5 0 0 1 1.5 0l.7-1.2 1.9 1.1-.5 1.3a7.5 7.5 0 0 1 .8 1.3l1.4.2v2.2l-1.4.3a7.5 7.5 0 0 1 0 1.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
