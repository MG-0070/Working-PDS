import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { Grid } from "@mui/material";
import Chart from "react-apexcharts";

function Graph() {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    const excel = async () => {
      const response = await fetch("/data/punjab.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      jsonData.shift();
      const names = [];
      const supply = [];
      const demand = [];
      jsonData.forEach((row) => {
        names.push(row[0]);
        supply.push(row[1]);
        demand.push(row[2]);
      });
      setExcelData({ names, supply, demand });
    };
    excel();
  }, []);

  const chartData = {
    height: 480,
    type: "bar",
    options: {
      chart: {
        id: "bar-chart",
        stacked: false,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "50%",
        },
      },
      xaxis: {
        type: "category",
        categories: excelData.names,
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
          },
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },
      legend: {
        show: true,
        fontSize: "14px",
        position: "bottom",
        labels: {
          useSeriesColors: false,
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5,
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8,
        },
      },
      fill: {
        type: "solid",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "#ccc",
      },
      tooltip: {
        theme: "light",
      },
    },
    series: [
      {
        name: "Supply",
        data: excelData.supply,
      },
      {
        name: "Demand",
        data: excelData.demand,
      },
    ],
  };

  return (
    <>
      <div
        style={{
          width: "60vw",
          backgroundColor: "white",
          margin: "5vh 20px 20px 20px",
          borderRadius: 8,
          // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Grid container spacing={2}>
          {/* <Grid item xs={6}></Grid> */}
          <Grid item xs={12}>
            {excelData.names && excelData.names.length > 0 ? (
              <Chart {...chartData} style={{ padding: "20px" }} />
            ) : (
              <div>Loading chart data...</div>
            )}
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default Graph;
