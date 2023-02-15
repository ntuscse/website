import React from "react";
import useChart from './UseChart';

import dynamic from 'next/dynamic'
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });


import {Card, CardHeader, Box} from '@mui/material';

const LineChart = ({title, subheader, chartLabels, chartData, ...other}) => {
    
    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartData.map((i) => i.fill) },
        labels: chartLabels,
        xaxis: { type: 'datetime' },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (y) => {
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} sales`;
              }
              return y;
            },
          },
        },
      });

    return (
    <Card {...other}>
        <CardHeader
            title = {title}
            subheader={subheader} 
        />

        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
            <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
        </Box>
    </Card>
    );
}
 
export default LineChart;