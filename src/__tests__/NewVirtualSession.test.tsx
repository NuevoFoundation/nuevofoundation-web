import * as React from "react";
import * as ReactDOM from "react-dom";
import { NewVirtualSession } from "../components/virtualSessions/NewVirtualSession";
import { shallow, mount } from "enzyme";
import { AuthContext } from "../contexts/AuthContext";

describe("<NewVirtualSession />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<NewVirtualSession />, div);
  });

  it("NewVirtualSession renders 3 datetime-local inputs", () => {
    const wrapper = shallow(<NewVirtualSession />);
    expect(wrapper.find('input[type="datetime-local"]')).toHaveLength(3);
  });

  it("authentication validation message shown to un-authenticated members", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          memberAuthenticated: false,
          toggleAuthentication: () => {},
          memberAuthenticatedName: ""
        }}
      >
        <NewVirtualSession />
      </AuthContext.Provider>
    );
    expect(
      wrapper.containsMatchingElement(
        <div>
          Sign in to your Nuevo Foundation account before submitting a request
          for a virtual session.
        </div>
      )
    ).toBeTruthy();
  });

  it("authentication validation message not shown to authenticated member", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          memberAuthenticated: true,
          toggleAuthentication: () => {},
          memberAuthenticatedName: ""
        }}
      >
        <NewVirtualSession />
      </AuthContext.Provider>
    );
    expect(
      wrapper.containsMatchingElement(
        <div>
          Sign in to your Nuevo Foundation account before submitting a request
          for a virtual session.
        </div>
      )
    ).toBeFalsy();
  });

  it("submit virtual session request button disabled on member un-authenticated and invalid state", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          memberAuthenticated: false,
          toggleAuthentication: () => {},
          memberAuthenticatedName: ""
        }}
      >
        <NewVirtualSession />
      </AuthContext.Provider>
    );
    wrapper.setState({ submitDisabled: true });
    const button = wrapper.find('button[type="submit"]');
    expect(button.props()["disabled"]).toBeTruthy();
  });

  it("submit virtual session request button enabled on member authenticated and valid state", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          memberAuthenticated: true,
          toggleAuthentication: () => {},
          memberAuthenticatedName: ""
        }}
      >
        <NewVirtualSession />
      </AuthContext.Provider>
    );
    wrapper.setState({ submitDisabled: false });
    const button = wrapper.find('button[type="submit"]');
    expect(button.props()["disabled"]).toBeFalsy();
  });
});
