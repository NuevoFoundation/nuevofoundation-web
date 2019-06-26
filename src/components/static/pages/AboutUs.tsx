import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/AboutUs.css";

import Bea from "../../../assets/images/profile/bea-thumbnail.png";
import BeaReal from "../../../assets/images/profile/bea-profile-irl.png";
import Mollee from "../../../assets/images/profile/mollee-thumbnail.png";
import MolleeReal from "../../../assets/images/profile/mollee-profile-irl.png";
import Jeremiah from "../../../assets/images/profile/jeremiah-thumbnail.png";
import JeremiahReal from "../../../assets/images/profile/jeremiah-profile-irl.png";
import Oliver from "../../../assets/images/profile/oliver-thumbnail.png";
import OliverReal from "../../../assets/images/profile/oliver-irl.png";
import Roy from "../../../assets/images/profile/roy-thumbnail.png";
import RoyReal from "../../../assets/images/profile/roy-profile-irl.png";
import Savoy from "../../../assets/images/profile/savoy-thumbnail.png";
import SavoyReal from "../../../assets/images/profile/savoy-irl.png";
import Izzy from "../../../assets/images/profile/izzy-thumbnail.png";
import IzzyReal from "../../../assets/images/profile/izzy-irl.png";

import headerimg from "../../../assets/images/our-team/team.png";
import backgroundImageWithNuvi from "../../../assets/images/2018_0814_Pattern_Adjusted.svg";

import {
    Col,
    Grid,
    Row
} from "react-bootstrap";


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

`;

const HeaderText = styled.div`
       
    text-align: center;
    color: white;
    font-size: 100px;
    opacity: 0;
    animation: fade-in-right ease 2s forwards;
`

const Background = styled.div`
  background-repeat: none;
  background-image: url(${backgroundImageWithNuvi});
  font-family: "Lato", sans-serif;
  
`;

const Bio = styled.div`
    font-family: "Lato", sans-serif;
    width: 700px;
    margin: 100px;
    padding: 50px;
    background: #d0e6e8;
    font-size: 18px;
`;

const Bio1 = styled(Bio)`
    background: #fce68f

`;

const BioPic = styled.div`
    position: relative;
    display: inline-block;
    margin:100px;
    float: center;
`;

class TeamMember {
    name: string;
    role: string;
    quote: string;
    bio: string;
    img: string;
    cartoon: string;

    constructor(name: string, role: string, quote: string, bio: string, img: string, cartoon: string) {
        this.name = name;
        this.role = role;
        this.quote = quote;
        this.bio = bio;
        this.img = img;
        this.cartoon = cartoon;
    }
}


export class AboutUs extends React.Component {
    flag: boolean;

    constructor(props: {}) {
        super(props);
        this.flag = true;
    }

    teamMemberList() {
        var Team: TeamMember[] = [
            {
                name: "Breatris Mendez Gandica",
                role: "Founder and boss lady",
                quote: "-Technology lets you rewrite the rules of the world.",
                bio: "Bea has been slaying since the beginning of time. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                img: BeaReal,
                cartoon: Bea
            },
            {
                name: "Mollee Jain",
                role: "VP Education",
                quote: "-Education is my jam.",
                bio: "Mollee is smarter than you, but she won't rub it in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                img: MolleeReal,
                cartoon: Mollee
            }, 
            {
                name: "Jeremiah Isaacson",
                role: "VP Operations",
                quote: "-Technology lets you rewrite the rules of the world.",
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                img: JeremiahReal,
                cartoon: Jeremiah
            },
            {
                name: "Oliver Zhang",
                role: "Curriculum Guru",
                quote: "-Coding made easy.",
                bio: "Oliver is a software engineer at Microsoft. He has been teaching Mathematics, Science, and Computer Science to his peers and other students for 10 years. He is passionate about finding the best way to take difficult concepts and breaking them down into easy-to-understand points. Oliver not only knows many programming languages (such as Java, Python and C#), but also speaks many human languages. English, French, and Mandarin is not enough apparently, so he is learning Japanese and Spanish on the side.",
                img: OliverReal,
                cartoon: Oliver
            },
            {
                name: "Roy Moran",
                role: "VP Technology",
                quote: "-Do something small but useful now.",
                bio: "I'm a software developer who grew up in Bridgeport, a south side neighborhood of Chicago. I like to build and ship software that I find meaningful and work on ideas that I care about. One of them being equal access to STEM education across underserved communities. Having had the opportunity to work at Microsoft writing software, I enjoy taking what I've learned and sharing that experience with students that may not otherwise see the possibilities of a STEM education. Working with Nuevo Foundation, I'm excited to build technology that helps support its mission and helps us continue to scale our reach to more students in these communities.",
                img: RoyReal,
                cartoon: Roy
            },
            {
                name: "Izzy Beltran",
                role: "Creative Director and Master of Fun",
                quote: "-It's not about where you came from, it's about where you are going",
                bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                img: IzzyReal,
                cartoon: Izzy
            }, 
            {
                name: "Savoy Schuler",
                role: "Manager of Communication/Branding/Media",
                quote: "-When human beings are exposed to opportunities to create and innovate curiosity compels them to do so.",
                bio: "Savoy is passionate about creating these opportunities for tomorrows youth and -in particular- those least likely to be otherwise exposed to science and technology. An entrepreneur, engineer, public speaker, and humanitarian, Savoy can be found anywhere from developing Windows UI, to kindling the fire of a new foundation or business, to managing Nuevo Foundation's communication, branding, and media or coaching a debate team. He plays Quidditch on Wednesdays (Beaters are best) and spends his evenings trying to teach a made-up sign language to his deaf cat.",
                img: SavoyReal,
                cartoon: Savoy
            }
        ];

        return Team.map(person => {
            this.flag = !this.flag;
            if (this.flag) {
                return <Row>
                    <Col xs={6} md={4}>
                        <BioPic>
                            <img src={person.cartoon} alt="team member pic" onMouseOver={e => (e.currentTarget.src =
                                person.img)} onMouseOut={e => (e.currentTarget.src = person.cartoon)}/>
                        </BioPic>
                    </Col>
                    <Col xs={12} md={8}>
                        <Bio1> 
                            <h2>{person.name}</h2>
                            <h3>{person.role}</h3>
                            <i><h5>{person.quote}</h5></i>
                            <br/>
                            <p>{person.bio}</p>
                        </Bio1>
                    </Col>
                </Row>;
            }

            return <Row>
                <Col xs={12} md={8}>
                    <Bio>
                        <h2>{person.name}</h2>
                        <h3>{person.role}</h3>
                        <i><h5>{person.quote}</h5></i>
                        <br/>
                        <p>{person.bio}</p>
                    </Bio>
                </Col>
               <Col xs={6} md={4}>
                   <BioPic>
                       <img src={person.cartoon} alt="team member pic" onMouseOver={e => (e.currentTarget.src =
                            person.img)} onMouseOut={e => (e.currentTarget.src = person.cartoon)} />
                   </BioPic>
               </Col>
            </Row>;
        }
        );
    }


    public render(): any {
        return (
            
            <Background>
                <Header>
                    <div className="logo">
                        <span>O</span>
                        <span>u</span>
                        <span>r</span>
                        <span>_</span>
                        <span>T</span>
                        <span>e</span>
                        <span>a</span>
                        <span>m</span>
                        <span className="blink">|</span>
                    </div>
                </Header>
                <Grid>

                    {this.teamMemberList()}
                </Grid>
            </Background>
        );
    }
}
