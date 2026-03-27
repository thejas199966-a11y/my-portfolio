// src/components/workflow/CustomNode.jsx
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";

const CustomNode = ({ data, selected }) => {
  const IconComponent = Icons[data.icon] || Icons.Box;
  const isActive = data.isActive;

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-all duration-300 ${isActive ? "scale-110 z-50" : "scale-100 z-10"}`}
    >
      {/* Tooltip for Active Process */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-12 whitespace-nowrap bg-[#1a1e2d] border border-white/10 text-gray-200 text-xs px-4 py-2 rounded-md shadow-lg"
          >
            {data.brief}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`
        w-40 bg-[#0f1219] rounded-xl border p-3 flex flex-col items-center gap-2
        ${isActive ? `${data.colorClass} border-2 shadow-[0_0_20px_rgba(0,0,0,0.5)]` : "border-white/10"}
      `}
      >
        <Handle
          type="target"
          position={Position.Left}
          className="w-2 h-2 bg-gray-500 border-none"
        />

        {/* Animated Icon Container */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/5 relative overflow-hidden`}
        >
          {isActive && (
            <motion.div
              className={`absolute inset-0 opacity-20 ${data.colorClass.split(" ")[0].replace("border-", "bg-")}`}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
          <IconComponent
            className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`}
          />
        </div>

        <div className="text-center">
          <p className="text-white text-xs font-bold font-mono truncate w-32">
            {data.label}
          </p>
          <p className="text-gray-500 text-[9px] uppercase tracking-wider truncate w-32">
            {data.type.split(".").pop()}
          </p>
        </div>

        <Handle
          type="source"
          position={Position.Right}
          className="w-2 h-2 bg-gray-500 border-none"
        />
      </div>
    </div>
  );
};

export default CustomNode;
