import * as React from "react";
import styled from "styled-components";

const PageWrapper = styled.div`
  font-family: "Lato", sans-serif;
  height: 500px;
  padding: 40px;
`;

const Select = styled.select`
  background: transparent;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  height: 48px;
  color: #2C3E50;
  font-size: 13px;
  display: block;
  width: 200px;


  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
`;

export class MemberAccount extends React.Component {


  public render() {
    return (
      <PageWrapper>
        <h2>Account Settings</h2>
        <Select>
          <option>Select your timezone</option>
          <option>America/New_York</option>
        </Select>

        <Select>
          <option>Select your school</option>
          <option>Gray Middle School</option>
        </Select>
      </PageWrapper>
    )
  }
}
