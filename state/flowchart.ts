import { Edge, Node } from "@xyflow/react";
import { atom, selector } from "recoil";

export const nodesAtom = atom<Node[]>({
  key: "nodesAtom",
  default: [],
});

export const edgesAtom = atom<Edge[]>({
  key: "edgesAtom",
  default: [],
});

export const isNodeDoneRecordSelector = selector<Record<string, boolean>>({
  key: "isNodeDoneRecordSelector",
  get: ({ get }) => {
    const nodes = get(nodesAtom);

    return Object.fromEntries(
      nodes.map((node) => [node.id, Boolean(node.data.done)])
    );
  },
});

export const tagetIdToSourceIdsDepRecordSelector = selector<
  Record<string, string[]>
>({
  key: "nodeIdDepsRecordSelector",
  get: ({ get }) => {
    const edges = get(edgesAtom);
    const isNodeDoneRecord = get(isNodeDoneRecordSelector);

    const depRecord: Record<string, string[]> = {};

    for (const edge of edges) {
      const { target, source } = edge;

      if (!isNodeDoneRecord[source]) {
        if (!depRecord[target]) {
          depRecord[target] = [];
        }

        depRecord[target].push(source);
      }
    }

    return depRecord;
  },
});
