import type { MetaFunction } from "@remix-run/node";
import { ReactFlowProvider } from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import Flowchart from "./flowchart";
import { RecoilRoot } from "recoil";

export const meta: MetaFunction = () => {
  return [
    { title: "Workflow" },
    { name: "description", content: "It's a take home project" },
  ];
};

export default function Index() {
  return (
    <div className="h-screen w-screen">
      <ReactFlowProvider>
        <RecoilRoot>
          <Flowchart />
        </RecoilRoot>
      </ReactFlowProvider>
    </div>
  );
}
