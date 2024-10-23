import type { MetaFunction } from "@remix-run/node";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  addEdge,
  Connection,
  EdgeChange,
  ConnectionMode,
  Edge,
  Node,
} from "@xyflow/react";
import { useMemo, useState, useCallback } from "react";

import "@xyflow/react/dist/style.css";
import WorkflowNode from "./workflow-node";

export const meta: MetaFunction = () => {
  return [
    { title: "Workflow" },
    { name: "description", content: "It's a take home project" },
  ];
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "workflowNode",
    position: { x: 0, y: 0 },
    data: { label: "1" },
  },
  {
    id: "2",
    type: "workflowNode",
    position: { x: 0, y: 100 },
    data: { label: "2" },
  },
];
const initialEdges: Edge[] = [];

export default function Index() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const nodeTypes = useMemo(() => ({ workflowNode: WorkflowNode }), []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
        connectionMode={ConnectionMode.Loose}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
