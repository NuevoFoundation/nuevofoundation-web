import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/SupportUs.css";
import { PageTitle } from "../common/PageTitle";
import { Const } from "../../../Const";
import ReactGA from "react-ga";

const SupportUsContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 75px;
  flex-basis: 100%;

  font-family: "Lato", sans-serif;
  font-size: 28px;
`

export class SupportUs extends React.Component {
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.SupportUsPage);
  }
  
  public render() {
    return (
      <React.Fragment>
        <PageTitle title={"Support us"} />
        <SupportUsContent>
          <iframe src="https://donorbox.org/embed/nuevo-foundation-fundraising" height="685px" width="100%" style={{ maxWidth: "500px", minWidth: "310px", maxHeight: "none !important" }} seamless={true} name="donorbox" frameBorder="0" scrolling="no" title={"donorbox-iframe"}></iframe>
        </SupportUsContent>
      </React.Fragment>
    )
  }
}
