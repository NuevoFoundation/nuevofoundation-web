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
        quote: "-Technology lets you rewrite the rules of the world.",
        bio: "Bea founded Nuevo Foundation on the premise that big decisions are best made when you have all the facts. Every student that attends one of our workshops is well equipped with information and shared experiences from industry experts to determine if a career in STEM is right for them. Bea works closely with the Nuevo team to ensure that we continue improving our programs, onboarding new team members, and providing growth opportunities for the team. Bea continues to exemplify our mission to inspire students to be curious, confident, and courageous by discovering the world of STEM. Lastly, if you come to one of our events, please say 'Hi!' Bea would love to meet you and learn your story. ",
        img: "bea",
        cartoon: "bea-cartoon"
      },
      {
        name: "Mollee Jain",
        role: "COO",
        quote: "-\"Success isn't about how much money you make. It's about the difference you make in people's lives.\" - Michelle Obama",
        bio: "Mollee is a software engineer who is passionate about equal access to education. Having taught beginner programming concepts to students as a teaching assistant at Wellesley College and a lead instructor for Girls Who Code, Mollee understands the importance of sparking inspiration and curiosity within students to encourage their pursuit of a STEM career. In Mollee's work with Nuevo Foundation, her main focuses are to oversee the operations of the foundation and establish ways to make the foundation's vision a reality.",
        img: "mollee",
        cartoon: "mollee-cartoon"
      },
      {
        name: "Jeremiah Isaacson",
        role: "CIO",
        quote: "-\"Life can be so much broader, once you discover one simple fact, and that is that everything around you that you call 'life' was made up by people who were no smarter than you. And you can change it, you can influence it, you can build your own things that other people can use. Once you learn that, you'll never be the same again.\" - Steve Jobs ",
        bio: "Nuevo Foundation is an opportunity to make a positive difference in the lives of students all over the world and thankfully Jeremiah takes part in that mission. He works on architecting the technological systems and platforms to scale our STEM offerings. Furthermore, Jeremiah focuses on supporting the efforts of our developers and educators by ensuring Nuevo Foundation operates sustainably.",
        img: "jeremiah",
        cartoon: "jeremiah-cartoon"
      },
      {
        name: "Oliver Zhang",
        role: "Curriculum Guru",
        quote: "-Coding made easy.",
        bio: "Oliver is a software engineer at Microsoft. He has been teaching Mathematics, Science, and Computer Science to his peers and other students for 10 years. He is passionate about finding the best way to take difficult concepts and breaking them down into easy-to-understand points. Oliver not only knows many programming languages (such as Java, Python and C#), but also speaks many human languages. English, French, and Mandarin is not enough apparently, so he is learning Japanese and Spanish on the side.",
        img: "oliver",
        cartoon: "oliver-cartoon"
      },
      {
        name: "Anvesha Sinha",
        role: "Curriculum Ninja",
        quote: "-\"Be the change that you wish to see in the world\" -Mahatma Gandhi",
        bio: "Anvesha joined Nuevo Foundation with the intention of inspiring and coaching students to pursue a career in STEM. She helps out with Nuevo's workshops experience, focusing mainly on coding. A proud holder of master's in computer science (CS), she tries to make complex concepts fun and interesting for beginners. She is passionate about educating kids around the globe about careers in computer science and giving them a fair chance in choosing the best career path. In her free time, she like going on hikes, reading & solving puzzles.",
        img:"anvesha",
        cartoon: "anvesha-cartoon"
      },
      {
        name: "Izzy Beltran",
        role: "Creative Director and Master of Fun",
        quote: "-It's not about where you came from, it's about where you are going",
        bio: "Izzy is a Chicano Visual UX designer from Santa Ana, CA. He is passionate about design and the impact that it has on the world and to communities on a granular level. Izzy has many hobbies that keep him occupied on his free time that range from cooking, painting, playing music, and shooting monsters online on his Xbox. He has recently started reading and did not realize how enjoyable it is. It helps him stay relevant and knowledgeable in his career.",
        img: "izzy",
        cartoon: "izzy-cartoon"
      },
      {
        name: "Savoy Schuler",
        role: "Manager of Communication",
        quote: "-When human beings are exposed to opportunities to create and innovate curiosity compels them to do so.",
        bio: "Savoy is passionate about creating these opportunities for tomorrows youth and -in particular- those least likely to be otherwise exposed to science and technology. An entrepreneur, engineer, public speaker, and humanitarian, Savoy can be found anywhere from developing Windows UI, to kindling the fire of a new foundation or business, to managing Nuevo Foundation's communication, branding, and media or coaching a debate team. He plays Quidditch on Wednesdays (Beaters are best) and spends his evenings trying to teach a made-up sign language to his deaf cat.",
        img: "savoy",
        cartoon: "savoy-cartoon"
      },
      {
        name: "Deliana Escobari",
        role: "VP Web Development, Curriculum Designer, and Content Creator",
        quote: "-Everyone has the potential for greatness, they just need the right tools to unlock that potential.",
        bio: "Dee started volunteering with Nuevo Foundation soon after moving to the Pacific Northwest in 2018. Her passion for education and technology lead her to contribute in many areas. She created the Web Basics Curriculum and the cartoons you see on this page. She is helping with the website redesign and implementation as part of her larger goal to spread the Nuevo Foundation mission and values as far as possible.",
        img: "dee",
        cartoon: "dee-cartoon"
      },
      {
        name: "Aaron Malveaux",
        role: "Community Lead",
        quote: "-\"Everybody is a genius. But if you judge a fish by its ability to climb a tree, it will live its whole life believing that it is stupid.\" - Albert Einstein",
        bio: "Aaron is the most charismatic team member with broad experience in data privacy. He always ensures that every student is having a great time while learning new computer science concepts. Aaron works on reaching out to potential partners at schools and other nonprofit organizations",
        img: "aaron",
        cartoon: "aaron-cartoon"
      },
      {
        name: "Ximena Cortez",
        role: "Web Developer and Bug Interceptor",
        quote: "-\"Learning is a treasure that will follow its owner everywhere\" - Chinese Proverb",
        bio: "When Ximena was in high school, one of her teachers introduced her to a coding game that made coding fun. She continued to play that game through senior year and then decided to study Computer Science during college. She joined Nuevo Foundation because she knows the importance of introducing students to STEM fields. She currently works as a Software Test Engineer in Chicago and helps with the development of the Nuevo Foundation website. Ximena enjoys finding and fixing bugs and teaching others about cybersecurity.",
        img: "ximena",
        cartoon: "ximena-cartoon"
      },
      {
        name: "Amira Najar",
        role: "Volunteer",
        quote: "-\"I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel\" -Maya Angelou",
        bio: "Amira is a recent college grad and has been with Nuevo Foundation since December 2019. She is very passionate about giving back to her community and the power education has. She believes everyone deserves an equal opportunity in life, and hopes through her marketing efforts with NF, she is enabling the younger generations to believe in themselves and strive for their aspirations. Outside of being a product marketing manager, Amira enjoys working out, traveling all over the world and learning about better ways to self-improve.",
        img: "amira",
        cartoon: "amira-cartoon"
      },
      {	
        name: "Kathryn Baldauf",	
        role: "Volunteer",	
        quote: "-\"Let us remember: One book, one pen, one child, and one teacher can change the world.\" -Malala Yousafzai",	
        bio: "Kathryn started at Microsoft as a new graduate in the summer of 2019. She works on Microsoft's open source Container Platform team as a software engineer. She's passionate about spreading education and positive change in the world. In her free time she enjoys hydroponic gardening, drinking tea, reading about a variety of topics, listening to music, and spending time with her friends",	
        img: "kathryn",	
        cartoon: "kathryn-cartoon"	
      },	
      {	
        name: "Madeleyne Vaca",	
        role: "Volunteer",	
        quote: "-\"Strive for significance, not success\" -Miller Templeton",	
        bio: "Madeleyne got her engineering interest from her parents. Throughout grade school and college, she built robots and machines that fly, swim, drive, detect air quality, interpret sign language, and even survive in space. This was in large part due to the investment that the Georgia Tech College of Computing made in her early on in high school through their outreach programs. Recognizing this, Madeleyne began working for them, first as a high school assistant, eventually making her way up to leading her own workshops. Researching new topics to teach led her to the (day) job that she loves! Now, Nuevo Foundation gives her the opportunity to keep introducing kids to the wonderful world of hardware in hopes their lives can be changed for the better too.",	
        img: "madeleyne",	
        cartoon: "madeleyne-cartoon"	
      }
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
