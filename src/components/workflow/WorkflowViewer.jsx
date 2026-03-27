import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { X, Code } from "lucide-react";
import dagre from "dagre";
import CustomNode from "./CustomNode";
import NeonEdge from "./NeonEdge";
import { parseN8nWorkflow } from "../../utils/n8nParser";
import { useWorkflowSimulation } from "../../hooks/useWorkflowSimulation";

const nodeTypes = { customNode: CustomNode };
const edgeTypes = { neonEdge: NeonEdge };

// Auto-Layout Engine Function
const getLayoutedElements = (nodes, edges, direction = "LR") => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));

  // Estimated dimensions of our CustomNode
  const nodeWidth = 200;
  const nodeHeight = 120;

  // Set grid spacing
  dagreGraph.setGraph({ rankdir: direction, ranksep: 150, nodesep: 80 });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: "left",
      sourcePosition: "right",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

const FlowCanvas = ({ workflowData }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setViewport, fitView } = useReactFlow();

  useEffect(() => {
    const loadWorkflowData = async () => {
      setIsLoading(true);
      try {
        let rawNodes = [];
        let rawEdges = [];

        // Fetch Array of URLs
        if (workflowData.jsonUrls && Array.isArray(workflowData.jsonUrls)) {
          const responses = await Promise.all(
            workflowData.jsonUrls.map((url) => fetch(url)),
          );
          const workflowsJson = await Promise.all(
            responses.map((res) => {
              if (!res.ok) throw new Error(`Failed to fetch ${res.url}`);
              return res.json();
            }),
          );

          workflowsJson.forEach((workflowJson, index) => {
            const { nodes: pNodes, edges: pEdges } =
              parseN8nWorkflow(workflowJson);
            // Append index to IDs to prevent conflicts between different files
            const scopedNodes = pNodes.map((n) => ({
              ...n,
              id: `${n.id}_wf${index}`,
            }));
            const scopedEdges = pEdges.map((e) => ({
              ...e,
              id: `${e.id}_wf${index}`,
              source: `${e.source}_wf${index}`,
              target: `${e.target}_wf${index}`,
            }));
            rawNodes = [...rawNodes, ...scopedNodes];
            rawEdges = [...rawEdges, ...scopedEdges];
          });
        }
        // Fetch Single URL
        else if (workflowData.jsonUrl) {
          const response = await fetch(workflowData.jsonUrl);
          if (!response.ok) throw new Error("Failed to fetch workflow");
          const workflowJson = await response.json();
          const parsed = parseN8nWorkflow(workflowJson);
          rawNodes = parsed.nodes;
          rawEdges = parsed.edges;
        }
        // Direct JSON Object
        else if (workflowData.json || workflowData.rawJson) {
          const rawData = workflowData.json || workflowData.rawJson;
          const jsonObject =
            typeof rawData === "string" ? JSON.parse(rawData) : rawData;
          const parsed = parseN8nWorkflow(jsonObject);
          rawNodes = parsed.nodes;
          rawEdges = parsed.edges;
        }

        // Apply Dagre Auto-Layout to organize the scattered nodes systematically
        const { nodes: layoutedNodes, edges: layoutedEdges } =
          getLayoutedElements(rawNodes, rawEdges);

        setNodes(layoutedNodes);
        setEdges(layoutedEdges);

        // Optional: wait a moment for react flow to render, then fit view
        setTimeout(() => fitView({ padding: 0.2 }), 100);
      } catch (error) {
        console.error("Error loading workflow:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkflowData();
  }, [workflowData, fitView]);

  useWorkflowSimulation(nodes, edges, setNodes, setEdges);

  // Mouse pan effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const margin = 100;
      const speed = 10;

      setViewport((viewport) => {
        let { x, y, zoom } = viewport;
        if (clientX > innerWidth - margin) x -= speed;
        if (clientX < margin) x += speed;
        if (clientY > innerHeight - margin) y -= speed;
        if (clientY < margin) y += speed;
        return { x, y, zoom };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [setViewport]);

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0a0c10]">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-cyan-400 font-mono text-sm tracking-widest">
          ORGANIZING WORKFLOW...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0c10]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        className="bg-[#0a0c10]"
        nodesDraggable={false}
        nodesConnectable={false}
        minZoom={0.2}
      >
        <Background color="#1a1e2d" gap={20} size={1} />
      </ReactFlow>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50">
        <a
          href={workflowData.githubLink || workflowData.ghLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-[#1a1e2d]/80 backdrop-blur-md border border-cyan-400/30 text-cyan-400 rounded-full hover:bg-cyan-400/20 hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all font-mono text-sm tracking-widest"
        >
          <Code className="w-4 h-4" /> SOURCE CODE
        </a>
      </div>
    </div>
  );
};

const WorkflowViewer = ({ workflowData, onClose }) => {
  const modalContent = (
    // Added p-4 md:p-6 here to guarantee breathing room on all screen sizes
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6">
      {/* w-full + max-w-[96vw] makes it expand massively but forces a 2% gap on each side.
        Restored rounded-2xl and the full border since it's floating again.
      */}
      <div className="relative w-full max-w-[96vw] h-[95vh] md:h-[90vh] bg-[#0a0c10] rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
        {/* Close Button - moved slightly back since we have corners again */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 group"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-[#0a0c10] to-transparent z-40 pointer-events-none"></div>

        <div className="flex-1 w-full h-full relative">
          <ReactFlowProvider>
            <FlowCanvas workflowData={workflowData} />
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default WorkflowViewer;
