import * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactGA from "react-ga";
import { Const } from "../Const";
import { WorkshopPreparationChecklist } from "../components/static/pages/WorkshopPreparationChecklist";

jest.mock("react-ga", () => ({ pageview: jest.fn() }));
jest.mock("../assets/logos/Logo_long.svg", () => "logo.svg");

const title = "Nuevo Foundation: What to do before a workshop Checklist";
const shared = [
  "Ensure the devices used in the workshop have allowlisted the following websites:",
  "Ensure the session will be taught in a room that has a laptop and a projector to display the content to students.",
  "Before the session, visit Nuevo Foundation Workshops and find the workshop your school will participate in so you understand the content of the session.",
  "Explain to your students that a post-event survey will take place during the last 15 minutes of the workshop (link pending)."
];
const virtualOnly = [
  "Ensure students have headphones.",
  "If your school uses Google Meet, send Nuevo Foundation the meeting invitation and ensure the Nuevo Foundation team has permission to share their screen.",
  "Ensure all students join the virtual meeting using the meeting invitation.",
  "Turn off all students' microphones to avoid echo during the call.",
  "Please monitor the content students are putting in the chat to avoid distractions."
];

afterEach(() => {
  jest.restoreAllMocks();
  jest.clearAllMocks();
});

describe("School workshop preparation checklist", () => {
  it("has its own title, audience, NF logo, and all 4/9 items without coordination fields", () => {
    const { container } = render(<WorkshopPreparationChecklist />);
    expect(document.title).toBe(title);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(title);
    expect(screen.getByText("For the school representative")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Nuevo Foundation" })).toHaveAttribute("src", "logo.svg");
    expect(screen.getAllByRole("group")).toHaveLength(2);
    expect(screen.getAllByRole("checkbox")).toHaveLength(13);
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("spinbutton")).not.toBeInTheDocument();
    expect(screen.queryByRole("form")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Submit/ })).not.toBeInTheDocument();
    const inPerson = screen.getByRole("group", { name: "In-person workshops" });
    const virtual = screen.getByRole("group", { name: "Virtual workshops" });
    for (const [section, labels] of [[inPerson, shared], [virtual, [...shared, ...virtualOnly]]] as const) {
      const checkboxes = within(section).getAllByRole("checkbox");
      expect(checkboxes).toHaveLength(labels.length);
      expect(section.querySelector("ol")?.children).toHaveLength(labels.length);
      labels.forEach((label, index) => {
        expect(checkboxes[index]).toHaveAccessibleName(label);
        expect(checkboxes[index]).not.toBeRequired();
        expect(checkboxes[index]).not.toBeChecked();
      });
      expect(section.querySelector("ol > li:nth-child(4) a")).toBeNull();
      expect(within(section).getByText(/do not change device, network, or meeting settings/)).toBeInTheDocument();
    }
    const ids = Array.from(container.querySelectorAll("[id]"), node => node.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ReactGA.pageview).toHaveBeenCalledWith(Const.WorkshopPreparationChecklistPage);
  });

  it("preserves the clickable websites and inline item 3 without toggling on link clicks", async () => {
    const user = userEvent.setup();
    render(<WorkshopPreparationChecklist />);
    for (const name of ["In-person workshops", "Virtual workshops"]) {
      const section = screen.getByRole("group", { name });
      const websites = within(section).getByRole("list", { name: "Websites to allowlist" });
      expect(within(websites).getAllByRole("listitem").map(item => item.textContent))
        .toEqual(["codebunga.com", "workshops.nuevofoundation.org", "earsketch.gatech.edu"]);
      const checkboxes = within(section).getAllByRole("checkbox");
      expect(checkboxes[0]).toHaveAccessibleDescription(
        /codebunga\.com.*workshops\.nuevofoundation\.org.*earsketch\.gatech\.edu/
      );
      const links = within(section).getAllByRole("link");
      const urls = [
        "https://codebunga.com/", "https://workshops.nuevofoundation.org/",
        "https://earsketch.gatech.edu/landing/#/", "https://workshops.nuevofoundation.org/"
      ];
      expect(links).toHaveLength(4);
      for (let index = 0; index < links.length; index++) {
        expect(links[index]).toHaveAttribute("href", urls[index]);
        expect(links[index]).toHaveAttribute("target", "_blank");
        expect(links[index]).toHaveAttribute("rel", "noopener noreferrer");
        links[index].addEventListener("click", event => event.preventDefault());
        await user.click(links[index]);
        checkboxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
      }
      expect(section.querySelector("ol > li:nth-child(3)")).toContainElement(links[3]);
      expect(section.querySelector("ol > li:nth-child(3)")?.textContent).toBe(shared[2]);
    }
  });

  it("supports keyboard access to every checkbox, link and print button", async () => {
    const user = userEvent.setup();
    render(<WorkshopPreparationChecklist />);
    for (const name of ["In-person workshops", "Virtual workshops"]) {
      const section = screen.getByRole("group", { name });
      const checkboxes = within(section).getAllByRole("checkbox");
      for (let index = 0; index < checkboxes.length; index++) {
        await user.tab();
        expect(checkboxes[index]).toHaveFocus();
        await user.keyboard("[Space]");
        expect(checkboxes[index]).toBeChecked();
        if (index === 0) {
          const websites = within(section).getByRole("list", { name: "Websites to allowlist" });
          for (const link of within(websites).getAllByRole("link")) {
            await user.tab();
            expect(link).toHaveFocus();
          }
        }
        if (index === 2) {
          await user.tab();
          expect(within(section).getByRole("link", { name: "Nuevo Foundation Workshops" })).toHaveFocus();
        }
      }
      await user.tab();
      expect(within(section).getByRole("button")).toHaveFocus();
    }
    await user.tab();
    expect(screen.getByRole("button", { name: "Print a copy" })).toHaveFocus();
  });

  it("keeps format checkmarks independent and restores full printing after each dialog", async () => {
    const user = userEvent.setup();
    const { container } = render(<WorkshopPreparationChecklist />);
    const page = container.querySelector("#workshop-preparation-checklist");
    const printedFormats: (string | null | undefined)[] = [];
    jest.spyOn(window, "print").mockImplementation(() => {
      printedFormats.push(page?.getAttribute("data-print-format"));
    });
    const inPerson = screen.getByRole("group", { name: "In-person workshops" });
    const virtual = screen.getByRole("group", { name: "Virtual workshops" });
    for (const checkbox of within(inPerson).getAllByRole("checkbox")) {
      await user.click(checkbox);
    }
    within(virtual).getAllByRole("checkbox").forEach(checkbox => expect(checkbox).not.toBeChecked());
    expect(Array.from(inPerson.querySelectorAll(".print-mark"), mark => mark.textContent))
      .toEqual(["X", "X", "X", "X"]);
    for (const [name, format] of [
      ["Print in-person copy", "in-person"], ["Print virtual copy", "virtual"], ["Print a copy", "all"]
    ]) {
      await user.click(screen.getByRole("button", { name }));
      expect(page).toHaveAttribute("data-print-format", format);
      fireEvent(window, new Event("afterprint"));
      expect(page).toHaveAttribute("data-print-format", "all");
    }
    expect(printedFormats).toEqual(["in-person", "virtual", "all"]);
    within(inPerson).getAllByRole("checkbox").forEach(checkbox => expect(checkbox).toBeChecked());
    within(virtual).getAllByRole("checkbox").forEach(checkbox => expect(checkbox).not.toBeChecked());
    expect(ReactGA.pageview).toHaveBeenCalledTimes(1);
  });

  it("never saves checks and resets them on remount, cleaning up title and print listener", async () => {
    const user = userEvent.setup();
    const previousTitle = document.title;
    const getItem = jest.spyOn(Storage.prototype, "getItem");
    const setItem = jest.spyOn(Storage.prototype, "setItem");
    const removeListener = jest.spyOn(window, "removeEventListener");
    const { unmount } = render(<WorkshopPreparationChecklist />);
    for (const checkbox of screen.getAllByRole("checkbox")) {
      await user.click(checkbox);
    }
    unmount();
    expect(document.title).toBe(previousTitle);
    expect(removeListener).toHaveBeenCalledWith("afterprint", expect.any(Function));
    render(<WorkshopPreparationChecklist />);
    screen.getAllByRole("checkbox").forEach(checkbox => expect(checkbox).not.toBeChecked());
    expect(getItem).not.toHaveBeenCalled();
    expect(setItem).not.toHaveBeenCalled();
  });
});
