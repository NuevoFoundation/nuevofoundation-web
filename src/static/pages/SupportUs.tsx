import * as React from 'react';
import styled from 'styled-components';
import robot from "../../assets/images/robot.svg";
import '../../assets/stylesheets/SupportUs.css'
import * as ArrowNav from "../common/ArrowNav";
import {DonateButton} from '../common/DonateButton'

const SupportUsPageWrapper = styled.div`
color: "black"
`

const SupportStatement = styled.div`
padding-top: 2.7rem;
`

const RobotImageWrapper = styled.div`
width: 28%;
padding-top: 3rem;
background-color: yellow;
padding-left: .4rem;
`

const DonateWrapper = styled.div`
border: .8rem solid #26DE81;
border-radius: 2rem;
width: 90%;
margin-left: 4.8rem;
height: 82vh;
margin-bottom:14rem;
`

const DonateContentWrapper = styled.div`
display: flex;
`

const DonateNav = styled.div`
width: 100%;
height: 8rem;
display: flex;
`

const DonateContentFirstHalf = styled.div`
padding-top: 4rem;
padding-left: 3.3rem;
width: 70%;

p {
    font-size: 1.8rem;
    word-spacing: .05rem;
}

#donateButton {
    margin-right: 2.3rem;
    margin-top: 1.4rem;
}
`

export class SupportUs extends React.Component {
    public state = {
        amount: 0
    }
    public render() {
        return (
            <SupportUsPageWrapper>
                <SupportStatement className="padding-left-48">
                    <div className="supportTitle">Support Nuevo Foundation</div>
                    <div className="missionStatement">Nuevo Foundation mission is to change the way the world tackles education by investing in companies, leaders and ideas. Your donation will help build more businesses that serve the poor. 
                    </div>
                </SupportStatement>
                <DonateWrapper id="donateWrapper">
                <DonateNav>
                    <ArrowNav.ArrowRight text="Select Amount"/>
                    <ArrowNav.ArrowIndentAndRight text="Your Information"/>
                    <ArrowNav.ArrowIndentAndRight text="Payment"/>
                    <ArrowNav.ArrowOnlyIndent text="Thank you!"/>
                </DonateNav>

                <DonateContentWrapper>
                    <DonateContentFirstHalf>
                        <p>Select amount in USD that you would like to donate</p>
                        <DonateButton text="$20"/>
                        <DonateButton text="$50"/>
                        <DonateButton text="$100"/>
                        <DonateButton text="$250"/>
                    </DonateContentFirstHalf>
                    
                    <RobotImageWrapper>
                    <img src={robot}/>
                    </RobotImageWrapper>
                </DonateContentWrapper>
                </DonateWrapper>
        </SupportUsPageWrapper>
        )
    }
};
