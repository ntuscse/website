import React from "react";
import { Button } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import ViewTemplate from "./ViewTemplate";
import LatestOrder from "../components/LatestOrder";
import TotalCustomers from "../components/TotalCustomers";
import TotalProfit from "../components/TotalProfit";
import Budget from "../components/Budget";
import LineChart from "../components/LineChart";
import {Box, Container, Grid} from '@mui/material';

const MerchSales: AdminView = ({ user, canAccessAdmin }) => {
  return (
  <ViewTemplate
    user={user}
    canAccessAdmin={canAccessAdmin}
    description=""
    keywords=""
    title="Merchandise Sales"
  >

    <Box      
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          
          <Grid
                  item
                  lg={4}
                  sm={6}
                  xl={3}
                  xs={12}
          >
                  <Budget />
          </Grid>

          <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalCustomers />
          </Grid>

          <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalProfit sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>



    <Grid sx={{mb:3}}>
      <LineChart
        title = "Merch Sales"
        subheader="(+43%) than last year"
        chartLabels={[
          '01/01/2023',
          '02/01/2023',
          '03/01/2023',
          '04/01/2023',
          '05/01/2023',
          '06/01/2023',
          '07/01/2023',
          '08/01/2023',
          '09/01/2023',
          '10/01/2023',
          '11/01/2023',
        ]}

        chartData={[
          {
            name: 'Merch 1',
            type: 'column',
            fill: 'solid',
            data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
          },
          {
            name: 'Merch 2',
            type: 'area',
            fill: 'gradient',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
          },
          {
            name: 'Merch 3',
            type: 'line',
            fill: 'solid',
            data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
          },
        ]}

      >

      </LineChart>
    </Grid>

    <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
            sx={{mb:3}}
          >
            <LatestOrder />
    </Grid>
    
    <Button
      el="link"
      to={"/admin"}
      buttonStyle="primary"
    >
      Go to Main Admin View
    </Button>
  </ViewTemplate>
  );
};

export default MerchSales
