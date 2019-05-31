import * as React from "react";
import styled from "styled-components";
import blockOne from "../../assets/images/virtualsessions/1.png";
import blockTwo from "../../assets/images/virtualsessions/2.png";
import blockThree from "../../assets/images/virtualsessions/3.png";
import { VirtualSessionInterface } from "../../models/VirtualSession";
import { ServiceResolver } from "../../services/ServiceResolver";


const VirtualSessionsWrapper = styled.div`
  font-family: "Lato", sans-serif;
  color: #212529;
  padding-bottom: 20px;

  li {
    display: flex;
    align-items: flex-start;
    

    img { 
      margin-right: 1rem;
    }
  }
`
const PreferenceTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`

const SubmitButton = styled.button`
  font-family: "Lato", sans-serif;

  background-color: #FCC600;
  color: #000000;
  border-radius: 4px;
  padding: 11px 56px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border: none;

  :disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`;

interface NewVirtualSessionState {
  timePreferenceOne?: string;
  timePreferenceTwo?: string;
  timePreferenceThree?: string;
  submitDisabled?: boolean;
}

export class NewVirtualSession extends React.Component<{}, NewVirtualSessionState> {
  public apiService = new ServiceResolver().ApiService();
  constructor(props: {}) {
    super(props);
    this.state = {
      timePreferenceOne: undefined,
      timePreferenceTwo: undefined,
      timePreferenceThree: undefined,
      submitDisabled: true
    }
  }

  handleDateTimePreferenceChange = (e: any) => {    
    this.setState({
      [e.target.name]: e.target.value
    }, this.handleDisableChange)
  }

  handleDisableChange = () => {
    const { timePreferenceOne, timePreferenceTwo, timePreferenceThree } = this.state;
    const submitDisabled = timePreferenceOne === undefined || timePreferenceTwo === undefined || timePreferenceThree === undefined ? true : false;
    this.setState({
      submitDisabled
    })
  }

  handleSubmit = async () => {
    const { timePreferenceOne, timePreferenceTwo, timePreferenceThree } = this.state;
    const virtualSession: VirtualSessionInterface = {
      timePreferenceOne: timePreferenceOne,
      timePreferenceTwo: timePreferenceTwo,
      timePreferenceThree: timePreferenceThree,
      educatorId: "91969683-9613-4f7c-b72e-81cf401ef963" // TODO: replace with authenticated educator
    }
    await this.apiService.createVirtualSession(virtualSession);
  }

  public render() {
    return (
      <VirtualSessionsWrapper>
        <section>
          <div className="jumbotron text-center">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <h1>Schedule A Virtual Session</h1>
                  <p>A virtual session is an opportunity for your students to talk to someone at Microsoft and other STEM professionals over Teams/Skype/Hangouts/Zoom who are excited and passionate about technology and sharing their experience. You can use this as a way for your students to learn about what it's like to work in technology. We also use the time to have the students ask questions about tech or anything they're curious about.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h1>Select Event Dates</h1>
                <p>We need three potential dates that will work for you so that it increases your odds of getting an Expert in a STEM field.</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-12">
                <ul className="list-unstyled">
                  <li >
                    <img src={blockOne} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Primary Preference</PreferenceTitle>
                      Please use this option as your ideal date and time for the virtual session.
                      <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="timePreferenceOne" onChange={this.handleDateTimePreferenceChange} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-12">
                <ul className="list-unstyled">
                  <li >
                    <img src={blockTwo} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Secondary Preference</PreferenceTitle>
                      Please use this date as your second optional choice for a virtual session.
				              <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="timePreferenceTwo" onChange={this.handleDateTimePreferenceChange} />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-12">
                <ul className="list-unstyled">
                  <li >
                    <img src={blockThree} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Third Preference</PreferenceTitle>
                      Please use this date as your third optional choice for a virtual session.
                      <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="timePreferenceThree" onChange={this.handleDateTimePreferenceChange} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <p>To complete registration for a virtual session click the button below, we will reach out to our virtual session STEM field experts! You will hear from us soon!</p>
                <input type="hidden" name="school-name" placeholder="Gray Middle School" />
                <input type="hidden" name="school-email" placeholder="jeisaacs@microsoft.com" />
                <SubmitButton type="submit" disabled={this.state.submitDisabled} onClick={this.handleSubmit}>Submit Virtual Session Request</SubmitButton>
              </div>
            </div>
          </div>
        </section>
      </VirtualSessionsWrapper>
    );
  }
}