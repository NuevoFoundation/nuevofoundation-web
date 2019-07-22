import * as React from "react";
import styled from "styled-components";
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const PageWrapper = styled.div`
  font-family: "Lato", sans-serif;
  padding: 40px;
`;

const SessionsWrappper = styled.div`
  font-family: "Lato", sans-serif;
`;

const PastSessionsWrapper = styled.div`
  font-family: "Lato", sans-serif;
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
    const data = [{
      name: 'Adriana',
      id: 123,
      session: 'yesterday'
    },{
      name: 'Carla',
      id: 456,
      session: 'this morning'
    }];
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Id',
      accessor: 'id',
    }, {
      Header: 'Session',
      accessor: 'session',
    }]
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
        <SessionsWrappper>
          <h3>Past Sessions</h3>
          <PastSessionsWrapper>
            <ReactTable
            data={data}
            columns={columns}/>
          </PastSessionsWrapper>
        </SessionsWrappper>
      </PageWrapper>

    )
  }
}
