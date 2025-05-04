import React from 'react';
import './App.css';
import {FlowCanvas} from "./components/FlowCanvas";
import {SidePannel} from "./components/SidePannel";

export const App = () => {
  return (
    <>
        <SidePannel/>
        <FlowCanvas />
    </>
  );
}
