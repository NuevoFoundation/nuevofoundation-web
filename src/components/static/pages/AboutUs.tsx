import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/AboutUs.css";
import {
    Col,
    Grid,
    Row
} from "react-bootstrap";

const contentHeight = 370;

const AboutUsWrapper = styled.div`
  background-color: #d2d2d2;
  height: ${contentHeight}px;
`;

const QuoteWrapper = styled.div`
  background-color: #d2d2d2;
  height: 430px;
`;

const VisionWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`;

const VisualWrapper = styled.div`
  background-color: #d2d2d2;
  height: 370px;
`;
const MissionWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`;
const MessageWrapper = styled.div`
  background-color: #d2d2d2;
  height: 370px;
`;
const OurTeamWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`;
const BoardWrapper = styled.div`
  background-color: #ffffff;
  height: 370px;
`;

class TeamMember {
    name: string;
    role: string;
    quote: string;
    bio: string;
    img: string;

    constructor(name: string, role: string, quote: string, bio: string, img: string) {
        this.name = name;
        this.role = role;
        this.quote = quote;
        this.bio = bio;
        this.img = img;
    }
}


export class AboutUs extends React.Component {
    constructor(props: {}) {
        super(props);
    }

    teamMemberList() {
        var Team: TeamMember[] = [
            {
                name: "Breatris Mendez Gandica",
                role: "I am the boss",
                quote: "Soy la mas cool.",
                bio: "Bea has been slaying since the beginning of time.",
                img: "temp img"
            },
            {
                name: "Mollee Jain",
                role: "I rule",
                quote: "Education is my jam",
                bio: "Mollee is smarter than you, but she won't rub it in.",
                img: "temp img"
            }
        ];

        var flag = true;
        return Team.map(person => (
       
            <Row>
                <Col xs={6} md={4} ><img src={person.img} alt="team member pic" /></Col>
                <Col xs={12} md={8} >
                    <h2>{person.name}</h2>
                    <h3>{person.role}</h3>
                    <p>{person.bio}</p>
                </Col>
            </Row>
        ));
    }

    public render(): any {
        return (
            <Grid>
                <Row>
                    <Col>
                        <h1>About Us</h1>
                    </Col>
                </Row>
                    
                {this.teamMemberList()}
            </Grid>
        );
    }
}
