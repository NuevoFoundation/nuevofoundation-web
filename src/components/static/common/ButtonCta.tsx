import * as React from "react";
import styled from "styled-components";

// TODO: will eventually be a react-router linkto component
const ButtonCtaWrapper = styled.button`
  font-family: "Lato", sans-serif;

  background-color: #FCC600;
  color: #000000;
  border-radius: 4px;
  padding: 11px 56px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  font-weight: 900;
`;

interface ButtonCtaProp {
  backgroundColor?: string;
  textColor?: string;
  border?: string;
  text?: string;
  linkTo?: string;
}

export class ButtonCta extends React.Component<ButtonCtaProp, {}> {

  public render() {
    return (
      <a href={this.props.linkTo}>
        <ButtonCtaWrapper
          style={{
            backgroundColor: this.props.backgroundColor,
            color: this.props.textColor,
            border: `${this.props.border}`,
            borderRadius: `4px`
          }}
        >
          {this.props.text}
        </ButtonCtaWrapper>
      </a>
    );
  }
}
