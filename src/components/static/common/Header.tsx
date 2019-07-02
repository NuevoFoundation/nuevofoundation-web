import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Col, Grid, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import NuevoFoundationLogo from "../../../assets/logos/Logo_long.svg";
import { Const } from "../../../Const";
import { ButtonCta } from "./ButtonCta";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";


const AboveHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  padding-right: 20px;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  background-color: #D2D2D2;
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
  font-family: "Lato", sans-serif;
  font-size: 16px;
`;

const NavLogo = styled.img`
  float: left;
`;

const NavList = styled.ul`
  float: left;
  text-align: center;
  padding-top: 20px;
`;
const NavItem = styled.li`
  display: inline-block;
  font-size: 20px;
  padding-right: 50px;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #fcc600;
    transition: width 0.3s;
  }

  &:hover {
    color: #000000;
  }

  &:hover::after {
    width: 100%;
  }
`;

const SmallNavList = styled.ul`
  text-align: center;
  list-style: none;
`;

const SmallNavItem = styled.li`
  font-size: 18px;
  padding-bottom: 15px;
  cursor: pointer;
`;

const NavIcon = styled.span`
  padding-left: 10px;
`;

const ButtonWrapper = styled.div`
  float: right;
  padding: 10px 20px 0 0;
`;

const StyledNavLink = styled(NavLink)`
  color: #535353;
  font-weight: bold;
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

interface INavItem {
  dropdown: boolean;
  text: string;
  link: string;
}

interface IHeaderState {
  hamburgerMenuOpen: boolean;
}

// TODO: Implement selected nav item styling
export class Header extends React.Component<{}, IHeaderState> {
  public navItems: INavItem[] = [
    /* 
      {
            dropdown: true,
            link: 'about-us',
            text: 'About Us',
        },
        {
            dropdown: false,
            link: 'support-us',
            text: 'Support Us',
        },
        {
            dropdown: false,
            link: '/blog',
            text: 'Blog',
        },
    {
      dropdown: false,
      link: 'what-we-do',
      text: 'What we do',
    },*/
    {
      dropdown: false,
      link: "/faq",
      text: "FAQ"
    },
    {
      dropdown: false,
      link: "/contact",
      text: "Contact"
    }
  ];

  constructor(props: {}) {
    super(props);

    this.state = {
      hamburgerMenuOpen: false
    };
  }

  public handleHamburgerIconClick = () => {
    this.setState({
      hamburgerMenuOpen: !this.state.hamburgerMenuOpen
    });
  };

  public renderNavItems(): JSX.Element[] {
    return this.navItems.map((navItem: INavItem, index: number) => {
      return (
        <StyledNavLink key={index} to={navItem.link}>
          <NavItem>
            {navItem.text}
            {navItem.dropdown && (
              <NavIcon>
                <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
              </NavIcon>
            )}
          </NavItem>
        </StyledNavLink>
      );
    });
  }

  public renderSmallNavItems(): JSX.Element[] {
    return this.navItems.map((navItem: INavItem, index: number) => {
      return (
        <Row key={index}>
          <Col
            xs={4}
            xsOffset={4}
            smHidden={true}
            mdHidden={true}
            lgHidden={true}
          >
            <StyledNavLink to={navItem.link}>
              <SmallNavItem>
                {navItem.text}
                {navItem.dropdown && (
                  <NavIcon>
                    <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
                  </NavIcon>
                )}
              </SmallNavItem>
            </StyledNavLink>
          </Col>
        </Row>
      );
    });
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
                  href={Const.PayPalDonatePage}
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
              <ButtonWrapper>
                <ButtonCta
                  text={"DONATE"}
                  backgroundColor={"#FFFFFF"}
                  textColor={"#000000"}
                  border={"4px solid #fcca13"}
                  linkTo={Const.PayPalDonatePage!}
                />
              </ButtonWrapper>
            </HeaderWrapper>
          </Col>

          <Col xs={12} smHidden={true} mdHidden={true} lgHidden={true}>
            <Row>
              <Col xs={10}>
                <StyledNavLink to={"/"}>
                  <NavLogo src={NuevoFoundationLogo} height={"60%"} />
                </StyledNavLink>
              </Col>
              <Col
                onClick={this.handleHamburgerIconClick}
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
        {this.state.hamburgerMenuOpen && (
          <SmallNavList> {this.renderSmallNavItems()} </SmallNavList>
        )}
      </Grid>
    );
  }
}
