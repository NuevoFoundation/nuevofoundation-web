import * as React from 'react';
import styled from 'styled-components';

const DonateButtonWrapper = styled.button`
  height: 48px;
  width: 186px;
  font-size: 28px;
  font-weight: bold;
  font-family: 'Sergoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #D2D2D2;
  cursor: pointer;
  text-align: center;
`
export class DonateButton extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: ''
    }
  }
  public render(){
    return (
      <DonateButtonWrapper>
        {this.props.text}
      </DonateButtonWrapper>
    )
  }
}
