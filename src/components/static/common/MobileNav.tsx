import * as React from "react";
import "../../../assets/stylesheets/MobileNav.css";
import styled from "styled-components";

interface IMobileMenuProps {
  visible: boolean;
}

const TemporaryText = styled.div`
  text-align: center;
`

export class MobileNav extends React.Component<IMobileMenuProps> {

  public render() {
    const { visible } = this.props;
    return (
        <div id="mobile-nav-menu" className={visible ? 'transition-in' : 'transition-out'}>
          <TemporaryText>This is the mobile nav menu</TemporaryText>
        </div>
    );
  }
}

export default MobileNav;
