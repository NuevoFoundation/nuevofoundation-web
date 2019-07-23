import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/SupportUs.css";

const SupportUsPageBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 25px;
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

export const SupportUs: React.FC = (): JSX.Element => {

  return (
    <React.Fragment>
      <SupportUsPageBar>
        <Placeholder>
          Support us
        </Placeholder>
      </SupportUsPageBar>
      <div>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

      </div>
    </React.Fragment>
  )
}
