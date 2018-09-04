import * as React from 'react';
import styled from 'styled-components';

// TODO: will eventually be a react-router linkto component
const DonateButtonCtaWrapper = styled.div`
  height: 48px;
  font-family: 'Lato', sans-serif;
  background-color: #E6E6E6;
  color: #0F0F0F;
  cursor: pointer;
`
const ContentWrapper = styled.div`
  padding-top: 10px;
  text-align: center;
`

interface IDonateButtonCtaProp {
    backgroundColor?: string
    textColor?: string
    borderColor?: string
}

export class DonateButtonCta extends React.Component<IDonateButtonCtaProp, {}> {

    constructor(props: IDonateButtonCtaProp) {
        super(props);
    }

    public render() {
        return (
            <DonateButtonCtaWrapper style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor, border: `2px solid ${this.props.borderColor}`, borderRadius: `3px` }}>
                <ContentWrapper> DONATE </ContentWrapper>
            </DonateButtonCtaWrapper>
        )
    }
}