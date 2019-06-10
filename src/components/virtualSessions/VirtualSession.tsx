import * as React from "react";
import { ServiceResolver } from "../../services/ServiceResolver";
import { RouteComponentProps } from "react-router-dom";
import { VirtualSessionInterface } from "../../models/VirtualSession";
import styled, { StyledFunction } from "styled-components";
import { DateFormattingHelper } from "../../helpers/DateFormattingHelper";
import { SessionStorageHelper } from "../../helpers/SessionStorageHelper";
import { JwtTokenHelper } from "../../helpers/JwtTokenHelper";
import { AuthContext } from '../../contexts/AuthContext';

const PageWrapper = styled.div`
  font-family: "Lato", sans-serif;
  color: #212529;
  text-align: center;
`

const Title = styled.div`
  font-size: 28px;
  text-align: center;
`

const TimePreferences = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  text-align: center;
  padding: 40px 0 40px 0;
`

const TimePreference = styled.div`
  padding: 20px 0 20px 0;
`

const TimeWeekday = styled.div`
  font-size: 26px;
  color: #212529;
`

const MonthDay = styled.div`
  font-size: 26px;
  color: #212529;
`

const ConfirmSection = styled.div`
  display: flex;
  justify-content: center;
`

const ConfirmButton = styled.button`
  background-color: #FCC600;
  border: none;
  border-radius: 4px;
  color: #000000;
  padding: 15px 62px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;

  :disabled {
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  }
`

interface ActionButtonProps {
  active: boolean;
}

const div: StyledFunction<
  ActionButtonProps & React.HTMLProps<HTMLInputElement>
> = styled.div;

const ActionButton = div`
  font-family: 'Lato', sans-serif;
  border: none;
  border-radius: 4px;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  background-color: ${(props: ActionButtonProps) =>
    props.active ? "#fcc600" : "#cccccc"};
  color: ${(props: ActionButtonProps) =>
    props.active ? "#000000" : "#666666"};
`;

interface IVirtualSessionParams {
  id: string;
}

interface IVirtualSessionProps extends RouteComponentProps<IVirtualSessionParams> {

}

interface IVirtualSessionState {
  virtualSession?: VirtualSessionInterface;
  timePreferences?: string[];
  preferenceSelected: number;
  virtualSessionValid: boolean;
  actionButtonText: string;
}

export class VirtualSession extends React.Component<IVirtualSessionProps, IVirtualSessionState> {
  public apiService = new ServiceResolver().ApiService();
  constructor(props: IVirtualSessionProps) {
    super(props);
    this.state = {
      virtualSession: undefined,
      timePreferences: undefined,
      preferenceSelected: 0,
      virtualSessionValid: true,
      actionButtonText: 'Confirm'
    }
  }

  public async componentDidMount() {
    const virtualSession = await this.apiService.getVirtualSession(this.props.match.params.id);
    const virtualSessionValid = virtualSession.volunteerId === "00000000-0000-0000-0000-000000000000";
    const timePreferences = [virtualSession.timePreferenceOne!, virtualSession.timePreferenceTwo!, virtualSession.timePreferenceThree!];
    this.setState({
      virtualSession,
      timePreferences,
      virtualSessionValid
    });
  }

  public handleTimePreferenceSelect = (preferenceSelected: number) => {
    this.setState({
      preferenceSelected
    });
  }

  public handleConfirmClick = async () => {
    const memberNotPresent = SessionStorageHelper.GetJwt()! === undefined;
    if (memberNotPresent) {
      return;
    }

    const volunteerId = JwtTokenHelper.decodeMemberId(SessionStorageHelper.GetJwt()!.token);

    const { virtualSession, timePreferences, preferenceSelected } = this.state;
    virtualSession!.volunteerId = volunteerId;
    virtualSession!.timePreferenceSelected = timePreferences![preferenceSelected];

    try {
      await this.apiService.updateVirtualSession(this.props.match.params.id, virtualSession!);
      this.setState({
        virtualSessionValid: false,
        actionButtonText: 'Confirmed'
      })
    }
    catch {
      // TODO: Catch and display validation error message
    }
  }


  public render() {
    const { virtualSession, virtualSessionValid, actionButtonText } = this.state;
    const timePreferences = virtualSession === undefined ? undefined : [virtualSession.timePreferenceOne, virtualSession.timePreferenceTwo, virtualSession.timePreferenceThree]
    return (
      <React.Fragment>
        {virtualSession === undefined ?
          <div>loading...</div>
          :
          <PageWrapper >
            <Title>Select time preference</Title>
            <TimePreferences>
              {timePreferences!.map((timePreference?: string, key?: number) => {
                return <TimePreference key={key}>
                  <TimeWeekday>{DateFormattingHelper.formatToTimeDay(timePreference)}</TimeWeekday>
                  <MonthDay>{DateFormattingHelper.formatToMonthDay(timePreference)}</MonthDay>
                  <ActionButton active={key === this.state.preferenceSelected} onClick={() => this.handleTimePreferenceSelect(key!)}>
                    {key === this.state.preferenceSelected ? "Selected" : "Select"}
                  </ActionButton>
                </TimePreference>
              })}
            </TimePreferences>
            <AuthContext.Consumer>
              {({ memberAuthenticated, toggleAuthentication, memberAuthenticatedName }) => (
                <React.Fragment>
                  <ConfirmSection>
                    <ConfirmButton disabled={!virtualSessionValid || !memberAuthenticated} onClick={this.handleConfirmClick}>{actionButtonText}</ConfirmButton>
                  </ConfirmSection>
                  {memberAuthenticated ?
                    !virtualSessionValid ?
                      <div>This virtual session has already been confirmed by another volunteer.</div>
                      :
                      <div>Only confirm if you are certain you can participate in the virtual session.</div>
                    :
                    <div>Sign into your Nuevo Foundation volunteer account before confirming this virtual session.</div>
                  }
                </React.Fragment>
              )}
            </AuthContext.Consumer>
          </PageWrapper >
        }
      </React.Fragment>
    );
  }
}
