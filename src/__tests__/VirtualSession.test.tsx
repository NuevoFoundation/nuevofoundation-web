import * as React from "react";
import * as ReactDOM from "react-dom";
import { VirtualSession } from "../components/virtualSessions/VirtualSession";
import { mount } from "enzyme";
import { AuthContext } from "../contexts/AuthContext";
import { createMemoryHistory, createLocation } from "history";
import { match } from "react-router";
import { Const } from "../Const";

describe("<VirtualSession />", () => {
  const history = createMemoryHistory();
  const path = Const.VirtualSession;

  const match: match<{ id: string }> = {
    isExact: false,
    path,
    url: path.replace(":id", "1"),
    params: { id: "1" }
  };

  const location = createLocation(match.url);

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <VirtualSession location={location} history={history} match={match} />,
      div
    );
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
        <VirtualSession location={location} history={history} match={match} />
      </AuthContext.Provider>
    );

    wrapper
      .find(VirtualSession)
      .instance()
      .setState({ virtualSession: {} });
    wrapper.update();

    expect(
      wrapper.containsMatchingElement(
        <div>
          Sign into your Nuevo Foundation volunteer account before confirming
          this virtual session.
        </div>
      )
    ).toBeTruthy();
  });

  it("authentication validation message not shown to authenticated members", () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{
          memberAuthenticated: true,
          toggleAuthentication: () => {},
          memberAuthenticatedName: ""
        }}
      >
        <VirtualSession location={location} history={history} match={match} />
      </AuthContext.Provider>
    );

    wrapper
      .find(VirtualSession)
      .instance()
      .setState({ virtualSession: {} });
    wrapper.update();

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
        <VirtualSession location={location} history={history} match={match} />
      </AuthContext.Provider>
    );

    wrapper
      .find(VirtualSession)
      .instance()
      .setState({ virtualSession: {} });
    wrapper.update();

    const button = wrapper.find("button");
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
        <VirtualSession location={location} history={history} match={match} />
      </AuthContext.Provider>
    );
    wrapper
      .find(VirtualSession)
      .instance()
      .setState({ virtualSessionValid: true, virtualSession: {} });
    wrapper.update();

    const button = wrapper.find("button");
    expect(button.props()["disabled"]).toBeFalsy();
  });
});
