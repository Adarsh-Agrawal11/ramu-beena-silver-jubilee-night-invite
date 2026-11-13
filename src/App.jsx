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

const CUSTOM_LOGO_SRC = '/logo.png'; // Set to null to keep the built-in crest
const SITE_URL = 'https://ramubeena-25th.vercel.app/';

// ==========================================
// 1. AMBIENT ROYAL CELEBRATION SYNTHESIZER
// ==========================================
// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (AUTO-PAUSE ON TAB SWITCH / HOME)
// ==========================================
// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (AUTO-PLAY ON FIRST CLICK & AUTO-PAUSE)
// ==========================================
// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (AUTOPLAY & TAB-SWITCH AUTO-PAUSE)
// ==========================================
// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (SYNCED WITH REACT STATE)
// ==========================================

// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (BULLETPROOF AUTOPLAY & SYNC)
// ==========================================
// ==========================================
// 1. UNIVERSAL AUDIO PLAYER (PAUSE ON TAB SWITCH, NO AUTO-RESUME)
// ==========================================
class UniversalAudioPlayer {
  constructor(onStateChange) {
    this.audio = new Audio('/song.mp3');
    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.volume = 0.28;
    this.audio.muted = false;

    this.userExplicitlyStopped = false;
    this.hasAutoStarted = false;
    this.onStateChange = onStateChange;

    // 1. Instant unlock on any first user interaction anywhere on the document
    this.handleFirstInteraction = async () => {
      if (!this.hasAutoStarted && !this.userExplicitlyStopped) {
        try {
          this.audio.muted = false;
          await this.audio.play();
          this.hasAutoStarted = true;
          this.onStateChange?.(true);
          this.removeInteractionListeners();
        } catch (error) {
          console.log('Autoplay waiting for interaction:', error);
        }
      }
    };

    this.addInteractionListeners();

    // 2. Pause when switching tabs, minimizing, or hitting home screen (NO auto-resume)
    this.handleVisibilityChange = () => {
      if (document.hidden && !this.audio.paused) {
        this.audio.pause();
        this.onStateChange?.(false);
      }
    };

    this.handlePageHide = () => {
      if (!this.audio.paused) {
        this.audio.pause();
        this.onStateChange?.(false);
      }
    };

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    window.addEventListener('pagehide', this.handlePageHide);

    // 3. Try immediate autoplay on page load/reload
    this.tryAutoplay();
  }

  addInteractionListeners() {
    ['click', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
      document.addEventListener(event, this.handleFirstInteraction, { passive: true, once: true });
    });
  }

  removeInteractionListeners() {
    ['click', 'touchstart', 'keydown', 'scroll'].forEach((event) => {
      document.removeEventListener(event, this.handleFirstInteraction);
    });
  }

  async tryAutoplay() {
    if (this.userExplicitlyStopped) return;
    try {
      await this.audio.play();
      this.hasAutoStarted = true;
      this.onStateChange?.(true);
      this.removeInteractionListeners();
    } catch (error) {
      this.onStateChange?.(false);
    }
  }

  stop() {
    this.userExplicitlyStopped = true;
    this.audio.pause();
    this.audio.currentTime = 0;
    this.onStateChange?.(false);
  }

  async unmute() {
    this.userExplicitlyStopped = false;
    this.audio.muted = false;
    try {
      await this.audio.play();
      this.hasAutoStarted = true;
      this.onStateChange?.(true);
    } catch (error) {
      console.log('Could not resume audio:', error);
      this.onStateChange?.(false);
    }
  }

  destroy() {
    this.removeInteractionListeners();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('pagehide', this.handlePageHide);
    this.audio.pause();
    this.audio.src = '';
  }
}
// ==========================================
// 2. THEME-AWARE INDIAN ROYAL LOTUS & SILVER JUBILEE CREST
// ==========================================
const IndianSilverJubileeCrest = ({ theme, className = 'w-32 h-32' }) => {
  if (CUSTOM_LOGO_SRC) {
    return (
      <img
        src={CUSTOM_LOGO_SRC}
        alt="Ramu & Beena Agrawal Silver Jubilee Crest"
        className={`${className} object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.65)]`}
      />
    );
  }

  return (
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
};

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
      tone: idx % 3,
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
    subtitle: 'A Royal Welcome with Warmth & Festive Cheer',
    timing: 'Timing to be announced',
    icon: Users,
  },
  {
    step: '02',
    title: "Ramu & Beena's Grand Entry",
    subtitle: 'Welcoming the Couple of the Hour · 25 Years Strong',
    timing: 'Timing to be announced',
    icon: Crown,
  },
  {
    step: '03',
    title: 'Varmala Ceremony',
    subtitle: 'Renewing Vows with Garlands of Love & Eternal Grace',
    timing: 'Timing to be announced',
    icon: Heart,
  },
  {
    step: '04',
    title: 'Ring Exchange',
    subtitle: 'Sealing Twenty-Five Years of Love with Timeless Rings',
    timing: 'Timing to be announced',
    icon: Sparkles,
  },
  {
    step: '05',
    title: 'Cake Cutting',
    subtitle: 'Toasting a Sweet Silver Milestone Surrounded by Loved Ones',
    timing: 'Timing to be announced',
    icon: Cake,
  },
  {
    step: '06',
    title: 'Music & Celebration',
    subtitle: 'An Enchanting Evening of Melodies, Laughter & Dance',
    timing: 'Timing to be announced',
    icon: Music,
  },
  {
    step: '07',
    title: 'Dinner',
    subtitle: 'A Grand Festive Feast Crafted for Loved Ones',
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
              The Evening Unfolds
            </span>
          </div>
          <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
            Here&apos;s What&apos;s in Store
          </h2>
          <p
            className="text-sm mt-3 max-w-xl mx-auto"
            style={{ color: theme.textMuted }}
          >
            From the first welcome to the final celebration, here&apos;s how the evening will unfold.
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
const renderRoyalInvitationCanvas = async (canvas, theme) => {
  const ctx = canvas.getContext('2d');
  const W = 1080;
  const H = 1920;
  canvas.width = W;
  canvas.height = H;

  // Helper: Rounded rectangle path
  const roundRectPath = (x, y, w, h, r) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  // Helper: Draw 4-point star sparkle
  const drawSparkle = (cx, cy, size, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size * 0.26, cy - size * 0.26);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx + size * 0.26, cy + size * 0.26);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size * 0.26, cy + size * 0.26);
    ctx.lineTo(cx - size, cy);
    ctx.lineTo(cx - size * 0.26, cy - size * 0.26);
    ctx.closePath();
    ctx.fill();
  };

  // 1. Rich Multi-Layered Royal Velvet Background
  const bgGrad = ctx.createRadialGradient(W / 2, H * 0.26, 40, W / 2, H * 0.5, H * 0.88);
  bgGrad.addColorStop(0, theme.bgTop);
  bgGrad.addColorStop(0.45, theme.bgMid);
  bgGrad.addColorStop(1, theme.bgBase);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Warm Ambient Halo behind Crest & Couple Names
  const crestGlow = ctx.createRadialGradient(W / 2, 430, 10, W / 2, 430, 420);
  crestGlow.addColorStop(0, `rgba(${theme.accentRgb}, 0.22)`);
  crestGlow.addColorStop(0.55, `rgba(${theme.secondaryRgb}, 0.09)`);
  crestGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = crestGlow;
  ctx.fillRect(0, 0, W, H);

  const nameGlow = ctx.createRadialGradient(W / 2, 920, 20, W / 2, 920, 460);
  nameGlow.addColorStop(0, `rgba(${theme.secondaryRgb}, 0.14)`);
  nameGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = nameGlow;
  ctx.fillRect(0, 450, W, 900);

  // 2. Delicate Indian Jaali Lattice Texture
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.04)`;
  ctx.lineWidth = 1;
  for (let offset = -H; offset < W + H; offset += 54) {
    ctx.beginPath();
    ctx.moveTo(offset, 0);
    ctx.lineTo(offset + H, H);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(offset, H);
    ctx.lineTo(offset + H, 0);
    ctx.stroke();
  }

  // 3. Intricate Double-Layer Sacred Lotus Mandala behind Crest
  ctx.save();
  ctx.translate(W / 2, 435);
  for (let i = 0; i < 24; i++) {
    ctx.rotate((Math.PI * 2) / 24);
    ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.24)`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -168);
    ctx.quadraticCurveTo(26, -242, 0, -298);
    ctx.quadraticCurveTo(-26, -242, 0, -168);
    ctx.stroke();

    ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.18)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -210);
    ctx.quadraticCurveTo(18, -268, 0, -328);
    ctx.quadraticCurveTo(-18, -268, 0, -210);
    ctx.stroke();
  }
  ctx.restore();

  // 4. Shimmering Starlight & Bokek Motes
  for (let i = 0; i < 95; i++) {
    const sx = ((i * 197 + 61) % (W - 110)) + 55;
    const sy = ((i * 313 + 89) % (H - 110)) + 55;
    if (i % 4 === 0) {
      drawSparkle(
        sx,
        sy,
        (i % 3) * 3 + 5,
        i % 8 === 0 ? `rgba(${theme.accentRgb}, 0.55)` : `rgba(${theme.secondaryRgb}, 0.45)`
      );
    } else {
      ctx.fillStyle =
        i % 3 === 0
          ? `rgba(${theme.accentRgb}, 0.32)`
          : `rgba(248, 250, 252, 0.24)`;
      ctx.beginPath();
      ctx.arc(sx, sy, (i % 2) + 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 5. Metallic Champagne-Silver-Sapphire Gradient
  const royalMetalGrad = ctx.createLinearGradient(120, 80, W - 120, H - 80);
  royalMetalGrad.addColorStop(0, theme.silverMuted);
  royalMetalGrad.addColorStop(0.25, '#FFFFFF');
  royalMetalGrad.addColorStop(0.5, theme.accent);
  royalMetalGrad.addColorStop(0.78, theme.secondary);
  royalMetalGrad.addColorStop(1, '#CBD5E1');

  // Outer Double Royal Frame
  ctx.strokeStyle = royalMetalGrad;
  ctx.lineWidth = 4;
  ctx.strokeRect(42, 42, W - 84, H - 84);

  ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.32)`;
  ctx.lineWidth = 1.2;
  ctx.strokeRect(54, 54, W - 108, H - 108);

  // Sculpted Mughal Jharokha Arch Frame
  ctx.save();
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.72)`;
  ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(74, H - 74);
  ctx.lineTo(74, 345);
  ctx.quadraticCurveTo(74, 165, 255, 142);
  ctx.quadraticCurveTo(405, 124, W / 2, 76);
  ctx.quadraticCurveTo(W - 405, 124, W - 255, 142);
  ctx.quadraticCurveTo(W - 74, 165, W - 74, 345);
  ctx.lineTo(W - 74, H - 74);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();

  // Bottom Corner Lotus Rosette Ornaments
  [
    [118, H - 118],
    [W - 118, H - 118],
  ].forEach(([cx, cy]) => {
    ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.45)`;
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(cx, cy, 22, 0, Math.PI * 2);
    ctx.stroke();
    drawSparkle(cx, cy, 11, `rgba(${theme.accentRgb}, 0.7)`);
  });

  // 6. Top Blessing Pill Banner
  ctx.textAlign = 'center';
  roundRectPath(W / 2 - 370, 210, 740, 46, 23);
  ctx.fillStyle = theme.surfaceDeep;
  ctx.fill();
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.42)`;
  ctx.lineWidth = 1.4;
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = '600 18px Montserrat, sans-serif';
  ctx.fillText('WITH THE GRACE OF THE ALMIGHTY & BLESSINGS OF OUR ELDERS', W / 2, 239);

  // 7. Royal Silver Jubilee Crest Medallion
  const crestY = 435;
  const medallionGrad = ctx.createRadialGradient(W / 2, crestY - 40, 20, W / 2, crestY, 162);
  medallionGrad.addColorStop(0, theme.bgTop);
  medallionGrad.addColorStop(1, theme.surfaceDeep);
  ctx.fillStyle = medallionGrad;
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 158, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = royalMetalGrad;
  ctx.lineWidth = 4.5;
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 158, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.72)`;
  ctx.lineWidth = 1.6;
  ctx.setLineDash([6, 7]);
  ctx.beginPath();
  ctx.arc(W / 2, crestY, 178, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (CUSTOM_LOGO_SRC) {
    await new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(W / 2, crestY, 146, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, W / 2 - 146, crestY - 146, 292, 292);
        ctx.restore();
        resolve();
      };
      img.onerror = resolve;
      img.src = CUSTOM_LOGO_SRC;
    });
  } else {
    // Royal Lotus Crown above 25
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.moveTo(W / 2, crestY - 126);
    ctx.quadraticCurveTo(W / 2 + 18, crestY - 104, W / 2, crestY - 90);
    ctx.quadraticCurveTo(W / 2 - 18, crestY - 104, W / 2, crestY - 126);
    ctx.fill();

    ctx.fillStyle = royalMetalGrad;
    ctx.font = '700 126px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('25', W / 2, crestY + 18);

    // Fine Line & Diamond inside Crest
    ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.55)`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 76, crestY + 38);
    ctx.lineTo(W / 2 - 12, crestY + 38);
    ctx.moveTo(W / 2 + 12, crestY + 38);
    ctx.lineTo(W / 2 + 76, crestY + 38);
    ctx.stroke();
    drawSparkle(W / 2, crestY + 38, 7, theme.accent);

    ctx.font = 'italic 600 42px "Cormorant Garamond", Georgia, serif';
    ctx.fillText('R & B', W / 2, crestY + 92);
  }

  // 8. Invitation Title, Couple Names & Poetic Verse
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 21px Montserrat, sans-serif';
  ctx.fillText('HONORING TWENTY-FIVE GOLDEN YEARS OF', W / 2, 682);

  ctx.fillStyle = theme.accent;
  ctx.font = '700 46px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('25TH SILVER JUBILEE CELEBRATION', W / 2, 745);

  // Ornamental Diamond Divider
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.62)`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(210, 786);
  ctx.lineTo(W / 2 - 24, 786);
  ctx.moveTo(W / 2 + 24, 786);
  ctx.lineTo(W - 210, 786);
  ctx.stroke();
  drawSparkle(W / 2, 786, 11, theme.accent);

  // Couple Names
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 104px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Ramu & Beena', W / 2, 902);

  ctx.font = 'italic 600 78px "Cormorant Garamond", Georgia, serif';
  ctx.fillStyle = royalMetalGrad;
  ctx.fillText('Agrawal', W / 2, 984);

  // Poetic Invitation Line
  ctx.fillStyle = theme.textBody;
  ctx.font = 'italic 500 29px "Cormorant Garamond", Georgia, serif';
  ctx.fillText(
    '“Join us for an evening of blessings, music, and joyous togetherness”',
    W / 2,
    1046
  );

  // 9. Rounded Frosted Royal Details Card
  const cardX = 116;
  const cardY = 1094;
  const cardW = W - 232;
  const cardH = 472;

  roundRectPath(cardX, cardY, cardW, cardH, 34);
  ctx.fillStyle = theme.cardMid;
  ctx.fill();
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.55)`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner subtle border inside card
  roundRectPath(cardX + 12, cardY + 12, cardW - 24, cardH - 24, 24);
  ctx.strokeStyle = `rgba(${theme.secondaryRgb}, 0.22)`;
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = theme.accent;
  ctx.font = '600 20px Montserrat, sans-serif';
  ctx.fillText('DATE & TIME', W / 2, cardY + 74);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 48px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Sunday, 27 December 2026', W / 2, cardY + 132);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '400 24px Montserrat, sans-serif';
  ctx.fillText('Evening · Exact timing to follow', W / 2, cardY + 176);

  // Card Center Divider with Star
  ctx.strokeStyle = `rgba(${theme.accentRgb}, 0.35)`;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(cardX + 95, cardY + 224);
  ctx.lineTo(W / 2 - 20, cardY + 224);
  ctx.moveTo(W / 2 + 20, cardY + 224);
  ctx.lineTo(cardX + cardW - 95, cardY + 224);
  ctx.stroke();
  drawSparkle(W / 2, cardY + 224, 8, theme.accent);

  ctx.fillStyle = theme.accent;
  ctx.font = '600 20px Montserrat, sans-serif';
  ctx.fillText('CELEBRATION VENUE', W / 2, cardY + 282);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 42px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('Sitaram Rungta Municipal Town Hall', W / 2, cardY + 338);

  ctx.fillStyle = theme.textMuted;
  ctx.font = '400 25px Montserrat, sans-serif';
  ctx.fillText('Barbil, District Keonjhar, Odisha', W / 2, cardY + 384);

  // 10. Clean Host & RSVP Footer (No Website URL on Card Image)
  ctx.fillStyle = theme.textMuted;
  ctx.font = '500 21px Montserrat, sans-serif';
  ctx.fillText('WITH WARM REGARDS,', W / 2, 1654);

  ctx.fillStyle = royalMetalGrad;
  ctx.font = 'italic 700 54px "Cormorant Garamond", Georgia, serif';
  ctx.fillText('The Agrawal Family', W / 2, 1720);

  ctx.fillStyle = theme.secondary;
  ctx.font = '500 21px Montserrat, sans-serif';
  ctx.fillText('RSVP: +91 78548 79210   ·   +91 79785 37640', W / 2, 1782);

  return canvas.toDataURL('image/png');
};

const WhatsAppInviteModal = ({ isOpen, onClose, theme }) => {
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const shareMessage = `✨ *25th Silver Jubilee Invitation* ✨

With the Grace of the Almighty & Blessings of Our Elders, we warmly invite you and your family to celebrate 25 golden years of
*Ramu & Beena Agrawal*

📅 *Date:* Sunday, 27 December 2026
📍 *Venue:* Sitaram Rungta Municipal Town Hall, Barbil, Odisha

🌐 *Digital Invitation:* ${SITE_URL}

With warm regards,
*The Agrawal Family* 🙏✨`;

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;
    renderRoyalInvitationCanvas(canvasRef.current, theme).then(setImageUrl);
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
            url: SITE_URL,
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
            A Keepsake to Cherish
          </p>
          <h3 className="font-editorial text-3xl md:text-4xl text-white mt-1">
            Save &amp; Share the Invite
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
              Download the official <strong className="text-white">Silver Jubilee Invitation Card</strong> to your device or share it effortlessly with loved ones on WhatsApp.
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
  const theme = THEMES[themeKey] || THEMES.royalSapphire;

  const [showLogoReveal, setShowLogoReveal] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [inlineCardUrl, setInlineCardUrl] = useState('');
  const [paletteDrawerOpen, setPaletteDrawerOpen] = useState(false);

  const synthRef = useRef(null);
  const inlineCanvasRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogoReveal(false);
    }, 1300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Apply CSS custom properties whenever theme changes
  useEffect(() => {
    applyThemeToDocument(theme);
    if (inlineCanvasRef.current) {
      renderRoyalInvitationCanvas(inlineCanvasRef.current, theme).then(setInlineCardUrl);
    }
  }, [theme]);

  useEffect(() => {
  const player = new UniversalAudioPlayer((isPlaying) => {
    setMusicOn(isPlaying);
  });

  synthRef.current = player;

  return () => {
    player.destroy();
    if (synthRef.current === player) {
      synthRef.current = null;
    }
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

  const toggleMusic = async () => {
  if (!synthRef.current) return;

  if (musicOn) {
    synthRef.current.stop();
    setMusicOn(false);
  } else {
    await synthRef.current.unmute();
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
    const shareText = `✨ *25th Silver Jubilee Invitation* ✨

With the Grace of the Almighty & Blessings of Our Elders, we warmly invite you and your family to celebrate 25 golden years of *Ramu & Beena Agrawal*.

📅 *Date:* Sunday, 27 December 2026
📍 *Venue:* Sitaram Rungta Municipal Town Hall, Barbil, Odisha
🌐 *Invitation:* ${SITE_URL}

With warm regards,
*The Agrawal Family* 🙏`;

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
            url: SITE_URL,
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
              With the Grace of the Almighty &amp; Blessings of Our Elders
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
              A Quarter Century of Love, Devotion &amp; Grace
            </p>

            <IndianSilverJubileeCrest
              theme={theme}
              className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-6"
            />

            <p
              className="text-xs uppercase tracking-[0.32em] mb-3"
              style={{ color: theme.textMuted }}
            >
              Honoring Twenty-Five Golden Years of
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
              “Twenty-five years of shared dreams, quiet strength, and unwavering love—join us as we celebrate the Silver Jubilee of Ramu &amp; Beena Agrawal with an evening of joy, blessings, and togetherness.”
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
            <div className="max-w-sm mx-auto mb-10">
              <div
                className="relative py-5 px-8 rounded-3xl border shadow-[0_15px_40px_rgba(0,0,0,0.85)] animate-diya-glow"
                style={{
                  background: `linear-gradient(180deg, ${theme.bgTop} 0%, ${theme.bgBase} 100%)`,
                  borderColor: `rgba(${theme.accentRgb}, 0.42)`,
                }}
              >
                <p
                  className="text-[10px] uppercase tracking-[0.28em] mb-1"
                  style={{ color: theme.accent }}
                >
                  The Big Day Is Almost Here!
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
                <p
                  className="text-[11px] italic mt-2"
                  style={{ color: theme.textBody }}
                >
                  One special evening. A celebration worth dressing up for.
                </p>
              </div>
            </div>

            {/* Primary Action CTAs */}
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
              The Celebration
            </p>
            <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
              An Evening Woven in Silver &amp; Grace
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
                Date &amp; Time
              </p>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-semibold mb-1.5">
                Sunday, 27 December 2026
              </h3>
              <p
                className="text-xs uppercase tracking-[0.2em]"
                style={{ color: theme.textMuted }}
              >
                Evening · Exact timing to follow
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
                The Celebration Awaits
              </p>
              <h2 className="font-editorial text-3xl md:text-4xl text-white font-semibold leading-tight">
                We&apos;ll See You There!
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                <strong className="text-white">Sitaram Rungta Municipal Town Hall</strong> · Barbil, District Keonjhar, Odisha — Your destination for an evening of festivities.
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
              Here to Help
            </p>
            <h2 className="font-editorial text-4xl md:text-5xl liquid-silver-text font-semibold">
              Need Any Assistance?
            </h2>
            <p className="text-sm mt-2" style={{ color: theme.textMuted }}>
              For directions, travel help or any queries, we&apos;re just a call away.
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
                A Keepsake to Cherish
              </p>
              <h2 className="font-editorial text-3xl sm:text-5xl liquid-silver-text font-semibold leading-tight">
                Save &amp; Share the Invite
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                Download the official Silver Jubilee invitation card to your device or share it effortlessly with loved ones on WhatsApp.
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
            className="text-xs uppercase tracking-[0.3em] mb-1.5"
            style={{ color: theme.accent }}
          >
            25 Years. Still Going Strong.
          </p>
          <p className="font-editorial text-3xl text-white font-semibold mb-4">
            Ramu &amp; Beena
          </p>
          <p
            className="font-editorial italic text-2xl md:text-3xl leading-relaxed mb-6"
            style={{ color: theme.textBody }}
          >
            “Some occasions become unforgettable because of the people who celebrate them with us.”
          </p>
          <p
            className="text-xs uppercase tracking-[0.3em] mb-2"
            style={{ color: theme.accent }}
          >
            With warm regards,
          </p>
          <p className="font-editorial text-3xl liquid-silver-text font-semibold">
            The Agrawal Family
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