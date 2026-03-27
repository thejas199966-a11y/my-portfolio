import React from "react";
import { getBezierPath } from "@xyflow/react";

const NeonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isFlowing = data?.isFlowing;

  return (
    <>
      {/* Background thick wire */}
      <path
        id={id}
        className="react-flow__edge-path"
        d={edgePath}
        stroke={isFlowing ? "#00f2fe" : "#1f2433"}
        strokeWidth={isFlowing ? 6 : 4}
        fill="none"
        style={{
          filter: isFlowing
            ? "drop-shadow(0 0 12px rgba(0, 242, 254, 0.9))"
            : "none",
          transition: "stroke 0.3s, stroke-width 0.3s, filter 0.3s",
        }}
      />

      {/* Animated Flowing Current (Water/Neon Effect) */}
      {isFlowing && (
        <path
          d={edgePath}
          stroke="#ffffff"
          strokeWidth={3}
          fill="none"
          style={{
            strokeDasharray: "12 12",
            animation: "dashFlow 0.8s linear infinite",
            filter: "drop-shadow(0 0 5px #ffffff)",
          }}
        />
      )}

      {/* Global keyframes for the flowing effect */}
      <style>{`
        @keyframes dashFlow {
          from {
            stroke-dashoffset: 24;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </>
  );
};

export default NeonEdge;
