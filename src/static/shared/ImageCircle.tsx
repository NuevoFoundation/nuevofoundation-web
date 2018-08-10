import * as React from 'react';
import styled from 'styled-components';

// TODO: replace this with flex later
const CircularImage = styled.img`
  border-radius: 50%;
`

interface IImageCircleProps {
    imageSrc: string,
    imgHeight: string;
    imgWidth: string;
}

export class ImageCircle extends React.Component<IImageCircleProps, {}> {
    constructor(props: IImageCircleProps) {
        super(props);
    }

    public render() {
        return (
            <CircularImage src={this.props.imageSrc} height={this.props.imgHeight} width={this.props.imgWidth}/>
        )
    }
}