import { useEffect, useRef, useState } from "react";
import { useReactFlow } from "@xyflow/react";

export const useWorkflowSimulation = (nodes, edges, setNodes, setEdges) => {
  const { setCenter } = useReactFlow();
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef(null);

  const startSimulation = () => {
    if (nodes.length === 0) return;
    setIsRunning(true);

    // Find Trigger Node (Node with no incoming edges)
    const targetIds = new Set(edges.map((e) => e.target));
    const startNode = nodes.find((n) => !targetIds.has(n.id)) || nodes[0];

    runNode(startNode.id);
  };

  const runNode = (nodeId) => {
    const activeNode = nodes.find((n) => n.id === nodeId);

    // SAFETY CHECK: If node doesn't exist, stop simulation loop
    if (!activeNode) {
      timeoutRef.current = setTimeout(() => startSimulation(), 2000);
      return;
    }

    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isActive: n.id === nodeId },
      })),
    );

    setCenter(activeNode.position.x + 100, activeNode.position.y, {
      zoom: 1,
      duration: 800,
    });

    timeoutRef.current = setTimeout(() => {
      const outgoingEdges = edges.filter((e) => e.source === nodeId);

      if (outgoingEdges.length === 0) {
        setNodes((nds) =>
          nds.map((n) => ({ ...n, data: { ...n.data, isActive: false } })),
        );
        timeoutRef.current = setTimeout(() => startSimulation(), 2000);
        return;
      }

      const selectedEdge =
        outgoingEdges[Math.floor(Math.random() * outgoingEdges.length)];

      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          data: { ...e.data, isFlowing: e.id === selectedEdge.id },
        })),
      );

      setNodes((nds) =>
        nds.map((n) => ({ ...n, data: { ...n.data, isActive: false } })),
      );

      timeoutRef.current = setTimeout(() => {
        setEdges((eds) =>
          eds.map((e) => ({ ...e, data: { ...e.data, isFlowing: false } })),
        );
        runNode(selectedEdge.target);
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    startSimulation();
    return () => clearTimeout(timeoutRef.current);
  }, [nodes.length]); // Start when nodes load

  return { isRunning };
};
