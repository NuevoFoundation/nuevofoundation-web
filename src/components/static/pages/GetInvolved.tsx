import * as React from "react";
import styled from 'styled-components';
import {
    Col,
    Grid,
    Row
} from "react-bootstrap";

const HereImage = styled.div`
  border: 1px #707070 solid;
  color: #000000;
  font-size: 28px;
  padding: 32px 0 0 25px;
  margin-left: 20px;
  margin-bottom: 30px;

  font-family: 'Space Mono', monospace;
  height: 207px;
  max-width: 513px;
`

const GetInvolvedContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 100px;
  background-color: #FCC600;
`

const RolePic = styled.div`
    position: relative;
    display: inline-block;
    margin: 50px;
`;

const RoleContainer = styled.div`
    font-family: "Lato", sans-serif;
    color: black;
    width: 300px;
    font-size: 16px;
`;
const RoleHeader = styled.div`
    font-family: "Lato", sans-serif;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 28px;
`;

const RoleButton = styled.button`
    font-family: "Lato", sans-serif;
    color: black;
    background-color: #FCC600;
    border-radius: 4px;
    font-size: 16px;
    border: 2px solid black;
    text-align: center;
    height: 50px;
    width: 185px;
    padding: 10px;
`;

class Role {
    role: string;
    img: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
    buttonText: string;
    buttonLink: string;

    constructor(role: string, img: string, optionOne: string, optionTwo: string, optionThree: string, 
      buttonText: string, buttonLink: string) 
    {
        this.role = role;
        this.img = img;
        this.optionOne = optionOne;
        this.optionTwo = optionTwo;
        this.optionThree = optionThree;
        this.buttonText = buttonText;
        this.buttonLink = buttonLink;
    }
}

export class GetInvolved extends React.Component {
  static readonly Role: Role[] = [
      {
        role: "Teacher",
        img: "https://pbs.twimg.com/profile_images/1027011228529393664/tJv9fKUD.jpg",
        optionOne: "Coding workshops",
        optionTwo: "Virtual Sessions",
        optionThree: "Speaker series",
        buttonText: "Download program",
        buttonLink: "./"
      },
      {
        role: "Student",
        img: "https://pbs.twimg.com/profile_images/1027011228529393664/tJv9fKUD.jpg",
        optionOne: "Curriculums on Github",
        optionTwo: "Events and scholarships",
        optionThree: "Resources",
        buttonText: "Get an overview",
        buttonLink: "./"
      },
      {
        role: "Volunteer",
        img: "https://pbs.twimg.com/profile_images/1027011228529393664/tJv9fKUD.jpg", 
        optionOne: "Lorem ipsum dolor sit amet, consectetur",
        optionTwo: "adipiscing elit, sed do eiusmod tempor ",
        optionThree: "incididunt ut labore et dolore magna aliqua",
        buttonText: "Sign up now",
        buttonLink: "./"
      }
    ]; // end of Role

  roleList() {
    return GetInvolved.Role.map((role, index) => {
      return (<Col xsOffset={1} xs={3} >
           <RolePic>
               <img src={role.img} alt="role pic" style={{borderRadius:"50%", height:"200px", width:"200px"}}/>
           </RolePic>
            <RoleContainer>
                <RoleHeader>{role.role}</RoleHeader>
                <br/>
                <p>{role.optionOne}
                <br/>{role.optionTwo}
                <br/>{role.optionThree}</p>
                <br/><br/><br/><br/><br/><br/><br/>
                <form action={role.buttonLink} style={{textAlign:"center"}}>
                  <RoleButton>{role.buttonText}</RoleButton>
                </form>
            </RoleContainer> 
      </Col>);
    }
    ); // end of return
  } // end of RoleList

  public render() {
    return (
      <React.Fragment>
        <HereImage>
          Get Involved
        </HereImage>
        <GetInvolvedContainer>
          <Grid fluid={true}>
            <Row>
              {this.roleList()}
            </Row>
          </Grid>
        </GetInvolvedContainer>
      </React.Fragment>
    );
  }
}
