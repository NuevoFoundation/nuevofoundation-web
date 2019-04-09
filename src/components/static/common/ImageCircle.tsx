import * as React from "react";
import styled from "styled-components";

// TODO: replace this with flex later
const CircularImage = styled.img`
  border-radius: 50%;
`;

interface ImageCircleProps {
  imageSrc: string;
  imgHeight: string;
  imgWidth: string;
}

export class ImageCircle extends React.Component<ImageCircleProps, {}> {
  constructor(props: ImageCircleProps) {
    super(props);
  }

  public render() {
    return (
      <CircularImage
        src={this.props.imageSrc}
        height={this.props.imgHeight}
        width={this.props.imgWidth}
      />
    );
  }
}
