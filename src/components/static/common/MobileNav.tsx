import * as React from "react";
import { NavLink } from "react-router-dom";
import { ButtonCta } from "./ButtonCta";
import { Const } from "../../../Const";
import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/stylesheets/MobileNav.css";
import styled from "styled-components";

interface IMobileMenuProps {
  visible: boolean;
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

  &: focus,
  &: hover,
  &: visited,
  &: link,
  &: active {
    text-decoration: none;
  }
`;

const MobileNavList = styled.ul`
  list-style: none;
`;

const NavIcon = styled.span`
  padding-left: 10px;
`;

export class MobileNav extends React.Component<IMobileMenuProps> {
  public navItems: INavItem[] = [
    {
      dropdown: false,
      link: "what-we-do",
      text: "What We Do"
    },
    {
      dropdown: true,
      link: "about-us",
      text: "About Us"
    },
    {
      dropdown: false,
      link: "support-us",
      text: "Support Us"
    },

    {
      dropdown: false,
      link: "/contact",
      text: "Contact"
    },
    {
      dropdown: false,
      link: "/blog",
      text: "Blog"
    }
  ];
  public render() {
    const { visible } = this.props;

    return (
      <div
        id="mobile-nav-menu"
        className={visible ? "transition-in" : "transition-out"}
      >
        <div onClick={() => !visible} className={"close-btn"}>
          <FontAwesomeIcon icon={faTimes} className={"fa-sm"} />
        </div>

        <div>
          <ButtonWrapper>
            <ButtonCta
              text={"DONATE"}
              backgroundColor={"#FFFFFF"}
              textColor={"#000000"}
              border={"4px solid #000000"}
              linkTo={Const.PayPalDonatePage!}
            />
          </ButtonWrapper>
        </div>

        <hr />
        <div>
          {this.navItems.map(NavItem => {
            return (
              <StyledNavLink key={NavItem.link} to={NavItem.link}>
                <MobileNavList>
                  <li>
                    {NavItem.text}
                    {NavItem.dropdown && (
                      <NavIcon>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className={"fa-sm"}
                        />
                      </NavIcon>
                    )}
                  </li>
                </MobileNavList>
              </StyledNavLink>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MobileNav;
