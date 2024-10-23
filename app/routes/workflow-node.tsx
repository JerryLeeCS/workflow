import { useCallback } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { AiOutlineDelete } from "react-icons/ai";

export default function WorkflowNode({ id }: { id: string }) {
  const { deleteElements } = useReactFlow();
  const onChange = useCallback(() => {}, []);

  const handleDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [deleteElements, id]);

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
        <button className="absolute top-1 right-1 p-0" onClick={handleDelete}>
          <AiOutlineDelete />
        </button>
        <div className="my-2">
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
