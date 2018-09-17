import Collapse from '@material-ui/core/Collapse';
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ButtonCta } from '../static/shared/ButtonCta';

const Item = styled.div`
  color: #FFFFFF;
  font-family: 'Lato', sans-serif;
`

const Divider = styled.hr`
  height:0; 
  border:0; 
  border-top:2px solid #8A88AA; 
`

const TextContent = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  padding-bottom:50px;
`

const SectionTitle = styled.h2`
  padding-top:20px;
  padding-bottom:20px;
`

const ButtonCtaWrapper = styled.div`
  padding-bottom:40px;
`

interface ICollapseItemState {
    checked: boolean;
}

interface ICollapseItemProps {
    title: string;
    content: string;
    open: boolean;
    btn?: boolean;
    btnContent?: string;
    btnLink?: string;
    last: boolean;
}

export class CollapseItem extends React.Component<ICollapseItemProps, ICollapseItemState> {
    constructor(props: ICollapseItemProps) {
        super(props);
        this.state = {
            checked: false
        }
    }

    public render() {
        //  const { checked } = this.state;
        return (
            <Item >
                <SectionTitle>{this.props.title}</SectionTitle>
                <Collapse in={this.props.open}>
                    <TextContent>{this.props.content}</TextContent>
                    {this.props.btn &&
                        <Link to={this.props.btnLink!} style={{ textDecoration: 'none' }}>
                            <ButtonCtaWrapper>
                                <ButtonCta text={this.props.btnContent} backgroundColor={'#433F79'} textColor={'#FFFFFF'} border={'2px solid #FFFFFF'} />
                            </ButtonCtaWrapper>
                        </Link>
                    }
                </Collapse>
                {!this.props.last &&
                    <Divider />
                }
            </Item>
        )
    }
}