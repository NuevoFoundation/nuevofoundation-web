import styled from "styled-components";

export const SchoolChecklistPage = styled.div`
  background: #ffffff;
  color: #000000;
  font-family: "Lato", sans-serif;
  border-top: 8px solid #fcc600;

  .coordination-content {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 20px 48px;
  }

  .coordination-logo {
    display: block;
    width: 340px;
    max-width: 100%;
    height: auto;
    margin-bottom: 24px;
  }

  h1, h2, legend {
    font-family: "Space Mono", monospace;
    font-weight: bold;
    overflow-wrap: anywhere;
  }

  h1 {
    font-size: 28px;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  h2, legend {
    font-size: 1.15rem;
  }

  .preview-notice {
    border-left: 5px solid #fcc600;
    background: #fff9dc;
    padding: 16px;
    margin: 24px 0;
  }

  .details-grid, .options-grid {
    display: grid;
    gap: 16px;
  }

  .details-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .options-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 8px 16px;
  }

  .detail-field {
    min-width: 0;
  }

  .detail-field > label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .detail-field > input {
    width: 100%;
    min-width: 0;
    min-height: 44px;
    background: #ffffff;
    color: #000000;
    border: 2px solid #707070;
    border-radius: 4px;
    padding: 8px 10px;
    font: inherit;
  }

  fieldset, .details-section {
    min-width: 0;
    border: 1px solid #707070;
    border-radius: 6px;
    padding: 20px;
    margin: 24px 0;
  }

  legend {
    float: none;
    width: auto;
    padding: 0 8px;
    margin: 0;
  }

  .choice {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    min-height: 44px;
    padding: 10px 4px;
    cursor: pointer;
    overflow-wrap: anywhere;
  }

  .choice:hover {
    background: #fff9dc;
  }

  .choice input {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    margin: 1px 0 0;
    accent-color: #000000;
  }

  .experience-example {
    display: block;
    margin-top: 4px;
  }

  .allowlist-sites {
    overflow-wrap: anywhere;
  }

  .allowlist-sites a {
    color: #005ea8;
    text-decoration: underline;
  }

  input:focus-visible, button:focus-visible, a:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 3px;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  button {
    min-height: 44px;
    padding: 10px 18px;
    border: 2px solid #000000;
    border-radius: 4px;
    background: #fcc600;
    color: #000000;
    font-weight: bold;
  }

  button:not(:disabled):hover {
    background: #ffdf66;
  }

  button:disabled {
    background: #ececec;
    color: #535353;
    border-color: #707070;
    cursor: not-allowed;
  }

  .print-value, .print-mark {
    display: none;
  }

  .workshop-link {
    color: #005ea8;
    text-decoration: underline;
  }

  @media (max-width: 575px) {
    .details-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }

  @media print {
    border: 0;
    font-size: 10pt;
    line-height: 1.3;

    &[data-print-format="in-person"] .preparation-section[data-format="virtual"],
    &[data-print-format="virtual"] .preparation-section[data-format="in-person"] {
      display: none !important;
    }

    .coordination-content {
      max-width: none;
      padding: 0;
    }

    .coordination-logo {
      width: 240px;
      margin-bottom: 10pt;
    }

    h1 {
      font-size: 18pt;
      margin-bottom: 8pt;
    }

    h2, legend {
      font-size: 11pt;
      break-after: avoid;
    }

    .screen-only, input {
      display: none !important;
    }

    fieldset, .details-section {
      border: 0;
      padding: 0;
      margin: 10pt 0;
      break-inside: avoid;
    }

    fieldset.preparation-section {
      break-inside: auto;
    }

    .preparation-section ol > li {
      break-inside: avoid;
    }

    legend {
      padding: 0;
      margin-bottom: 4pt;
    }

    .details-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8pt;
    }

    .options-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 2pt 8pt;
    }

    .detail-field > label {
      margin: 0;
    }

    .print-value {
      display: block;
      overflow-wrap: anywhere;
    }

    .print-mark {
      display: inline-flex;
      flex: 0 0 11pt;
      width: 11pt;
      height: 11pt;
      align-items: center;
      justify-content: center;
      border: 1pt solid #000000;
      font: bold 9pt/1 sans-serif;
    }

    .choice {
      min-height: 0;
      padding: 3pt 0;
      gap: 8pt;
      break-inside: avoid;
    }

    .choice:hover {
      background: transparent;
    }

    .experience-example {
      margin-top: 2pt;
    }
  }
`;
