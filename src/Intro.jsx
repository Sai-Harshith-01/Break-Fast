import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── Floating leaf particle ── */
const seededRand = (seed) => {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

function Particle({ i }) {
  const left = seededRand(i * 7.3) * 96 + 2
  const top = seededRand(i * 3.11) * 80 + 20 // start a bit lower
  const size = seededRand(i * 13.7) * 12 + 14
  const dur = seededRand(i * 5.21) * 4 + 4 // 4-8s duration
  const delay = seededRand(i * 2.99) * 2 // 0-2s delay
  const dy = -(seededRand(i * 8.1) * 60 + 60) // negative y for moving up
  const dx = (seededRand(i * 6.3) - 0.5) * 40
  const rot = (seededRand(i * 4.5) - 0.5) * 60

  return (
    <motion.span
      style={{
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        fontSize: size,
        pointerEvents: 'none',
        zIndex: 10,
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) opacity(0.8)',
      }}
      initial={{ opacity: 0, y: 0, x: 0, rotate: 0, scale: 0.8 }}
      animate={{
        opacity: [0, 0.9, 0],
        y: [0, dy],
        x: [0, dx],
        rotate: [0, rot],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{ duration: dur, delay: delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      🌿
    </motion.span>
  )
}

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('playing') // 'playing' -> 'out'
  const bellAudio = useRef(null)

  useEffect(() => {
    // Audio initialization
    bellAudio.current = new Audio('https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972878/bell_upx7sw.ogg')
    bellAudio.current.volume = 0.5

    // Play soft temple bell shortly after sunrise begins
    const bellTimer = setTimeout(() => {
      bellAudio.current?.play().catch(e => console.log('Audio play prevented:', e))
    }, 1200)

    // Trigger smooth fade out
    const outTimer = setTimeout(() => {
      setPhase('out')
    }, 5800)

    // Unmount and hand off to main website
    const doneTimer = setTimeout(() => {
      onDone()
    }, 7000)

    return () => {
      clearTimeout(bellTimer)
      clearTimeout(outTimer)
      clearTimeout(doneTimer)
      bellAudio.current?.pause()
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {(phase === 'playing' || phase === 'out') && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === 'out' ? 0 : 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            backgroundColor: '#020617' // dark early morning sky base
          }}
        >
          {/* Main Landscape Background. Dark dawn to bright morning, with Ken Burns zoom */}
          <motion.div
            style={{
              position: 'absolute',
              inset: -20, // Negative inset to allow zoom without showing edges
              backgroundImage: `url('https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972837/village_sunrise_yazasz.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 0,
            }}
            initial={{
              filter: 'brightness(0.15) sepia(0.3) contrast(1.2)',
              scale: 1.0
            }}
            animate={{
              filter: 'brightness(1.1) sepia(0) contrast(1.0)',
              scale: 1.15
            }}
            transition={{ duration: 7, ease: 'easeOut' }}
          />

          {/* Soft Mist Atmosphere Overlay */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(255,255,255,0.4) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 1,
              mixBlendMode: 'screen',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 5, ease: 'easeOut' }}
          />

          {/* Warm Sun slowly rising behind coconut trees */}
          <motion.div
            style={{
              position: 'absolute',
              width: '120vw', height: '120vw',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.6) 0%, rgba(234, 100, 12, 0.3) 25%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
            initial={{ y: '70%', opacity: 0, scale: 0.8 }}
            animate={{ y: '-25%', opacity: 1, scale: 1.1 }}
            transition={{ duration: 6, ease: 'easeOut' }}
          />

          {/* Floating Leaves */}
          {Array.from({ length: 24 }).map((_, i) => <Particle key={i} i={i} />)}

          {/* Foreground Text Container */}
          <div style={{ position: 'relative', zIndex: 20 }}>
            <motion.div
              style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              {/* Soft warm glow behind text */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '180vw', height: '180vh',
                  background: 'radial-gradient(ellipse, rgba(251, 191, 36, 0.25) 0%, transparent 50%)',
                  pointerEvents: 'none',
                  zIndex: -1,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 4, ease: 'easeOut', delay: 0.5 }}
              />

              <div style={{ overflow: 'hidden', padding: '10px 0' }}>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    fontWeight: 900,
                    margin: '0',
                    background: 'linear-gradient(170deg, #fbbf24 0%, #f97316 50%, #9a3412 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 8px 25px rgba(249, 115, 22, 0.4)) drop-shadow(0 4px 10px rgba(0,0,0,0.8))',
                    lineHeight: 1.1,
                    letterSpacing: '0.02em',
                  }}
                >
                  Ammaas Tiffin
                </motion.h1>
              </div>

              {/* Subtitle fading in shortly after the title arrives */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.2, ease: "easeOut" }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '0.5rem',
                }}
              >
                <div style={{ height: '1px', width: '40px', background: 'linear-gradient(90deg, transparent, #fef3c7)' }} />
                <p
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                    color: '#fef3c7',
                    letterSpacing: '0.05em',
                    fontWeight: 500,
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)',
                    margin: 0,
                  }}
                >
                  Made with Granny's Love
                </p>
                <div style={{ height: '1px', width: '40px', background: 'linear-gradient(-90deg, transparent, #fef3c7)' }} />
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Invitation bouncing at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 4.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              bottom: '8vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 30,
              pointerEvents: 'none'
            }}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{
                color: '#86efac',
                fontSize: '1.5rem',
                fontWeight: 300,
                textShadow: '0 2px 5px rgba(0,0,0,0.8)'
              }}>↓</span>
              <span style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 2px 5px rgba(0,0,0,0.9)'
              }}>
                Scroll to Explore
              </span>
            </motion.div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
