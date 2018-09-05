import * as React from 'react';
import styled from 'styled-components';
import '../../assets/stylesheets/Connect.css';

const contentHeight = 675;
const HomePageWrapper = styled.div`
`
const ConnectContent = styled.div`
  background-color: white;
  height: 675px;
`

const ContentWrapper = styled.div`
  padding-left: 60px;
  padding-top: ${contentHeight/4}px;
`

const SpaceWrapper = styled.div`
padding-top: 30px;
`
const MapWrapper = styled.div`
background-image: url("./seattleMap.PNG");
background-repeat: no-repeat;
`



export class Connect extends React.Component {
    public render() {
        return (
            <HomePageWrapper>
                <ConnectContent>
                    <ContentWrapper>
                        <div className="connect-title">Connect </div>
                        <SpaceWrapper>
                            <div className= "connect-text">  The Nuevo Foundation based in Seattle, Washington. </div>
                        </SpaceWrapper>
                        <SpaceWrapper>
                            <div className="address-title"> Address  </div>
                            <div className="connect-text"> 7 Kings Road,<br/> Seattle, <br/> WA 98103 </div>
                        </SpaceWrapper>
                        <SpaceWrapper>
                            <div className="connect-text">To update your giving info or with any other questions about your donation, please contact: </div>
                        </SpaceWrapper>
                        <SpaceWrapper>
                            <div className="connect-text"> John Doe <br/> connect@nuevofoundation.org <br/> (417)823-8998  </div>
                        </SpaceWrapper>

                        <SpaceWrapper>
                            <div className= "square"> &nbsp; </div>
                            <div className="circle"> Insert image here </div>
                        </SpaceWrapper>
                        <MapWrapper/>
                    </ContentWrapper>
                </ConnectContent>
            </HomePageWrapper>
        )
    }
}