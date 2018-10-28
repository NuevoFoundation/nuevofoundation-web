import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NuevoFoundationLogo from '../../assets/logos/Logo_long.svg';
import NuevoLogo from '../../assets/logos/Logo_medium.svg';
import { Const } from '../../Const';
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
  padding-top: 20px;
`
const NavItem = styled.li`
  display: inline-block;
  font-size:20px;
  padding-right: 50px;
  cursor: pointer;
`

const SmallNavList = styled.ul`
  text-align: center;
  list-style: none;
`

const SmallNavItem = styled.li`
  font-size:18px;
  padding-bottom:15px;
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

interface IHeaderState {
    hamburgerMenuOpen: boolean;
}

// TODO: Implement selected nav item styling
export class Header extends React.Component<{}, IHeaderState> {
    public navItems: INavItem[] = [
        /* {
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
            link: 'blog',
            text: 'Blog',
        },*/
        {
            dropdown: false,
            link: 'faq',
            text: 'FAQ',
        },
        {
            dropdown: false,
            link: 'contact',
            text: 'Contact',
        },
    ];

    constructor(props: {}) {
        super(props);

        this.state = {
            hamburgerMenuOpen: false,
        };
    }


    public handleHamburgerIconClick = () => {
        this.setState({
            hamburgerMenuOpen: !this.state.hamburgerMenuOpen,
        });
    }

    public renderNavItems(): JSX.Element[] {
        return (
            this.navItems.map((navItem: INavItem, index: number) => {
                return (
                    <StyledNavLink key={index} to={navItem.link} >
                        <NavItem> {navItem.text}
                            {navItem.dropdown &&
                                <NavIcon>
                                    <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
                                </NavIcon>
                            }
                        </NavItem>
                    </StyledNavLink>
                )
            })
        )
    }

    public renderSmallNavItems(): JSX.Element[] {
        return (
            this.navItems.map((navItem: INavItem, index: number) => {
                return (
                    <Row key={index}>
                        <Col xs={4} xsOffset={4} smHidden={true} mdHidden={true} lgHidden={true}>
                            <StyledNavLink to={navItem.link} >
                                <SmallNavItem> {navItem.text}
                                    {navItem.dropdown &&
                                        <NavIcon>
                                            <FontAwesomeIcon icon={faChevronDown} className={"fa-sm"} />
                                        </NavIcon>
                                    }
                                </SmallNavItem>
                            </StyledNavLink>
                        </Col>
                    </Row>
                )
            })
        )
    }

    public render() {
        return (
            <Grid fluid={true} >
                <Row>
                    <Col sm={12} xsHidden={true}>
                        <HeaderWrapper>
                            <StyledNavLink to={'/'}>
                                <NavLogo src={NuevoLogo} height={'75px'} />
                            </StyledNavLink>
                            <NavList> {this.renderNavItems()} </NavList>
                            <a href={Const.PayPalDonatePage} style={{ textDecoration: 'none' }}>
                                <ButtonWrapper>
                                    <ButtonCta text={'DONATE'} backgroundColor={'#FFFFFF'} textColor={'#000000'} border={'4px solid #fcca13'} />
                                </ButtonWrapper>
                            </a>
                        </HeaderWrapper>
                    </Col>

                    <Col xs={12} smHidden={true} mdHidden={true} lgHidden={true}>
                        <Row>
                            <Col xs={10} >
                                <StyledNavLink to={'/'}>
                                    <NavLogo src={NuevoFoundationLogo} height={'60%'} />
                                </StyledNavLink>
                            </Col >
                            <Col onClick={this.handleHamburgerIconClick} xs={2} style={{ paddingTop: '4%', paddingLeft: '4%', cursor: 'pointer' }}>
                                <FontAwesomeIcon icon={faBars} className={"fa-lg"} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                {this.state.hamburgerMenuOpen &&
                    <SmallNavList> {this.renderSmallNavItems()} </SmallNavList>
                }
            </Grid>
        )
    }
}