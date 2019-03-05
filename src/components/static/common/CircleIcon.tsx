import * as React from 'react';
import styled from 'styled-components';

interface ICircleIconProps {
  iconImage: any;
  fill: string;
}

const Circle = styled.div`
  position: relative;
  height: 52px;
  width: 52px;
  border-radius: 50%;
  box-shadow: 0 3px 6px #000000;
`

const CircleImg = styled.img`
  height: 37px;
  width: 37px;
  position: absolute;
  top: .5em;
  right: 0.5em;
`

export class CircleIcon extends React.Component<ICircleIconProps> {
  public render() {
    return (
      <Circle style={{ backgroundColor: this.props.fill }} >
        <CircleImg src={this.props.iconImage} />
      </Circle>
    )
  }
}