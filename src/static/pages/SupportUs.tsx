import * as React from 'react';
import styled from 'styled-components';
import robot from "../../assets/images/robot.svg";
import '../../assets/stylesheets/SupportUs.css'
import {DonateButton} from '../common/DonateButton'

const SupportUsPageWrapper = styled.div`
color: "black"
`

const SupportStatement = styled.div`
padding-top: 7rem;
`

const RobotImageWrapper = styled.div`
width: 20%;
`

const DonateWrapper = styled.div`
border: .8rem solid #26DE81;
border-radius: 1.4rem;
width: 90%;
margin-left: 4.8rem;
height: 80vh;
margin-bottom:14rem;
`


export class SupportUs extends React.Component {
    public render() {
        return (
            <SupportUsPageWrapper>
                <SupportStatement className="padding-left-48">
                    <div className="supportTitle">Support Nuevo Foundation</div>
                    <div className="missionStatement">Nuevo Foundation mission is to change the way the world tackles education by investing in companies, leaders and ideas. Your donation will help build more businesses that serve the poor. 
                    </div>
                </SupportStatement>
                <DonateWrapper id="donateWrapper">
                    <p>HEllo</p>
                    <DonateButton text="$20"/>
                    <DonateButton text="$50"/>
                    <DonateButton text="$100"/>
                    <DonateButton text="$250"/>
                    <RobotImageWrapper>
                        <img src={robot}/>
                    </RobotImageWrapper>
                </DonateWrapper>
        </SupportUsPageWrapper>
        )
    }
}
