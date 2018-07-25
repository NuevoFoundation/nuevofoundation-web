import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { DonateButton } from './DonateButton';

// TODO: replace this with flex later
const HeaderWrapper = styled.div`
  height: 72px;
  background-color: #FFFFFF;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size:16px;
`

const LogoContent = styled.div`
  float: left;
`
const LogoText = styled.div`
  float: left;
  padding-top:25px;
`

const NavList = styled.ul`
  float: left;
  margin-left: 40px;
  text-align: center;
  padding-top:5px;
`
const NavItem = styled.li`
  display: inline-block;
  font-size:20px;
  padding-right: 50px;
  cursor:pointer;
`

const ButtonWrapper = styled.div`
 float: right;
 margin-top: 12px;
 margin-right: 40px;
 width: 156px;
`
const StyledNavLink = styled(NavLink)`
  color: #36374E;
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

// TODO: Implement selected nav item styling
export class Header extends React.Component {
    public render() {
        return (
            <HeaderWrapper>
                <StyledNavLink to={'/'}>
                    <LogoContent>
                        <svg height="72" width="72">
                            <circle cx="35" cy="35" r="20" fill="#36374E" />
                        </svg>
                    </LogoContent>
                    <LogoText>Nuevo Foundation</LogoText>
                </StyledNavLink>
                <NavList>
                    <StyledNavLink to={'what-we-do'} activeClassName="selected"> <NavItem> What we do </NavItem></StyledNavLink>
                    <StyledNavLink to={'about-us'} activeClassName="selected"><NavItem> About Us </NavItem></StyledNavLink>
                    <StyledNavLink to={'support-us'} activeClassName="selected"><NavItem> Support Us </NavItem></StyledNavLink>
                    <StyledNavLink to={'connect'} activeClassName="selected"><NavItem> Connect </NavItem></StyledNavLink>
                    <StyledNavLink to={'blog'} activeClassName="selected"><NavItem> Blog </NavItem></StyledNavLink>
                </NavList>
                <ButtonWrapper>
                    <DonateButton bColor={'#FF6A58'} textColor={'#FFFFFF'} />
                </ButtonWrapper>
            </HeaderWrapper>
        )
    }
}