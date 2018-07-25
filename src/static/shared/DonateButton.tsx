import * as React from 'react';
import styled from 'styled-components';

// will eventually be a react-router linkto component
const DonateButtonWrapper = styled.div`
  height: 48px;
  width: 156px;
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

interface IDonateButtonProp {
    bColor?: string
    textColor?: string
}

export class DonateButton extends React.Component<IDonateButtonProp, {}> {

    constructor(props: IDonateButtonProp) {
        super(props);
    }

    public render() {
        return (
            <DonateButtonWrapper style={{ backgroundColor: this.props.bColor, color: this.props.textColor }}>
                <ContentWrapper> Donate </ContentWrapper>
            </DonateButtonWrapper>
        )
    }
}