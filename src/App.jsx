import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./App.module.css";

import HotspotMarker from "@/components/HotspotMarker";
import DetailModal from "@/components/DetailModal";
import BookshelfSection from "@/components/BookshelfSection";
import MedalsSection from "@/components/MedalsSection";
import LaptopSection from "@/components/LaptopSection";

import roomImage from "@/assets/room.png";

const HOTSPOTS = [
  {
    id: "bookshelf",
    position: { x: 72, y: 15 },
    label: "Courses & Certifications",
  },
  { id: "medals", position: { x: 26, y: 15 }, label: "Awards & Recognition" },
  { id: "laptop", position: { x: 50, y: 52 }, label: "Profile & Experience" },
];

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

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
          <img src={roomImage} alt="Room" className={styles.roomImage} />

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
