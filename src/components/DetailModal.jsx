import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const DetailModal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            // STRICT SIZING: w-[95vw] ensures mobile padding, max-w-4xl stops it getting too wide on desktop.
            className="glass-card rounded-xl w-[95vw] max-w-4xl max-h-[85vh] flex flex-col relative shadow-2xl border border-white/10"
          >
            {/* Header: Fixed at top */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 shrink-0">
              <h2 className="text-xl md:text-2xl font-bold heading-font tracking-tight text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body: Scrollable area */}
            <div className="p-5 md:p-6 overflow-y-auto overflow-x-hidden">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DetailModal;
