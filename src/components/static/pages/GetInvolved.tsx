import * as React from "react";
import styled from "styled-components";
import teacher from "../../../assets/images/getinvolved/teacher.png";
import student from "../../../assets/images/getinvolved/student.png";
import volunteer from "../../../assets/images/getinvolved/volunteer.png";
import {
  Col,
  Grid,
  Row,
  Image
} from "react-bootstrap";

const HereImage = styled.div`
  border: 1px #707070 solid;
  color: #000000;
  font-size: 28px;
  padding: 32px 0 0 25px;
  margin: 0 20px 0 20px;
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
    font-size: 1.15em;
    width: 100%;
    height: 100%;
`;
const RoleHeader = styled.div`
    font-family: "Lato", sans-serif;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 1.75em;
`;

const RoleButton = styled.button`
    font-family: "Lato", sans-serif;
    color: black;
    background-color: #FCC600;
    border-radius: 4px;
    font-size: 1em;
    border: 2px solid black;
    text-align: center;
    height: 3.125em;
    width: 11.55em;
    padding: 10px;
    margin-top: 6.25em;
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
    buttonText: string, buttonLink: string) {
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
      img: teacher,
      optionOne: "Coding workshops",
      optionTwo: "Virtual Sessions",
      optionThree: "Speaker series",
      buttonText: "Download program",
      buttonLink: "./"
    },
    {
      role: "Student",
      img: student,
      optionOne: "Curriculums on Github",
      optionTwo: "Events and scholarships",
      optionThree: "Resources",
      buttonText: "Get an overview",
      buttonLink: "./"
    },
    {
      role: "Volunteer",
      img: volunteer,
      optionOne: "Lorem ipsum dolor sit amet, consectetur",
      optionTwo: "Adipiscing elit, sed do eiusmod tempor ",
      optionThree: "Incididunt ut labore et dolore magna aliqua",
      buttonText: "Sign up now",
      buttonLink: "./"
    }
  ]; // end of Role

  roleList() {
    return GetInvolved.Role.map((role, index) => {
      return (<Col xs={0} xsOffset={1} md={3} mdOffset={1} key={index}>
        <RolePic>
          <Image src={role.img} alt="role pic" circle responsive />
        </RolePic>
        <RoleContainer>
          <RoleHeader>{role.role}</RoleHeader>
          <br />
          <p>{role.optionOne}
            <br />{role.optionTwo}
            <br />{role.optionThree}</p>
          <form action={role.buttonLink} style={{ textAlign: "center" }}>
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
