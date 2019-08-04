import * as React from "react";
import styled from "styled-components";
import { Const } from "../../../Const";
import ReactGA from "react-ga";
import { PageTitle } from "../common/PageTitle";

const PageContent = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 22px;
  padding: 80px 25px 0 25px;

`

export class ComingSoon extends React.Component {
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.ComingSoonPage);
  }
  public render() {
    return (
      <React.Fragment>
        <PageTitle title={"Coming soon"} />
        <PageContent>
          This content will be coming soon!
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </PageContent>
      </React.Fragment>
    )
  }
}
