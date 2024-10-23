import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

export default function WorkflowNode() {
  const onChange = useCallback(() => {}, []);
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ width: "20px", height: "20px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ width: "20px", height: "20px" }}
      />
      <div className="p-4 black-border bg-white">
        <div className="mb-2">
          <label htmlFor="text" className="mr-2">
            Name:
          </label>
          <input
            id="text"
            name="text"
            onChange={onChange}
            className="nodrag px-2 py-1 black-border"
          />
        </div>
        <div className="flex justify-end">
          <button className="cartoon-button">Done</button>
        </div>
      </div>
    </>
  );
}
