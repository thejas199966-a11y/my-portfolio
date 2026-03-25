import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./App.module.css";

import HotspotMarker from "@/components/HotspotMarker";
import DetailModal from "@/components/DetailModal";
import BookshelfSection from "@/components/BookshelfSection";
import MedalsSection from "@/components/MedalsSection";
import LaptopSection from "@/components/LaptopSection";

import roomImage from "@/assets/room.png";
import roomImagePhone from "@/assets/room-phone.png";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();

    // Listen for screen size changes (like rotating a phone)
    window.addEventListener("resize", checkIfMobile);

    // Cleanup the listener when the component unmounts
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const [activeSection, setActiveSection] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const HOTSPOTS = [
    {
      id: "bookshelf",
      position: isMobile ? { x: 72, y: 25 } : { x: 72, y: 15 },
      label: "Courses & Certifications",
    },
    {
      id: "medals",
      position: isMobile ? { x: 20, y: 25 } : { x: 26, y: 15 },
      label: "Awards & Recognition",
    },
    {
      id: "laptop",
      position: isMobile ? { x: 50, y: 55 } : { x: 50, y: 52 },
      label: "Profile & Experience",
    },
  ];

  const handleHotspotClick = (hotspot) => {
    setZoomOrigin({ x: hotspot.position.x, y: hotspot.position.y });
    setIsZoomed(true);
    setTimeout(() => setActiveSection(hotspot.id), 400);
  };

  const handleClose = () => {
    setActiveSection(null);
    setTimeout(() => setIsZoomed(false), 100);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "bookshelf":
        return <BookshelfSection />;
      case "medals":
        return <MedalsSection />;
      case "laptop":
        return <LaptopSection />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.viewportLock}>
      <div className={styles.realisticGrain} />

      <motion.div
        className={styles.cinematicLayer}
        initial={{ scale: 1, filter: "blur(0px) brightness(1)" }}
        animate={{
          scale: isZoomed ? 3.0 : 1,
          filter: isZoomed
            ? "blur(12px) brightness(0.4)"
            : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
      >
        <div className={styles.shrinkWrapContainer}>
          <img
            src={isMobile ? roomImagePhone : roomImage}
            alt="Room"
            className={styles.roomImage}
          />

          <AnimatePresence>
            {!activeSection &&
              HOTSPOTS.map((hotspot) => (
                <HotspotMarker
                  key={hotspot.id}
                  position={hotspot.position}
                  label={hotspot.label}
                  onClick={() => handleHotspotClick(hotspot)}
                />
              ))}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence>
        {!activeSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              y: { duration: 0.3 },
              opacity: { duration: 0.3 },
              delay: 1,
            }}
            className={`fixed z-50 bg-black/20 backdrop-blur-sm border border-cyan-400/30 rounded-lg shadow-xl ${
              isMobile
                ? "bottom-5 left-4 right-4 p-3"
                : "bottom-20 right-10 p-4"
            }`}
          >
            <p
              className={`font-bold text-cyan-400 mono-font text-center ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              Click the dots to explore.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <DetailModal
        isOpen={activeSection !== null}
        onClose={handleClose}
        title={activeSection?.toUpperCase()}
      >
        {renderSectionContent()}
      </DetailModal>
    </div>
  );
}

export default App;
