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
  text-align: center;
  float: right;

  margin-top: 12px;
  margin-right: 40px;
`
const ContentWrapper = styled.div`
  padding-top: 10px;
`

export class DonateButton extends React.Component {

    public render() {
        return (
            <DonateButtonWrapper>
                <ContentWrapper> Donate </ContentWrapper>
            </DonateButtonWrapper>
        )
    }
}