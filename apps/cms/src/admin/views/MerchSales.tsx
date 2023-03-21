import React, {useEffect, useState, useLayoutEffect} from "react";
import { Button } from 'payload/components/elements';
import { AdminView } from 'payload/config';
import ViewTemplate from "./ViewTemplate";
import LatestOrder from "../components/LatestOrder";
import TotalCustomers from "../components/TotalCustomers";
import TotalProfit from "../components/TotalProfit";
import Budget from "../components/Budget";
import LineChart from "../components/LineChart";
import {Box, Container, Grid} from '@mui/material';

// jest.mock('axios')

const MerchSales: AdminView = ({ user, canAccessAdmin }) => {

  const [totalProfit, setTotalProfit] = useState("")
  const [merchList, setMerchList] = useState({})
  const [orderNum, setOrderNum] = useState(0)

  const[chartLabels, setChartLabels] = useState([])
  const[merchNum, setMerchNum] = useState({})
 

  function formatMerchList(orders){

    orders['orders'].forEach((o)=>{
      let [orderItems] = o.orderItems
      if(!merchList.hasOwnProperty(orderItems.id))
        setMerchList(merchList[orderItems.id] = orderItems.name)
    })


  }

  function formatTotalProfit(totalProfit){
    return '$' + totalProfit/100
  }

  function formatOrderNum(order){
    return order['orders'].length
  }


  function formatOrderGrouped(orders){
    let months = Object.entries(orders['orders'].reduce((b, a) => {

      let monthYear = a.orderDateTime.substr(0,11)
      let [merchID] = a.orderItems
    
      
      if (!b.hasOwnProperty(monthYear)) b[monthYear] = {};

      if(b[monthYear].hasOwnProperty(merchID.id))
        b[monthYear][merchID.id] += 1;
      else
        b[monthYear][merchID.id] = 1;
    
      return b; }, []))
      .sort((a,b) => a[0].localeCompare(b[0]))
      .map(e => ({[e[0]]:e[1]}));
    

    let chart = []
    months.forEach((item)=>{
        let [key] = Object.keys(item)
        
        setChartLabels([...chartLabels, chartLabels.push(key.slice(5,7).concat( "/",key.slice(8,10), "/", key.slice(0,4)))])
    })

    let merchIDList = Object.keys(merchList);
    let merchNum = {}
    
    merchIDList.forEach((key)=>{
        if(!merchNum.hasOwnProperty(key))
            merchNum[key] = [];
            
        months.forEach((date)=>{
            let [d] = Object.keys(date)
            if(date[d].hasOwnProperty(key))
              setMerchNum(merchNum[key].push(date[d][key]))
            else
              setMerchNum(merchNum[key].push(0))
                
        })
    
    })

    console.log(merchNum)
  }


  useEffect(() => {

    //axios get totalRevenue 
    const totalProfit = 13000
    
    setTotalProfit(formatTotalProfit(totalProfit))

    //axios get orders
    const orders =  {
      orders: [
        {
          "orderDateTime": "2023-02-22 13:52:45.335980",
          "orderID": "b431a8dd-730e-4caa-9783-b807d4bb1068",
          "customerEmail": "a@a.com",
          "orderItems": [
            {
              "image": "https://cdn.ntuscse.com/merch/products/images/2022_001_01.jpeg",
              "quantity": 1,
              "size": "XS",
              "price": 1200,
              "name": "SCSE Standard T-shirt",
              "colorway": "Black",
              "id": "2022_001",
              "product_category": "T-shirt"
            }
          ],
          "transactionID": "pi_3MeIkTI2fddOVwLc0S3J9ioj",
          "paymentGateway": "stripe",
          "status": 1
        },
        {
          "orderDateTime": "2023-02-20 13:52:45.335980",
          "orderID": "b431a8dd-730e-4caa-9783-b807d4bb1068",
          "customerEmail": "a1@a.com",
          "orderItems": [
            {
              "image": "https://cdn.ntuscse.com/merch/products/images/2022_001_01.jpeg",
              "quantity": 1,
              "size": "XS",
              "price": 1200,
              "name": "SCSE Standard T-shirt",
              "colorway": "Black",
              "id": "2022_001",
              "product_category": "T-shirt"
            }
          ],
          "transactionID": "pi_3MeIkTI2fddOVwLc0S3J9ioj",
          "paymentGateway": "stripe",
          "status": 1
        },
        {
          "orderDateTime": "2023-03-22 13:52:45.335980",
          "orderID": "b431a8dd-730e-4caa-9783-b807d4bb1068",
          "customerEmail": "a@a.com",
          "orderItems": [
            {
              "image": "https://cdn.ntuscse.com/merch/products/images/2022_001_01.jpeg",
              "quantity": 1,
              "size": "XS",
              "price": 1200,
              "name": "SCSE Standard T-shirt",
              "colorway": "Black",
              "id": "2022_001",
              "product_category": "T-shirt"
            }
          ],
          "transactionID": "pi_3MeIkTI2fddOVwLc0S3J9ioj",
          "paymentGateway": "stripe",
          "status": 1
        },
        {
          "orderDateTime": "2022-02-22 13:52:45.335980",
          "orderID": "b431a8dd-730e-4caa-9783-b807d4bb1068",
          "customerEmail": "a3@a.com",
          "orderItems": [
            {
              "image": "https://cdn.ntuscse.com/merch/products/images/2022_001_01.jpeg",
              "quantity": 1,
              "size": "XS",
              "price": 1200,
              "name": "SCSE Standard T-shirt",
              "colorway": "Black",
              "id": "2022_002",
              "product_category": "T-shirt"
            }
          ],
          "transactionID": "pi_3MeIkTI2fddOVwLc0S3J9ioj",
          "paymentGateway": "stripe",
          "status": 1
        }
  
      ]
    }
  
    formatMerchList(orders)
    setOrderNum(formatOrderNum(orders))
    formatOrderGrouped(orders)

    console.log(merchNum)


  }, []);

  function chartDataOneMerch(merchNum, merchList){
    let chartData = []
    let keyMerchList = Object.keys(merchList)
    keyMerchList.forEach((merchKey)=>{
        chartData.push({
            name: merchList[merchKey],
            type: 'line',
            fill: 'solid',
            data: merchNum[merchKey],
        })
    })

    return chartData

  }

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
        py: 8,
      }}
    >
      <Container
        maxWidth={false}
        
      >
        <Grid
          container
          spacing={3}
        >
          

          <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalCustomers orderNum={orderNum}/>
          </Grid>

          <Grid
              item
              xl={3}
              lg={4}
              sm={6}
              xs={12}
            >
              <TotalProfit totalProfit={totalProfit} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>



    <Grid sx={{mb:3}}>
      <LineChart
        title = "Merch Sales"
        subheader="(+43%) than last year"
        //MONTH//DAY//YEAR
        chartLabels={chartLabels}

        chartData={chartDataOneMerch(merchNum, merchList)}

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
