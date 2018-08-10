import * as React from 'react';
import styled from 'styled-components';
import '../../assets/AboutUs.css';

const contentHeight = 370;

const AboutUsWrapper = styled.div`
  background-color: #D2D2D2;
  height: ${contentHeight}px;
`;

const QuoteWrapper = styled.div`
  background-color: #D2D2D2;
  height: 430px;
`

const VisionWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`

const VisualWrapper = styled.div`
  background-color: #D2D2D2;
  height: 370px;
`
const MissionWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`
const MessageWrapper = styled.div`
  background-color: #D2D2D2;
  height: 370px;
`
const OurTeamWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`
const BoardWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`

export class AboutUs extends React.Component {
  public render():any {
    return (
      <AboutUsWrapper>
        <QuoteWrapper>
          <div className="quote-text">"Games shouldn’t only be fun. They should teach or spark an interest in other things."
          Hideo Kojima</div>
        </QuoteWrapper>

        <VisionWrapper>
          <div className="vision-title">Vision</div>

          <div className="vision-left-text">
            <strong>Identifying resource gaps</strong> among<br/>underserved communities where<br/>
            <strong>technology</strong> can have an impact.
          </div>

          <div className="vision-right-text">
            Nuevo Foundation is a non‐profit run by a group
            of passionate friends that want to help the world’s
            disadvantaged societies and build solutions that
            would enable them to have future opportunities.
          </div>
        </VisionWrapper>

        <VisualWrapper>
          <div className="visual-visual-element-left">
            Visual Element
          </div>

          <div className="visual-right-text">
           “It is an incredibly exciting time to be in tech but the<br/>
            bar to enter these industries is disproportionately<br/>
            higher for low-income and minority groups.”<br/>
            - By Someone
          </div>
        </VisualWrapper>

        <MissionWrapper>
          <div className="mission-visual-left">
            Picture or Video
          </div>

          <div className="mission-title-right">
            Mission
          </div>

          <div className="mission-text-right">
            Identifying resource gaps among
            underserved communities where
            technology can have an impact.
          </div>
        </MissionWrapper>
          
        <MessageWrapper>
          <div className="message-image">jaldj</div>
          <div className="message-text">We started this foundation as we all realize that there are gaps in the technology
            industry. We want to encourage, teach, and help girls in early ages to spark their
            interest in Science, Technology, Engineering, and Math ﴾STEM﴿ by providing multiple
            curriculum where they can learn the basics of coding regardless of resources.</div>
        </MessageWrapper>

        <OurTeamWrapper><div className="our-team-title">Our Team</div></OurTeamWrapper>

        <BoardWrapper><div className="board-team-title-one">Board Team Group Title</div></BoardWrapper>

      </AboutUsWrapper>

    );
    // <IntroMessage/>
  }
}
