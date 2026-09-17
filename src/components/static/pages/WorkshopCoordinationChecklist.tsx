import * as React from "react";
import ReactGA from "react-ga";
import logo from "../../../assets/logos/Logo_long.svg";
import { Const } from "../../../Const";
import { ChecklistPrintStyles } from "../common/ChecklistPrintStyles";
import { SchoolChecklistPage } from "../common/SchoolChecklistPage";

const title = "Nuevo Foundation: Workshop Coordination Checklist";
const recipient = "contact@nuevofoundation.org";
const devices = ["Laptop", "Tablet"];
const operatingSystems = ["Windows", "macOS", "ChromeOS", "iPadOS", "Android", "Linux", "Not sure"];
const experienceLevels = [
  { label: "Beginner", example: "Students need help using a mouse or touchscreen, typing, or opening a website." },
  { label: "Intermediate", example: "Students can type, open websites, switch browser tabs, and use common apps independently." },
  { label: "Advanced", example: "Students can manage files and folders, use keyboard shortcuts, and troubleshoot simple computer problems independently." }
];
const detailFields = [
  { key: "school", label: "School name", type: "text" },
  { key: "email", label: "School representative's email address", type: "email" },
  { key: "date", label: "Date of event", type: "date" },
  { key: "students", label: "How many students will attend?", type: "number" }
] as const;
type DetailKey = typeof detailFields[number]["key"];
type Details = Record<DetailKey, string>;

export const WorkshopCoordinationChecklist: React.FC = () => {
  const [details, setDetails] = React.useState<Details>({
    school: "", email: "", date: "", students: ""
  });
  const [selected, setSelected] = React.useState<ReadonlySet<string>>(() => new Set());
  const [experience, setExperience] = React.useState("");
  const [emailOpened, setEmailOpened] = React.useState(false);

  const selectionsFor = (options: string[]): string[] =>
    options.filter(option => selected.has(option));

  const buildEmailBody = (): string => {
    const lines = [
      "Workshop coordination details",
      "",
      ...detailFields.map(field => `${field.label}: ${details[field.key]}`),
      `Devices students will use: ${selectionsFor(devices).join(", ")}`,
      `Operating systems: ${selectionsFor(operatingSystems).join(", ")}`,
      `Students' computer experience level: ${experience}`,
      "",
      "Sent from the Nuevo Foundation Workshop Coordination Checklist."
    ];
    return lines.join("\r\n");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const subject = `Workshop coordination details - ${details.school}`;
    const mailto =
      `mailto:${recipient}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(buildEmailBody())}`;
    setEmailOpened(true);
    window.location.href = mailto;
  };

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    ReactGA.pageview(Const.WorkshopCoordinationChecklistPage);
    return () => {
      document.title = previousTitle;
    };
  }, []);

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

  const renderOptions = (options: string[], group: string) => (
    <div className="options-grid">
      {options.map((option, index) => (
        <label className="choice" key={option}>
          <input
            type="checkbox"
            name={group}
            value={option}
            checked={selected.has(option)}
            required={index === 0 && !options.some(value => selected.has(value))}
            onChange={() => toggleOption(option)}
          />
          <span className="print-mark" aria-hidden="true">{selected.has(option) ? "X" : ""}</span>
          <span>{option}</span>
        </label>
      ))}
    </div>
  );

  return (
    <SchoolChecklistPage id="workshop-coordination-checklist">
      <ChecklistPrintStyles />
      <div className="coordination-content">
        <img className="coordination-logo" src={logo} alt="Nuevo Foundation" width="340" height="54" />
        <h1 tabIndex={-1}>{title}</h1>
        <p><strong>For the school representative</strong></p>
        <p>
          Please complete this form after your school and Nuevo Foundation have
          agreed to hold a workshop. Your answers will help us prepare the workshop
          for your students.
        </p>
        <p>Please do not include student names, photographs, or other student personal information.</p>
        <div className="preview-notice screen-only" id="coordination-preview-notice">
          <strong>Your answers are sent using your own email app.</strong>{" "}
          Selecting <strong>Send by email</strong> opens a pre-filled message to{" "}
          <a href={`mailto:${recipient}`}>{recipient}</a> so you can review it and
          press Send yourself. Nothing is saved on this website, and nothing is
          sent until you send the message. Reloading or leaving this page clears
          your answers. You can print a blank or completed copy.
        </div>
        <form aria-label="Workshop coordination form" onSubmit={handleSubmit}>
          <p className="screen-only">The school, event, and student information fields are required before you can send the email.</p>
          <section className="details-section" aria-labelledby="coordination-details-heading">
            <h2 id="coordination-details-heading">School and event details</h2>
            <div className="details-grid">
              {detailFields.map(field => (
                <div className="detail-field" key={field.key}>
                  <label htmlFor={`coordination-${field.key}`}>{field.label}</label>
                  <input
                    id={`coordination-${field.key}`}
                    name={field.key}
                    type={field.type}
                    required
                    min={field.key === "students" ? 1 : undefined}
                    step={field.key === "students" ? 1 : undefined}
                    value={details[field.key]}
                    onChange={event => {
                      const value = event.currentTarget.value;
                      setDetails(previous => ({ ...previous, [field.key]: value }));
                    }}
                  />
                  <span className="print-value" aria-hidden="true">
                    {details[field.key] || "________________________"}
                  </span>
                </div>
              ))}
            </div>
          </section>
          <fieldset aria-describedby="coordination-devices-help">
            <legend>What devices will students use?</legend>
            <p id="coordination-devices-help">Select all that apply.</p>
            {renderOptions(devices, "devices")}
          </fieldset>
          <fieldset aria-describedby="coordination-os-help">
            <legend>What operating systems do the devices have?</legend>
            <p id="coordination-os-help">
              Select all that apply. Choose &quot;Not sure&quot; if you need help identifying them.
            </p>
            {renderOptions(operatingSystems, "operating-systems")}
          </fieldset>
          <fieldset aria-describedby="coordination-experience-help">
            <legend>What is your students&apos; computer experience level?</legend>
            <p id="coordination-experience-help">
              Choose one level that best describes most students. This refers to
              using computers, not coding experience.
            </p>
            {experienceLevels.map((level, index) => (
              <label className="choice" key={level.label}>
                <input
                  type="radio"
                  name="experience"
                  value={level.label}
                  required
                  checked={experience === level.label}
                  aria-labelledby={`coordination-level-${index}`}
                  aria-describedby={`coordination-example-${index}`}
                  onChange={() => setExperience(level.label)}
                />
                <span className="print-mark" aria-hidden="true">{experience === level.label ? "X" : ""}</span>
                <span>
                  <strong id={`coordination-level-${index}`}>{level.label}</strong>
                  <span className="experience-example" id={`coordination-example-${index}`}>{level.example}</span>
                </span>
              </label>
            ))}
          </fieldset>
          <div className="actions screen-only">
            <button type="submit" aria-describedby="coordination-preview-notice">
              Send by email
            </button>
            <button type="button" onClick={() => window.print()}>Print a copy</button>
          </div>
          {emailOpened && (
            <p className="screen-only" role="status">
              Your email app should now be open with your answers filled in.
              Please check the message and press Send. If nothing opened, use the
              Print a copy button and email the printout to{" "}
              <a href={`mailto:${recipient}`}>{recipient}</a>.
            </p>
          )}
        </form>
      </div>
    </SchoolChecklistPage>
  );
};
