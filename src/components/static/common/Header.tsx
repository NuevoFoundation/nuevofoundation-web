import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { NavLink, RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import NuevoFoundationLogo from "../../../assets/logos/Logo_long.svg";
import { ButtonCta } from "./ButtonCta";
import { AuthenticationModal } from "../../registration/AuthenticationModal";
import { AuthContext } from "../../../contexts/AuthContext";
import { Const } from "../../../Const";
import { NavItems, INavItem } from "./NavItems";
import { withRouter } from 'react-router-dom';

import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
  faGithub
} from "@fortawesome/free-brands-svg-icons";
import { JwtTokenHelper } from "../../../helpers/JwtTokenHelper";
import { SessionStorageHelper } from "../../../helpers/SessionStorageHelper";

const AboveHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  padding-right: 20px;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  background-color: #ECECEC;
  font-size: 16px;
  color: #000000;
`;

const AboveHeaderItem = styled.div`
  padding-left: 25px;
`;

const AboveHeaderLink = styled.a`
  color: #000000;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: #000000;
  }
`;

const HeaderWrapper = styled.div`
  height: 72px;
  font-family: "lato-semibold", sans-serif;
  color: #707070;
  font-size: 16px;
`;

const NavLogo = styled.img`
  float: left;
`;

const NavList = styled.ul`
  float: right;
  text-align: center;
  padding-top: 20px;
`;

const NavItem = styled.li`
  display: inline-block;
  padding-right: 50px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 4px;
    background: #fcc600;
    transition: width 0.3s;
    margin-top: 5px;
  }

  &:hover {
    color: #000000;
  }

  &:hover::after {
    width: 100%;
  }
`;

const ActiveNavItem = styled.li`
  display: inline-block;
  padding-right: 50px;
  cursor: pointer;
  color: #000000;

  span {
    display: block;
    border-top: 4px solid #fcc600;
    margin-top: 5px;
  }
`;

const NavIcon = styled.span`
  padding-left: 10px;
`;

const ButtonWrapper = styled.div`
  float: right;
  padding: 0 20px 10px 0;
`;

const StyledExternalLink = styled.a`
color: #535353;
  text-decoration: none;


  &:active {
    text-decoration: none;
  }
`

const StyledNavLink = styled(NavLink)`
  color: #535353;
  text-decoration: none;


  &:active {
    text-decoration: none;
  }
`;

const StyledSpan = styled.span`
  cursor: pointer;
`;

interface IHeaderProps extends RouteComponentProps {
  hamburgerMenuOpen: boolean;
  handleHamburgerIconClick: () => void;
}

export class Header extends React.Component<IHeaderProps> {
  public renderNavItems(): JSX.Element[] {
    return NavItems.map((navItem: INavItem, index: number) => {
      return (
          navItem.external ?
              <StyledExternalLink key={index} href={navItem.link}>{this.renderNavItem(navItem)}</StyledExternalLink>
              :
              <StyledNavLink key={index} to={navItem.link}>
                {this.renderNavItem(navItem)}
              </StyledNavLink>
      );
    });
  }

  public renderNavItem(navItem: INavItem): JSX.Element {
    const currentPage = this.props.location.pathname;
    return (
        navItem.link === currentPage ?
            <ActiveNavItem>
              {navItem.text}
              {navItem.dropdown && (
                  <NavIcon>
                    <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
                  </NavIcon>
              )}
              <span />
            </ActiveNavItem>
            :
            <NavItem>
              {navItem.text}
              {navItem.dropdown && (
                  <NavIcon>
                    <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
                  </NavIcon>
              )}
            </NavItem>
    );
  }

  public render() {
    return (

        <Grid fluid={true}>
          <Row>
            <Col xs={12}>
              <AboveHeaderContainer>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.instagram.com/nuevofoundation"
                  >
                    <FontAwesomeIcon icon={faInstagram} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://twitter.com/nuevofoundation"
                  >
                    <FontAwesomeIcon icon={faTwitter} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.facebook.com/NuevoFoundation"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.linkedin.com/company/nuevofoundation"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.youtube.com/nuevofoundation?sub_confirmation=1"
                  >
                    <FontAwesomeIcon icon={faYoutube} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://github.com/NuevoFoundation"
                  >
                    <FontAwesomeIcon icon={faGithub} className={"fa-1x"} />
                  </AboveHeaderLink>
                </AboveHeaderItem>
                <AboveHeaderItem>
                  <AboveHeaderLink
                      rel="noopener noreferrer"
                      href={Const.SupportUsPage}
                  >
                    Donate
                  </AboveHeaderLink>
                </AboveHeaderItem>
              </AboveHeaderContainer>
            </Col>
          </Row>
          <Row>
            <Col sm={12} xsHidden={true}>
              <HeaderWrapper>
                <StyledNavLink to={"/"}>
                  <NavLogo src={NuevoFoundationLogo} height={"60px"} />
                </StyledNavLink>
                <NavList> {this.renderNavItems()} </NavList>
              </HeaderWrapper>
            </Col>
            {/* <Col sm={12} xsHidden={true}>
            <ButtonWrapper>
              <AuthContext.Consumer>
                {({ memberAuthenticated, toggleAuthentication, memberAuthenticatedName }) => (
                  memberAuthenticated ?
                    <div><StyledNavLink to={`/members/${JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token)}`}>Welcome, {memberAuthenticatedName}!</StyledNavLink> | <StyledSpan onClick={toggleAuthentication}>Logout</StyledSpan></div>
                    :
                    <AuthenticationModal toggleAuthentication={toggleAuthentication}>
                      <ButtonCta
                        text={"REGISTER"}
                        backgroundColor={"#FFFFFF"}
                        textColor={"#000000"}
                        border={"4px solid #fcca13"}
                      />
                    </AuthenticationModal>
                )}
              </AuthContext.Consumer>
            </ButtonWrapper>
                </Col> */}
            <Col xs={12} smHidden={true} mdHidden={true} lgHidden={true}>
              <Row>
                <Col xs={10}>
                  <StyledNavLink to={"/"}>
                    <NavLogo src={NuevoFoundationLogo} height={"60%"} />
                  </StyledNavLink>
                </Col>
                <Col
                    onClick={this.props.handleHamburgerIconClick}
                    xs={2}
                    style={{
                      paddingTop: "4%",
                      paddingLeft: "4%",
                      cursor: "pointer"
                    }}
                >
                  <FontAwesomeIcon icon={faBars} className={"fa-lg"} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
    );
  }
}

export default withRouter(Header)
