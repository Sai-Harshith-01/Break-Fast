import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOOD_DATA = [
  {
    id: "dosa",
    name: "Dosa",
    srcIcon:
      "https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/dosa_rfk9gb.png",
    storyVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972922/dosa-story_okxjkg.mp4",
    cookingVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972922/dosa_bfd9jb.mp4",
  },
  {
    id: "idly",
    name: "Idly",
    srcIcon:
      "https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/idly_smpqa1.png",
    storyVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972923/idly-story_z78nva.mp4",
    cookingVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972924/idly_t4h1nj.mp4",
  },
  {
    id: "vada",
    name: "Vada",
    srcIcon:
      "https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972837/vada_xuvin9.png",
    storyVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972928/vada-story_pgy1nt.mp4",
    cookingVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972928/vada_whmp6j.mp4",
  },
  {
    id: "pongal",
    name: "Pongal",
    srcIcon:
      "https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/pongal_wns13u.png",
    storyVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972924/pongal-story_bc73y2.mp4",
    cookingVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972924/pongal_r6avqy.mp4",
  },
  {
    id: "tea",
    name: "Tea",
    srcIcon:
      "https://res.cloudinary.com/dvprlv7uy/image/upload/v1772972836/tea_w6a2pq.png",
    storyVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972925/tea-story_h7uxip.mp4",
    cookingVideo:
      "https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972924/tea_u7ya9y.mp4",
  },
];

function ModalVideoPlayer({ food, onClose }) {

  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = false;
    v.volume = 1;

    const playPromise = v.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

  }, []);

  const handleEnd = () => {
    setTimeout(onClose, 2000);
  };

  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>✕</button>

        <video
          ref={videoRef}
          src={food.cookingVideo}
          controls
          playsInline
          preload="auto"
          className="modal-video"
          onEnded={handleEnd}
        />
      </motion.div>
    </motion.div>
  );
}

function StorySection({ food, isActive, isModalOpen, onDishClick }) {

  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (isActive && !isModalOpen) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [isActive, isModalOpen]);

  return (
    <section id={food.id} className="scroll-section">

      <video
        ref={videoRef}
        src={food.storyVideo}
        muted
        loop
        playsInline
        preload="metadata"
        className="story-bg-video"
      />

      <div className="story-content">
        <h2>{food.name}</h2>

        <div
          className="dish-icon-container"
          onClick={() => onDishClick(food)}
        >
          <img src={food.srcIcon} alt={food.name} />
          <div className="watch-btn-hint">▶ Watch Cooking</div>
        </div>
      </div>

    </section>
  );
}

export default function BreakfastMenu() {

  const [activeFoodModal, setActiveFoodModal] = useState(null);
  const [visibleSection, setVisibleSection] = useState("hero");

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document
      .querySelectorAll(".scroll-section")
      .forEach((s) => observer.observe(s));

    return () => observer.disconnect();

  }, []);

  return (
    <div className="story-container">

      {/* HERO */}

      <section id="hero" className="scroll-section">

        <video
          src="https://res.cloudinary.com/dvprlv7uy/video/upload/q_auto,f_auto/v1772972921/banana_leaf_lqx5iy.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="story-bg-video"
        />

        <div className="hero-content">
          <h1>Ammaas Tiffin</h1>
          <p>Made with Granny's Love</p>
        </div>

      </section>

      {/* FOOD SECTIONS */}

      {FOOD_DATA.map((food) => (
        <StorySection
          key={food.id}
          food={food}
          isActive={visibleSection === food.id}
          isModalOpen={!!activeFoodModal}
          onDishClick={setActiveFoodModal}
        />
      ))}

      {/* MODAL */}

      <AnimatePresence>
        {activeFoodModal && (
          <ModalVideoPlayer
            food={activeFoodModal}
            onClose={() => setActiveFoodModal(null)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
