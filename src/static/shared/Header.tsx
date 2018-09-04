import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NuevoLogo from '../../assets/logos/nuevo-logo.png';
import { DonateButtonCta } from './DonateButtonCta';

// TODO: replace this with flex later
const HeaderWrapper = styled.div`
  height: 72px;
  font-family: 'Lato', sans-serif;
  font-size:16px; 
`

const NavList = styled.ul`
  float: left;
  margin-left: 40px;
  text-align: center;
  padding-top: 5px;
`
const NavItem = styled.li`
  display: inline-block;
  font-size:20px;
  padding-right: 50px;
  cursor: pointer;
`

const ButtonWrapper = styled.div`
 float: right;
 margin-top: 14px;
 margin-right: 40px;
 width: 200px;
 font-weight: bold;
`

const StyledNavLink = styled(NavLink)`
  color: #535353;
  font-weight: bold;
  text-decoration: none;

  &:focus, &:hover, &:visited, &:link, &:active {
    text-decoration: none;
  }
`;

const LogoImg = styled.img`
  width: 5%;
  display: block;
`;

interface INavItem {
    text: string;
    link: string;
}

// TODO: Implement selected nav item styling
export class Header extends React.Component {
    public navItems: INavItem[] = [
        {
            link: 'what-we-do',
            text: 'What we do',
        },
        {
            link: 'about-us',
            text: 'About Us',
        },
        {
            link: 'support-us',
            text: 'Support Us',
        },
        {
            link: 'contact',
            text: 'Contact',
        },
        {
            link: 'blog',
            text: 'Blog',
        }
    ];

    public renderNavItems(): JSX.Element[] {
        return (
            this.navItems.map((navItem: INavItem, index: number) => {
                return <StyledNavLink key={index} to={navItem.link} > <NavItem> {navItem.text} </NavItem></StyledNavLink>
            })
        )
    }
    public render() {
        return (
            <HeaderWrapper>
                <StyledNavLink to={'/'}>
                    <span>
                        <LogoImg src={NuevoLogo} />
                    </span>
                </StyledNavLink>
                <NavList> {this.renderNavItems()} </NavList>
                <ButtonWrapper>
                    <DonateButtonCta backgroundColor={'#FFFFFF'} textColor={'#000000'} borderColor={'#F9BB08'} />
                </ButtonWrapper>
            </HeaderWrapper>
        )
    }
}