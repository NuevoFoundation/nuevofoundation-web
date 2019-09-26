import * as React from "react";
import styled from "styled-components";
import speakerNuvi from "../../../assets/logos/nuvi/speaker_nuvi.png";
import workshopNuvi from "../../../assets/logos/nuvi/virtual_session_nuvi.png";
import virtualNuvi from "../../../assets/logos/nuvi/workshop_nuvi.png";

import getInvolvedCodingWorkshop from "../../../assets/images/getinvolved/CodingWorkshop.jpg";
import getInvolvedSpeakingSeries from "../../../assets/images/getinvolved/SpeakerSeries.jpg";
import getInvolvedVirtualSession from "../../../assets/images/getinvolved/VirtualSession.jpg";

import "../../../assets/stylesheets/WhatWeDo.css";
import {
  Col,
  Grid,
  Row,
  Image,
  Button
} from "react-bootstrap";
import { PageTitle } from "../common/PageTitle";
import { Const } from "../../../Const";
import ReactGA from "react-ga";

const Background = styled.div`
  background-repeat: none;
  font-family: "Lato", sans-serif;
  
`;

const WorskshopAlignment = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 1.5em;
`;

class Service {
  title: string;
  icon: string;
  img: string;
  color: string;
  textColor: string;
  buttonLink: string;
  description: string;

  constructor(title: string, icon: string, img: string, color: string, buttonLink: string, description: string) {
    this.title = title;
    this.icon = icon;
    this.img = img;
    this.color = color;
    this.textColor = "#000000";
    this.buttonLink = buttonLink;
    this.description = description;
  }
}

export class WhatWeDo extends React.Component<{}, { width: number }>  {
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.WhatWeDoPage);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  static readonly Services: Service[] = [
    {
      title: "Coding Workshops",
      icon: workshopNuvi,
      img: getInvolvedCodingWorkshop,
      color: "#FFFFFF",
      textColor: "#000000",
      buttonLink: "https://aka.ms/nfsignup",
      description: "Nuevo Coding Workshops are offered for students of a variety of ages and backgrounds. We have created custom curricula in many languages including Scratch, Python, JavaScript, HTML/CSS, and C# to engage both the analytical and creative sides of a student. Within our curricula we also include a hands-on activity to show different aspects of STEM. Out goal is to make coding fun, engaging, and accessible - and show that anyone can code!"
    },
    {
      title: "Virtual Sessions",
      icon: virtualNuvi,
      img: getInvolvedVirtualSession,
      color: "#d2d2d2",
      textColor: "#000000",
      buttonLink: "https://aka.ms/nfsignup",
      description: "Nuevo Virtual Session is a program where guest speakers from different backgrounds and roles offer live conversations with your classroom or organization. Each session is 30 minutes and it is designed in a way that the guest speaker gets to share their experience in how they got where they are. It's also an opportunity for the students to ask them questions about their role which can be new to them. After our sessions, your students will feel inspired and encouraged to learn more about STEM education."
    },
    {
      title: "Speaker Series",
      icon: speakerNuvi,
      img: getInvolvedSpeakingSeries,
      color: "#000000",
      textColor: "#FFFFFF",
      buttonLink: "https://aka.ms/nfsignup",
      description: "Nuevo Speaker Series is a way for our team to share our experience in person with students, teachers, or parents. We share our journey and provide advice on a range of topics from our own STEM personal experience to how you could potentially land a job at a tech company. Throughout all our talks, we strive to increase STEM career awareness and inspire the next generation."
    },
  ];

  serviceList(isMobile: boolean) {
    return WhatWeDo.Services.map((service, index) => {
      return (
        <Col key={index} className="services">
          <div>
            <Image src={service.icon} circle responsive alt={service.title} className="servicesLogo" />
            {
              isMobile ? <h3>{service.title}</h3> : <h2>{service.title}</h2>
            }
          </div>
        </Col>);

    });
  }

  serviceDescription(isMobile: boolean) {
    return WhatWeDo.Services.map((service, index) => {
      return (
        <Row className="serviceDescription" key={index} style={{
          backgroundColor: service.color,
          color: service.textColor
        }}>

          <Col>
            <Row >
              <Col md={6} xs={12}>
                <WorskshopAlignment>
                  <h1>{service.title}</h1>
                </WorskshopAlignment>
              </Col>
            </Row>
            <Row>
              <Col md={6} xs={12}>
                <WorskshopAlignment>
                  <Row>
                    <Col>
                      {
                        isMobile ? <p>{service.description}</p> : <div style={{ maxWidth: '20em' }}><p>{service.description}</p></div>
                      }
                    </Col>
                  </Row>
                </WorskshopAlignment>
                <WorskshopAlignment>
                  <Row>
                    <Col>
                      <Button className="requestButton" href={service.buttonLink}>REQUEST {service.title.toUpperCase()}</Button>
                    </Col>
                  </Row>
                </WorskshopAlignment>
              </Col>
              <Col md={6} xs={12} style={{ overflow: "hidden" }}>
                <Image src={service.img} responsive />
              </Col>
            </Row>
          </Col>
        </Row>);
    });
  }

  render(): any {
    const { width } = this.state;
    const isMobile = width <= 600;
    if (isMobile) {
      return (

        <Background>
          <PageTitle title={"What we do"} />
          <Grid fluid={true}>
            <Row className="services">
              {this.serviceList(isMobile)}
            </Row>

            {this.serviceDescription(isMobile)}
          </Grid>
        </Background>
      );
    }

    return (
      <React.Fragment>
        <PageTitle title={"What we do"} />
        <Background>
          <Grid fluid={true}>
            <Row className="services">
              {this.serviceList(isMobile)}
            </Row>

            {this.serviceDescription(isMobile)}
          </Grid>
        </Background>
      </React.Fragment>
    );
  }
}
