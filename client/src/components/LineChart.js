import React from "react";
import Chart from "react-apexcharts";

const LineChart = (props) => {
  // console.log(props.chartData);
  
  const dateArr= [];
  const dataArr = [];

  for (const element in props.chartData) {
    // console.log(props.chartData[element]);
    const date = new Date(props.chartData[element][0]);
    const formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1)+ '-' + date.getUTCFullYear()
    // console.log(formattedDate);
    dateArr.push(formattedDate);
    dataArr.push(props.chartData[element][1]);
  }
  
  // console.log(dateArr);
  // console.log(dataArr);
  
  const options = {
    stroke: {
      curve: 'straight'
    },
    title: {
      text: props.coinName,
      align: "left",
    },
    xaxis: {
      // type: "datetime",
      categories: dateArr,
    },
  };

  const series = [{
    data: dataArr,
  }];

  return (
    <div id="chart">
      <Chart
        options={options}
        series={series}
        type="line"
        height={500}
      />
    </div>
  );
};

export default LineChart;
