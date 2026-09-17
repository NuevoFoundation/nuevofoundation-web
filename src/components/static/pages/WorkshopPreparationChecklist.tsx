import * as React from "react";
import ReactGA from "react-ga";
import logo from "../../../assets/logos/Logo_long.svg";
import { Const } from "../../../Const";
import { ChecklistPrintStyles } from "../common/ChecklistPrintStyles";
import { SchoolChecklistPage } from "../common/SchoolChecklistPage";

const title = "Nuevo Foundation: What to do before a workshop Checklist";
interface PreparationItem {
  id: string;
  text: string;
  format: "shared" | "virtual";
}
type WorkshopFormat = "in-person" | "virtual";
type PrintFormat = WorkshopFormat | "all";
const workshopFormats: { id: WorkshopFormat; title: string }[] = [
  { id: "in-person", title: "In-person workshops" },
  { id: "virtual", title: "Virtual workshops" }
];
const allowlistSites = [
  { id: "codebunga", name: "codebunga.com", url: "https://codebunga.com/" },
  { id: "workshops", name: "workshops.nuevofoundation.org", url: "https://workshops.nuevofoundation.org/" },
  { id: "earsketch", name: "earsketch.gatech.edu", url: "https://earsketch.gatech.edu/landing/#/" }
];
const preparationItems: PreparationItem[] = [
  {
    id: "preparation-room",
    format: "shared",
    text: "Ensure the session will be taught in a room that has a laptop and a projector to display the content to students."
  },
  {
    id: "preparation-content",
    format: "shared",
    text: "Before the session, visit Nuevo Foundation Workshops and find the workshop your school will participate in so you understand the content of the session."
  },
  {
    id: "preparation-survey",
    format: "shared",
    text: "Explain to your students that a post-event survey will take place during the last 15 minutes of the workshop (link pending)."
  },
  {
    id: "preparation-headphones",
    format: "virtual",
    text: "Ensure students have headphones."
  },
  {
    id: "preparation-google-meet",
    format: "virtual",
    text: "If your school uses Google Meet, send Nuevo Foundation the meeting invitation and ensure the Nuevo Foundation team has permission to share their screen."
  },
  {
    id: "preparation-join",
    format: "virtual",
    text: "Ensure all students join the virtual meeting using the meeting invitation."
  },
  {
    id: "preparation-mute",
    format: "virtual",
    text: "Turn off all students' microphones to avoid echo during the call."
  },
  {
    id: "preparation-chat",
    format: "virtual",
    text: "Please monitor the content students are putting in the chat to avoid distractions."
  }
];

export const WorkshopPreparationChecklist: React.FC = () => {
  const [selected, setSelected] = React.useState<ReadonlySet<string>>(() => new Set());
  const pageRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    ReactGA.pageview(Const.WorkshopPreparationChecklistPage);
    const resetPrintFormat = (): void => {
      if (pageRef.current) pageRef.current.dataset.printFormat = "all";
    };
    window.addEventListener("afterprint", resetPrintFormat);
    return () => {
      document.title = previousTitle;
      window.removeEventListener("afterprint", resetPrintFormat);
    };
  }, []);

  const printCopy = (format: PrintFormat): void => {
    if (pageRef.current) pageRef.current.dataset.printFormat = format;
    window.print();
  };

  const toggleOption = (option: string): void => {
    setSelected(previous => {
      const next = new Set(previous);
      if (next.has(option)) {
        next.delete(option);
      } else {
        next.add(option);
      }
      return next;
    });
  };

  const renderPreparationItem = (item: PreparationItem, format: WorkshopFormat) => {
    const id = `${format}-${item.id}`;
    return (
      <li key={id}>
        <div className="choice">
          <input
            id={id}
            type="checkbox"
            name={id}
            aria-labelledby={`${id}-text`}
            checked={selected.has(id)}
            onChange={() => toggleOption(id)}
          />
          <span className="print-mark" aria-hidden="true">{selected.has(id) ? "X" : ""}</span>
          {item.id === "preparation-content" ? (
            <span id={`${id}-text`}>
              Before the session, visit{" "}
              <a className="workshop-link" href="https://workshops.nuevofoundation.org/"
                target="_blank" rel="noopener noreferrer"
                title="Opens in a new tab">Nuevo Foundation Workshops</a>{" "}
              and find the workshop your school will participate in so you understand
              the content of the session.
            </span>
          ) : (
            <label id={`${id}-text`} htmlFor={id}>{item.text}</label>
          )}
        </div>
      </li>
    );
  };

  const renderPreparationSection = (format: WorkshopFormat, heading: string) => {
    const allowlistId = `${format}-websites-allowlisted`;
    const shared = preparationItems.filter(item => item.format === "shared");
    const virtual = preparationItems.filter(item => item.format === "virtual");
    const items = format === "virtual" ? [...shared, ...virtual] : shared;
    return (
      <fieldset key={format} className="preparation-section" data-format={format}
        aria-describedby={`${format}-preparation-help`}>
        <legend>{heading}</legend>
        <ol>
          <li>
            <label className="choice">
              <input type="checkbox" name={allowlistId}
                checked={selected.has(allowlistId)}
                aria-describedby={allowlistSites.map(site => `${format}-site-${site.id}`).join(" ")}
                onChange={() => toggleOption(allowlistId)} />
              <span className="print-mark" aria-hidden="true">{selected.has(allowlistId) ? "X" : ""}</span>
              <span>Ensure the devices used in the workshop have allowlisted the following websites:</span>
            </label>
            <ul className="allowlist-sites" aria-label="Websites to allowlist">
              {allowlistSites.map(site => (
                <li id={`${format}-site-${site.id}`} key={site.id}>
                  <a href={site.url} target="_blank" rel="noopener noreferrer"
                    aria-label={`${site.name} (opens in a new tab)`}>{site.name}</a>
                </li>
              ))}
            </ul>
          </li>
          {items.map(item => renderPreparationItem(item, format))}
        </ol>
        <p id={`${format}-preparation-help`}>
          Ask your school&apos;s IT team for help if any website is blocked.
          These checkboxes record your confirmation only; they do not change
          device, network, or meeting settings, send invitations, or submit a survey.
        </p>
        <button className="screen-only" type="button" onClick={() => printCopy(format)}>
          Print {format === "in-person" ? "in-person" : "virtual"} copy
        </button>
      </fieldset>
    );
  };

  return (
    <SchoolChecklistPage id="workshop-preparation-checklist" ref={pageRef} data-print-format="all">
      <ChecklistPrintStyles />
      <div className="coordination-content">
        <img className="coordination-logo" src={logo} alt="Nuevo Foundation" width="340" height="54" />
        <h1 tabIndex={-1}>{title}</h1>
        <p><strong>For the school representative</strong></p>
        <p>
          Please work through this checklist before your school&apos;s workshop
          so that everything is ready for your students on the day.
        </p>
        <p>Please do not include student names, photographs, or other student personal information.</p>
        <div className="preview-notice screen-only">
          Checkmarks are not saved or sent. Reloading or leaving this page clears them.
          You can print a blank or completed copy.
        </div>
        <p className="screen-only">
          Print either checklist using its button below. Links open in a new tab.
        </p>
        {workshopFormats.map(format => renderPreparationSection(format.id, format.title))}
        <div className="actions screen-only">
          <button type="button" onClick={() => printCopy("all")}>Print a copy</button>
        </div>
      </div>
    </SchoolChecklistPage>
  );
};
