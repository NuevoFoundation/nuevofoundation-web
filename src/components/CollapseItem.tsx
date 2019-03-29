import Collapse from "@material-ui/core/Collapse";
import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ButtonCta } from "./static/common/ButtonCta";

const Item = styled.div`
  color: #000000;
  font-family: "Lato", sans-serif;
  cursor: pointer;
  padding-left: 15px;
`;

const Divider = styled.hr`
  height: 0;
  border: 0;
  border-top: 2px solid #efefef;
`;

const TextContent = styled.div`
  font-family: "Lato", sans-serif;
  font-size: 20px;
  padding-bottom: 50px;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-family: "Lato", sans-serif;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ButtonCtaWrapper = styled.div`
  padding-bottom: 40px;
`;

interface CollapseItemState {
  checked: boolean;
}

interface CollapseItemProps {
  handleClick: (itemIndex: number) => void;
  title: string;
  content: string;
  open: boolean;
  btn?: boolean;
  btnContent?: string;
  btnLink: string;
  last: boolean;
  itemIndex: number;
}

export class CollapseItem extends React.Component<
  CollapseItemProps,
  CollapseItemState
> {
  public constructor(props: CollapseItemProps) {
    super(props);
    this.state = {
      checked: false
    };
  }

  public render() {
    return (
      // tslint:disable-next-line:jsx-no-lambda
      <Item onClick={() => this.props.handleClick(this.props.itemIndex)}>
        <SectionTitle>{this.props.title}</SectionTitle>
        <Collapse in={this.props.open}>
          <Row>
            <Col xs={7}>
              <TextContent>{this.props.content}</TextContent>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              {this.props.btn && (
                <Link
                  to={this.props.btnLink}
                  style={{ textDecoration: "none" }}
                >
                  <ButtonCtaWrapper>
                    <ButtonCta
                      text={this.props.btnContent}
                      backgroundColor={"#FFFFFF"}
                      textColor={"#000000"}
                      border={"4px solid #000000"}
                    />
                  </ButtonCtaWrapper>
                </Link>
              )}
            </Col>
          </Row>
        </Collapse>
        {!this.props.last && (
          <Row>
            <Col xs={8}>
              <Divider />
            </Col>
          </Row>
        )}
      </Item>
    );
  }
}
