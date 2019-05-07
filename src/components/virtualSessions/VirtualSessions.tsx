import * as React from "react";
import styled from "styled-components";
import blockOne from "../../assets/images/virtualsessions/1.png";
import blockTwo from "../../assets/images/virtualsessions/2.png";
import blockThree from "../../assets/images/virtualsessions/3.png";


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

  background-color: #FCC600; /* Green */
  color: #000000;
  border-radius: 4px;
  padding: 11px 56px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  border: none;
`;


export class VirtualSessions extends React.Component {
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
                    <img  src={blockOne} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Primary Preference</PreferenceTitle>
                      Please use this option as your ideal date and time for the virtual session.
                      <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="datetime1" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-12">
                <ul className="list-unstyled">
                  <li >
                    <img  src={blockTwo} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Secondary Preference</PreferenceTitle>
                      Please use this date as your second optional choice for a virtual session.
				              <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="datetime2" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="col-md-4 col-12">
                <ul className="list-unstyled">
                  <li >
                    <img  src={blockThree} alt="Generic placeholder " />
                    <div >
                      <PreferenceTitle >Third Preference</PreferenceTitle>
                      Please use this date as your third optional choice for a virtual session.
                      <br />
                      <br />
                      <input type="datetime-local" id="meeting-time" name="datetime2" />
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
                <SubmitButton type="submit" >Submit Virtual Session Request</SubmitButton>
              </div>
            </div>
          </div>
        </section>
      </VirtualSessionsWrapper>
    );
  }
}