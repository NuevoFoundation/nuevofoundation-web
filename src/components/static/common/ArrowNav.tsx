import * as React from "react";
import styled from 'styled-components';

// #26DE81
// Grey #ededed

const ArrowWrapper = styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
display: flex;
width: 30%;

p {
    font-size: 2.5rem;
    font-family: 'Lato', sans-serif;
    position: relative;
    top: -1.5rem;
    text-align: center;

    @media(max-width: 1200px) {
        font-size: 2.2rem;
        top: -1.rem;
        left: 1.3rem;
    }

    @media(max-width: 900px) {
        font-size: 2rem;
        left: 1rem;
    }
}

@media(max-width: 900px) {
    div {
        height: 6rem;
    }
}

`

const ArrowRightStyle = styled.div`
width: 100%;
height: 8rem;
background-color: ${props => props.color};
border-top: 3rem solid ${props => props.color};
outline: 4px solid ${props => props.color};
outline-offset: -4px;
}
`

const ArrowRightTip = styled.div`
border-style: solid;
border-width: 4rem 0 4rem 2rem;
border-color: transparent transparent transparent ${props => props.color};
position: relative;
right: .1rem;
}

@media(max-width: 900px) {
    border-width: 3rem 0 3rem 1rem;
}
`

const ArrowIndent = styled.div`
width: 100%;
height: 8rem; 
padding-top: 3rem;
background-color: ${props => props.color};
-webkit-clip-path: polygon(0 0, 50% 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10% 50%);
clip-path: polygon(0 0, 50% 0, 100% 0, 100% 50%, 100% 100%, 0 100%, 10% 50%);
position: relative;
left: .1rem;
`


export const ArrowRight = (props: any) => {
    return (
        <ArrowWrapper>
            <ArrowRightStyle color={(!props.color) ? "#ededed" : props.color}>
                <p>{props.text}</p>
            </ArrowRightStyle>
            <ArrowRightTip color={(!props.color) ? "#ededed" : props.color}/>
        </ArrowWrapper>
    )
}

export const ArrowIndentAndRight = (props: any) => {
    return (
        <ArrowWrapper>
            <ArrowIndent color={(!props.color) ? "#ededed" : props.color}>
                <p>{props.text}</p>
            </ArrowIndent>
            <ArrowRightTip color={(!props.color) ? "#ededed" : props.color}/>
        </ArrowWrapper>
    )
}

export const ArrowOnlyIndent = (props: any) => {
    return (
        <ArrowWrapper>
            <ArrowIndent color={(!props.color) ? "#ededed" : props.color}>
                <p>{props.text}</p>
            </ArrowIndent>
        </ArrowWrapper>
    )
}