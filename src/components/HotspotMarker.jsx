import React from "react";

const HotspotMarker = ({ position, label, onClick }) => {
  return (
    <div
      className="absolute z-20"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <button
        onClick={onClick}
        className="relative group cursor-pointer flex items-center justify-center p-4 outline-none"
      >
        <div className="w-3 h-3 rounded-full bg-cyan-400 z-10 shadow-[0_0_10px_#22d3ee]"></div>
        <div className="absolute w-8 h-8 rounded-full bg-cyan-400/40 animate-ping"></div>

        <div className="absolute top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-30">
          <div className="bg-[#0f172a]/90 backdrop-blur-md text-cyan-400 px-3 py-1.5 rounded text-xs font-bold tracking-widest border border-cyan-400/30 uppercase shadow-lg">
            {label}
          </div>
        </div>
      </button>
    </div>
  );
};

export default HotspotMarker;
