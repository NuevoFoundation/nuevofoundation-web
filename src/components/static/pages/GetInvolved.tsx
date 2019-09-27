import * as React from "react";
import styled from "styled-components";
import teacher from "../../../assets/images/getinvolved/teacher.png";
import student from "../../../assets/images/getinvolved/student.png";
import volunteer from "../../../assets/images/getinvolved/volunteer.png";
import { PageTitle } from "../common/PageTitle";
import {
  Col,
  Grid,
  Row,
  Image, 
  Button,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { Const } from "../../../Const";
import ReactGA from "react-ga";

const GetInvolvedContainer = styled.div`
  padding-top: 50px;
  padding-bottom: 100px;
  background-color: #FCC600;
`

const RolePic = styled.div`
    position: relative;
    display: inline-block;
    justify-content: center;
    margin-top: 20px;
    margin-left: 70px;
    margin-right: 70px;
    margin-bottom: 10px;
`;

const RoleContainer = styled.div`
    font-family: "Lato", sans-serif;
    color: black;
    text-align: center;
    font-size: 1.15em;
    width: 100%;
    height: 100%;
    object-fit: contain; 
`;
const RoleHeader = styled.div`
    font-family: "Lato", sans-serif;
    text-align: center;
    color: black;
    font-weight: bold;
    font-size: 1.75em;
`;

const RoleButton = styled(Button)`
    font-family: "Lato", sans-serif;
    color: black;
    background-color: #FCC600;
    border-radius: 4px;
    border: 2px solid black;
    padding: .5em;
    margin: 1em;
`;

const RoleItems = styled(ListGroup)`
    margin-left: 100px;
    margin-right: 100px;
    margin-top: 10px;
    margin-bottom: 10px;
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
  constructor(props: {}) {
    super(props);
    ReactGA.pageview(Const.GetInvolvedPage);
  }
  
  static readonly Role: Role[] = [
    {
      role: "Teacher",
      img: teacher,
      optionOne: "Coding workshops",
      optionTwo: "Virtual Sessions",
      optionThree: "Speaker series",
      buttonText: "Download program",
      buttonLink: "./coming-soon"
    },
    {
      role: "Student",
      img: student,
      optionOne: "Curriculums on Github",
      optionTwo: "Events and scholarships",
      optionThree: "Resources",
      buttonText: "Get an overview",
      buttonLink: "./coming-soon"
    },
    {
      role: "Volunteer",
      img: volunteer,
      optionOne: "Create curriculums",
      optionTwo: "Help with a workshop",
      optionThree: "Host a virtual session",
      buttonText: "Sign up now",
      buttonLink: "https://aka.ms/nfsignup"
    }
  ]; // end of Role

  roleList() {
    return GetInvolved.Role.map((role, index) => {
      return (
        <Col xs={0} md={4} key={index}>
          <RolePic>
            <Image src={role.img} alt={role.role} circle responsive />
          </RolePic>
          <RoleContainer>
            <RoleHeader>{role.role}</RoleHeader>
            <RoleItems>
              <ListGroupItem href="#">{role.optionOne}</ListGroupItem>
              <ListGroupItem href="#">{role.optionTwo}</ListGroupItem>
              <ListGroupItem href="#">{role.optionThree}</ListGroupItem>
              <ListGroupItem href="#">
                <form action={role.buttonLink} style={{ textAlign: "center" }}>
                  <RoleButton>{role.buttonText}</RoleButton>
                </form>
              </ListGroupItem>
            </RoleItems>
          </RoleContainer>
        </Col>
      );
    }
    ); // end of return
  } // end of RoleList

  public render() {
    return (
      <React.Fragment>
        <PageTitle title={"Get involved"} />
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
