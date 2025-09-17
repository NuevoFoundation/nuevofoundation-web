import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { Const } from "../../Const";
import { NewVirtualSession, VirtualSession } from "./";

export class VirtualSessions extends React.Component {
  public render() {
    return (
      <Routes>
        <Route path={Const.VirtualSessionPage} element={<NewVirtualSession />} />
        <Route path={Const.VirtualSession} element={<VirtualSession />} />
      </Routes>
    );
  }
}