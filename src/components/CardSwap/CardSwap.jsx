import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const CardSwap = ({
  width = 500,
  height = 440,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 8000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 6,
  children
}) => {
  const childArr = Children.toArray(children);
  const total = childArr.length;
  const refs = useMemo(() => Array.from({ length: total }, () => React.createRef()), [total]);
  const [active, setActive] = useState(0);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 820px)').matches);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(max-width: 820px), (pointer: coarse), (prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const placed = useRef(false);
  const paused = !playing || (pauseOnHover && hovered) || focused || reducedMotion;

  useEffect(() => {
    const size = window.matchMedia('(max-width: 820px)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => {
      setCompact(size.matches);
      setReducedMotion(motion.matches);
      if (size.matches || motion.matches) setPlaying(false);
    };
    size.addEventListener('change', update);
    motion.addEventListener('change', update);
    return () => {
      size.removeEventListener('change', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    refs.forEach((ref, index) => {
      const slot = (index - active + total) % total;
      const target = {
        x: slot * cardDistance, y: -slot * verticalDistance, z: -slot * cardDistance * 1.5,
        xPercent: -50, yPercent: -50, skewY: skewAmount,
        zIndex: total - slot, transformOrigin: 'center center', force3D: true
      };
      if (compact || reducedMotion || !placed.current) gsap.set(ref.current, target);
      else gsap.to(ref.current, { ...target, duration: 0.65, ease: 'power2.out', overwrite: true });
    });
    placed.current = true;
    return () => refs.forEach(ref => gsap.killTweensOf(ref.current));
  }, [active, refs, total, compact, reducedMotion, cardDistance, verticalDistance, skewAmount]);

  useEffect(() => {
    if (paused || total < 2) return;
    const timer = window.setInterval(() => setActive(index => (index + 1) % total), delay);
    return () => window.clearInterval(timer);
  }, [paused, total, delay]);

  const move = (direction) => {
    setPlaying(false);
    setActive(index => (index + direction + total) % total);
  };

  return (
    <div className={`card-swap-region${compact ? ' is-compact' : ''}`} role="region"
      aria-roledescription="carousel" aria-label="Portfolio projects"
      onKeyDown={event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        event.stopPropagation();
        move(event.key === 'ArrowRight' ? 1 : -1);
      }}
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="card-swap-container" style={{ width, height }}>
        {childArr.map((child, index) => isValidElement(child) ? cloneElement(child, {
          key: child.key ?? index,
          ref: refs[index],
          'data-active': index === active,
          inert: index !== active,
          'aria-hidden': index !== active,
          role: 'group',
          'aria-roledescription': 'slide',
          'aria-label': `${index + 1} of ${total}`,
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: event => { child.props.onClick?.(event); onCardClick?.(index); }
        }) : child)}
      </div>
      <div className="card-swap-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous project" disabled={total < 2}><ChevronLeft size={20} /></button>
        <span className="card-swap-status" aria-live={paused ? 'polite' : 'off'} aria-atomic="true">
          <strong>{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</strong>
          <small>{paused ? 'Paused' : `Auto · ${delay / 1000}s`}</small>
        </span>
        <button type="button" onClick={() => move(1)} aria-label="Next project" disabled={total < 2}><ChevronRight size={20} /></button>
        {!reducedMotion && <button type="button" onClick={() => {
          if (!playing) { setHovered(false); setFocused(false); }
          setPlaying(value => !value);
        }}
          aria-label={playing ? 'Pause automatic project rotation' : 'Start automatic project rotation'} aria-pressed={playing}>
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>}
      </div>
    </div>
  );
};

export default CardSwap;
