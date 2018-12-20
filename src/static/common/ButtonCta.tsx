import * as React from 'react';
import styled from 'styled-components';

// TODO: will eventually be a react-router linkto component
const ButtonCtaWrapper = styled.div`
  height: 48px;
  font-family: 'Lato', sans-serif;
  font-weight: 900;
  line-height: 1.31;
  background-color: #E6E6E6;
  color: #0F0F0F;
  cursor: pointer;
`
const ContentWrapper = styled.div`
  padding-top: 12px;
  text-align: center;
`

interface IButtonCtaProp {
    backgroundColor?: string
    textColor?: string
    border?: string
    text?: string;
}

export class ButtonCta extends React.Component<IButtonCtaProp, {}> {

    constructor(props: IButtonCtaProp) {
        super(props);
    }

    public render() {
        return (
            <ButtonCtaWrapper style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor, border: `${this.props.border}`, borderRadius: `4px` }}>
                <ContentWrapper> {this.props.text} </ContentWrapper>
            </ButtonCtaWrapper>
        )
    }
}