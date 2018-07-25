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
  border: 1px solid #FFFFFF;
`

const ContentWrapper = styled.div`
  padding-top:10px;
`

interface IInfoButtonProps {
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
}

export class InfoButton extends React.Component<IInfoButtonProps, {}> {
    constructor(props: IInfoButtonProps) {
        super(props);
    }

    public render() {
        return (
            <InfoButtonWrapper style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor, border: `1px solid ${this.props.borderColor}` }}>
                <ContentWrapper>{this.props.children}</ContentWrapper>
            </InfoButtonWrapper>
        )
    }
}