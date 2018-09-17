import * as React from 'react';
import styled from 'styled-components';
import '../../assets/stylesheets/SupportUs.css'
import {DonateButton} from '../shared/DonateButton'
// import {InfoButton} from '../shared/InfoButton'
// const contentHeight = 430;
const SupportUsPageWrapper = styled.div`

`
const QuoteWrapper = styled.div`
padding-top: 300px;
background-color: #D2D2D2;
height: 430px;
`

const SupportStatement = styled.div`
padding-top: 75px;
padding-bottom: 100px;
`

const DonateWrapper = styled.div`

`

export class SupportUs extends React.Component {
    public render() {
        return (
            <SupportUsPageWrapper>
                <QuoteWrapper>
                    <div className="quote">"Games shouldn't only be fun. They should <br/>
                    teach or spark an interest in other things."
                    </div>
                    <div className="author"> Hideo Kojima </div>
                </QuoteWrapper>
                <SupportStatement>
                    <div className="supportTitle">Support Nuevo Foundation</div>
                    <div className="missionStatement">Nuevo Foundation mission is to change the way the world tackles education by investing in companies,<br/>
                    leaders and ideas. Your donation will help build more businesses that serve the poor. Simply complete the<br/>
                    form below to donate online.
                    </div>
                </SupportStatement>
                <DonateWrapper>
                    <div className="donate">Select an amount </div>
                    <DonateButton text="$20"/> <DonateButton text="$50"/> <DonateButton text="$100"/> <DonateButton text="$250"/> <DonateButton text="Other"/>                    
                </DonateWrapper>
        </SupportUsPageWrapper>
        )
    }
}
