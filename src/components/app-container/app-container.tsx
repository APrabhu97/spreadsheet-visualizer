import React from "react";
import PersistentDrawerLeft from "../drawer";
import "./app-container.scss";

export default function AppContainer() {
  return (
    <div className="app-container">
      <PersistentDrawerLeft />
    </div>
  );
}
