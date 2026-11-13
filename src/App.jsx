import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Sparkles,
  Download,
  Share2,
  X,
  ExternalLink,
  Check,
  Phone,
  MessageCircle,
  Heart,
  Crown,
  Music,
  Utensils,
  Users,
  Cake,
  Palette
} from 'lucide-react';
import { ACTIVE_THEME_KEY, THEMES, applyThemeToDocument } from './theme.js';

// ==========================================
// 1. AMBIENT ROYAL CELEBRATION SYNTHESIZER
// ==========================================
class LuxuryAmbientSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.masterGain = null;
  }

  start() {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    const chords = [
      [261.63, 329.63, 392.00, 493.88, 587.33],
      [293.66, 369.99, 440.00, 523.25, 659.25],
      [246.94, 329.63, 392.00, 493.88, 587.33],
      [261.63, 329.63, 392.00, 493.88, 523.25],
    ];
    let step = 0;

    const triggerChord = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = chords[step % chords.length];

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.16);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(920, now);

        noteGain.gain.setValueAtTime(0.0001, now + idx * 0.16);
        noteGain.gain.exponentialRampToValueAtTime(0.075 / notes.length, now + idx * 0.16 + 0.7);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.16 + 4.5);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.masterGain);

        osc.start(now + idx * 0.16);
        osc.stop(now + idx * 0.16 + 4.7);
      });

      step++;
    };

    triggerChord();
    this.intervalId = setInterval(triggerChord, 4300);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

// ==========================================
// 2. THEME-AWARE INDIAN ROYAL LOTUS & SILVER JUBILEE CREST
// ==========================================
const IndianSilverJubileeCrest = ({ theme, className = 'w-32 h-32' }) => (
  <svg viewBox="0 0 260 260" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="royalSilver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={theme.silverMuted} />
        <stop offset="30%" stopColor="#FFFFFF" />
        <stop offset="52%" stopColor={theme.accent} />
        <stop offset="78%" stopColor={theme.secondary} />
        <stop offset="100%" stopColor="#94A3B8" />
      </linearGradient>
      <linearGradient id="warmGoldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={theme.accent} />
        <stop offset="55%" stopColor={theme.secondary} />
        <stop offset="100%" stopColor="#F8FAFC" />
      </linearGradient>
      <radialGradient id="crestCore" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor={theme.crestCoreTop} />
        <stop offset="70%" stopColor={theme.crestCoreMid} />
        <stop offset="100%" stopColor={theme.crestCoreBottom} />
      </radialGradient>
    </defs>

    {/* 16-Petal Sacred Lotus Aura */}
    {Array.from({ length: 16 }).map((_, idx) => {
      const angle = (idx * 360) / 16;
      return (
        <g key={idx} transform={`rotate(${angle} 130 130)`}>
          <path
            d="M130 12 C137 26, 137 38, 130 46 C123 38, 123 26, 130 12 Z"
            stroke="url(#royalSilver)"
            strokeWidth="1.05"
            fill={`rgba(${theme.secondaryRgb}, 0.12)`}
          />
          <circle cx="130" cy="7" r="1.7" fill="url(#warmGoldAccent)" />
        </g>
      );
    })}

    {/* Concentric Filigree Rings */}
    <circle cx="130" cy="130" r="96" stroke="url(#royalSilver)" strokeWidth="1.2" strokeDasharray="3 4" opacity="0.85" />
    <circle cx="130" cy="130" r="88" stroke="url(#royalSilver)" strokeWidth="1.8" />
    <circle cx="130" cy="130" r="81" fill="url(#crestCore)" stroke="url(#warmGoldAccent)" strokeWidth="1" opacity="0.96" />

    {/* Top Royal Lotus Crown Motif */}
    <path
      d="M114 66 Q130 46 146 66 Q137 63 130 70 Q123 63 114 66 Z"
      fill="url(#warmGoldAccent)"
    />
    <circle cx="130" cy="48" r="2.5" fill={theme.accent} />

    {/* 25 Numeral */}
    <text
      x="130"
      y="124"
      textAnchor="middle"
      fill="url(#royalSilver)"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="56"
      fontWeight="700"
      letterSpacing="2"
    >
      25
    </text>

    {/* Ornamental Lotus Divider */}
    <line x1="78" y1="136" x2="118" y2="136" stroke="url(#royalSilver)" strokeWidth="0.95" opacity="0.8" />
    <polygon points="130,132 134,136 130,140 126,136" fill="url(#warmGoldAccent)" />
    <line x1="142" y1="136" x2="182" y2="136" stroke="url(#royalSilver)" strokeWidth="0.95" opacity="0.8" />

    {/* Monogram R & B */}
    <text
      x="130"
      y="165"
      textAnchor="middle"
      fill="url(#royalSilver)"
      fontFamily="'Cormorant Garamond', Georgia, serif"
      fontSize="26"
      fontStyle="italic"
      fontWeight="600"
      letterSpacing="4"
    >
      R &amp; B
    </text>

    {/* Subtitle */}
    <text
      x="130"
      y="188"
      textAnchor="middle"
      fill={theme.textMuted}
      fontFamily="'Montserrat', sans-serif"
      fontSize="8.5"
      letterSpacing="3.5"
    >
      SILVER JUBILEE
    </text>
  </svg>
);

// ==========================================
// 3. THEME-AWARE SACRED LOTUS MANDALA SVG
// ==========================================
const SacredLotusMandala = ({ theme, className = '' }) => (
  <svg viewBox="0 0 600 600" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="themedMandalaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={theme.secondary} stopOpacity="0.38" />
        <stop offset="50%" stopColor={theme.accent} stopOpacity="0.30" />
        <stop offset="100%" stopColor={theme.silverMuted} stopOpacity="0.18" />
      </linearGradient>
    </defs>
    <circle cx="300" cy="300" r="286" stroke="url(#themedMandalaGrad)" strokeWidth="1.1" strokeDasharray="4 8" />
    <circle cx="300" cy="300" r="246" stroke="url(#themedMandalaGrad)" strokeWidth="1.3" />
    <circle cx="300" cy="300" r="196" stroke="url(#themedMandalaGrad)" strokeWidth="1" strokeDasharray="2 6" />
    <circle cx="300" cy="300" r="146" stroke="url(#themedMandalaGrad)" strokeWidth="1.2" />

    {Array.from({ length: 24 }).map((_, i) => {
      const deg = (i * 360) / 24;
      return (
        <g key={i} transform={`rotate(${deg} 300 300)`}>
          <path
            d="M300 16 C317 55, 317 88, 300 112 C283 88, 283 55, 300 16 Z"
            stroke="url(#themedMandalaGrad)"
            strokeWidth="1"
          />
          <path
            d="M300 112 C312 138, 312 162, 300 182 C288 162, 288 138, 300 112 Z"
            stroke="url(#themedMandalaGrad)"
            strokeWidth="0.9"
          />
          <circle cx="300" cy="11" r="2.6" fill={theme.secondary} fillOpacity="0.55" />
          <circle cx="300" cy="11" r="1.1" fill={theme.accent} fillOpacity="0.85" />
        </g>
      );
    })}
  </svg>
);

// ==========================================
// 4. THEME-AWARE CORNER LOTUS FILIGREE
// ==========================================
const RoyalCornerFiligree = ({ theme, className = '' }) => (
  <svg viewBox="0 0 160 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 152 L8 42 Q8 8 42 8 L152 8"
      stroke={`rgba(${theme.accentRgb}, 0.48)`}
      strokeWidth="1.5"
    />
    <path
      d="M18 152 L18 48 Q18 18 48 18 L152 18"
      stroke={`rgba(${theme.secondaryRgb}, 0.42)`}
      strokeWidth="1"
      strokeDasharray="3 4"
    />
    <circle cx="36" cy="36" r="14" stroke={`rgba(${theme.accentRgb}, 0.5)`} strokeWidth="1" />
    <circle
      cx="36"
      cy="36"
      r="5"
      fill={`rgba(${theme.secondaryRgb}, 0.4)`}
      stroke={`rgba(${theme.accentRgb}, 0.7)`}
      strokeWidth="1"
    />
    <path d="M36 16 L39 24 L36 28 L33 24 Z" fill={`rgba(${theme.accentRgb}, 0.65)`} />
    <path d="M16 36 L24 33 L28 36 L24 39 Z" fill={`rgba(${theme.accentRgb}, 0.65)`} />
  </svg>
);

// ==========================================
// 5. THEME-AWARE INTERACTIVE SPARKLE CANVAS
// ==========================================
const RoyalCelebrationBackground = ({ theme }) => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.3 });
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const motes = Array.from({ length: 82 }, (_, idx) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.4 + 0.85,
      vx: (Math.random() - 0.5) * 0.28,
      vy: -Math.random() * 0.34 - 0.08,
      alpha: Math.random() * 0.7 + 0.25,
      pulse: Math.random() * Math.PI * 2,
      tone: idx % 3, // 0: Accent, 1: Secondary, 2: Silver
      isStar: Math.random() > 0.66,
    }));

    const render = () => {
      const t = themeRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x * canvas.width;
      const my = mouseRef.current.y * canvas.height;

      const radial = ctx.createRadialGradient(
        mx,
        my,
        20,
        mx,
        my,
        Math.max(canvas.width, canvas.height) * 0.6
      );
      radial.addColorStop(0, `rgba(${t.secondaryRgb}, 0.20)`);
      radial.addColorStop(0.45, `rgba(${t.accentRgb}, 0.09)`);
      radial.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < motes.length; i++) {
        const p = motes[i];
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.026;

        if (p.y < -18) {
          p.y = canvas.height + 18;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -18) p.x = canvas.width + 18;
        if (p.x > canvas.width + 18) p.x = -18;

        const currentAlpha = Math.max(0.14, p.alpha + Math.sin(p.pulse) * 0.28);

        for (let j = i + 1; j < motes.length; j++) {
          const p2 = motes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 115) {
            ctx.strokeStyle =
              p.tone === 0
                ? `rgba(${t.accentRgb}, ${(1 - dist / 115) * 0.09})`
                : `rgba(${t.secondaryRgb}, ${(1 - dist / 115) * 0.10})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        if (p.isStar) {
          const s = p.r * 2.6;
          ctx.fillStyle =
            p.tone === 0
              ? `rgba(${t.accentRgb}, ${currentAlpha})`
              : p.tone === 1
              ? `rgba(${t.secondaryRgb}, ${currentAlpha})`
              : `rgba(248, 250, 252, ${currentAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - s);
          ctx.lineTo(p.x + s * 0.28, p.y - s * 0.28);
          ctx.lineTo(p.x + s, p.y);
          ctx.lineTo(p.x + s * 0.28, p.y + s * 0.28);
          ctx.lineTo(p.x, p.y + s);
          ctx.lineTo(p.x - s * 0.28, p.y + s * 0.28);
          ctx.lineTo(p.x - s, p.y);
          ctx.lineTo(p.x - s * 0.28, p.y - s * 0.28);
          ctx.closePath();
          ctx.fill();
        } else {
          const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.3);
          if (p.tone === 0) {
            glow.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
            glow.addColorStop(0.5, `rgba(${t.accentRgb}, ${currentAlpha * 0.52})`);
            glow.addColorStop(1, `rgba(${t.accentRgb}, 0)`);
          } else if (p.tone === 1) {
            glow.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
            glow.addColorStop(0.5, `rgba(${t.secondaryRgb}, ${currentAlpha * 0.52})`);
            glow.addColorStop(1, `rgba(${t.secondaryRgb}, 0)`);
          } else {
            glow.addColorStop(0, `rgba(255, 255, 255, ${currentAlpha})`);
            glow.addColorStop(0.5, `rgba(203, 213, 225, ${currentAlpha * 0.45})`);
            glow.addColorStop(1, 'rgba(203, 213, 225, 0)');
          }
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3.3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

// ==========================================
// 6. CONNECTED VERTICAL EVENT TIMELINE COMPONENT
// ==========================================
const TIMELINE_EVENTS = [
  {
    step: '01',
    title: 'Guest Arrival',
    subtitle: 'Warm Welcome & Greetings',
    timing: 'Timing to be announced',
    icon: Users,
  },
  {
    step: '02',
    title: "Ramu & Beena's Grand Entry",
    subtitle: 'Celebrating Twenty-Five Years Together',
    timing: 'Timing to be announced',
    icon: Crown,
  },
  {
    step: '03',
    title: 'Varmala Ceremony',
    subtitle: 'Exchanging Garlands of Love & Blessings',
    timing: 'Timing to be announced',
    icon: Heart,
  },
  {
    step: '04',
    title: 'Cake Cutting',
    subtitle: 'A Sweet Silver Jubilee Milestone',
    timing: 'Timing to be announced',
    icon: Cake,
  },
  {
    step: '05',
    title: 'Music & Celebration',
    subtitle: 'An Evening of Joy, Rhythm & Togetherness',
    timing: 'Timing to be announced',
    icon: Music,
  },
  {
    step: '06',
    title: 'Dinner',
    subtitle: 'Royal Festive Feast with Family & Friends',
    timing: 'Timing to be announced',
    icon: Utensils,
  },
];

const ConnectedEventTimeline = ({ theme }) => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleNodes, setVisibleNodes] = useState({});

  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const triggerPoint = windowH * 0.62;
      const totalHeight = rect.height;

      const scrolled = triggerPoint - rect.top;
      const pct = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100));
      setScrollProgress(pct);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('[data-timeline-idx]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = entry.target.getAttribute('data-timeline-idx');
            setVisibleNodes((prev) => ({ ...prev, [idx]: true }));
          }
        });
      },
      { threshold: 0.22, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="timeline"
      className="relative z-10 py-24 px-5 border-t"
      style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border mb-4"
            style={{
              borderColor: `rgba(${theme.accentRgb}, 0.35)`,
              backgroundColor: theme.surfaceDeep,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span
              className="text-[11px] uppercase tracking-[0.3em]"
              style={{ color: theme.accent }}
            >
              Celebration Journey
            </span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
            Sequence of Events
          </h2>
          <p
            className="text-xs uppercase tracking-[0.25em] mt-3"
            style={{ color: theme.textMuted }}
          >
            Sunday, 27 December 2026 · Barbil
          </p>
        </div>

        <div ref={containerRef} className="relative py-4">
          {/* Base Track Spine */}
          <div
            className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] rounded-full"
            style={{ backgroundColor: `rgba(${theme.secondaryRgb}, 0.22)` }}
          />

          {/* Progressive Illuminated Beam */}
          <div
            className="absolute top-0 left-6 md:left-1/2 md:-translate-x-1/2 w-[2px] rounded-full transition-all duration-150 ease-out"
            style={{
              height: `${scrollProgress}%`,
              background: theme.timelineGradient,
              boxShadow: theme.timelineGlow,
            }}
          />

          <div className="space-y-10 md:space-y-14">
            {TIMELINE_EVENTS.map((ev, index) => {
              const Icon = ev.icon;
              const isEven = index % 2 === 1;
              const nodeThreshold = ((index + 0.35) / TIMELINE_EVENTS.length) * 100;
              const isLit = scrollProgress >= nodeThreshold || visibleNodes[index];

              return (
                <div
                  key={ev.step}
                  data-timeline-idx={index}
                  className="relative flex items-center md:justify-between"
                >
                  {/* Milestone Node */}
                  <div
                    className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full transition-all duration-700 ${
                      isLit ? 'scale-110' : 'scale-95'
                    }`}
                    style={
                      isLit
                        ? {
                            background: theme.btnGradient,
                            color: theme.btnText,
                            boxShadow: theme.timelineGlow,
                          }
                        : {
                            backgroundColor: theme.bgMid,
                            color: theme.textMuted,
                            border: `1px solid rgba(${theme.secondaryRgb}, 0.35)`,
                          }
                    }
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Desktop Left Card */}
                  <div className="hidden md:block md:w-[44%]">
                    {!isEven && (
                      <div
                        className={`relative p-6 sm:p-7 rounded-2xl royal-themed-card border transition-all duration-700 ${
                          isLit ? 'opacity-100 translate-y-0' : 'opacity-45 translate-y-5'
                        }`}
                        style={{
                          borderColor: isLit
                            ? `rgba(${theme.accentRgb}, 0.45)`
                            : `rgba(${theme.secondaryRgb}, 0.16)`,
                        }}
                      >
                        <span
                          className="hidden md:block absolute top-1/2 -right-8 w-8 h-px transition-colors duration-700"
                          style={{
                            backgroundColor: isLit
                              ? `rgba(${theme.accentRgb}, 0.65)`
                              : `rgba(${theme.secondaryRgb}, 0.25)`,
                          }}
                        />
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                            style={{ color: theme.accent }}
                          >
                            Milestone {ev.step}
                          </span>
                          <span
                            className="px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.18em]"
                            style={{
                              backgroundColor: theme.surfaceDeep,
                              borderColor: `rgba(${theme.secondaryRgb}, 0.28)`,
                              color: theme.textMuted,
                            }}
                          >
                            {ev.timing}
                          </span>
                        </div>
                        <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold">
                          {ev.title}
                        </h3>
                        <p className="text-xs sm:text-sm mt-1" style={{ color: theme.textMuted }}>
                          {ev.subtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Mobile Card + Desktop Right Card */}
                  <div
                    className={`w-full pl-16 md:pl-0 md:w-[44%] ${
                      !isEven ? 'md:invisible md:pointer-events-none' : ''
                    }`}
                  >
                    <div
                      className={`relative p-6 sm:p-7 rounded-2xl royal-themed-card border transition-all duration-700 ${
                        isLit ? 'opacity-100 translate-y-0' : 'opacity-45 translate-y-5'
                      }`}
                      style={{
                        borderColor: isLit
                          ? `rgba(${theme.accentRgb}, 0.45)`
                          : `rgba(${theme.secondaryRgb}, 0.16)`,
                      }}
                    >
                      <span
                        className="absolute top-1/2 -left-5 md:-left-8 w-5 md:w-8 h-px transition-colors duration-700"
                        style={{
                          backgroundColor: isLit
                            ? `rgba(${theme.accentRgb}, 0.65)`
                            : `rgba(${theme.secondaryRgb}, 0.25)`,
                        }}
                      />
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span
                          className="text-[11px] font-semibold uppercase tracking-[0.28em]"
                          style={{ color: theme.accent }}
                        >
                          Milestone {ev.step}
                        </span>
                        <span
                          className="px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.18em]"
                          style={{
                            backgroundColor: theme.surfaceDeep,
                            borderColor: `rgba(${theme.secondaryRgb}, 0.28)`,
                            color: theme.textMuted,
                          }}
                        >
                          {ev.timing}
                        </span>
                      </div>
                      <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold">
                        {ev.title}
                      </h3>
                      <p className="text-xs sm:text-sm mt-1" style={{ color: theme.textMuted }}>
                        {ev.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==========================================
// 7. THEME-AWARE INVITATION CARD GENERATOR (1080x1920)
// ==========================================
const renderRoyalInvitationCanvas = (canvas, theme) => {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  // 1. Dynamic Theme Radial Gradient
  const bgGrad = ctx.createRadialGradient(W / 2, H * 0.34, 60, W / 2, H / 2, H * 0.82);
  bgGrad.addColorStop(0, theme.bgTop);
  bgGrad.addColorStop(0.48, theme.bgMid);
  bgGrad.addColorStop(1, theme.bgBase);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Subtle Indian Jaali Diagonal Lattice
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.045)`;
  ctx.lineWidth = 1;
  for (let offset = -H; offset < W + H; offset += 48) {
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset + H, H);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offset, H);
    ctx.lineTo(offset + H, 0);
    ctx.stroke();
  }

  // 3. Sacred Lotus Mandala Watermark behind Crest
  ctx.save();
  ctx.translate(W / 2, 430);
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.22)`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(0, -165);
    ctx.quadraticCurveTo(22, -230, 0, -282);
    ctx.quadraticCurveTo(-22, -230, 0, -165);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Luminous Theme Sparkles
  for (let i = 0; i < 120; i++) {
    const sx = ((i * 197) % (W - 90)) + 45;
    const sy = ((i * 313) % (H - 90)) + 45;
    const sr = (i % 3) + 1.3;
    ctx.fillStyle =
      i % 3 === 0
        ? `rgba(${theme.accentRgb}, ${0.24 + (i % 4) * 0.08})`
        : i % 3 === 1
        ? `rgba(${theme.secondaryRgb}, ${0.24 + (i % 4) * 0.08})`
        : `rgba(248, 250, 252, ${0.18 + (i % 5) * 0.07})`;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. Metallic Silver + Theme Accent + Secondary Gradient
  const royalMetalGrad = ctx.createLinearGradient(120, 100, W - 120, H - 100);
  royalMetalGrad.addColorStop(0, theme.silverMuted);
  royalMetalGrad.addColorStop(0.28, '#FFFFFF');
  royalMetalGrad.addColorStop(0.52, theme.accent);
  royalMetalGrad.addColorStop(0.76, theme.secondary);
  royalMetalGrad.addColorStop(1, '#94A3B8');

  // Outer Royal Frame
  ctx.strokeStyle = royalMetalGrad;
  ctx.lineWidth = 4;
  ctx.strokeRect(44, 44, W - 88, H - 88);

  // Scalloped Mughal Jharokha Arch Inner Frame
  ctx.save();
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.65)`;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(72, H - 72);
  ctx.lineTo(72, 340);
  ctx.quadraticCurveTo(72, 165, 250, 145);
  ctx.quadraticCurveTo(400, 128, W / 2, 82);
  ctx.quadraticCurveTo(W - 400, 128, W - 250, 145);
  ctx.quadraticCurveTo(W - 72, 165, W - 72, 340);
  ctx.lineTo(W - 72, H - 72);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // 6. Top Blessing Header
  ctx.textAlign = 'center';
  ctx.fillStyle = theme.accent;
  ctx.font = '500 21px Montserrat, sans-serif';
  ctx.fillText('WITH THE BLESSINGS OF ALMIGHTY & ELDERS', W / 2, 198);

  // 7. Silver Jubilee Crest Medallion
  const crestY = 430;
  ctx.fillStyle = theme.surfaceDeep;
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 154, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = royalMetalGrad;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 154, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.68)`;
  ctx.lineWidth = 1.5;
  ctx.setLineDash([6, 7]);
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 172, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Lotus Crown above 25
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.moveTo(W / 2, crestY - 122);
  ctx.quadraticCurveTo(W / 2 + 16, crestY - 102, W / 2, crestY - 90);
  ctx.quadraticCurveTo(W / 2 - 16, crestY - 102, W / 2, crestY - 122);
  ctx.fill();

  ctx.fillStyle = royalMetalGrad;
  ctx.font = '700 122px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('25', W / 2, crestY + 18);

  ctx.font = 'italic 600 42px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('R & B', W / 2, crestY + 86);

  // 8. Invitation Title & Couple Names
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 22px Montserrat, sans-serif';
  ctx.fillText('WE CORDIALLY INVITE YOU TO CELEBRATE THE', W / 2, 685);

  ctx.fillStyle = theme.accent;
  ctx.font = '700 46px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('25TH SILVER JUBILEE CELEBRATION', W / 2, 750);

  // Ornamental Divider
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.58)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(220, 795);
  ctx.lineTo(W - 220, 795);
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 98px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Ramu & Beena', W / 2, 912);

  ctx.font = 'italic 600 76px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = royalMetalGrad;
  ctx.fillText('Agrawal', W / 2, 996);

  // 9. Frosted Royal Details Card
  const cardX = 115;
  const cardY = 1065;
  const cardW = W - 230;
  const cardH = 470;

  ctx.fillStyle = theme.cardMid;
  ctx.fillRect(cardX, cardY, cardW, cardH);
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.50)`;
  ctx.lineWidth = 2;
  ctx.strokeRect(cardX, cardY, cardW, cardH);

  ctx.fillStyle = theme.accent;
  ctx.font = '600 21px Montserrat, sans-serif';
  ctx.fillText('DATE & OCCASION', W / 2, cardY + 74);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 46px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Sunday, 27 December 2026', W / 2, cardY + 130);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '400 25px Montserrat, sans-serif';
  ctx.fillText('25th Wedding Anniversary Celebration', W / 2, cardY + 174);

  ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.32)`;
  ctx.beginPath();
  ctx.moveTo(cardX + 90, cardY + 218);
  ctx.lineTo(cardX + cardW - 90, cardY + 218);
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = '600 21px Montserrat, sans-serif';
  ctx.fillText('VENUE', W / 2, cardY + 276);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 40px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Sitaram Rungta Municipal Town Hall', W / 2, cardY + 330);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '400 25px Montserrat, sans-serif';
  ctx.fillText('Barbil, Odisha', W / 2, cardY + 374);

  // 10. Host & Contact Footer
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 21px Montserrat, sans-serif';
  ctx.fillText('WITH WARM REGARDS FROM', W / 2, 1625);

  ctx.fillStyle = royalMetalGrad;
  ctx.font = 'italic 700 46px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Adarsh, Shradha & the Agrawal Family', W / 2, 1686);

  ctx.fillStyle = theme.secondary;
  ctx.font = '400 20px Montserrat, sans-serif';
  ctx.fillText('RSVP: +91 78548 79210  ·  +91 79785 37640', W / 2, 1744);

  ctx.fillStyle = theme.accent;
  ctx.font = '500 18px Montserrat, sans-serif';
  ctx.fillText('https://ramubeenasilverjubilee.vercel.app/', W / 2, 1802);

  return canvas.toDataURL('image/png');
};

const WhatsAppInviteModal = ({ isOpen, onClose, theme }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const shareMessage = `✨ *25th Silver Jubilee Celebration* ✨

With the blessings of Almighty & Elders, we cordially invite you to celebrate 25 years of togetherness of
*Ramu & Beena Agrawal*

📅 *Date:* Sunday, 27 December 2026
📍 *Venue:* Sitaram Rungta Municipal Town Hall, Barbil, Odisha

🌐 *Digital Invitation:* https://ramubeenasilverjubilee.vercel.app/

With warm regards,
*Adarsh, Shradha & the Agrawal Family* 🙏✨`;

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    const url = renderRoyalInvitationCanvas(canvasRef.current, theme);
    setImageUrl(url);
  }, [isOpen, theme]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.download = 'Ramu-Beena-25th-Silver-Jubilee-Invite.png';
    link.href = imageUrl;
    link.click();
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(shareMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = async () => {
    if (imageUrl && navigator.canShare) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], 'Ramu-Beena-Silver-Jubilee-Invite.png', {
          type: 'image/png',
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Ramu & Beena Agrawal - 25th Silver Jubilee',
            text: shareMessage,
          });
          return;
        }
      } catch {
        // Fallback to wa.me link below
      }
    }
    const encoded = encodeURIComponent(shareMessage);
    window.open(`https://wa.me/?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
    >
      <div
        className="relative w-full max-w-4xl royal-themed-card border rounded-3xl p-6 md:p-8 shadow-2xl overflow-y-auto max-h-[92vh]"
        style={{ borderColor: `rgba(${theme.accentRgb}, 0.4)` }}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border transition hover:opacity-80"
          style={{
            backgroundColor: theme.surfaceDeep,
            borderColor: `rgba(${theme.secondaryRgb}, 0.3)`,
            color: theme.textBody,
          }}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.28em]" style={{ color: theme.accent }}>
            Royal Invitation Card
          </p>
          <h3 className="font-editorial text-3xl md:text-4xl text-white mt-1">
            Download &amp; Share Invitation
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 flex justify-center">
            <canvas ref={canvasRef} className="hidden" />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Ramu and Beena Agrawal 25th Silver Jubilee Invitation"
                className="w-60 sm:w-64 rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                style={{ borderColor: `rgba(${theme.accentRgb}, 0.45)` }}
              />
            )}
          </div>

          <div className="md:col-span-7 space-y-5">
            <p className="text-sm leading-relaxed" style={{ color: theme.textBody }}>
              Save this high-resolution <strong className="text-white">Royal Silver Jubilee Invitation Card</strong> or share it directly with family and friends on WhatsApp.
            </p>

            <div
              className="border rounded-2xl p-4 text-xs whitespace-pre-line font-sans leading-relaxed"
              style={{
                backgroundColor: theme.surfaceDeep,
                borderColor: `rgba(${theme.secondaryRgb}, 0.28)`,
                color: theme.textMuted,
              }}
            >
              {shareMessage}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <button
                onClick={handleDownload}
                className="theme-btn-primary flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download Image
              </button>

              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition shadow-lg"
              >
                <Share2 className="w-4 h-4" />
                Share Image
              </button>

              <button
                onClick={handleCopyText}
                className="flex items-center gap-2 px-4 py-3.5 rounded-full border text-xs uppercase tracking-wider transition hover:opacity-85"
                style={{
                  borderColor: `rgba(${theme.secondaryRgb}, 0.35)`,
                  color: theme.textBody,
                }}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : null}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 8. MAIN SILVER JUBILEE APPLICATION
// ==========================================
export default function App() {
  const [themeKey, setThemeKey] = useState(ACTIVE_THEME_KEY);
  const theme = THEMES[themeKey] || THEMES.sageBlue03;

  const [showLogoReveal, setShowLogoReveal] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [inlineCardUrl, setInlineCardUrl] = useState('');
  const [paletteDrawerOpen, setPaletteDrawerOpen] = useState(false);

  const synthRef = useRef(null);
  const inlineCanvasRef = useRef(null);

  // Apply CSS custom properties whenever theme changes
  useEffect(() => {
    applyThemeToDocument(theme);
    if (inlineCanvasRef.current) {
      const url = renderRoyalInvitationCanvas(inlineCanvasRef.current, theme);
      setInlineCardUrl(url);
    }
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoReveal(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    synthRef.current = new LuxuryAmbientSynth();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  // Days-only countdown to Sunday, 27 December 2026
  useEffect(() => {
    const targetDate = new Date('2026-12-27T00:00:00+05:30').getTime();

    const updateDays = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setDaysLeft(Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    updateDays();
    const timer = setInterval(updateDays, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    if (!synthRef.current) return;
    if (musicOn) {
      synthRef.current.stop();
      setMusicOn(false);
    } else {
      synthRef.current.start();
      setMusicOn(true);
    }
  };

  const handleInlineDownload = () => {
    if (!inlineCardUrl) return;
    const link = document.createElement('a');
    link.download = 'Ramu-Beena-25th-Silver-Jubilee-Invite.png';
    link.href = inlineCardUrl;
    link.click();
  };

  const handleInlineShare = async () => {
    const shareText = `✨ *25th Silver Jubilee Celebration* ✨

With the blessings of Almighty & Elders, we cordially invite you to celebrate 25 years of togetherness of *Ramu & Beena Agrawal*.

📅 *Date:* Sunday, 27 December 2026
📍 *Venue:* Sitaram Rungta Municipal Town Hall, Barbil, Odisha
🌐 *Invitation:* https://ramubeenasilverjubilee.vercel.app/

Warm regards,
*Adarsh, Shradha & the Agrawal Family* 🙏`;

    if (inlineCardUrl && navigator.canShare) {
      try {
        const res = await fetch(inlineCardUrl);
        const blob = await res.blob();
        const file = new File([blob], 'Ramu-Beena-Silver-Jubilee-Invite.png', {
          type: 'image/png',
        });
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Ramu & Beena Agrawal - 25th Silver Jubilee',
            text: shareText,
          });
          return;
        }
      } catch {
        // Fallback to WhatsApp link
      }
    }
    window.open(
      `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const familyContacts = [
    {
      name: 'Adarsh Agrawal',
      relation: 'Son',
      phoneDisplay: '+91 78548 79210',
      phoneRaw: '917854879210',
      telLink: 'tel:+917854879210',
    },
    {
      name: 'Shradha Agrawal',
      relation: 'Daughter',
      phoneDisplay: '+91 79785 37640',
      phoneRaw: '917978537640',
      telLink: 'tel:+917978537640',
    },
  ];

  return (
    <div className="min-h-screen royal-themed-bg text-slate-100 relative overflow-x-hidden transition-colors duration-500">
      {/* Hidden Canvas for Inline Invitation Card */}
      <canvas ref={inlineCanvasRef} className="hidden" />

      {/* Theme-Aware Interactive Sparkle Canvas */}
      <RoyalCelebrationBackground theme={theme} />

      {/* ==========================================
          MAGICAL 1.3s SHOCKWAVE CREST LANDING EFFECT
         ========================================== */}
      {showLogoReveal && (
        <div
          onClick={() => setShowLogoReveal(false)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-xl cursor-pointer animate-splash-fade"
          style={{ backgroundColor: theme.surfaceDeep }}
        >
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 w-56 h-56 rounded-full border animate-shockwave"
            style={{
              borderColor: `rgba(${theme.secondaryRgb}, 0.65)`,
              boxShadow: `0 0 50px rgba(${theme.secondaryRgb}, 0.6)`,
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 w-40 h-40 rounded-full border animate-shockwave"
            style={{
              animationDelay: '0.18s',
              borderColor: `rgba(${theme.accentRgb}, 0.75)`,
              boxShadow: `0 0 40px rgba(${theme.accentRgb}, 0.55)`,
            }}
          />

          <div className="animate-magical-crest relative flex flex-col items-center text-center px-6">
            <IndianSilverJubileeCrest
              theme={theme}
              className="w-36 h-36 md:w-44 md:h-44 mb-4"
            />
            <p
              className="text-xs uppercase tracking-[0.38em]"
              style={{ color: theme.accent }}
            >
              Ramu &amp; Beena Agrawal
            </p>
            <p
              className="font-editorial italic text-xl mt-1"
              style={{ color: theme.textMuted }}
            >
              25th Silver Jubilee
            </p>
          </div>
        </div>
      )}

      {/* ==========================================
          STICKY LUXURY NAVIGATION HEADER
         ========================================== */}
      <header
        className="sticky top-0 z-30 backdrop-blur-xl border-b transition-colors duration-500"
        style={{
          backgroundColor: theme.headerBg,
          borderColor: `rgba(${theme.accentRgb}, 0.22)`,
        }}
      >
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5">
            <span className="font-editorial text-xl md:text-2xl font-bold liquid-silver-text tracking-wider">
              R &amp; B · XXV
            </span>
          </a>

          <nav
            className="hidden md:flex items-center gap-7 text-xs uppercase tracking-[0.22em]"
            style={{ color: theme.textMuted }}
          >
            <a href="#glance" className="hover:text-white transition">At a Glance</a>
            <a href="#timeline" className="hover:text-white transition">Events</a>
            <a href="#venue" className="hover:text-white transition">Venue</a>
            <a href="#contacts" className="hover:text-white transition">Family Contacts</a>
            <a href="#invitation-card" className="hover:text-white transition">Invite Card</a>
          </nav>

          <div className="flex items-center gap-2">
            {/* Quick Theme Switcher Button for Live Previewing */}
            <div className="relative">
              <button
                onClick={() => setPaletteDrawerOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs uppercase tracking-wider transition hover:opacity-90"
                style={{
                  borderColor: `rgba(${theme.secondaryRgb}, 0.35)`,
                  backgroundColor: theme.surfaceDeep,
                  color: theme.secondary,
                }}
                title="Preview Color Themes"
              >
                <Palette className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Theme</span>
              </button>

              {paletteDrawerOpen && (
                <div
                  className="absolute right-0 mt-2.5 w-72 rounded-2xl border p-3 shadow-2xl z-50 backdrop-blur-xl"
                  style={{
                    backgroundColor: theme.bgMid,
                    borderColor: `rgba(${theme.accentRgb}, 0.4)`,
                  }}
                >
                  <p
                    className="text-[10px] uppercase tracking-[0.24em] px-2 pb-2 border-b mb-2"
                    style={{
                      color: theme.accent,
                      borderColor: `rgba(${theme.secondaryRgb}, 0.2)`,
                    }}
                  >
                    Live Color Preview (Edit src/theme.js)
                  </p>
                  <div className="space-y-1.5">
                    {Object.entries(THEMES).map(([key, t]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setThemeKey(key);
                          setPaletteDrawerOpen(false);
                        }}
                        className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left text-xs transition hover:bg-white/10"
                        style={{
                          backgroundColor:
                            themeKey === key ? 'rgba(255,255,255,0.09)' : 'transparent',
                          color: themeKey === key ? '#FFFFFF' : theme.textBody,
                        }}
                      >
                        <span className="truncate font-medium">{t.label}</span>
                        <span className="flex items-center gap-1 shrink-0">
                          <span
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: t.bgTop }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: t.secondary }}
                          />
                          <span
                            className="w-3 h-3 rounded-full border border-white/30"
                            style={{ backgroundColor: t.accent }}
                          />
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setInviteModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs uppercase tracking-wider transition hover:opacity-90"
              style={{
                borderColor: `rgba(${theme.accentRgb}, 0.42)`,
                backgroundColor: theme.surfaceDeep,
                color: theme.accent,
              }}
            >
              <Share2 className="w-3.5 h-3.5" style={{ color: theme.accent }} />
              <span>Share Invite</span>
            </button>

            <button
              onClick={toggleMusic}
              className="p-2.5 rounded-full border transition hover:opacity-90"
              style={{
                borderColor: `rgba(${theme.secondaryRgb}, 0.28)`,
                backgroundColor: theme.surfaceDeep,
                color: theme.textBody,
              }}
              title={musicOn ? 'Mute Music' : 'Play Festive Ambience'}
              aria-label="Toggle Background Music"
            >
              {musicOn ? (
                <Volume2 className="w-4 h-4" style={{ color: theme.accent }} />
              ) : (
                <VolumeX className="w-4 h-4 opacity-65" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==========================================
          MAIN ROYAL INDIAN HERO + SURROUNDING ORNAMENTS + DAYS COUNTDOWN
         ========================================== */}
      <section className="relative z-10 pt-10 pb-24 md:pt-14 md:pb-28 px-4 sm:px-6 overflow-hidden">
        {/* Top Sacred Garland / Toran Divider */}
        <div className="max-w-5xl mx-auto mb-8 flex items-center justify-center gap-4 opacity-95">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(${theme.secondaryRgb}, 0.5), rgba(${theme.accentRgb}, 0.75))`,
            }}
          />
          <div
            className="flex items-center gap-2.5 px-5 py-1.5 rounded-full border"
            style={{
              borderColor: `rgba(${theme.accentRgb}, 0.35)`,
              backgroundColor: theme.surfaceDeep,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span
              className="text-[10px] sm:text-[11px] uppercase tracking-[0.34em]"
              style={{ color: theme.accent }}
            >
              With Blessings of Almighty &amp; Elders
            </span>
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
          </div>
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(270deg, transparent, rgba(${theme.secondaryRgb}, 0.5), rgba(${theme.accentRgb}, 0.75))`,
            }}
          />
        </div>

        {/* Left & Right Flanking Mandalas */}
        <SacredLotusMandala
          theme={theme}
          className="pointer-events-none hidden lg:block absolute -left-44 top-1/2 w-[520px] h-[520px] opacity-70 animate-mandala-slow"
        />
        <SacredLotusMandala
          theme={theme}
          className="pointer-events-none hidden lg:block absolute -right-44 top-1/2 w-[520px] h-[520px] opacity-70 animate-mandala-reverse"
        />

        {/* Center Hero Sacred Mandala Halo */}
        <SacredLotusMandala
          theme={theme}
          className="pointer-events-none absolute left-1/2 top-[38%] w-[560px] h-[560px] md:w-[860px] md:h-[860px] opacity-90 animate-mandala-slow"
        />

        <div className="max-w-4xl mx-auto relative animate-hero-rise">
          {/* Scalloped Royal Jharokha Arch Frame */}
          <div
            className="relative rounded-t-[160px] sm:rounded-t-[230px] rounded-b-[2.25rem] royal-themed-card border px-6 pt-14 pb-12 sm:px-14 sm:pt-16 sm:pb-14 text-center backdrop-blur-xl"
            style={{ borderColor: `rgba(${theme.accentRgb}, 0.38)` }}
          >
            {/* Inner Double Filigree Arch */}
            <div
              className="pointer-events-none absolute inset-3 rounded-t-[150px] sm:rounded-t-[220px] rounded-b-[1.75rem] border"
              style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.22)` }}
            />

            {/* Bottom Corner Lotus Filigrees */}
            <RoyalCornerFiligree
              theme={theme}
              className="pointer-events-none absolute bottom-3 left-3 w-20 h-20 sm:w-28 sm:h-28 -rotate-90 opacity-90"
            />
            <RoyalCornerFiligree
              theme={theme}
              className="pointer-events-none absolute bottom-3 right-3 w-20 h-20 sm:w-28 sm:h-28 rotate-180 opacity-90"
            />

            <p
              className="text-[11px] sm:text-xs uppercase tracking-[0.34em] mb-5"
              style={{ color: theme.accent }}
            >
              Celebrating 25 Years of Togetherness
            </p>

            <IndianSilverJubileeCrest
              theme={theme}
              className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6"
            />

            <p
              className="text-xs uppercase tracking-[0.32em] mb-3"
              style={{ color: theme.textMuted }}
            >
              Silver Jubilee Anniversary of
            </p>

            <h1 className="font-editorial text-5xl sm:text-7xl md:text-[5.25rem] font-bold liquid-silver-text tracking-tight leading-[1.04]">
              Ramu &amp; Beena
              <span className="block italic font-semibold text-4xl sm:text-6xl md:text-7xl mt-1 text-white">
                Agrawal
              </span>
            </h1>

            {/* Ornamental Lotus Divider */}
            <div className="flex items-center justify-center gap-4 my-7 max-w-md mx-auto">
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${theme.accentRgb}, 0.65), rgba(${theme.secondaryRgb}, 0.85))`,
                }}
              />
              <div
                className="w-2.5 h-2.5 rotate-45 border"
                style={{
                  borderColor: theme.accent,
                  backgroundColor: theme.bgMid,
                }}
              />
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(270deg, transparent, rgba(${theme.accentRgb}, 0.65), rgba(${theme.secondaryRgb}, 0.85))`,
                }}
              />
            </div>

            <p
              className="font-editorial italic text-xl sm:text-2xl max-w-2xl mx-auto leading-relaxed mb-8"
              style={{ color: theme.textBody }}
            >
              “With heartfelt joy, we invite you and your family to grace the 25th Wedding Anniversary Celebration of Ramu &amp; Beena Agrawal.”
            </p>

            {/* Celebration Date Pill */}
            <div
              className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-5 px-6 py-3.5 rounded-full border mb-9"
              style={{
                backgroundColor: theme.surfaceDeep,
                borderColor: `rgba(${theme.accentRgb}, 0.38)`,
              }}
            >
              <span
                className="flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide"
                style={{ color: theme.accent }}
              >
                <Calendar className="w-4 h-4" style={{ color: theme.accent }} />
                Sunday, 27 December 2026
              </span>
              <span className="hidden sm:inline" style={{ color: theme.secondary }}>
                •
              </span>
              <span
                className="flex items-center gap-2 text-xs sm:text-sm"
                style={{ color: theme.textBody }}
              >
                <MapPin className="w-4 h-4" style={{ color: theme.secondary }} />
                Barbil, Odisha
              </span>
            </div>

            {/* Days-Only Countdown Medallion */}
            <div className="max-w-xs mx-auto mb-10">
              <div
                className="relative py-5 px-8 rounded-3xl border shadow-[0_15px_40px_rgba(0,0,0,0.85)] animate-diya-glow"
                style={{
                  background: `linear-gradient(180deg, ${theme.bgTop} 0%, ${theme.bgBase} 100%)`,
                  borderColor: `rgba(${theme.accentRgb}, 0.42)`,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.32em] mb-1"
                  style={{ color: theme.accent }}
                >
                  Countdown to the Celebration
                </p>
                <div className="font-editorial text-5xl sm:text-6xl font-bold liquid-silver-text leading-none my-1">
                  {daysLeft}
                </div>
                <p
                  className="text-xs uppercase tracking-[0.3em] mt-1"
                  style={{ color: theme.textMuted }}
                >
                  {daysLeft === 1 ? 'Day to Go' : 'Days to Go'}
                </p>
              </div>
            </div>

            {/* Primary Action CTAs (Preserving Save the Date Redirect) */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://ramubeenasilverjubilee.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-btn-primary flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-xs uppercase tracking-[0.22em] hover:scale-[1.03] transition shadow-xl"
              >
                <Calendar className="w-4 h-4" />
                Save the Date
              </a>

              <a
                href="#invitation-card"
                className="flex items-center gap-2.5 px-8 py-4 rounded-full border font-medium text-xs uppercase tracking-[0.22em] transition hover:opacity-90"
                style={{
                  borderColor: `rgba(${theme.accentRgb}, 0.42)`,
                  backgroundColor: theme.surfaceDeep,
                  color: theme.textPrimary,
                }}
              >
                <Download className="w-4 h-4" style={{ color: theme.accent }} />
                View Invitation Card
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          THE EVENING AT A GLANCE
         ========================================== */}
      <section
        id="glance"
        className="relative z-10 py-20 px-5 border-t"
        style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.34em] mb-2"
              style={{ color: theme.accent }}
            >
              Celebration Overview
            </p>
            <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
              The Evening at a Glance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="p-8 rounded-3xl royal-themed-card border text-center"
              style={{ borderColor: `rgba(${theme.accentRgb}, 0.3)` }}
            >
              <div
                className="w-12 h-12 mx-auto mb-5 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: theme.surfaceDeep,
                  borderColor: `rgba(${theme.accentRgb}, 0.38)`,
                  color: theme.accent,
                }}
              >
                <Calendar className="w-5 h-5" />
              </div>
              <p
                className="text-[11px] uppercase tracking-[0.28em] mb-2"
                style={{ color: theme.accent }}
              >
                Date
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold mb-1.5">
                Sunday, 27 December 2026
              </h3>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: theme.textMuted }}
              >
                Timing to be announced
              </p>
            </div>

            <div
              className="p-8 rounded-3xl royal-themed-card border text-center"
              style={{ borderColor: `rgba(${theme.accentRgb}, 0.3)` }}
            >
              <div
                className="w-12 h-12 mx-auto mb-5 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: theme.surfaceDeep,
                  borderColor: `rgba(${theme.accentRgb}, 0.38)`,
                  color: theme.accent,
                }}
              >
                <Crown className="w-5 h-5" />
              </div>
              <p
                className="text-[11px] uppercase tracking-[0.28em] mb-2"
                style={{ color: theme.accent }}
              >
                Occasion
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold mb-1.5">
                25th Silver Jubilee
              </h3>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: theme.textMuted }}
              >
                Ramu &amp; Beena Agrawal
              </p>
            </div>

            <div
              className="p-8 rounded-3xl royal-themed-card border text-center"
              style={{ borderColor: `rgba(${theme.accentRgb}, 0.3)` }}
            >
              <div
                className="w-12 h-12 mx-auto mb-5 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: theme.surfaceDeep,
                  borderColor: `rgba(${theme.accentRgb}, 0.38)`,
                  color: theme.accent,
                }}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <p
                className="text-[11px] uppercase tracking-[0.28em] mb-2"
                style={{ color: theme.accent }}
              >
                Venue
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold mb-1.5">
                Sitaram Rungta Municipal Town Hall
              </h3>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: theme.textMuted }}
              >
                Barbil, Odisha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CONNECTED VERTICAL EVENT TIMELINE
         ========================================== */}
      <ConnectedEventTimeline theme={theme} />

      {/* ==========================================
          VENUE SECTION WITH GOOGLE MAPS & DIRECTIONS
         ========================================== */}
      <section
        id="venue"
        className="relative z-10 py-20 px-5 border-t"
        style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
      >
        <div className="max-w-5xl mx-auto">
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center royal-themed-card border rounded-3xl p-6 md:p-10"
            style={{ borderColor: `rgba(${theme.accentRgb}, 0.32)` }}
          >
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
                Celebration Venue
              </p>
              <h2 className="font-editorial text-3xl md:text-4xl text-white font-semibold leading-tight">
                Sitaram Rungta Municipal Town Hall
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                Barbil, District Keonjhar, Odisha
              </p>

              <div className="pt-2">
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=Sitaram+Rungta+Municipal+Town+Hall+Barbil+Odisha"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="theme-btn-primary inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div
              className="lg:col-span-7 h-72 md:h-80 rounded-2xl overflow-hidden border shadow-inner"
              style={{ borderColor: `rgba(${theme.accentRgb}, 0.32)` }}
            >
              <iframe
                title="Sitaram Rungta Municipal Town Hall Barbil Map"
                src="https://www.google.com/maps?q=Sitaram+Rungta+Municipal+Town+Hall+Barbil+Odisha&output=embed"
                className="w-full h-full border-0 contrast-110 opacity-95"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          FAMILY CONTACTS SECTION
         ========================================== */}
      <section
        id="contacts"
        className="relative z-10 py-20 px-5 border-t"
        style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs uppercase tracking-[0.34em] mb-2"
              style={{ color: theme.accent }}
            >
              Warm Hospitality &amp; Assistance
            </p>
            <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
              Family Contacts
            </h2>
            <p className="text-sm mt-2" style={{ color: theme.textMuted }}>
              For travel assistance, directions, or any queries, feel free to reach out to us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {familyContacts.map((person) => (
              <div
                key={person.phoneRaw}
                className="p-7 rounded-3xl royal-themed-card border flex flex-col justify-between gap-6"
                style={{ borderColor: `rgba(${theme.accentRgb}, 0.32)` }}
              >
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.25em] mb-3"
                    style={{
                      backgroundColor: `rgba(${theme.accentRgb}, 0.12)`,
                      borderColor: `rgba(${theme.accentRgb}, 0.32)`,
                      color: theme.accent,
                    }}
                  >
                    {person.relation}
                  </span>
                  <h3 className="font-editorial text-3xl text-white font-semibold">
                    {person.name}
                  </h3>
                  <p className="text-sm mt-1 tracking-wide" style={{ color: theme.textMuted }}>
                    {person.phoneDisplay}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={person.telLink}
                    className="theme-btn-primary flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>

                  <a
                    href={`https://wa.me/${person.phoneRaw}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          DEDICATED INVITATION IMAGE DOWNLOAD & SHARE SECTION
         ========================================== */}
      <section
        id="invitation-card"
        className="relative z-10 py-20 px-5 border-t"
        style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
      >
        <div
          className="max-w-4xl mx-auto royal-themed-card border rounded-3xl p-6 sm:p-10"
          style={{ borderColor: `rgba(${theme.accentRgb}, 0.35)` }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex justify-center">
              {inlineCardUrl && (
                <img
                  src={inlineCardUrl}
                  alt="Ramu & Beena Agrawal Silver Jubilee Invitation Card"
                  className="w-60 sm:w-64 rounded-2xl border shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  style={{ borderColor: `rgba(${theme.accentRgb}, 0.45)` }}
                />
              )}
            </div>

            <div className="md:col-span-7 text-center md:text-left space-y-5">
              <p className="text-xs uppercase tracking-[0.32em]" style={{ color: theme.accent }}>
                Official Digital Keepsake
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl liquid-silver-text font-semibold leading-tight">
                Invitation Card
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                Download the invitation card to your phone or share it directly with family and friends on WhatsApp.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 pt-2">
                <button
                  onClick={handleInlineDownload}
                  className="theme-btn-primary flex items-center gap-2 px-6 py-3.5 rounded-full font-semibold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </button>

                <button
                  onClick={handleInlineShare}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600/95 hover:bg-emerald-500 text-white font-medium text-xs uppercase tracking-wider transition shadow-lg"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Image</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          ROYAL CLOSING FOOTER
         ========================================== */}
      <footer
        className="relative z-10 pt-20 pb-28 md:pb-20 px-5 border-t text-center"
        style={{ borderColor: `rgba(${theme.secondaryRgb}, 0.16)` }}
      >
        <div className="max-w-2xl mx-auto">
          <IndianSilverJubileeCrest theme={theme} className="w-24 h-24 mx-auto mb-5 opacity-95" />
          <p
            className="font-editorial italic text-2xl md:text-3xl leading-relaxed mb-6"
            style={{ color: theme.textBody }}
          >
            “Your presence and blessings will make this Silver Jubilee milestone truly unforgettable.”
          </p>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: theme.accent }}
          >
            Warmly Hosted By
          </p>
          <p className="font-editorial text-3xl liquid-silver-text font-semibold">
            Adarsh, Shradha &amp; the Agrawal Family
          </p>
        </div>
      </footer>

      {/* ==========================================
          MOBILE FLOATING CONCIERGE BAR
         ========================================== */}
      <div className="fixed bottom-4 inset-x-4 z-40 md:hidden">
        <div
          className="max-w-md mx-auto flex items-center justify-around py-2.5 px-3 rounded-full border backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.95)]"
          style={{
            backgroundColor: theme.surfaceDeep,
            borderColor: `rgba(${theme.accentRgb}, 0.35)`,
          }}
        >
          <a
            href="https://ramubeenasilverjubilee.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="theme-btn-primary flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wider"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Save Date</span>
          </a>

          <a
            href="#timeline"
            className="flex items-center gap-1.5 px-2.5 py-2 text-[11px] uppercase tracking-wider text-white"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span>Events</span>
          </a>

          <a
            href="#contacts"
            className="flex items-center gap-1.5 px-2.5 py-2 text-[11px] uppercase tracking-wider text-white"
          >
            <Phone className="w-3.5 h-3.5" style={{ color: theme.accent }} />
            <span>Contact</span>
          </a>
        </div>
      </div>

      {/* WhatsApp Invitation Modal */}
      <WhatsAppInviteModal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        theme={theme}
      />
    </div>
  );
}
