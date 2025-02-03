import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/AboutUs.css";

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

  private formatImgPath(name: string) {
    return `${Const.BlobStorageBaseUrl}/team/${name}.png`;
  }

  teamMemberList() {
    var Team: TeamMember[] = [
      {
        name: "Beatris Mendez Gandica",
        role: "CEO/Founder",
        quote: "-\"Technology lets you rewrite the rules of the world.\"",
        bio: "Bea founded Nuevo Foundation on the premise that big decisions are best made when you have all the facts. Every student that attends one of our workshops is well equipped with information and shared experiences from industry experts to determine if a career in STEM is right for them. Bea works closely with the Nuevo team to ensure that we continue improving our programs, onboarding new team members, and providing growth opportunities for the team. Bea continues to exemplify our mission to inspire students to be curious, confident, and courageous by discovering the world of STEM. Lastly, if you come to one of our events, please say 'Hi!' Bea would love to meet you and learn your story. ",
        img: "bea",
        cartoon: "bea-cartoon"
      },
      {
        name: "Mollee Jain",
        role: "COO",
        quote: "\"Success isn't about how much money you make. It's about the difference you make in people's lives.\" - Michelle Obama",
        bio: "Mollee is a software engineer who is passionate about equal access to education. Having taught beginner programming concepts to students as a teaching assistant at Wellesley College and a lead instructor for Girls Who Code, Mollee understands the importance of sparking inspiration and curiosity within students to encourage their pursuit of a STEM career. In Mollee's work with Nuevo Foundation, her main focuses are to oversee the operations of the foundation and establish ways to make the foundation's vision a reality.",
        img: "mollee",
        cartoon: "mollee-cartoon"
      },
      {
        name: "Jeremiah Isaacson",
        role: "CTO",
        quote: "\"Life can be so much broader, once you discover one simple fact, and that is that everything around you that you call 'life' was made up by people who were no smarter than you. And you can change it, you can influence it, you can build your own things that other people can use. Once you learn that, you'll never be the same again.\" - Steve Jobs ",
        bio: "Nuevo Foundation is an opportunity to make a positive difference in the lives of students all over the world and thankfully Jeremiah takes part in that mission. He works on architecting the technological systems and platforms to scale our STEM offerings. Furthermore, Jeremiah focuses on supporting the efforts of our developers and educators by ensuring Nuevo Foundation operates sustainably.",
        img: "jeremiah",
        cartoon: "jeremiah-cartoon"
      },
      {
        name: "Oliver Zhang",
        role: "Curriculum Guru",
        quote: "-\"Coding made easy.\"",
        bio: "Oliver is a software engineer at Microsoft. He has been teaching Mathematics, Science, and Computer Science to his peers and other students for 10 years. He is passionate about finding the best way to take difficult concepts and breaking them down into easy-to-understand points. Oliver not only knows many programming languages (such as Java, Python and C#), but also speaks many human languages. English, French, and Mandarin is not enough apparently, so he is learning Japanese and Spanish on the side.",
        img: "oliver",
        cartoon: "oliver-cartoon"
      },
      {
        name: "Anvesha Sinha",
        role: "Logicstics Ninja",
        quote: "\"Be the change that you wish to see in the world.\" - Mahatma Gandhi",
        bio: "Anvesha joined Nuevo Foundation with the intention of inspiring and coaching students to pursue a career in STEM. She helps out with Nuevo's workshops experience, focusing mainly on coding. A proud holder of master's in computer science (CS), she tries to make complex concepts fun and interesting for beginners. She is passionate about educating kids around the globe about careers in computer science and giving them a fair chance in choosing the best career path. In her free time, she like going on hikes, reading & solving puzzles.",
        img:"anvesha",
        cartoon: "anvesha-cartoon"
      },
      {
        name: "Izzy Beltran",
        role: "Creative Director and Master of Fun",
        quote: "-\"It's not about where you came from, it's about where you are going.\"",
        bio: "Izzy is a Chicano Visual UX designer from Santa Ana, CA. He is passionate about design and the impact that it has on the world and to communities on a granular level. Izzy has many hobbies that keep him occupied on his free time that range from cooking, painting, playing music, and shooting monsters online on his Xbox. He has recently started reading and did not realize how enjoyable it is. It helps him stay relevant and knowledgeable in his career.",
        img: "izzy",
        cartoon: "izzy-cartoon"
      },
      {
        name: "Paola Ramirez",
        role: "Design Alchemist and Pixel Perfectionist",
        quote: "\"You don't have to be great to start, but you have to start to be great.\" - Zig Ziglar",
        bio: "Paola is a Visual Designer from Puerto Rico with a bachelor’s degree in digital graphic design. Passionate about everything design and how it connects us to the world, she joined the Nuevo Foundation to help with their mission through design. In her free time, she likes to play video games and read a good book on a rainy day.",
        img: "paola",
        cartoon: "paola-cartoon"
      },
      {
        name: "Ximena Cortez",
        role: "Program Lead, Chicago Initiatives",
        quote: "\"Learning is a treasure that will follow its owner everywhere.\" - Chinese Proverb",
        bio: "When Ximena was in high school, one of her teachers introduced her to a coding game that made coding fun. She continued to play that game through senior year and then decided to study Computer Science during college. She joined Nuevo Foundation because she knows the importance of introducing students to STEM fields. She currently works as a Software Test Engineer in Chicago and helps with the development of the Nuevo Foundation website. Ximena enjoys finding and fixing bugs and teaching others about cybersecurity.",
        img: "ximena",
        cartoon: "ximena-cartoon"
      },
      {	
        name: "Madeleyne Vaca",	
        role: "Hardware Lead",	
        quote: "\"Strive for significance, not success.\"- Miller Templeton",
        bio: "Madeleyne got her engineering interest from her parents. Throughout grade school and college, she built robots and machines that fly, swim, drive, detect air quality, interpret sign language, and even survive in space. This was in large part due to the investment that the Georgia Tech College of Computing made in her early on in high school through their outreach programs. Recognizing this, Madeleyne began working for them, first as a high school assistant, eventually making her way up to leading her own workshops. Researching new topics to teach led her to the (day) job that she loves! Now, Nuevo Foundation gives her the opportunity to keep introducing kids to the wonderful world of hardware in hopes their lives can be changed for the better too.",	
        img: "madeleyne",	
        cartoon: "madeleyne-cartoon"	
      },
      {
        name: "América Quistiano",
        role: "Community Lead",
        quote: "\"Your voice matters. What you do matters. So what are you going to do?\" - Anita Hill",
        bio: "América started Microsoft as a new graduate during the fall of 2021 where she currently works for Bing Ads as a software engineer. América has had a passion for technology since she was little and that led her to a path in STEM which included studying computer science at UT Austin. She also found a huge passion for diversity & inclusion and helping others. This passion led her to working with the Nuevo Foundation during one of her summer internships at Microsoft and to becoming the president of the Hispanic Association of Computer Scientists at her university during her senior year. She enjoys working with the Nuevo Foundation because it allows her to share her unique experience with kids and to share her love for technology, with hopes of inspiring others to do great things.",
        img: "america",
        cartoon: "america-cartoon"
      },
      {
        name: "Joaquín Ruales",
        role: "Front-end Ninja",
        quote: "\"No matter what your ability is, effort is what ignites that ability and turns it into accomplishment.\" - Carol Dweck",
        bio: "Joaquín is passionate about coding, explaining technical concepts simply, and designing user experiences to minimize user error. After having programmed web apps, robots, calculators, and mathematical art, he is now volunteering with Nuevo Foundation to participate in the redesign of their Workshops website. In his spare time, he enjoys playing speed chess and learning how to pronounce words in foreign languages.",
        img: "joaquin",
        cartoon: "joaquin-cartoon"
      },
      {
        name: "Adrian Tirado-Medina ",
        role: "Designated Showsman/Hypeman",
        quote: "-\"Luck is the intersection between preparation and opportunity.\"",
        bio: "Adrian is a software engineer from Microsoft who has been sharing his passion for STEM with through Nuevo since the summer of 2019. He started teaching when he was in the 4th grade, showing pre-school students how to make origami animals and shapes. Since then, he has grown to run STEM outreach programs for underrepresented kids and teens, inspiring them to pursue careers in science and technology. Adrian is enthusiastic about creating innovative solutions that can make a positive impact on the world. He is originally from Juncos, Puerto Rico and in his free time he loves to dance, play video games and powerlift.",
        img: "adrian",
        cartoon: "adrian-cartoon"
      },
      {	
        name: "Kathryn Baldauf",	
        role: "Curriculum Genius",	
        quote: "\"Let us remember: One book, one pen, one child, and one teacher can change the world.\" - Malala Yousafzai",	
        bio: "Kathryn started at Microsoft as a new graduate in the summer of 2019. She works on Microsoft's open source Container Platform team as a software engineer. She's passionate about spreading education and positive change in the world. In her free time she enjoys hydroponic gardening, drinking tea, reading about a variety of topics, listening to music, and spending time with her friends",	
        img: "kathryn",	
        cartoon: "kathryn-cartoon"	
      },	
      {
        name: "Gabe Rodriguez",
        role: "Light Whisperer (aka Photographer)",
        quote: "-\"Live slow. Be present.\"",
        bio: "Before working in Customer Support at Microsoft, Gabe worked as a professional photographer. He is drawn to the intersection where people and technology meet. After hearing about the mission of Nuevo Foundation, he joined to help by providing photography. When he’s not at the office, you can find Gabe running around town with his own kids, on the water fishing, or rooting for the Seattle Mariners.",
        img: "gabe",
        cartoon: "gabe-cartoon"
      },
      {
        name: "Roy Moran",
        role: "Honorary Head of Technology",
        quote: "-Do something small but useful now.",
        bio: "I'm a software developer who grew up in Bridgeport, a south side neighborhood of Chicago. I like to build and ship software that I find meaningful and work on ideas that I care about. One of them being equal access to STEM education across underserved communities. Having had the opportunity to work at Microsoft writing software, I enjoy taking what I've learned and sharing that experience with students that may not otherwise see the possibilities of a STEM education. Working with Nuevo Foundation, I'm excited to build technology that helps support its mission and helps us continue to scale our reach to more students in these communities.",
        img: "roy",
        cartoon: "roy-cartoon"
      },
      {
        name: "Deliana Escobari",
        role: "Honorary VP Web Development, Curriculum Designer, and Content Creator",
        quote: "-\"Everyone has the potential for greatness, they just need the right tools to unlock that potential.\"",
        bio: "Dee started volunteering with Nuevo Foundation soon after moving to the Pacific Northwest in 2018. Her passion for education and technology lead her to contribute in many areas. She created the Web Basics Curriculum and the cartoons you see on this page. She is helping with the website redesign and implementation as part of her larger goal to spread the Nuevo Foundation mission and values as far as possible.",
        img: "dee",
        cartoon: "dee-cartoon"
      },
    ];

    return (
      <div className="bioWrapper">
        {Team.map((person, index) => {
          return <div className="bio" key={index}>
            <img className="bioPic" src={this.formatImgPath(person.cartoon)} alt="team member pic" onMouseOver={(e: any) => (e.currentTarget.src =
              this.formatImgPath(person.img))} onMouseOut={(e: any) => (e.currentTarget.src = this.formatImgPath(person.cartoon))} />
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
