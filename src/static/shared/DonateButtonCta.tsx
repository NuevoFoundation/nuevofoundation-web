import * as React from 'react';
import styled from 'styled-components';

// will eventually be a react-router linkto component
const DonateButtonCtaWrapper = styled.div`
  height: 48px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #E6E6E6;
  color: #0F0F0F;
  cursor: pointer;
`
const ContentWrapper = styled.div`
  padding-top: 10px;
  text-align: center;
`

interface IDonateButtonCtaProp {
    bColor?: string
    textColor?: string
}

export class DonateButtonCta extends React.Component<IDonateButtonCtaProp, {}> {

    constructor(props: IDonateButtonCtaProp) {
        super(props);
    }

    public render() {
        return (
            <DonateButtonCtaWrapper style={{ backgroundColor: this.props.bColor, color: this.props.textColor }}>
                <ContentWrapper> Donate </ContentWrapper>
            </DonateButtonCtaWrapper>
        )
    }
}