import { Edge, Node } from "@xyflow/react";
import { atom } from "recoil";

export const nodesAtom = atom<Node[]>({
  key: "nodesAtom",
  default: [],
});

export const edgesAtom = atom<Edge[]>({
  key: "edgesAtom",
  default: [],
});
