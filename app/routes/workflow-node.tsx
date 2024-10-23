import { useCallback, useMemo } from "react";
import { Handle, Position, useReactFlow } from "@xyflow/react";
import { AiOutlineDelete } from "react-icons/ai";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  isNodeDoneRecordSelector,
  tagetIdToSourceIdsDepRecordSelector,
  nodesAtom,
} from "state/flowchart";

export default function WorkflowNode({ id }: { id: string }) {
  const { deleteElements } = useReactFlow();
  const onChange = useCallback(() => {}, []);
  const setNodes = useSetRecoilState(nodesAtom);
  const isNodeDoneRecord = useRecoilValue(isNodeDoneRecordSelector);
  const targetIdToSourceIdsDepRecord = useRecoilValue(
    tagetIdToSourceIdsDepRecordSelector
  );

  const isNodeDone = useMemo(() => {
    return isNodeDoneRecord[id];
  }, [isNodeDoneRecord, id]);

  const handleDelete = useCallback(() => {
    deleteElements({ nodes: [{ id }] });
  }, [deleteElements, id]);

  const handleDone = useCallback(() => {
    const nodeDeps = targetIdToSourceIdsDepRecord[id];
    if (Array.isArray(nodeDeps) && nodeDeps.length > 0) {
      alert("Dependent nodes needed to be done first!");
      return;
    }

    setNodes((nodes) => {
      const newNodes = nodes.map((node) => {
        if (node.id !== id) {
          return node;
        }

        return {
          ...node,
          data: {
            ...node.data,
            done: true,
          },
        };
      });
      return newNodes;
    });
  }, [setNodes, targetIdToSourceIdsDepRecord, id]);

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
          {isNodeDone ? (
            <div className="done-button">Done!</div>
          ) : (
            <button
              className={"cartoon-button"}
              onClick={() => {
                handleDone();
              }}
            >
              Done
            </button>
          )}
        </div>
      </div>
    </>
  );
}
