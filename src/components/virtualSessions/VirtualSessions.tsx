import * as React from "react";
import { Switch, Route } from "react-router-dom";
import { Const } from "../../Const";
import { NewVirtualSession, VirtualSession } from "./";

export class VirtualSessions extends React.Component {
  public render() {
    return (
      <Switch>
        <Route exact={true} path={Const.VirtualSessionPage} component={NewVirtualSession} />
        <Route exact={true} path={Const.VirtualSession} component={VirtualSession} />
      </Switch>
    );
  }
}