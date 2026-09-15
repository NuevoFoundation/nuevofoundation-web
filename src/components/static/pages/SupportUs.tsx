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

const DonationFormLink = styled.a`
  margin-bottom: 24px;
  color: #005ea8;
  font-size: 18px;

  &:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 4px;
  }
`;

const DonationForm = styled.iframe`
  max-width: 500px;
  min-width: 310px;
  max-height: none;
  border: 0;

  &:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 4px;
  }
`;

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
          <DonationFormLink
            href="https://donorbox.org/nuevo-foundation-fundraising"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the donation form in a new tab
          </DonationFormLink>
          <DonationForm
            src="https://donorbox.org/embed/nuevo-foundation-fundraising"
            height="685px"
            width="100%"
            name="donorbox"
            scrolling="no"
            title="Nuevo Foundation donation form"
          />
        </SupportUsContent>
      </React.Fragment>
    )
  }
}
