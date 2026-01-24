"use client"
import React from "react";
import SpotlightGrid from "./SpotlightGrid"; // masked grid overlay (optional)
import GridMenu from "./GridMenu";

export default function App() {
  return (
    <>
      {/* Full-viewport spotlight grid (invisible unless cursor reveals) */}
      <SpotlightGrid gridSize={36} highlightRadius={300} gridColor="rgba(255,255,255,0.12)" />

      {/* New Grid-based Menu */}
      <GridMenu />
    </>
  );
}

