import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EMOJI = { Dosa: '🫓', Idly: '🍚', Vada: '🍩', Tea: '☕', Upma: '🥣', Puri: '🫔' }

const COLORS = {
  Dosa: { primary: '#b45309', secondary: '#fef3c7', text: '#92400e', glow: 'rgba(180,83,9,0.35)' },
  Idly: { primary: '#15803d', secondary: '#dcfce7', text: '#14532d', glow: 'rgba(21,128,61,0.32)' },
  Vada: { primary: '#c2410c', secondary: '#fed7aa', text: '#7c2d12', glow: 'rgba(194,65,12,0.32)' },
  Tea: { primary: '#7e22ce', secondary: '#f3e8ff', text: '#4a044e', glow: 'rgba(126,34,206,0.32)' },
  Upma: { primary: '#a16207', secondary: '#fefce8', text: '#713f12', glow: 'rgba(161,98,7,0.32)' },
  Puri: { primary: '#be123c', secondary: '#fff1f2', text: '#881337', glow: 'rgba(190,18,60,0.32)' },
}

const VIDEO_URLS = {
  Dosa: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972922/dosa_bfd9jb.mp4',
  Idly: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/idly_t4h1nj.mp4',
  Vada: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972928/vada_whmp6j.mp4',
  Tea: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/tea_u7ya9y.mp4',
  Pongal: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/pongal_r6avqy.mp4',
}


/* ── Confetti celebration ── */
function Confetti({ colors }) {
  const pieces = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${(i / 18) * 100}%`,
    color: [colors.primary, colors.secondary, '#22c55e', '#fbbf24', '#f472b6'][i % 5],
    size: Math.sin(i * 137.5) * 5 + 8,
    delay: (i % 5) * 0.1,
    dur: 0.85 + (i % 3) * 0.25,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            position: 'absolute', top: 0,
            left: p.left,
            width: p.size, height: p.size,
            background: p.color,
            borderRadius: 2,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            transform: `rotate(${p.id * 20}deg)`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Video‑player modal ── */
function VideoModal({ item, colors, onClose }) {
  const videoRef = useRef(null)
  const [phase, setPhase] = useState('video') // 'video' | 'ready'
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    const handleEnd = () => {
      setPhase('ready')
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2200)
    }
    vid.addEventListener('ended', handleEnd)
    // fallback
    const fallback = setTimeout(handleEnd, 11000)
    return () => { vid.removeEventListener('ended', handleEnd); clearTimeout(fallback) }
  }, [item])

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="modal-backdrop"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        key="modal-card"
        initial={{ scale: 0.78, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.82, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 160, damping: 18 }}
        className="modal-card"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 20,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', fontSize: '1.1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.28)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          ✕
        </button>

        {/* Back to menu link */}
        <motion.button
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          onClick={onClose}
          style={{
            position: 'absolute', top: 14, left: 14, zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 16px', borderRadius: 999,
            background: 'rgba(255,255,255,0.12)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: 'rgba(255,255,255,0.80)',
            fontFamily: "'Outfit', sans-serif", fontSize: '0.78rem', fontWeight: 500,
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.22)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.80)'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
        >
          ← Back
        </motion.button>

        {/* Status chip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            position: 'absolute', top: 14, left: '50%',
            transform: 'translateX(-50%)', zIndex: 20,
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 999,
            background: 'rgba(255,255,255,0.10)',
            border: '1px solid rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{
            width: 9, height: 9, borderRadius: '50%',
            background: colors.primary,
            boxShadow: `0 0 8px ${colors.primary}`,
            animation: 'pulse 1.4s ease-in-out infinite',
          }} />
          <span style={{
            fontFamily: "'Outfit', sans-serif",
            color: 'rgba(255,255,255,0.72)', fontSize: '0.72rem',
          }}>
            {phase === 'video' ? 'Preparing...' : 'Ready! 🎉'}
          </span>
        </motion.div>

        {/* ── VIDEO PHASE ── */}
        <AnimatePresence mode="wait">
          {phase === 'video' && (
            <motion.div
              key="video-phase"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.06, opacity: 0 }}
              transition={{ duration: 0.45 }}
              style={{ padding: '4.5rem 1.5rem 1.5rem' }}
            >
              {/* Title */}
              <motion.div
                initial={{ y: -16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ textAlign: 'center', marginBottom: '1.2rem' }}
              >
                <span style={{ fontSize: '2.6rem' }}>{EMOJI[item]}</span>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: 'clamp(1.3rem, 3.5vw, 1.9rem)',
                  color: colors.primary,
                  marginTop: '0.4rem',
                }}>
                  Preparing your {item}…
                </h2>
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(255,255,255,0.50)', fontSize: '0.85rem',
                  marginTop: '0.2rem',
                }}>
                  Watch the magic happen ✨
                </p>
              </motion.div>

              {/* Video */}
              <div style={{
                borderRadius: 20, overflow: 'hidden',
                border: `2px solid ${colors.primary}50`,
                boxShadow: `0 0 40px ${colors.glow}`,
                position: 'relative',
              }}>
                {/* Corner accents */}
                {[
                  { top: 0, left: 0 },
                  { top: 0, right: 0 },
                  { bottom: 0, left: 0 },
                  { bottom: 0, right: 0 },
                ].map((pos, i) => (
                  <div
                    key={i}
                    style={{
                      position: 'absolute', ...pos,
                      width: 32, height: 32, zIndex: 10, pointerEvents: 'none',
                      background: `radial-gradient(circle at ${pos.left !== undefined ? '0% 50%' : '100% 50%'}, ${colors.primary}70, transparent 70%)`,
                    }}
                  />
                ))}
                <video
                  ref={videoRef}
                  src={VIDEO_URLS[item] || `/videos/${item.toLowerCase()}.mp4`}
                  autoPlay
                  muted
                  playsInline
                  style={{ width: '100%', display: 'block', maxHeight: '55vh', objectFit: 'cover' }}
                />
                {/* scan lines */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.025) 2px, rgba(0,0,0,0.025) 4px)',
                }} />
              </div>

              {/* Progress bar */}
              <div style={{
                marginTop: '1rem', height: 3, width: '100%',
                background: 'rgba(255,255,255,0.10)', borderRadius: 999, overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 9, ease: 'linear' }}
                  style={{
                    height: '100%', borderRadius: 999,
                    background: `linear-gradient(90deg, ${colors.primary}, #22c55e)`,
                  }}
                />
              </div>
            </motion.div>
          )}

          {/* ── READY PHASE ── */}
          {phase === 'ready' && (
            <motion.div
              key="ready-phase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                position: 'relative',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '1.5rem',
                padding: '4rem 2rem 2.5rem',
                textAlign: 'center',
              }}
            >
              {showConfetti && <Confetti colors={colors} />}

              {/* Glow rings */}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {[1, 2, 3].map(k => (
                  <div
                    key={k}
                    className="pulse-ring"
                    style={{
                      position: 'absolute',
                      width: 120 + k * 42, height: 120 + k * 42,
                      borderRadius: '50%',
                      background: `${colors.primary}${['22', '14', '09'][k - 1]}`,
                      animationDelay: `${(k - 1) * 0.42}s`,
                    }}
                  />
                ))}
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  style={{
                    position: 'relative', zIndex: 10,
                    width: 120, height: 120, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.secondary}, #fff)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 12px 40px ${colors.glow}, 0 0 0 3px ${colors.primary}25`,
                  }}
                >
                  <span style={{ fontSize: '3.5rem' }}>{EMOJI[item]}</span>
                </motion.div>
              </div>

              {/* Ready text */}
              <div className="bounce-in">
                <p style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(255,255,255,0.55)', fontSize: '1rem',
                  marginBottom: '0.4rem',
                }}>
                  Your order is ready!
                </p>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2.4rem, 6vw, 4rem)',
                  lineHeight: 1.1,
                  background: `linear-gradient(135deg, ${colors.primary}, #22c55e, ${colors.primary})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: `drop-shadow(0 0 28px ${colors.primary}70)`,
                }}>
                  Your {item}<br />is Ready!
                </h2>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'rgba(255,255,255,0.48)',
                  fontSize: '0.9rem', maxWidth: 340,
                }}
              >
                Freshly prepared just for you ✨
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ display: 'flex', gap: '1rem' }}
              >
                <button
                  onClick={onClose}
                  style={{
                    padding: '10px 24px', borderRadius: 999,
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                    fontSize: '0.85rem', cursor: 'pointer',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    color: '#fff', backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.20)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
                >
                  ← Order More
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: '10px 24px', borderRadius: 999,
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                    fontSize: '0.85rem', cursor: 'pointer',
                    background: `linear-gradient(135deg, ${colors.primary}, #22c55e)`,
                    border: 'none', color: '#fff',
                    boxShadow: `0 6px 24px ${colors.glow}`,
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Enjoy! 🎉
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

/* ══ FoodPreparation – wraps the modal ══ */
export default function FoodPreparation({ item, onBack }) {
  const colors = COLORS[item]

  return (
    <AnimatePresence>
      <VideoModal
        key={item}
        item={item}
        colors={colors}
        onClose={onBack}
      />
    </AnimatePresence>
  )
}
