import { createGlobalStyle } from "styled-components";

// Mounted only on checklist pages, including when printing with Ctrl+P.
export const ChecklistPrintStyles = createGlobalStyle`
  @media print {
    #mobile-nav-menu,
    a[href="#main-content"],
    .app-shell > :not(#main-content) {
      display: none !important;
    }

    .app-brightness,
    .app-blur {
      filter: none !important;
      opacity: 1 !important;
    }

    #main-content {
      outline: none;
    }
  }
`;
