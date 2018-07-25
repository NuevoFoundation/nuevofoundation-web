import * as React from 'react';
import styled from 'styled-components';
import { DonateButton } from './DonateButton';

// TODO: replace this with flex later
const HeaderWrapper = styled.div`
  height: 72px;
  background-color: #505050;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
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
`

const ButtonWrapper = styled.div`
 float: right;
 margin-top: 12px;
 margin-right: 40px;
`

export class Header extends React.Component {
    public render() {
        return (
            <HeaderWrapper>
                <LogoContent>
                    <svg height="72" width="72">
                        <circle cx="35" cy="35" r="20" fill="#ffffff" />
                    </svg>
                </LogoContent>
                <LogoText>Nuevo Foundation</LogoText>
                <NavList>
                    <NavItem> What we do </NavItem>
                    <NavItem> About Us </NavItem>
                    <NavItem> Support Us </NavItem>
                    <NavItem> Connect </NavItem>
                    <NavItem> Blog </NavItem>
                </NavList>
                <ButtonWrapper>
                    <DonateButton />
                </ButtonWrapper>
            </HeaderWrapper>
        )
    }
}