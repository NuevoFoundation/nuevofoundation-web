import * as React from "react";
import styled from "styled-components";
import virtualSession3 from "../../../assets/images/virtualsessions/virtualsession3.jpg";
import workshop3 from "../../../assets/images/workshops/workshop3.jpg";
import workshop5 from "../../../assets/images/workshops/workshop5.jpg";
import speakerNuvi from "../../../assets/logos/nuvi/speaker_nuvi.png";
import workshopNuvi from "../../../assets/logos/nuvi/virtual_session_nuvi.png";
import virtualNuvi from "../../../assets/logos/nuvi/workshop_nuvi.png";
import "../../../assets/stylesheets/WhatWeDo.css";

import headerimg from "../../../assets/images/whatwedo/whatwedoheader.png";

import {
    Col,
    Grid,
    Row,
    Image,
    Button
} from "react-bootstrap";


const Background = styled.div`
  background-repeat: none;
  font-family: "Lato", sans-serif;
  
`;

const Header = styled.div`
    background-image: url(${headerimg});
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position:center;
    background-size:cover;
    box-shadow:0 1px 0 black,0 2px 0 rgba(255,255,255,0.15);
    padding: 300px;
    font-size: 6.250em;
    text-align: center;
    color: white;
    margin-bottom: 1px;
`;

const MobileHeader = styled.div`
    background-image: url(${headerimg});
    width: 100%;
    height: 30em;
    background-repeat: no-repeat;
    padding-top: 10em;
    text-align: center;
    color: white;
`;

const DescriptionSection = styled.div`
    padding: 1.25em;
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
        this.state = {
          width: window.innerWidth,
        };
      }
      
      componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
      }
      
      // make sure to remove the listener
      // when the component is not mounted anymore
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
          img: workshop5,
          color: "#FFFFFF",
           textColor: "#000000",
           buttonLink: "https://aka.ms/nfsignup",
          description: "Nuevo Coding Workshops are offered for students of a variety of ages and backgrounds. We have created custom curricula in many languages including Scratch, Python, JavaScript, HTML/CSS, and C# to engage both the analytical and creative sides of a student. Within our curricula we also include a hands-on activity to show different aspects of STEM. Out goal is to make coding fun, engaging, and accessible - and show that anyone can code!"
      },
      {
          title: "Virtual Sessions",
          icon: virtualNuvi,
          img: virtualSession3,
          color: "#d2d2d2",
          textColor: "#000000",
          buttonLink: "https://aka.ms/nfsignup",
          description: "Nuevo Virtual Session is a program where guest speakers from different backgrounds and roles offer live conversations with your classroom or organization. Each session is 30 minutes and it is designed in a way that the guest speaker gets to share their experience in how they got where they are. It's also an opportunity for the students to ask them questions about their role which can be new to them. After our sessions, your students will feel inspired and encouraged to learn more about STEM education."
      },
      {
          title: "Speaker Series",
          icon: speakerNuvi,
          img: workshop3,
          color: "#000000",
          textColor: "#FFFFFF",
          buttonLink: "https://aka.ms/nfsignup",
          description: "Nuevo Speaker Series is a way for our team to share our experience in person with students, teachers, or parents. We share our journey and provide advice on a range of topics from our own STEM personal experience to how you could potentially land a job at a tech company. Throughout all our talks, we strive to increase STEM career awareness and inspire the next generation."
      },
  ];

    serviceList(isMobile: boolean) {
        return WhatWeDo.Services.map(service => {
            return (<Col xs={3} xsOffset={1} md={3} mdOffset={1} className="services">
                <Image src={service.icon} circle responsive />
                {
                    isMobile ? <h3>{service.title}</h3> : <h2>{service.title}</h2>
                }
            </Col>);

        });
    }

    serviceDescription(isMobile: boolean) {
        return WhatWeDo.Services.map(service => {
            return (
                <Row className="serviceDescription" style={{
                    backgroundColor: service.color,
                    color: service.textColor}}>

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
                                            isMobile ? <p>{service.description}</p> : <div style={{maxWidth:'20em'}}><p>{service.description}</p></div>
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
        const isMobile = width <= 500;
        if (isMobile)
        {
            return (

                <Background>
                    <MobileHeader>
                        <h1>What we do</h1>
                    </MobileHeader>
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
          <Background>
              <Header>
                  <div className="logo">
                      <span>W</span>
                      <span>h</span>
                      <span>a</span>
                      <span>t_</span>
                      <span>w</span>
                      <span>e_</span>
                      <span>d</span>
                      <span>o</span>
                      <span className="blink">|</span>
                  </div>
              </Header>
              <Grid fluid={true}>
                  <Row className="services">
                      {this.serviceList(isMobile)}
                  </Row>

                  {this.serviceDescription(isMobile)}
              </Grid>
          </Background>
      );
  }
}
