// src/utils/n8nParser.js
import { Position } from "@xyflow/react";

const getNodeTypeColor = (type) => {
  if (type.includes("trigger") || type.includes("webhook"))
    return "border-green-400 shadow-green-400/50";
  if (type.includes("if") || type.includes("switch"))
    return "border-purple-400 shadow-purple-400/50";
  if (type.includes("code") || type.includes("set"))
    return "border-orange-400 shadow-orange-400/50";
  if (type.includes("httpRequest") || type.includes("api"))
    return "border-blue-400 shadow-blue-400/50";
  return "border-cyan-400 shadow-cyan-400/50";
};

const getNodeIcon = (type) => {
  if (type.includes("github")) return "Github";
  if (type.includes("telegram")) return "MessageCircle";
  if (type.includes("httpRequest")) return "Globe";
  if (type.includes("code")) return "Code";
  if (type.includes("if") || type.includes("switch")) return "GitBranch";
  if (type.includes("set")) return "Sliders";
  if (type.includes("dataTable")) return "Database";
  if (type.includes("agent") || type.includes("lmChat")) return "Bot";
  return "Box";
};

export const parseN8nWorkflow = (workflowJson) => {
  const nodes = [];
  const edges = [];

  if (!workflowJson || !workflowJson.nodes) return { nodes, edges };

  // Parse Nodes
  workflowJson.nodes.forEach((n) => {
    // Skip sticky notes to keep the UI clean and focused on functional nodes
    if (n.type === "n8n-nodes-base.stickyNote") return;

    nodes.push({
      id: n.name, // n8n uses names as IDs for connections
      type: "customNode",
      position: { x: n.position[0], y: n.position[1] },
      data: {
        label: n.name,
        type: n.type,
        icon: getNodeIcon(n.type),
        colorClass: getNodeTypeColor(n.type),
        brief: `Executing ${n.name}...`,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    });
  });

  // Parse Edges (Connections)
  if (workflowJson.connections) {
    Object.entries(workflowJson.connections).forEach(
      ([sourceNodeName, connections]) => {
        Object.entries(connections).forEach(([portName, connectionsArray]) => {
          connectionsArray.forEach((connectionGroup) => {
            connectionGroup.forEach((target) => {
              edges.push({
                id: `e-${sourceNodeName}-${target.node}`,
                source: sourceNodeName,
                target: target.node,
                type: "neonEdge",
                animated: false, // Managed by custom edge state
                data: { isFlowing: false },
              });
            });
          });
        });
      },
    );
  }

  return { nodes, edges };
};
