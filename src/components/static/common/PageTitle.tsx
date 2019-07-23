import * as React from "react";
import styled from "styled-components";

interface PageTitleProps {
  title: string;
}

const Title = styled.div`
  font-family: 'Space Mono', monospace;
  font-size: 28px;
  font-weight: bold;
  color : #000000;
  padding-left: 22px;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height : 147px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);


`

export class PageTitle extends React.Component<PageTitleProps> {
    render() {
        return (
            <Container>
                <Title>{this.props.title}</Title>
            </Container>
        );
    }
}