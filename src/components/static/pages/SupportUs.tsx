import Axios from 'axios';
import * as React from 'react';
import { CardCVCElement ,CardExpiryElement, CardNumberElement ,injectStripe} from 'react-stripe-elements'
import styled from 'styled-components';
import robot from "../../../assets/images/robot.svg";
import '../../../assets/stylesheets/SupportUs.css'
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

@media(max-width: 1200px) {
    width: 98%;
    margin-left: 1rem;
}

@media(max-width: 900px) {
    min-height: 90vh;
    margin-left: 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden
}
`

const LoadingModal = styled.div`
position: absolute;
background-color: rgba(255, 255, 255, 0.74);
width: 90%;
min-height: 82vh;
max-height: 100%;
z-index: 3;
flex-direction: column;
align-items: center;
justify-content: center;
left: 4.8rem;
outline: 2rem solid rgba(255, 255, 255, 0.74);
display: none;
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

    @media(max-width: 1200px) {
        margin-right: 1.8rem;
    }
}
`
const InputLabel = styled.label`
`
const TextInput = styled.input`
width: 37%;
height: 4rem;

&::placeholder {
    padding-left: 1rem;
}

@media(max-width: 1200px) {
    width: 50%;
}
`

const SelectInput = styled.select`
width: 37%;
height: 4rem;

&::placeholder {
    padding-left: 1rem;
}
`

const SelectContentWrapper = styled.div`
`

const InformationContentWrapper = styled.div`
display: none;
`

const PaymentContentWrapper = styled.div`
display: none;
`

const ThankYouWrapper = styled.div`
display: none;
width: 100%;
`

const ThankYouContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 3rem;
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


interface ISupportUsState {
    amount: number,
    page: number,
    showing: boolean,
    display: string,
    fullName: string,
    email: string,
    phone: string,
    yourInformation: string,
    payment: string,
    thankYou: string,
    genderValue: string,
}



// This code has not been refactored, needs a lot of cleaning
// Not mobile-friendly or responsive
// Need to add production keys for stripe
// Other than that, functionality is fine (:
// Perhaps we should add a back button just in case users want to edit something

class SupportUs extends React.Component<any, ISupportUsState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            amount: 0,
            page: 0,
            showing: false,
            display: "none",
            fullName: "",
            email: "",
            phone: "",
            yourInformation: "",
            payment: "",
            thankYou: "",
            genderValue: "Gender"
        }
    }

    public resetState() {
        Array.from(document.getElementsByTagName('input')).forEach(element => {
        element.value = ""
        });

        this.setState({
            amount: 0,
            page: 0,
            showing: false,
            display: "none",
            fullName: "",
            email: "",
            phone: "",
            yourInformation: "",
            payment: "",
            thankYou: "",
        })
    }

    public cancelOtherContent() {
        this.setState({
            page: 0
        }, () => {this.changeSupportContent()})
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
        switch(this.state.page) {
            case 0:
            this.changeInsideContent("first");
            break;
            case 1: 
            this.changeInsideContent("second");
            this.setState({yourInformation: "#26DE81"})
            break;
            case 2:
            this.changeInsideContent("third");
            this.setState({payment: "#26DE81"})
            break;
            case 3:
            this.changeInsideContent("fourth");
            this.setState({thankYou: "#26DE81"})
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
        const {token} = await this.props.stripe.createToken({name: this.state.fullName});

        if(!token || this.state.amount < 1) {return};
        this.handleModal();
        Axios.post(`https://wt-f5be570962b89bfc801d26215a5caa31-0.sandbox.auth0-extend.com/stripe-payment/payment?amount=${Math.round(this.state.amount * 100)}&currency=USD&description=test`, {
            stripeToken: token.id,
            phoneNumber: this.state.phone || "",
            email: this.state.email  || "",
            gender: this.state.genderValue
        }).then(res => {
            this.handleModal();
            this.nextSupportContent();
        })
    }


    public async handleModal() {
        this.setState(prevState => ({
            showing: !prevState.showing
        }), () => {
        if(this.state.showing === true) {
            this.setState({
                display: "flex"
            })
        }
        else {
            this.setState({
                display: "none"
            })
        }
        })
    }

    public handlePaymentAmount(amountValue: number) {
        this.setState({
            amount: amountValue
        })
    }

    public handleInputPaymentAmount(e: any) {
        const inputValue = e.target.value
        this.setState({
            amount: inputValue
        })
    }

    public handleInputChange(e: any) {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        } as { [K in keyof ISupportUsState]: ISupportUsState[K] }, () => {
            // ts-lint:disable-next-line
            console.log(this.state.genderValue)
        });
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

                <LoadingModal style={{display: this.state.display}}>
                    <h3 style={{color: "#017094"}}>PROCESSING PAYMENT...</h3>

                    <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"/>
                    </svg>
                </LoadingModal>


                <DonateNav>
                    <ArrowNav.ArrowRight id="1" text="Select Amount" color="#26DE81"/>
                    <ArrowNav.ArrowIndentAndRight id="2" text="Your Information" color={this.state.yourInformation}/>
                    <ArrowNav.ArrowIndentAndRight id="3" text="Payment" color={this.state.payment}/>
                    <ArrowNav.ArrowOnlyIndent id="4" text="Thank you!" color={this.state.thankYou}/>
                </DonateNav>

                <DonateContentWrapper>
                    <DonateContentFirstHalf className="fourth">
                        <SelectContentWrapper id="first" className="second third fourth">
                            <p className="donateSelectStatement">Select amount in USD that you would like to donate</p>
                            {/* tslint:disable-next-line */}
                            <DonateButton color={"#79DB74"} action={(e: React.MouseEvent) => {this.handlePaymentAmount(20)}}text="$20"/>
                            {/* tslint:disable-next-line */}
                            <DonateButton color={"#79DB74"} action={(e: React.MouseEvent) => {this.handlePaymentAmount(50)}}text="$50"/>
                            {/* tslint:disable-next-line */}
                            <DonateButton color={"#79DB74"} action={(e: React.MouseEvent) => {this.handlePaymentAmount(100)}}text="$100"/>
                            {/* tslint:disable-next-line */}
                            <DonateButton color={"#79DB74"} action={(e: React.MouseEvent) => {this.handlePaymentAmount(250)}} text="$250"/>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="amount">Enter other amount</InputLabel>
                                {/* tslint:disable-next-line */}
                                <TextInput onChange={this.handleInputPaymentAmount.bind(this)} type="number" min="1" id="amount" placeholder="$0.00"/>
                            </InputLabelWrapper>

                            <p className="amountDisplay">Total amount: ${this.state.amount}</p>
                        </SelectContentWrapper>
    

                        <InformationContentWrapper id="second" className="first third fourth">
                            <p className="donateSelectStatement">Please add your information in the following fields.</p>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="name">Name *</InputLabel>
                                {/* tslint:disable-next-line */}
                                <TextInput required={true} name="fullName" onChange={this.handleInputChange.bind(this)} type="text" id="name" placeholder="First and last name"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="email">Email *</InputLabel>
                                {/* tslint:disable-next-line */}
                                <TextInput required={true} name="email" onChange={this.handleInputChange.bind(this)} type="text" id="email" placeholder="you@email.com"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                                {/* tslint:disable-next-line */}
                                <TextInput required={true} name="phone" onChange={this.handleInputChange.bind(this)} type="text" id="phone" placeholder="(000) 000-000"/>
                            </InputLabelWrapper>

                            <InputLabelWrapper className="amountInput">
                            <InputLabel htmlFor="gender">Choose</InputLabel>
                            {/* tslint:disable-next-line */}
                            <SelectInput name="genderValue" defaultValue={this.state.genderValue} onChange={this.handleInputChange.bind(this)} >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                                <option value="Non-Binary">Non-Binary</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </SelectInput>
                                {/* tslint:disable-next-line */}
                                {/* <TextInput required={true} name="gender" onChange={this.handleInputChange.bind(this)} type="text" id="gender" placeholder="Male"/> */}
                            </InputLabelWrapper>
                        </InformationContentWrapper>

                        {/* tslint:disable-next-line */}
                        <PaymentContentWrapper onSubmit={this.submit.bind(this)} id="third" className="first second fourth">
                            <InputLabelWrapper>
                                <InputLabel>Credit Card Number *</InputLabel>
                                <CardNumberElement className="cardelement"/>
                            </InputLabelWrapper>
                            <InputLabelWrapper>
                                <InputLabel>Experation *</InputLabel>
                                <CardExpiryElement className="cardelement"/>
                            </InputLabelWrapper>
                            <InputLabelWrapper>
                                <InputLabel>CVC / CVV  *</InputLabel>
                                <CardCVCElement className="cardelement"/>
                            </InputLabelWrapper>
                            <p className="amountDisplay">Total amount: ${this.state.amount}</p>
                            {/* tslint:disable-next-line */}
                            {/* <button onClick={this.submit.bind(this)} type="submit">Save</button> */}
                        </PaymentContentWrapper>

                        <ButtonsInline>
                            {this.state.page === 2 ? (
                                // tslint:disable-next-line
                                <InfoButton action={this.submit.bind(this)} textColor="black" backgroundColor="#26DE81" borderColor="#26DE81">Next Pay</InfoButton>
                            ) : (
                                // tslint:disable-next-line
                                <InfoButton action={this.nextSupportContent.bind(this)} textColor="black" backgroundColor="#26DE81" borderColor="#26DE81">Next</InfoButton>
                            )}
                            <InfoButton action={ () => {
                                this.cancelOtherContent()
                                this.resetState();
                            }} textColor="black" backgroundColor="white" borderColor="#FCC600">Cancel</InfoButton>
                        </ButtonsInline>
                    </DonateContentFirstHalf>

                    <ThankYouWrapper id="fourth" className="first second third">
                            <ThankYouContent>
                                <p className="thankYouText">Thank you for your donation!</p>
                                <p className="thankYouText">You have donated to Nuevo Foundation ${this.state.amount}</p>
                                <img style={{width: "20rem"}} src={robot}/>
                            </ThankYouContent>
                        </ThankYouWrapper>
                    
                    <RobotImageWrapper className="fourth">
                    <img src={robot}/>
                    </RobotImageWrapper>
                </DonateContentWrapper>
                </DonateWrapper>
        </SupportUsPageWrapper>
        )
    }
};


export default injectStripe(SupportUs)
