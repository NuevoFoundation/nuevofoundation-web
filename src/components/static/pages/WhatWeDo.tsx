import * as React from "react";
import styled from "styled-components";
import virtualSession1 from "../../../assets/images/virtualsessions/virtualsession1.jpg";
import virtualSession2 from "../../../assets/images/virtualsessions/virtualsession2.jpg";
import virtualSession3 from "../../../assets/images/virtualsessions/virtualsession3.jpg";
import virtualSession4 from "../../../assets/images/virtualsessions/virtualsession4.jpg";
import virtualSession5 from "../../../assets/images/virtualsessions/virtualsession5.jpg";
import workshop1 from "../../../assets/images/workshops/workshop1.jpg";
import workshop2 from "../../../assets/images/workshops/workshop2.jpg";
import workshop3 from "../../../assets/images/workshops/workshop3.jpg";
import workshop4 from "../../../assets/images/workshops/workshop4.jpg";
import workshop5 from "../../../assets/images/workshops/workshop5.jpg";
import workshop6 from "../../../assets/images/workshops/workshop6.jpg";
import nuvi from "../../../assets/logos/nuvi/nuvi.gif";
import { ButtonCta } from "../common/ButtonCta";
import { Const } from "../../../Const";
import { Link } from "react-router-dom";
import { InfoButton } from "../common/InfoButton";
import "../../../assets/stylesheets/WhatWeDo.css";

import headerimg from "../../../assets/images/whatwedo/whatwedoheader.png";
import backgroundImageWithNuvi from "../../../assets/images/2018_0814_Pattern_Adjusted.svg";

import {
    Col,
    Grid,
    Row,
    Image
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
    font-size: 100px;
    text-align: center;
    color: white;
    margin-bottom: 1px;
`;

class Service {
    title: string;
    icon: string;
    img: string;
    color: string;
    description: string;
    textColor: string;

    constructor(title: string, icon: string, img: string, color: string, description: string) {
        this.title = title;
        this.icon = icon;
        this.img = img;
        this.color = color;
        this.textColor = "#000000";
        this.description = description;
    }
}

export class WhatWeDo extends React.Component {
  constructor(props: {}) {
      super(props);
  }

   static readonly Services: Service[] = [
      {
          title: "Coding Workshops",
          icon: nuvi,
          img: workshop5,
          color: "#FFFFFF",
          textColor: "#000000",
          description: "Nuevo Coding Workshops are offered for students of a variety of ages and backgrounds. We have created custom curricula in many languages including Scratch, Python, JavaScript, HTML/CSS, and C# to engage both the analytical and creative sides of a student. Within our curricula we also include a hands-on activity to show different aspects of STEM. Out goal is to make coding fun, engaging, and accessible - and show that anyone can code!"
      },
      {
          title: "Virtual Sessions",
          icon: nuvi,
          img: virtualSession3,
          color: "#d2d2d2",
          textColor: "#000000",
          description: "Nuevo Virtual Session is a program where guest speakers from different backgrounds and roles offer live conversations with your classroom or organization. Each session is 30 minutes and it is designed in a way that the guest speaker gets to share their experience in how they got where they are. It's also an opportunity for the students to ask them questions about their role which can be new to them. After our sessions, your students will feel inspired and encouraged to learn more about STEM education."
      },
      {
          title: "Speaker Series",
          icon: nuvi,
          img: workshop3,
          color: "#000000",
          textColor: "#FFFFFF",
          description: "Nuevo Speaker Series is a way for our team to share our experience in person with students, teachers, or parents. We share our journey and provide advice on a range of topics from our own STEM personal experience to how you could potentially land a job at a tech company. Throughout all our talks, we strive to increase STEM career awareness and inspire the next generation."
      },
  ];

    public ServiceList() {

        return WhatWeDo.Services.map(service => {
            return (<Col xs={3} xsOffset={1} md={3} mdOffset={1} className="services">
                <Image src={service.icon} circle responsive />
                <h2>{service.title}</h2>
            </Col>);

        });
    }

    public ServiceDescription() {
        return WhatWeDo.Services.map(service => {
            return (
                <Row className="serviceDescription" style={{
                    backgroundColor: service.color,
                    color: service.textColor
                }}>
                    <Col xs={3} xsOffset={1} md={3} mdOffset={1}>
                        <h1>{service.title}</h1>
                        <p>{service.description}</p>
                        <button className="requestButton">REQUEST {service.title.toUpperCase()}</button>
                    </Col>
                    <Col xs={5} xsOffset={1} md={5} mdOffset={1}>
                        <Image src={service.img} responsive/>
                    </Col>
                </Row>);
        });
    }

  public render(): any {
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
                      {this.ServiceList()}
                  </Row>

                  {this.ServiceDescription()}
              </Grid>
          </Background>
      );
  }
}
