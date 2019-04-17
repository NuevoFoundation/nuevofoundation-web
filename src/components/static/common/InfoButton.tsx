import * as React from "react";
import styled from "styled-components";

// will eventually be a react-router linkto component
const InfoButtonWrapper = styled.div`
  height: 48px;
  width: 186px;
  font-size: 16px;
  background-color: #ffffff;
  cursor: pointer;
  text-align: center;
  border: 1px solid #ffffff;
`;

const ContentWrapper = styled.div`
  padding-top: 13px;
`;

interface IInfoButtonProps {
    borderColor?: string;
    backgroundColor?: string;
    textColor?: string;
    action?: any;
}

export class InfoButton extends React.Component<IInfoButtonProps, {}> {
  constructor(props: IInfoButtonProps) {
    super(props);
  }

    public render() {
        return (
          <InfoButtonWrapper onClick={this.props.action} 
            style={{ 
              backgroundColor: this.props.backgroundColor, 
              color: this.props.textColor, 
              border: `1px solid ${this.props.borderColor}` 
            }}
          >
                <ContentWrapper>{this.props.children}</ContentWrapper>
            </InfoButtonWrapper>
        )
    }
}
