import * as React from "react";
import { NavLink } from "react-router-dom";
import { ButtonCta } from "./ButtonCta";
import { Const } from "../../../Const";
import { faTimes, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../assets/stylesheets/MobileNav.css";
import styled from "styled-components";
import { NavItems } from "./NavItems";

interface IMobileMenuProps {
  visible: boolean;
  handleMenuClose: () => void;
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

const NavIcon = styled.span`
  padding-left: 10px;
`;

export class MobileNav extends React.Component<IMobileMenuProps> {
  public render() {
    const { visible } = this.props;

    return (
      <div
        id="mobile-nav-menu"
        className={visible ? "transition-in" : "transition-out"}
        // without this styling, the mobile nav menu interferes 
        // with the page layout when it is not visible
        style={visible ? {} : { display: 'none' }}
      >
        <div onClick={this.props.handleMenuClose} className={"close-btn"}>
          <FontAwesomeIcon icon={faTimes} className={"fa-sm"} />
        </div>

        <div>
          <ButtonWrapper>
            <ButtonCta
              text={"DONATE"}
              backgroundColor={"#FFFFFF"}
              textColor={"#000000"}
              border={"4px solid #000000"}
              linkTo={Const.SupportUsPage!}
            />
          </ButtonWrapper>
        </div>

        <hr />
        <div>
          {NavItems.map(NavItem => {
            return (
              <StyledNavLink key={NavItem.link} to={NavItem.link} onClick={this.props.handleMenuClose}>
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
