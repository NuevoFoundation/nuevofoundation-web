import * as React from "react";
import styled from "styled-components";
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { ServiceResolver } from "../../services/ServiceResolver";
import { JwtTokenHelper } from "../../helpers/JwtTokenHelper";
import { SessionStorageHelper } from "../../helpers/SessionStorageHelper";
import { VirtualSessionInterface } from "../../models/VirtualSession";


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

interface MemberAccountState {
  virtualSessions: VirtualSessionInterface[];
  //MemberId: MemberInterface;
}

export class MemberAccount extends React.Component<{}, MemberAccountState> {
  public apiService = new ServiceResolver().ApiService();

  public async componentDidMount() {
    const id = JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token);
    const allVirtualSessions = await this.apiService.getAllVirtualSessions(id);
    //const memberId = this.apiService.getMember(id);
    this.setState({
      virtualSessions: allVirtualSessions
    })
  };
  public render() {
    const columns = [{
      Header: 'Volunteer',
      accessor: 'volunteerId'
    },
    {
      Header: 'Time Scheduled',
      accessor: 'timePreferenceSelected'
    }];
    return (
      <PageWrapper>
        <SessionsWrappper>
          <h3>Past Sessions</h3>
          <PastSessionsWrapper>
            {React.createElement(ReactTable as any, {
              data: this.state?.virtualSessions || [],
              columns: columns
            })}
          </PastSessionsWrapper>
        </SessionsWrappper>
      </PageWrapper>

    )
  }
}
