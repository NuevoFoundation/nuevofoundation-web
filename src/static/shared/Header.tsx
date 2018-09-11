import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NuevoLogo from '../../assets/logos/Logo_medium.svg';
import { ButtonCta } from './ButtonCta';

// TODO: replace this with flex later
const HeaderWrapper = styled.div`
  height: 72px;
  font-family: 'Lato', sans-serif;
  font-size:16px; 
`

const NavLogo = styled.img`
  float: left;
`

const NavList = styled.ul`
  float: left;
  text-align: center;
  padding-top: 5px;
`
const NavItem = styled.li`
  display: inline-block;
  font-size:20px;
  padding-right: 50px;
  cursor: pointer;
`

const NavIcon = styled.span`
  padding-left: 10px;
`

const ButtonWrapper = styled.div`
 float: right;
 margin-top: 10px;
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

interface INavItem {
    dropdown: boolean;
    text: string;
    link: string;
}

// TODO: Implement selected nav item styling
export class Header extends React.Component {
    public navItems: INavItem[] = [
        {
            dropdown: false,
            link: 'what-we-do',
            text: 'What we do',
        },
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
            link: 'contact',
            text: 'Contact',
        },
        {
            dropdown: false,
            link: 'blog',
            text: 'Blog',
        }
    ];

    public renderNavItems(): JSX.Element[] {
        return (
            this.navItems.map((navItem: INavItem, index: number) => {
                return (
                    <StyledNavLink key={index} to={navItem.link} >
                        <NavItem> {navItem.text}
                            {navItem.dropdown &&
                                <NavIcon>
                                    <FontAwesomeIcon icon={faChevronDown} className={"fa-sm "} />
                                </NavIcon>
                            }
                        </NavItem>
                    </StyledNavLink>
                )
            })
        )
    }

    public render() {
        return (
            <HeaderWrapper>
                <StyledNavLink to={'/'}>
                    <NavLogo src={NuevoLogo} height={'75px'} width={''} />
                </StyledNavLink>
                <NavList> {this.renderNavItems()} </NavList>
                <ButtonWrapper>
                    <ButtonCta text={'DONATE'} backgroundColor={'#FFFFFF'} textColor={'#000000'} border={'3px solid #F9BB08'} />
                </ButtonWrapper>
            </HeaderWrapper>
        )
    }
}