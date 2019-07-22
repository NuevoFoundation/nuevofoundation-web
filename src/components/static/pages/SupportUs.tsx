import * as React from "react";
import styled from "styled-components";
import "../../../assets/stylesheets/SupportUs.css";
import { DonateButton } from "../common/DonateButton";
import { Paper, Box, Typography } from '@material-ui/core'

const SupportUsPageWrapper = styled.div``;

export const SupportUs: React.FC = (): JSX.Element => {

  return (
    <SupportUsPageWrapper>
      <Paper style={{borderRadius: '0px', marginBottom: '16px', height: '320px'}}>
        <Box style={{height: '100%', width: '25%'}}>
          <Typography variant="h2" gutterBottom>
            Support Us
          </Typography>
        </Box>
      </Paper>
      <div style={{height: `${window.innerHeight-320}px`}}>
        <Typography variant="h2">
            [TBD]
        </Typography>
      </div>
    </SupportUsPageWrapper>
  )
}
