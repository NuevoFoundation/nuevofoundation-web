import * as React from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements'
import styled from 'styled-components';
import robot from "../../assets/images/robot.svg";
import '../../assets/stylesheets/SupportUs.css'
import * as ArrowNav from "../common/ArrowNav";
import {DonateButton} from '../common/DonateButton'
import {InfoButton} from '../common/InfoButton';

const SupportUsPageWrapper = styled.div`
color: "black"
`

const SupportStatement = styled.div`
padding-top: 2.7rem;
`

const RobotImageWrapper = styled.div`
width: 28%;
padding-top: 3rem;
padding-left: .4rem;
`

const DonateWrapper = styled.div`
border: .8rem solid #26DE81;
border-radius: 2rem;
width: 90%;
margin-left: 4.8rem;
min-height: 82vh;
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

#donateButton {
    margin-right: 2.3rem;
    margin-top: 1.4rem;
}
`
const InputLabel = styled.label`
`
const TextInput = styled.input`
width: 37%;
height: 4rem;
`

const SelectContentWrapper = styled.div`
`

const InformationContentWrapper = styled.div`
display: none;
`

const ButtonsInline = styled.div`
display: flex;

div {
    margin-right: 2rem;
    margin-bottom: 3rem;
}
`

const InputLabelWrapper = styled.div`
display: flex
flex-direction: column;
`
class SupportUs extends React.Component<any> {
    public state = {
        amount: "$150.00",
        page: 0
    }

    public nextSupportContent() {
        this.setState({
            page: this.state.page+1
        }, () => {
            this.changeSupportContent();
        })
    }

    public changeSupportContent() {
        // tslint:disable-next-line
        console.log(this.state.page)
        switch(this.state.page) {
            case 1: 
            this.changeInsideContent("second");
            break;
            case 2:
            this.changeInsideContent("first");
            break;
            default:
            alert(this.state.page)
            break;
        }
    }

    public changeInsideContent(classes: string) {
        const allOtherPages = document.getElementsByClassName(`${classes}`) as HTMLCollectionOf<HTMLElement>;
        const pagesToHide = Array.from(allOtherPages);
        pagesToHide.forEach(page => {
            page.style.display="none"
        })

        const pageToShow = document.querySelector(`#${classes}`) as HTMLElement;
        pageToShow.style.display = "block"
        return;
    }








    public async submit(ev: any) {
        const {token} = await this.props.stripe.createToken({name: "Name"});
        const response = await fetch("/charge", {
          method: "POST",
          headers: {"Content-Type": "text/plain"},
          body: token.id
        });
      
        if (response.ok) {
            // tslint:disable-next-line
            console.log("Purchase Complete!")
        }
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
                    <ArrowNav.ArrowRight id="1" text="Select Amount"/>
                    <ArrowNav.ArrowIndentAndRight id="2" text="Your Information"/>
                    <ArrowNav.ArrowIndentAndRight id="3" text="Payment"/>
                    <ArrowNav.ArrowOnlyIndent id="4" text="Thank you!"/>
                </DonateNav>

                <DonateContentWrapper>
                    <DonateContentFirstHalf>
                        <SelectContentWrapper id="first" className="second">
                            <p className="donateSelectStatement">Select amount in USD that you would like to donate</p>
                            <DonateButton text="$20"/>
                            <DonateButton text="$50"/>
                            <DonateButton text="$100"/>
                            <DonateButton text="$250"/>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="amount">Enter other amount</InputLabel>
                                <TextInput type="number" min="1" id="amount" placeholder="$0.00"/>
                            </InputLabelWrapper>

                            <p className="amountDisplay">Total amount: {this.state.amount}</p>
                        </SelectContentWrapper>
    

                        <InformationContentWrapper id="second" className="first">
                            <p className="donateSelectStatement">Please add your information in the following fields.</p>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="name">Name *</InputLabel>
                                <TextInput type="text" id="name" placeholder="First and last name"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="email">Email *</InputLabel>
                                <TextInput type="text" id="email" placeholder="you@email.com"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                                <TextInput type="text" id="phone" placeholder="(000) 000-000"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="gender">Choose</InputLabel>
                                <TextInput type="text" id="gender" placeholder="Male"/>
                            </InputLabelWrapper>
                        </InformationContentWrapper>

                        <ButtonsInline>
                            {/* tslint:disable-next-line */}
                            <InfoButton action={this.nextSupportContent.bind(this)} textColor="black" backgroundColor="#26DE81" borderColor="#26DE81">Next</InfoButton>
                            <InfoButton textColor="black" backgroundColor="white" borderColor="#FCC600">Cancel</InfoButton>
                        </ButtonsInline>
                        <CardElement/>
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


export default injectStripe(SupportUs)