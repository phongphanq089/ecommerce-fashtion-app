/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/refs */
'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

// ─── Countdown Timer ──────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return time;
}

// ─── Countdown Block ──────────────────────────────────────────────────────────
function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="
          relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28
          flex items-center justify-center
          rounded-xl border border-white/10
          bg-white/5 backdrop-blur-sm
          shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
          overflow-hidden
          group
        "
      >
        {/* Glow accent */}
        <div className="absolute inset-0 bg-linear-to-b from-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <span
          className="
            relative z-10 font-mono text-3xl sm:text-4xl md:text-5xl
            font-bold tracking-tight
            bg-linear-to-b from-white to-white/60
            bg-clip-text text-transparent
          "
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/40 font-medium">
        {label}
      </span>
    </div>
  );
}

// ─── Particle dot ─────────────────────────────────────────────────────────────
function Particle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-amber-300/20 blur-sm animate-pulse"
      style={style}
    />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ComingSoonPage() {
  // Launch date: 3 months from now

  const launchDate = useRef(
    new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  ).current;
  const { days, hours, minutes, seconds } = useCountdown(launchDate);

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [particles] = useState(() =>
    Array.from({ length: 12 }, (_, i) => ({
      id: i,
      style: {
        width: `${Math.random() * 6 + 2}px`,
        height: `${Math.random() * 6 + 2}px`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${Math.random() * 4 + 3}s`,
        opacity: Math.random() * 0.4 + 0.1,
      } as React.CSSProperties,
    })),
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#080808]">
      {/* ── Background image ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/coming-soon-bg.png"
          alt="Background"
          fill
          priority
          className="object-cover object-center opacity-30"
        />
        {/* Deep dark vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />
        {/* Radial center glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(180,130,60,0.06),transparent)]" />
      </div>

      {/* ── Floating particles ──────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <Particle key={p.id} style={p.style} />
        ))}
      </div>

      {/* ── Thin gold horizontal line (top) ─────────────────── */}
      <div className="absolute top-0 left-0 right-0 h-px  bg-linear-to-r from-transparent via-amber-400/40 to-transparent z-10" />

      {/* ── Main content ─────────────────────────────────────── */}
      <main className="relative z-10 flex flex-col items-center text-center px-6 py-20 max-w-2xl w-full mx-auto gap-12">
        {/* Brand wordmark */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            {/* Decorative diamond */}
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
            <span className="text-xs tracking-[0.4em] uppercase text-amber-400/80 font-medium">
              Ecommerce
            </span>
            <div className="w-1.5 h-1.5 rotate-45 bg-amber-400" />
          </div>
          <h1
            className="
              font-mono text-5xl sm:text-6xl md:text-7xl lg:text-8xl
              font-bold tracking-tight leading-none
              bg-linear-to-b from-white via-white/90 to-white/50
              bg-clip-text text-transparent
              drop-shadow-[0_0_60px_rgba(255,220,120,0.15)]
            "
          >
            FAUVETTE
          </h1>
          <div className="w-24 h-px bg-linear-to-r from-transparent via-amber-400/60 to-transparent mt-1" />
        </div>

        {/* Tagline */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-lg sm:text-xl text-white/60 font-light tracking-wide leading-relaxed max-w-sm">
            A new era of fashion is arriving.
            <br />
            <span className="text-white/40 text-base">
              Curated. Refined. Timeless.
            </span>
          </p>
        </div>

        {/* Countdown */}
        <div className="flex items-start gap-3 sm:gap-5">
          <CountdownBlock value={days} label="Days" />
          <div className="text-white/20 text-3xl sm:text-4xl font-thin mt-5 sm:mt-6">
            :
          </div>
          <CountdownBlock value={hours} label="Hours" />
          <div className="text-white/20 text-3xl sm:text-4xl font-thin mt-5 sm:mt-6">
            :
          </div>
          <CountdownBlock value={minutes} label="Mins" />
          <div className="text-white/20 text-3xl sm:text-4xl font-thin mt-5 sm:mt-6">
            :
          </div>
          <CountdownBlock value={seconds} label="Secs" />
        </div>

        {/* Email subscription */}
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          {!submitted ? (
            <>
              <p className="text-sm text-white/40 tracking-wider">
                Be the first to know when we launch.
              </p>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col sm:flex-row gap-2"
                noValidate
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError('');
                  }}
                  placeholder="your@email.com"
                  className="
                    flex-1 h-12 px-4 rounded-xl text-sm
                    bg-white/5 border border-white/10
                    text-white placeholder:text-white/20
                    outline-none focus:border-amber-400/40
                    focus:bg-white/8 transition-all duration-300
                    backdrop-blur-sm
                  "
                />
                <button
                  type="submit"
                  className="
                    h-12 px-6 rounded-xl text-sm font-medium tracking-wider
                     bg-linear-to-r from-amber-500 to-amber-400
                    text-black hover:from-amber-400 hover:to-amber-300
                    transition-all duration-300
                    shadow-[0_0_20px_rgba(251,191,36,0.25)]
                    hover:shadow-[0_0_32px_rgba(251,191,36,0.4)]
                    whitespace-nowrap
                  "
                >
                  Notify Me
                </button>
              </form>
              {error && (
                <p className="text-red-400/80 text-xs tracking-wide">{error}</p>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 px-8 rounded-2xl bg-white/5 border border-amber-400/20">
              <div className="w-8 h-8 rounded-full bg-amber-400/10 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-white/70 tracking-wide">
                You&apos;re on the list!
              </p>
              <p className="text-xs text-white/30">
                We&apos;ll notify you the moment we launch.
              </p>
            </div>
          )}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-6">
          {[
            {
              label: 'Instagram',
              href: '#',
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              ),
            },
            {
              label: 'Pinterest',
              href: '#',
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              ),
            },
            {
              label: 'TikTok',
              href: '#',
              icon: (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              ),
            },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="
                w-10 h-10 rounded-full flex items-center justify-center
                border border-white/10 text-white/30
                hover:border-amber-400/40 hover:text-amber-400/80
                transition-all duration-300
                hover:shadow-[0_0_16px_rgba(251,191,36,0.15)]
              "
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-xs text-white/20 tracking-widest uppercase">
          &copy; {new Date().getFullYear()} Fauvette. All rights reserved.
        </p>
      </main>

      {/* ── Thin gold horizontal line (bottom) ──────────────── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-400/30 to-transparent z-10" />
    </div>
  );
}
