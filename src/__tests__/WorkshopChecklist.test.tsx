import * as React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactGA from "react-ga";
import { WorkshopChecklist } from "../components/static/pages/WorkshopChecklist";
import { Const } from "../Const";

jest.mock("react-ga", () => ({ pageview: jest.fn() }));

const expectedGroups = [
  {
    title: "Before the Workshop",
    items: [
      "Confirm the date, time, location, and number of students.",
      "Ensure the school, teachers, and students are informed about the workshop.",
      "Reserve a computer lab with enough computers for the students.",
      "Confirm that all computers have stable internet access.",
      "Test the computers and workshop materials in advance.",
      "Verify that all links, platforms, and YouTube videos work and are not blocked.",
      "Confirm that a computer is available for the instructor, along with a projector, screen, and sound.",
      "Confirm that a teacher will remain in the room for the entire workshop.",
      "Confirm the volunteers and make sure they are familiar with the workshop or complete it themselves before the event.",
      "Send and receive release forms (link pending) from parents to allow Nuevo Foundation to take photographs.",
      "Identify any students who do not have permission to appear in photographs."
    ]
  },
  {
    title: "During the Workshop",
    items: [
      "Briefly introduce Nuevo Foundation and its mission.",
      "Deliver the workshop and support the students.",
      "Record the number of participants.",
      "Complete the survey at the end of the workshop.",
      "Take photos of the event and a group photo, only with appropriate permission.",
      "Thank the students, teachers, volunteers, and the school."
    ]
  },
  {
    title: "After the Workshop",
    items: [
      "Save the attendance information, surveys, and authorized photographs in the NF OneDrive.",
      "Document any feedback, technical difficulties, or opportunities to improve future workshops.",
      "Send a thank-you message to the school."
    ]
  }
];

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("Workshop organizer checklist", () => {
  it("renders the exact title and all 20 supplied items in their 11/6/3 groups", () => {
    render(<WorkshopChecklist />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", {
      name: "Nuevo Foundation: Workshop Delivery Checklist"
    })).toBeInTheDocument();
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.getAllByRole("checkbox")).toHaveLength(20);
    const subtitle = screen.getByText("For the Nuevo Foundation team member who is delivering a workshop");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.closest(".checklist-screen-only")).toBeNull();

    expectedGroups.forEach((group, index) => {
      const fieldset = screen.getByRole("group", { name: group.title });
      expect(fieldset.tagName).toBe("FIELDSET");
      const checkboxes = within(fieldset).getAllByRole("checkbox");
      expect(checkboxes).toHaveLength([11, 6, 3][index]);
      checkboxes.forEach((checkbox, itemIndex) => {
        expect(checkbox).toHaveAccessibleName(group.items[itemIndex]);
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveAttribute("type", "checkbox");
      });
    });

    expect(screen.getByRole("status")).toHaveTextContent("0 of 20 completed");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    expect(screen.getByRole("status")).toHaveAttribute("aria-atomic", "true");
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(1);
    expect(screen.queryByRole("button", { name: "Start a new workshop" })).not.toBeInTheDocument();
    expect(screen.getByText(/Checkmarks are not saved/)).toBeInTheDocument();
    expect(screen.getByText(/Checking a box does not obtain permission/)).toBeInTheDocument();
  });

  it("supports keyboard access to printing and every checkbox without moving focus", async () => {
    const user = userEvent.setup();
    render(<WorkshopChecklist />);

    await user.tab();
    expect(screen.getByRole("button", { name: "Print checklist" })).toHaveFocus();
    const checkboxes = screen.getAllByRole("checkbox");
    for (let index = 0; index < checkboxes.length; index++) {
      await user.tab();
      expect(checkboxes[index]).toHaveFocus();
      await user.keyboard("[Space]");
      expect(checkboxes[index]).toBeChecked();
      expect(checkboxes[index]).toHaveFocus();
      expect(screen.getByRole("status")).toHaveTextContent(`${index + 1} of 20 completed`);
    }

    const allItems = expectedGroups.flatMap(group => group.items);
    for (let index = 0; index < allItems.length; index++) {
      await user.click(screen.getByText(allItems[index], { exact: true }));
      expect(checkboxes[index]).not.toBeChecked();
      expect(screen.getByRole("status")).toHaveTextContent(`${19 - index} of 20 completed`);
    }
  });

  it("prints blank or current marks without resetting state, even when print is cancelled", async () => {
    const user = userEvent.setup();
    const print = jest.spyOn(window, "print").mockImplementation(() => undefined);
    const { container } = render(<WorkshopChecklist />);
    const printButton = screen.getByRole("button", { name: "Print checklist" });
    const marks = container.querySelectorAll(".checklist-print-mark");
    expect(marks).toHaveLength(20);
    marks.forEach(mark => {
      expect(mark).toHaveAttribute("aria-hidden", "true");
      expect(mark).toBeEmptyDOMElement();
    });

    await user.click(printButton);
    expect(print).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("0 of 20 completed");

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);
    await user.click(checkboxes[19]);
    await user.click(printButton);
    expect(print).toHaveBeenCalledTimes(2);
    expect(marks[0]).toHaveTextContent("X");
    expect(marks[19]).toHaveTextContent("X");
    expect(marks[1]).toBeEmptyDOMElement();
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[19]).toBeChecked();
    expect(screen.getByRole("status")).toHaveTextContent("2 of 20 completed");
  });

  it("starts blank on remount without reading or writing browser storage", async () => {
    const user = userEvent.setup();
    const getItem = jest.spyOn(Storage.prototype, "getItem");
    const setItem = jest.spyOn(Storage.prototype, "setItem");
    const removeItem = jest.spyOn(Storage.prototype, "removeItem");
    const clear = jest.spyOn(Storage.prototype, "clear");
    const { unmount } = render(<WorkshopChecklist />);

    await user.click(screen.getAllByRole("checkbox")[0]);
    await user.click(screen.getAllByRole("checkbox")[19]);
    unmount();
    render(<WorkshopChecklist />);

    screen.getAllByRole("checkbox").forEach(checkbox => expect(checkbox).not.toBeChecked());
    expect(screen.getByRole("status")).toHaveTextContent("0 of 20 completed");
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
    expect(removeItem).not.toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();
  });

  it("sets a printable document title and restores it when leaving the page", () => {
    const previousTitle = document.title;
    const { unmount } = render(<WorkshopChecklist />);
    expect(document.title).toBe("Nuevo Foundation: Workshop Delivery Checklist");
    unmount();
    expect(document.title).toBe(previousTitle);
  });

  it("does not trigger external actions or report checkmarks to analytics", async () => {
    const user = userEvent.setup();
    const print = jest.spyOn(window, "print").mockImplementation(() => undefined);
    const open = jest.spyOn(window, "open");
    const { container } = render(<WorkshopChecklist />);
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
    expect(ReactGA.pageview).toHaveBeenCalledWith(Const.WorkshopChecklistPage);

    for (const checkbox of screen.getAllByRole("checkbox")) {
      await user.click(checkbox);
    }
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
    expect(print).not.toHaveBeenCalled();
    expect(open).not.toHaveBeenCalled();
    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input:not([type=checkbox])")).toBeNull();
  });
});
