import * as React from "react";
import styled from "styled-components";
import { Const } from "../../../Const";
import ReactGA from "react-ga";
import { PageTitle } from "../common/PageTitle";

const SupportUsPageBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 25px 0 25px;
  height: 320px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`
const Placeholder = styled.div`
  border: 1px #707070 solid;
  color: #000000;
  font-size: 28px;
  padding: 32px 0 0 25px;

  font-family: 'Space Mono', monospace;
  height: 207px;
  max-width: 513px;
`

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
