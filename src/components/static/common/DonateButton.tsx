import * as React from "react";
import styled from "styled-components";

const DonateButtonWrapper = styled.button`
  height: 5.9rem;
  width: 13.8rem;
  font-size: 2rem;
  font-weight: bold;
  border: 0 #79DB74 solid;
  border-radius: .4rem;
  color: black;
  font-family: "Sergoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #d2d2d2;
  cursor: pointer;
  text-align: center;

  &:focus {
    outline: 0;
  }
`

interface IDonateButtonProps {
  action?: any,
  color?: string,
  text: string
}

export class DonateButton extends React.Component<IDonateButtonProps, any> {
  constructor(props: IDonateButtonProps) {
    super(props);
    this.state = {
      text: ""
    };
  }

  public changeDonateButtonColor(clickedButton?:any) {
    document.querySelectorAll("#donateButton").forEach(button=> {
      (button as HTMLElement).style.backgroundColor="#79DB74"
    })
    
    clickedButton.target.style.backgroundColor="#017501";
  }

  public render(){
    return (
      <DonateButtonWrapper style={{backgroundColor: this.props.color || "#d2d2d2" }}  id="donateButton" onClick={(e: React.MouseEvent) => {
        this.changeDonateButtonColor(e)
        // tslint:disable-next-line
        if(this.props.action) {this.props.action(e)}
      }}>
        {this.props.text}
      </DonateButtonWrapper>
    )
  }
}
