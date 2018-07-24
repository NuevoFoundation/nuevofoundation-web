import * as React from 'react';
import styled from 'styled-components';

// will eventually be a react-router linkto component
const InfoButtonWrapper = styled.div`
  height: 48px;
  width: 186px;
  font-size: 18px;
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #FFFFFF;
  cursor: pointer;
  text-align: center;
  padding-top:20px;
`

interface InfoButtonProps {
    text: string
}

export class InfoButton extends React.Component<InfoButtonProps, {}> {
    constructor(props: InfoButtonProps) {
        super(props);
        this.state = {
            text: ''
        }
    }
    public render() {
        return (
            <InfoButtonWrapper>
                {this.props.text}
            </InfoButtonWrapper>
        )
    }
}