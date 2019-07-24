import * as React from "react";
import styled from "styled-components";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ServiceResolver } from "../../services/ServiceResolver";
import { JwtTokenHelper } from "../../helpers/JwtTokenHelper";
import { SessionStorageHelper } from "../../helpers/SessionStorageHelper";
import { VirtualSession } from "../virtualSessions";
import { VirtualSessionInterface } from "../../models/VirtualSession";
import { MemberInterface } from "../../models/Member";


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

interface MemberAccountState {
  virtualSessions: VirtualSessionInterface[];
  MemberId: MemberInterface;
}

export class MemberAccount extends React.Component<{}, MemberAccountState> {
  public apiService = new ServiceResolver().ApiService();

  public async componentWillMount() {
    const id = JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token);
    const virtualSessions = await this.apiService.getAllVirtualSessions(id);
    this.apiService.getMember(id).then(member => {
      this.MemberId = member.id;
      this.FullName = member.fullName;
    });
    this.setState({
      virtualSessions
      MemberAccount
    })
  }
  public render() {
    const columns = [{
      Header: 'Name',
      accessor: 'd'
    },
    {
      Header: ''
    },
    {

    }];
    return (
      <PageWrapper>
        <SessionsWrappper>
          <h3>Past Sessions</h3>
          <PastSessionsWrapper>
            <ReactTable
            data={virtualSessions}
            columns={columns}/>
          </PastSessionsWrapper>
        </SessionsWrappper>
      </PageWrapper>

    )
  }
}
