import Collapse from '@material-ui/core/Collapse';
import * as React from 'react';
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
  padding-bottom:20px;
`

interface ICollapseItemState {
    checked: boolean;
}

interface ICollapseItemProps {
    title: string;
    content: string;
}

export class CollapseItem extends React.Component<ICollapseItemProps, ICollapseItemState> {
    constructor(props: ICollapseItemProps) {
        super(props);
        this.state = {
            checked: false
        }
    }

    public handleClick = () => {
        this.setState({
            checked: !this.state.checked
        });
    }

    public render() {
        const { checked } = this.state;
        return (
            <Item >
                <h2 onClick={this.handleClick} >{this.props.title}</h2>
                <Collapse in={checked}>
                    <TextContent>{this.props.content}</TextContent>
                    <ButtonCta text={'About us'} backgroundColor={'#433F79'} textColor={'#FFFFFF'} border={'2px solid #FFFFFF'} />
                </Collapse>
                <Divider />
            </Item>
        )
    }
}