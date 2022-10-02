import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CollarboneSofttissue } from "./components/CollarboneSofttissue";
import { MitchellHynesStudent } from "./components/MitchellHynesStudent";
import { Stare } from "./components/Stare";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "collarbone-softtissue",
        element: <CollarboneSofttissue />,
      },
      {
        path: "mitchell-hynes-student",
        element: <MitchellHynesStudent />,
      },
      {
        path: "stare",
        element: <Stare />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
