import * as React from "react";
import styled from "styled-components";
import { Table } from "react-bootstrap";
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
    return (
      <PageWrapper>
        <SessionsWrappper>
          <h3>Past Sessions</h3>
          <PastSessionsWrapper>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Volunteer</th>
                  <th>Time Scheduled</th>
                </tr>
              </thead>
              <tbody>
                {this.state?.virtualSessions?.map((session, index) => (
                  <tr key={index}>
                    <td>{session.volunteerId}</td>
                    <td>{session.timePreferenceSelected}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </PastSessionsWrapper>
        </SessionsWrappper>
      </PageWrapper>

    )
  }
}
