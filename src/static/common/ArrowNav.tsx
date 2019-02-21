import * as React from "react";
import styled from 'styled-components';

// CLEAN UP CODE ON 2/21/19

const ArrowWrapper = styled.div`
margin: 0;
padding: 0;
box-sizing: border-box;
display: flex;
width: 30%;

p {
    font-size: 2rem;
    font-family: 'Lato', sans-serif;
    position: relative;
    top: -1.5rem;
    text-align: center;
}
`

const ArrowRightStyle = styled.div`
width: 100%;
height: 8rem;
background-color: red;
border-top: 4rem solid red;
`

const ArrowRightTip = styled.div`
height: 0;
border: 100px solid blue;
border-style: solid;
border-color: blue;
border-width: 4rem 0 4rem 2rem;
border-color: transparent transparent transparent red;
`

const ArrowIndent = styled.div`
width: 100%;
height: 8rem;
background-color: red;
-webkit-transform: rotate(0deg) skew(0deg);
transform: rotate(0deg) skew(0deg); 
border-left: 2rem solid white; 
border-bottom: 4rem solid red; 
border-top: 4rem solid red;
`


export const ArrowRight = (text: any) => {
    return (
        <ArrowWrapper>
            <ArrowRightStyle>
                <p>{text.text}</p>
            </ArrowRightStyle>
            <ArrowRightTip/>
        </ArrowWrapper>
    )
}

export const ArrowIndentAndRight = (text: any) => {
    return (
        <ArrowWrapper>
            <ArrowIndent>
                <p>{text.text}</p>
            </ArrowIndent>
            <ArrowRightTip/>
        </ArrowWrapper>
    )
}

export const ArrowOnlyIndent = (text: any) => {
    return (
        <ArrowWrapper>
            <ArrowIndent>
                <p>{text.text}</p>
            </ArrowIndent>
        </ArrowWrapper>
    )
}