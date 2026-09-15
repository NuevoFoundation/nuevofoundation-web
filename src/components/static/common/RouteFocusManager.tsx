import * as React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const MainContentId = "main-content";

const SkipLink = styled.a`
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 1000;
  padding: 12px 16px;
  color: #ffffff;
  background-color: #005ea8;
  border-radius: 4px;
  transform: translateY(-150%);

  &:focus {
    color: #ffffff;
    transform: translateY(0);
    outline: 3px solid #fcc600;
    outline-offset: 2px;
  }
`;

export const RouteMainContent = styled.main.attrs({
  id: MainContentId,
  tabIndex: -1
})`
  &:focus,
  h1:focus {
    outline: 3px solid #005ea8;
    outline-offset: 4px;
  }
`;

const focusMainContent = (): void => {
  const mainContent = document.getElementById(MainContentId);
  const heading = Array.from(
    mainContent?.querySelectorAll<HTMLElement>("h1") || []
  ).find(element => element.textContent?.trim());

  if (heading) {
    heading.tabIndex = -1;
    heading.focus();
    return;
  }

  mainContent?.focus();
};

export const RouteFocusManager: React.FC = () => {
  const location = useLocation();
  const skipLinkRef = React.useRef<HTMLAnchorElement>(null);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
    skipLinkRef.current?.focus();
  }, [location.pathname]);

  return (
    <SkipLink
      ref={skipLinkRef}
      href={`#${MainContentId}`}
      onClick={event => {
        event.preventDefault();
        focusMainContent();
      }}
    >
      Skip to main content
    </SkipLink>
  );
};
