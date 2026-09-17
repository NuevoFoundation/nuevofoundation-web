import * as React from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { Const } from "../../../Const";
import { PageTitle } from "../common/PageTitle";
import { ChecklistPrintStyles } from "../common/ChecklistPrintStyles";

interface ChecklistItem {
  id: string;
  text: string;
}

interface ChecklistGroup {
  id: string;
  title: string;
  items: readonly ChecklistItem[];
}

const title = "Nuevo Foundation: Workshop Delivery Checklist";
const groups: readonly ChecklistGroup[] = [
  {
    id: "before",
    title: "Before the Workshop",
    items: [
      { id: "details", text: "Confirm the date, time, location, and number of students." },
      { id: "informed", text: "Ensure the school, teachers, and students are informed about the workshop." },
      { id: "lab", text: "Reserve a computer lab with enough computers for the students." },
      { id: "internet", text: "Confirm that all computers have stable internet access." },
      { id: "test", text: "Test the computers and workshop materials in advance." },
      { id: "links", text: "Verify that all links, platforms, and YouTube videos work and are not blocked." },
      { id: "instructor", text: "Confirm that a computer is available for the instructor, along with a projector, screen, and sound." },
      { id: "teacher", text: "Confirm that a teacher will remain in the room for the entire workshop." },
      { id: "volunteers", text: "Confirm the volunteers and make sure they are familiar with the workshop or complete it themselves before the event." },
      { id: "parent-release-forms", text: "Send and receive release forms (link pending) from parents to allow Nuevo Foundation to take photographs." },
      { id: "student-permission", text: "Identify any students who do not have permission to appear in photographs." }
    ]
  },
  {
    id: "during",
    title: "During the Workshop",
    items: [
      { id: "mission", text: "Briefly introduce Nuevo Foundation and its mission." },
      { id: "deliver", text: "Deliver the workshop and support the students." },
      { id: "participants", text: "Record the number of participants." },
      { id: "survey", text: "Complete the survey at the end of the workshop." },
      { id: "photos", text: "Take photos of the event and a group photo, only with appropriate permission." },
      { id: "thanks", text: "Thank the students, teachers, volunteers, and the school." }
    ]
  },
  {
    id: "after",
    title: "After the Workshop",
    items: [
      { id: "onedrive", text: "Save the attendance information, surveys, and authorized photographs in the NF OneDrive." },
      { id: "feedback", text: "Document any feedback, technical difficulties, or opportunities to improve future workshops." },
      { id: "thank-you", text: "Send a thank-you message to the school." }
    ]
  }
];
const totalItems = groups.reduce((total, group) => total + group.items.length, 0);

const ChecklistPage = styled.div`
  background: #ffffff;
  color: #000000;
  font-family: "Lato", sans-serif;

  > :first-child {
    height: auto;
    min-height: 147px;
    padding: 24px 0;
  }

  h1 {
    padding-right: 22px;
    overflow-wrap: anywhere;
  }

  .checklist-print-mark {
    display: none;
  }

  @media print {
    font-size: 10pt;
    line-height: 1.3;

    > :first-child {
      min-height: 0;
      padding: 0;
      box-shadow: none;
    }

    h1 {
      font-size: 18pt;
      padding: 0;
      margin: 0 0 10pt;
    }

    .checklist-screen-only,
    input[type="checkbox"] {
      display: none !important;
    }

    .checklist-print-mark {
      display: inline-flex;
      flex: 0 0 11pt;
      width: 11pt;
      height: 11pt;
      border: 1pt solid #000000;
      align-items: center;
      justify-content: center;
      font: bold 9pt/1 sans-serif;
      margin-top: 1pt;
    }
  }
`;

const ChecklistContent = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 32px 20px 48px;

  @media print {
    max-width: none;
    padding: 0;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 20px 0;
`;

const ActionButton = styled.button`
  min-height: 44px;
  padding: 10px 18px;
  border: 2px solid #000000;
  border-radius: 4px;
  background: #ffffff;
  color: #000000;
  font-weight: bold;

  &:first-child {
    background: #fcc600;
  }

  &:hover {
    background: #ececec;
  }

  &:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 3px;
  }
`;

const ProgressCount = styled.p`
  font-weight: bold;
  border-left: 5px solid #fcc600;
  padding-left: 12px;
  margin: 20px 0;

  @media print {
    border-left: 0;
    padding: 0;
    margin: 8pt 0;
  }
`;

const ChecklistSection = styled.fieldset`
  min-width: 0;
  border: 1px solid #707070;
  border-radius: 4px;
  padding: 16px;
  margin: 24px 0 0;

  legend {
    float: none;
    width: auto;
    padding: 0 8px;
    margin: 0;
    font-family: "Space Mono", monospace;
    font-size: 1.2rem;
    font-weight: bold;
  }

  @media print {
    border: 0;
    padding: 0;
    margin: 10pt 0 0;

    legend {
      padding: 0;
      margin-bottom: 4pt;
      font-size: 12pt;
      break-after: avoid;
    }
  }
`;

const ChecklistLabel = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  min-height: 44px;
  padding: 10px 4px;
  cursor: pointer;
  line-height: 1.5;
  overflow-wrap: anywhere;

  & + & {
    border-top: 1px solid #ececec;
  }

  &:hover {
    background: #f5f5f5;
  }

  input {
    flex: 0 0 22px;
    width: 22px;
    height: 22px;
    margin: 2px 0 0;
    accent-color: #000000;
    cursor: pointer;
  }

  input:focus-visible {
    outline: 3px solid #005ea8;
    outline-offset: 3px;
  }

  @media print {
    min-height: 0;
    padding: 3pt 0;
    gap: 8pt;
    line-height: 1.3;
    break-inside: avoid;

    & + & {
      border-top: 0;
    }

    &:hover {
      background: transparent;
    }
  }
`;

export const WorkshopChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = React.useState<ReadonlySet<string>>(
    () => new Set()
  );

  React.useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    ReactGA.pageview(Const.WorkshopChecklistPage);
    return () => {
      document.title = previousTitle;
    };
  }, []);

  const toggleItem = (id: string): void => {
    setCheckedItems(previous => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <ChecklistPage id="workshop-checklist">
      <ChecklistPrintStyles />
      <PageTitle title={title} />
      <ChecklistContent>
        <p><strong>For the Nuevo Foundation team member who is delivering a workshop</strong></p>
        <div className="checklist-screen-only">
          <p>
            Print a fresh copy for each workshop to mark by hand, or tick the
            boxes below and print your current checklist.
          </p>
          <p>
            Checkmarks are not saved. Reloading or leaving this page clears them.
            Reload this page before printing another blank copy.
          </p>
        </div>
        <p>
          This checklist is a reminder only. Checking a box does not obtain
          permission, submit a survey, upload files, or send a message.
          Do not enter student information on this page.
        </p>
        <Controls className="checklist-screen-only">
          <ActionButton type="button" onClick={() => window.print()}>
            Print checklist
          </ActionButton>
        </Controls>
        <ProgressCount role="status" aria-live="polite" aria-atomic="true">
          {checkedItems.size} of {totalItems} completed
        </ProgressCount>
        {groups.map(group => (
          <ChecklistSection key={group.id}>
            <legend>{group.title}</legend>
            {group.items.map(item => (
              <ChecklistLabel key={item.id} htmlFor={`checklist-${item.id}`}>
                <input
                  id={`checklist-${item.id}`}
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => toggleItem(item.id)}
                />
                <span className="checklist-print-mark" aria-hidden="true">
                  {checkedItems.has(item.id) ? "X" : ""}
                </span>
                <span>{item.text}</span>
              </ChecklistLabel>
            ))}
          </ChecklistSection>
        ))}
      </ChecklistContent>
    </ChecklistPage>
  );
};
