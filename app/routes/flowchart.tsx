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
  useReactFlow,
} from "@xyflow/react";
import { useMemo, useCallback, useRef } from "react";

import "@xyflow/react/dist/style.css";
import WorkflowNode from "./workflow-node";
import { useRecoilState } from "recoil";
import { edgesAtom, nodesAtom } from "state/flowchart";

export default function Flowchart() {
  const reactFlowRef = useRef<HTMLDivElement | null>(null);
  const { getViewport } = useReactFlow();
  const [nodes, setNodes] = useRecoilState(nodesAtom);
  const [edges, setEdges] = useRecoilState(edgesAtom);
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

  const handleAddNode = useCallback(() => {
    const { x, y, zoom } = getViewport();
    const clientRect = reactFlowRef.current?.getBoundingClientRect();
    if (!clientRect) return;

    const centerX = clientRect.width / 2;
    const centerY = clientRect.height / 2;

    // Calculate the position in the flow coordinates
    const flowCenterX = (centerX - x) / zoom;
    const flowCenterY = (centerY - y) / zoom;

    setNodes((nodes) => {
      return [
        ...nodes,
        {
          id: String(Math.random()),
          type: "workflowNode",
          position: {
            x: flowCenterX,
            y: flowCenterY,
          },
          data: {},
        },
      ];
    });
  }, [getViewport, setNodes]);

  return (
    <div className="h-screen w-screen">
      <ReactFlow
        ref={reactFlowRef}
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
      <button
        onClick={() => handleAddNode()}
        className="absolute left-1/2 transform -translate-x-1/2 bottom-4 black-border px-4 py-2 bg-white active:bg-black active:text-white"
      >
        Add Node
      </button>
    </div>
  );
}
