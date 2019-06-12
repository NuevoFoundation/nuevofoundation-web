import { faBars, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { Button, Modal } from "react-bootstrap";
import { ButtonCta } from "./ButtonCta";
import { Const } from "../../../Const";
import { NavLink } from "react-router-dom";
import { Col, Grid, Row } from "react-bootstrap";
import styled from "styled-components";
import "../../../assets/stylesheets/MobileNav.css";

interface IHeaderState {
  hamburgerMenuOpen: boolean;
}

interface INavItem {
  dropdown: boolean;
  text: string;
  link: string;
}

const ButtonWrapper = styled.div`
  text-align: center;
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

const MobileNavList = styled.ul`
  list-style: none;
`;

export class MobileNav extends React.Component<{}, IHeaderState> {
  public navItems: INavItem[] = [
    {
      dropdown: false,
      link: "what-we-do",
      text: "What We Do"
    },
    {
      dropdown: true,
      link: "about-us",
      text: "About Us "
    },
    {
      dropdown: false,
      link: "support-us",
      text: "Support Us"
    },
    {
      dropdown: false,
      link: "connect",
      text: "Connect"
    },
    {
      dropdown: false,
      link: "/blog",
      text: "Blog"
    }
  ];

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      hamburgerMenuOpen: false
    };
  }

  public handleHamburgerIconClick = () => {
    this.setState({
      hamburgerMenuOpen: !this.state.hamburgerMenuOpen
    });
  };

  public render() {
    return (
      <>
        <Button onClick={this.handleHamburgerIconClick}>
          <FontAwesomeIcon icon={faBars} className={"fa-sm"} />
        </Button>

        <Modal
          show={this.state.hamburgerMenuOpen}
          onHide={this.handleHamburgerIconClick}
          dialogClassName="mobile-nav-modal"
        >
          <Modal.Header closeButton>
            <ButtonWrapper>
              <ButtonCta
                text={"DONATE"}
                backgroundColor={"#FFFFFF"}
                textColor={"#000000"}
                border={"4px solid #000000"}
                linkTo={Const.PayPalDonatePage!}
              />
            </ButtonWrapper>
          </Modal.Header>

          <Modal.Body>
            {this.navItems.map(NavItem => {
              return (
                <StyledNavLink key={NavItem.link} to={NavItem.link}>
                  <MobileNavList>
                    <li>
                      {NavItem.text}
                      {NavItem.dropdown && (
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={"fa-sm"}
                        />
                      )}
                    </li>
                  </MobileNavList>
                </StyledNavLink>
              );
            })}
          </Modal.Body>
        </Modal>
      </>
    );
  }
}

export default MobileNav;
