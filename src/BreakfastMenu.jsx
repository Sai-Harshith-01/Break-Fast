import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FOOD_DATA = [
  {
    id: 'dosa', name: 'Dosa', emoji: '🫓', srcIcon: 'https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/dosa_rfk9gb.png',
    storyVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972922/dosa-story_okxjkg.mp4', cookingVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972922/dosa_bfd9jb.mp4',
    hasSteam: true, cx: '48%', cy: '46%', rotate: '-4deg', emojis: ['🥞', '🔥', '🍽️']
  },
  {
    id: 'idly', name: 'Idly', emoji: '🍚', srcIcon: 'https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/idly_smpqa1.png',
    storyVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972923/idly-story_z78nva.mp4', cookingVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/idly_t4h1nj.mp4',
    hasSteam: true, cx: '34%', cy: '60%', rotate: '0deg', emojis: ['🍚', '🥥', '🍽️']
  },
  {
    id: 'vada', name: 'Vada', emoji: '🍩', srcIcon: 'https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972837/vada_xuvin9.png',
    storyVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972928/vada-story_pgy1nt.mp4', cookingVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972928/vada_whmp6j.mp4',
    hasSteam: false, cx: '24%', cy: '46%', rotate: '-5deg', emojis: ['🍩', '🔥', '🍽️']
  },
  {
    id: 'pongal', name: 'Pongal', emoji: '🥣', srcIcon: 'https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/pongal_wns13u.png',
    storyVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/pongal-story_bc73y2.mp4', cookingVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/pongal_r6avqy.mp4',
    hasSteam: true, cx: '64%', cy: '62%', rotate: '3deg', emojis: ['🍲', '🧈', '🍽️']
  },
  {
    id: 'tea', name: 'Tea', emoji: '☕', srcIcon: 'https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/tea_w6a2pq.png',
    storyVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972925/tea-story_h7uxip.mp4', cookingVideo: 'https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972924/tea_u7ya9y.mp4',
    hasSteam: true, cx: '76%', cy: '38%', rotate: '4deg', emojis: ['☕', '🌿']
  },
];

function Steam() {
  return (
    <div className="steam-wrap">
      {[26, 22, 18].map((h, i) => (
        <div key={i} className="steam-wisp" style={{ height: h, animationDelay: `${i * 0.7}s` }} />
      ))}
    </div>
  );
}

function ModalVideoPlayer({ food, onClose }) {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleVideoEnd = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>✕</button>
        <video
          src={food.cookingVideo}
          autoPlay
          controls={!showCelebration}
          playsInline
          className="modal-video"
          onEnded={handleVideoEnd}
        />
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="celebration-msg"
            >
              Yummy! 🍽️😋
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function StorySection({ food, isActive, isModalOpen, onDishClick }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Play video if section is active AND modal is not open
    if (isActive && !isModalOpen) {
      v.play().catch(e => console.log('Autoplay prevented:', e));
    } else {
      v.pause();
    }
  }, [isActive, isModalOpen]);

  return (
    <section id={food.id} className="scroll-section">
      <motion.div
        initial={{ opacity: 0.3 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="story-bg-video"
      >
        <video
          ref={videoRef}
          src={food.storyVideo}
          muted
          loop
          playsInline
          preload="none"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
      <motion.div
        className="story-vignette"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="story-content">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="story-title"
        >
          {food.name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="story-subtitle"
        >
          Experience the cinematic origin of {food.name}
        </motion.p>
      </div>

      <div className="story-center-item">
        <motion.div
          className="dish-icon-container"
          initial={{ y: 80, opacity: 0, scale: 0.85 }}
          whileInView={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.35 }}
          viewport={{ once: false, amount: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDishClick(food)}
        >
          <div className="pulsing-ring" />
          {food.hasSteam && <Steam />}
          <img src={food.srcIcon} alt={food.name} className="center-dish-icon" />
          <div className="watch-btn-hint">▶ Watch Cooking</div>
        </motion.div>
      </div>
    </section>
  );
}

export default function BreakfastMenu() {
  const [activeFoodModal, setActiveFoodModal] = useState(null);
  const [visibleSection, setVisibleSection] = useState('hero');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll('.scroll-section');
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      key="menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="story-container"
    >
      {/* Hero Section */}
      <section id="hero" className="scroll-section">
        <video
          src="https://res.cloudinary.com/dvprlv7uy/video/upload/v1772972921/banana_leaf_lqx5iy.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="story-bg-video bg-static"
        />
        <div className="story-vignette" style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.85) 100%)' }} />

        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="hero-title"
          >
            Ammaas Tiffin
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="hero-tagline"
          >
            <span className="tagline-line"></span>
            Made with Granny's Love
            <span className="tagline-line"></span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="scroll-indicator"
        >
          <div className="scroll-text">Scroll to Experience</div>
          <div className="scroll-arrow">↓</div>
        </motion.div>
      </section>

      {/* Story Sections */}
      {FOOD_DATA.map((food) => (
        <StorySection
          key={food.id}
          food={food}
          isActive={visibleSection === food.id}
          isModalOpen={!!activeFoodModal}
          onDishClick={setActiveFoodModal}
        />
      ))}

      {/* Video Modal */}
      <AnimatePresence>
        {activeFoodModal && (
          <ModalVideoPlayer food={activeFoodModal} onClose={() => setActiveFoodModal(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
