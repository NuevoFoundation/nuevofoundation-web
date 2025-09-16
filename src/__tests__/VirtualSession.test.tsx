import * as React from "react";import * as React from "react";import * as React from "react";import * as React from "react";

import { render } from "@testing-library/react";

import { VirtualSession } from "../components/virtualSessions/VirtualSession";import { render } from "@testing-library/react";

import { AuthContext } from "../contexts/AuthContext";

import { MemoryRouter } from "react-router-dom";import { VirtualSession } from "../components/virtualSessions/VirtualSession";import { render } from "@testing-library/react";import { render } from "@testing-library/react";



describe("<VirtualSession />", () => {import { AuthContext } from "../contexts/AuthContext";

  it("renders without crashing", () => {

    render(import { MemoryRouter } from "react-router-dom";import { VirtualSession } from "../components/virtualSessions/VirtualSession";import { VirtualSession } from "../components/virtualSessions/VirtualSession";

      <MemoryRouter initialEntries={["/virtual-sessions/1"]}>

        <AuthContext.Provider

          value={{

            memberAuthenticated: false,describe("<VirtualSession />", () => {import { AuthContext } from "../contexts/AuthContext";import { AuthContext } from "../contexts/AuthContext";

            toggleAuthentication: () => {},

            memberAuthenticatedName: ""  it("renders without crashing", () => {

          }}

        >    render(import { createMemoryHistory, createLocation } from "history";import { createMemoryHistory, createLocation } from "history";

          <VirtualSession 

            location={{ pathname: "/virtual-sessions/1", search: "", hash: "", state: {} }}      <MemoryRouter initialEntries={["/virtual-sessions/1"]}>

            history={{} as any}

            match={{ params: { id: "1" }, isExact: true, path: "/virtual-sessions/:id", url: "/virtual-sessions/1" }}        <AuthContext.Providerimport { match } from "react-router";import { match } from "react-router";

          />

        </AuthContext.Provider>          value={{

      </MemoryRouter>

    );            memberAuthenticated: false,import { Const } from "../Const";import { Const } from "../Const";

  });

});            toggleAuthentication: () => {},

            memberAuthenticatedName: ""

          }}

        >describe("<VirtualSession />", () => {describe("<VirtualSession />", () => {

          <VirtualSession 

            location={{ pathname: "/virtual-sessions/1", search: "", hash: "", state: {} }}  const history = createMemoryHistory();  const history = createMemoryHistory();

            history={{} as any}

            match={{ params: { id: "1" }, isExact: true, path: "/virtual-sessions/:id", url: "/virtual-sessions/1" }}  const path = Const.VirtualSession;  const path = Const.VirtualSession;

          />

        </AuthContext.Provider>

      </MemoryRouter>

    );  const matchProps: match<{ id: string }> = {  const match: match<{ id: string }> = {

  });

});    isExact: false,    isExact: false,

    path,    path,

    url: path.replace(":id", "1"),    url: path.replace(":id", "1"),

    params: { id: "1" }    params: { id: "1" }

  };  };



  const location = createLocation(matchProps.url);  const location = createLocation(match.url);



  it("renders without crashing", () => {  it("renders without crashing", () => {

    render(    render(

      <AuthContext.Provider      <AuthContext.Provider

        value={{        value={{

          memberAuthenticated: false,          memberAuthenticated: false,

          toggleAuthentication: () => {},          toggleAuthentication: () => {},

          memberAuthenticatedName: ""          memberAuthenticatedName: ""

        }}        }}

      >      >

        <VirtualSession location={location} history={history} match={matchProps} />        <VirtualSession location={location} history={history} match={match} />

      </AuthContext.Provider>      </AuthContext.Provider>

    );    );

  });  });

});});
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
