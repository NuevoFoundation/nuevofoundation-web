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
import Savoy from "../../../assets/images/profile/savoy-thumbnail.png";
import SavoyReal from "../../../assets/images/profile/savoy-irl.png";
import Izzy from "../../../assets/images/profile/izzy-thumbnail.png";
import IzzyReal from "../../../assets/images/profile/izzy-irl.png";
import Aaron from "../../../assets/images/profile/aaron-thumbnail.png";
import AaronReal from "../../../assets/images/profile/aaron-profile-irl.png";
import Dee from "../../../assets/images/profile/dee-thumbnail.png";
import DeeReal from "../../../assets/images/profile/dee-profile-irl.png";
import Anvesha from "../../../assets/images/profile/anvesha-thumbnail.png";
import AnveshaReal from "../../../assets/images/profile/anvesha-profile-irl.png";
import Ximena from "../../../assets/images/profile/ximena-thumbnail.png";
import XimenaReal from "../../../assets/images/profile/ximena-profile-irl.png";

import backgroundImageWithNuvi from "../../../assets/images/2018_0814_Pattern_Adjusted.svg";

import {
  Grid,
} from "react-bootstrap";
import { PageTitle } from "../common/PageTitle";
import { Const } from "../../../Const";
import ReactGA from "react-ga";

const Background = styled.div`
  background-repeat: none;
  background-image: url(${backgroundImageWithNuvi});
  font-family: "Lato", sans-serif;
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
    ReactGA.pageview(Const.AboutUsPage);
  }

  teamMemberList() {
    var Team: TeamMember[] = [
      {
        name: "Beatris Mendez Gandica",
        role: "CEO/Founder",
        quote: "-Technology lets you rewrite the rules of the world.",
        bio: "Bea founded Nuevo Foundation on the premise that big decisions are best made when you have all the facts. Every student that attends one of our workshops is well equipped with information and shared experiences from industry experts to determine if a career in STEM is right for them. Bea works closely with the Nuevo team to ensure that we continue improving our programs, onboarding new team members, and providing growth opportunities for the team. Bea continues to exemplify our mission to inspire students to be curious, confident, and courageous by discovering the world of STEM. Lastly, if you come to one of our events, please say 'Hi!' Bea would love to meet you and learn your story. ",
        img: BeaReal,
        cartoon: Bea
      },
      {
        name: "Mollee Jain",
        role: "COO",
        quote: "-\"Success isn't about how much money you make. It's about the difference you make in people's lives.\" - Michelle Obama",
        bio: "Mollee is a software engineer who is passionate about equal access to education. Having taught beginner programming concepts to students as a teaching assistant at Wellesley College and a lead instructor for Girls Who Code, Mollee understands the importance of sparking inspiration and curiosity within students to encourage their pursuit of a STEM career. In Mollee's work with Nuevo Foundation, her main focuses are to oversee the operations of the foundation and establish ways to make the foundation's vision a reality.",
        img: MolleeReal,
        cartoon: Mollee
      },
      {
        name: "Jeremiah Isaacson",
        role: "CIO",
        quote: "-\"Life can be so much broader, once you discover one simple fact, and that is that everything around you that you call 'life' was made up by people who were no smarter than you. And you can change it, you can influence it, you can build your own things that other people can use. Once you learn that, you'll never be the same again.\" - Steve Jobs ",
        bio: "Nuevo Foundation is an opportunity to make a positive difference in the lives of students all over the world and thankfully Jeremiah takes part in that mission. He works on architecting the technological systems and platforms to scale our STEM offerings. Furthermore, Jeremiah focuses on supporting the efforts of our developers and educators by ensuring Nuevo Foundation operates sustainably.",
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
        name: "Anvesha Sinha",
        role: "Curriculum Ninja",
        quote: "-\"Be the change that you wish to see in the world\" -Mahatma Gandhi",
        bio: "Anvesha joined Nuevo Foundation with the intention of inspiring and coaching students to pursue a career in STEM. She helps out with Nuevo's workshops experience, focusing mainly on coding. A proud holder of master's in computer science (CS), she tries to make complex concepts fun and interesting for beginners. She is passionate about educating kids around the globe about careers in computer science and giving them a fair chance in choosing the best career path. In her free time, she like going on hikes, reading & solving puzzles.",
        img: AnveshaReal,
        cartoon: Anvesha
      },
      {
        name: "Izzy Beltran",
        role: "Creative Director and Master of Fun",
        quote: "-It's not about where you came from, it's about where you are going",
        bio: "Izzy is a Chicano Visual UX designer from Santa Ana, CA. He is passionate about design and the impact that it has on the world and to communities on a granular level. Izzy has many hobbies that keep him occupied on his free time that range from cooking, painting, playing music, and shooting monsters online on his Xbox. He has recently started reading and did not realize how enjoyable it is. It helps him stay relevant and knowledgeable in his career.",
        img: IzzyReal,
        cartoon: Izzy
      },
      {
        name: "Savoy Schuler",
        role: "Manager of Communication",
        quote: "-When human beings are exposed to opportunities to create and innovate curiosity compels them to do so.",
        bio: "Savoy is passionate about creating these opportunities for tomorrows youth and -in particular- those least likely to be otherwise exposed to science and technology. An entrepreneur, engineer, public speaker, and humanitarian, Savoy can be found anywhere from developing Windows UI, to kindling the fire of a new foundation or business, to managing Nuevo Foundation's communication, branding, and media or coaching a debate team. He plays Quidditch on Wednesdays (Beaters are best) and spends his evenings trying to teach a made-up sign language to his deaf cat.",
        img: SavoyReal,
        cartoon: Savoy
      },
      {
        name: "Deliana Escobari",
        role: "VP Web Development, Curriculum Designer, and Content Creator",
        quote: "-Everyone has the potential for greatness, they just need the right tools to unlock that potential.",
        bio: "Dee started volunteering with Nuevo Foundation soon after moving to the Pacific Northwest in 2018. Her passion for education and technology lead her to contribute in many areas. She created the Web Basics Curriculum and the cartoons you see on this page. She is helping with the website redesign and implementation as part of her larger goal to spread the Nuevo Foundation mission and values as far as possible.",
        img: DeeReal,
        cartoon: Dee
      },
      {
        name: "Aaron Malveaux",
        role: "Community Lead",
        quote: "-\"Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.\" - Albert Einstein",
        bio: "Aaron is the most charismatic team member with broad experience in data privacy. He always ensures that every student is having a great time while learning new computer science concepts. Aaron works on reaching out to potential partners at schools and other nonprofit organizations",
        img: AaronReal,
        cartoon: Aaron
      },
      {
        name: "Ximena Cortez",
        role: "Web Developer and Bug Interceptor",
        quote: "-\"Learning is a treasure that will follow its owner everywhere\" - Chinese Proverb",
        bio: "When Ximena was in high school, one of her teachers introduced her to a coding game that made coding fun. She continued to play that game through senior year and then decided to study Computer Science during college. She joined Nuevo Foundation because she knows the importance of introducing students to STEM fields. She currently works as a Software Test Engineer in Chicago and helps with the development of the Nuevo Foundation website. Ximena enjoys finding and fixing bugs and teaching others about cybersecurity.",
        img: XimenaReal,
        cartoon: Ximena
      }
    ];

    return (
      <div className="bioWrapper">
        {Team.map((person, index) => {
          return <div className="bio" key={index}>
            <img className="bioPic" src={person.cartoon} alt="team member pic" onMouseOver={(e: any) => (e.currentTarget.src =
              person.img)} onMouseOut={(e: any) => (e.currentTarget.src = person.cartoon)} />
            <div className="bioTextWrapper">
              <div className="bioName">{person.name}</div>
              <div className="bioRole">{person.role}</div>
              <i><div className="bioQuote">{person.quote}</div></i>
              <br />
              <p className="bioText">{person.bio}</p>
            </div>
          </div>
        })
        }
      </div>
    );
  }


  public render(): any {
    return (
      <React.Fragment>
        <PageTitle title={"Our team"} />
        <Background>
          <Grid fluid={true}>
            {this.teamMemberList()}
          </Grid>
        </Background>
      </React.Fragment>
    );
  }
}
