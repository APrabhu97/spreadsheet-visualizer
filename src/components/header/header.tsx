import React from "react";
import PersistentDrawerLeft from "../drawer";
import "./header.scss";

interface Props {
  //onDataLoaded: (data: SpreadsheetRow[]) => void
}
export default function Header(props: Props) {
  return (
    <div>
      <div className="header-component">
        <span className="app-name">UIC Housing Form Visualizer</span>
      </div>
      
    </div>
  );
}
