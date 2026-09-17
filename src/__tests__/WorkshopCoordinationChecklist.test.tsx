import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactGA from "react-ga";
import { WorkshopCoordinationChecklist } from "../components/static/pages/WorkshopCoordinationChecklist";

jest.mock("react-ga", () => ({ pageview: jest.fn() }));
jest.mock("../assets/logos/Logo_long.svg", () => "logo.svg");

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("Workshop coordination preview", () => {
  it("keeps the branded seven-field form without the moved preparation checklists", () => {
    render(<WorkshopCoordinationChecklist />);
    expect(screen.getByRole("img", { name: "Nuevo Foundation" })).toHaveAttribute("src", "logo.svg");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Nuevo Foundation: Workshop Coordination Checklist"
    );
    expect(screen.getByText("For the school representative")).toBeInTheDocument();
    expect(screen.getByLabelText("School name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("School representative's email address")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Date of event")).toHaveAttribute("type", "date");
    expect(screen.getByRole("spinbutton")).toHaveAccessibleName("How many students will attend?");
    expect(screen.getByRole("spinbutton")).toHaveAttribute("min", "1");
    expect(screen.getByRole("spinbutton")).toHaveAttribute("step", "1");
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.getAllByRole("checkbox")).toHaveLength(9);
    expect(screen.getAllByRole("radio")).toHaveLength(3);
    expect(screen.queryByRole("group", { name: "In-person workshops" })).not.toBeInTheDocument();
    expect(screen.queryByRole("group", { name: "Virtual workshops" })).not.toBeInTheDocument();
    expect(screen.queryByText("Checklist before the workshop")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Print virtual copy" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send by email" })).toBeEnabled();
    expect(screen.getByText("Your answers are sent using your own email app.")).toBeInTheDocument();
    expect(screen.getByText(/after your school and Nuevo Foundation have agreed/)).toBeInTheDocument();
    expect(screen.queryByLabelText(/student name/i)).not.toBeInTheDocument();
  });

  it("allows multiple devices and systems but only one experience level", async () => {
    const user = userEvent.setup();
    render(<WorkshopCoordinationChecklist />);
    const devices = screen.getByRole("group", { name: "What devices will students use?" });
    expect(within(devices).getAllByRole("checkbox")).toHaveLength(2);
    const systems = ["Windows", "macOS", "ChromeOS", "iPadOS", "Android", "Linux", "Not sure"];
    const systemGroup = screen.getByRole("group", { name: "What operating systems do the devices have?" });
    const checkboxes = [
      ...within(devices).getAllByRole("checkbox"),
      ...within(systemGroup).getAllByRole("checkbox")
    ];
    const choices = ["Laptop", "Tablet", ...systems];
    for (let index = 0; index < choices.length; index++) {
      expect(checkboxes[index]).toHaveAccessibleName(choices[index]);
      await user.click(checkboxes[index]);
      expect(checkboxes[index]).toBeChecked();
    }
    await user.click(checkboxes[0]);
    expect(checkboxes[0]).not.toBeChecked();
    expect(checkboxes[1]).toBeChecked();

    const radios = screen.getAllByRole("radio");
    const levels = ["Beginner", "Intermediate", "Advanced"];
    for (let index = 0; index < levels.length; index++) {
      const radio = radios[index];
      expect(radio).toHaveAccessibleName(levels[index]);
      expect(radio).toHaveAccessibleDescription();
      await user.click(radio);
      radios.forEach(input => {
        if (input === radio) {
          expect(input).toBeChecked();
        } else {
          expect(input).not.toBeChecked();
        }
      });
    }
  });

  it("supports keyboard entry, checkbox Space and radio arrow keys", async () => {
    const user = userEvent.setup();
    render(<WorkshopCoordinationChecklist />);
    await user.tab();
    expect(screen.getByRole("link", { name: "contact@nuevofoundation.org" })).toHaveFocus();
    for (const label of [
      "School name", "School representative's email address", "Date of event",
      "How many students will attend?"
    ]) {
      await user.tab();
      expect(screen.getByLabelText(label)).toHaveFocus();
    }
    for (const checkbox of screen.getAllByRole("checkbox")) {
      await user.tab();
      expect(checkbox).toHaveFocus();
      await user.keyboard("[Space]");
      expect(checkbox).toBeChecked();
    }
    await user.tab();
    expect(screen.getByRole("radio", { name: "Beginner" })).toHaveFocus();
    await user.keyboard("[Space][ArrowRight]");
    expect(screen.getByRole("radio", { name: "Intermediate" })).toBeChecked();
    await user.tab();
    expect(screen.getByRole("button", { name: "Send by email" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Print a copy" })).toHaveFocus();
  });

  it("enforces required groups, email validity and positive whole student counts", async () => {
    const user = userEvent.setup();
    render(<WorkshopCoordinationChecklist />);
    const form = screen.getByRole("form");
    expect(form).toBeInvalid();
    await user.type(screen.getByLabelText("School name"), "Example School");
    await user.type(screen.getByLabelText("School representative's email address"), "coordinator@example.test");
    fireEvent.change(screen.getByLabelText("Date of event"), { target: { value: "2026-10-15" } });
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "25" } });
    await user.click(screen.getByRole("checkbox", { name: "Tablet" }));
    await user.click(screen.getByRole("checkbox", { name: "Not sure" }));
    await user.click(screen.getByRole("radio", { name: "Beginner" }));
    expect(form).toBeValid();
    for (const value of ["0", "-1", "2.5"]) {
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value } });
      expect(screen.getByRole("spinbutton")).toBeInvalid();
      expect(form).toBeInvalid();
    }
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "25" } });
    fireEvent.change(screen.getByLabelText("School representative's email address"), {
      target: { value: "not-an-email" }
    });
    expect(form).toBeInvalid();
  });

  it("prints entered details and marks without clearing or submitting them", async () => {
    const user = userEvent.setup();
    const print = jest.spyOn(window, "print").mockImplementation(() => undefined);
    const { container } = render(<WorkshopCoordinationChecklist />);
    await user.type(screen.getByLabelText("School name"), "Example School");
    await user.type(screen.getByLabelText("School representative's email address"), "coordinator@example.test");
    fireEvent.change(screen.getByLabelText("Date of event"), { target: { value: "2026-10-15" } });
    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "25" } });
    await user.click(screen.getByRole("checkbox", { name: "Tablet" }));
    await user.click(screen.getByRole("radio", { name: "Intermediate" }));
    await user.click(screen.getByRole("button", { name: "Print a copy" }));
    expect(print).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("School name")).toHaveValue("Example School");
    expect(Array.from(container.querySelectorAll(".print-value"), node => node.textContent))
      .toEqual(["Example School", "coordinator@example.test", "2026-10-15", "25"]);
    expect(Array.from(container.querySelectorAll(".print-mark")).filter(node => node.textContent === "X"))
      .toHaveLength(2);
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("opens the visitor's own email app addressed to Nuevo Foundation", async () => {
    const user = userEvent.setup();
    const assigned: string[] = [];
    const original = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...original,
        set href(value: string) {
          assigned.push(value);
        },
        get href() {
          return assigned[assigned.length - 1] ?? "";
        }
      }
    });
    try {
      render(<WorkshopCoordinationChecklist />);
      await user.type(screen.getByLabelText("School name"), "Example School");
      await user.type(screen.getByLabelText("School representative's email address"), "coordinator@example.test");
      fireEvent.change(screen.getByLabelText("Date of event"), { target: { value: "2026-10-15" } });
      fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "25" } });
      await user.click(screen.getByRole("checkbox", { name: "Tablet" }));
      await user.click(screen.getByRole("checkbox", { name: "Not sure" }));
      await user.click(screen.getByRole("radio", { name: "Beginner" }));
      fireEvent.submit(screen.getByRole("form"));
      expect(assigned).toHaveLength(1);
      const mailto = assigned[0];
      expect(mailto.startsWith("mailto:contact@nuevofoundation.org?")).toBe(true);
      const body = decodeURIComponent(mailto.split("&body=")[1]);
      expect(body).toContain("School name: Example School");
      expect(body).toContain("Date of event: 2026-10-15");
      expect(body).toContain("How many students will attend?: 25");
      expect(body).toContain("Devices students will use: Tablet");
      expect(body).toContain("Operating systems: Not sure");
      expect(body).toContain("Students' computer experience level: Beginner");
      expect(screen.getByRole("status")).toHaveTextContent(/press Send/);
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: original });
    }
  });

  it("keeps answers out of browser storage and clears them on remount", async () => {
    const user = userEvent.setup();
    const getItem = jest.spyOn(Storage.prototype, "getItem");
    const setItem = jest.spyOn(Storage.prototype, "setItem");
    const { unmount } = render(<WorkshopCoordinationChecklist />);
    await user.type(screen.getByLabelText("School name"), "Example School");
    await user.click(screen.getByRole("checkbox", { name: "Laptop" }));
    await user.click(screen.getByRole("radio", { name: "Advanced" }));
    unmount();
    render(<WorkshopCoordinationChecklist />);
    expect(screen.getByLabelText("School name")).toHaveValue("");
    screen.getAllByRole("checkbox").forEach(input => expect(input).not.toBeChecked());
    screen.getAllByRole("radio").forEach(input => expect(input).not.toBeChecked());
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
