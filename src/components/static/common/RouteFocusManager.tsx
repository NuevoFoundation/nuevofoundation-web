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
  const isInitialMount = React.useRef(true);

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);

    // Skip on first mount so we don't steal focus from the browser on
    // initial page load. Only move focus for subsequent in-app navigations,
    // so screen reader / keyboard users land on the new page's content
    // instead of staying on stale focus from the previous page.
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    focusMainContent();
  }, [location.pathname]);

  return (
    <SkipLink
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
