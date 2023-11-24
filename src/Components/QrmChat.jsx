import React, { useEffect, useState } from "react";
import { CardContent, Grid, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import warehouse from "../Img/warehouse.jpg";
import arrow from "../Img/pngfind.com-double-arrow-png-633217.png";

function QrmChat() {
  const [qkm, setQkm] = useState();
  const [supply, setSupply] = useState();

  useEffect(() => {
    const excel = async () => {
      const response = await fetch("/data/Punjab_Result_Annual.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let sum = 0;
      let isHeaderRow = true;
      for (let cell in sheet) {
        if (!isHeaderRow) {
          if (cell[0] === "R") {
            const cellValue = sheet[cell].v;

            if (!isNaN(cellValue)) {
              const numericValue = parseFloat(cellValue);
              sum += numericValue;
            } else {
              console.log(
                `Non-numeric value in cell of ${cell} Warehouse : "${cellValue}"`
              );
            }
          }
        }
        isHeaderRow = false;
      }
      const capacityInMq = (sum / 1000).toFixed(2);
      setQkm(capacityInMq);
    };
    excel();
  }, []);

  useEffect(() => {
    const excel = async () => {
      const response = await fetch("/data/punjab.xlsx");
      const arrayBuffer = await response.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      let sum = 0;
      let isHeaderRow = true; // Initialize as true to skip the first row

      for (let cell in sheet) {
        if (cell[0] === "B") {
          if (!isHeaderRow) {
            const cellValue = sheet[cell].v;
            const numericValue = parseFloat(cellValue);
            sum += numericValue;
          } else {
            // Once you encounter a cell in column B, mark the header row as processed
            isHeaderRow = false;
          }
        }
      }

      setSupply(sum);
    };
    excel();
  }, []);

  return (
    <div
      style={{
        width: "60vw",
        backgroundColor: "white",
        margin: 20,
        borderRadius: 8,
        // boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Grid>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          style={{ padding: 25 }}
        >
          <Grid item>
            <img
              src={warehouse}
              alt="WarehouseIcon"
              style={{
                width: "15vw",
                height: "45vh",
              }}
            />
          </Grid>
          <Grid
            item
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Typography variant="h5">{supply} supply</Typography>
            </Grid>
            <Grid item>
              <img
                src={arrow}
                alt="WarehouseIcon"
                style={{
                  width: "20vw",
                  height: "8vh",
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{qkm} qkm</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <img
              src={warehouse}
              alt="WarehouseIcon"
              style={{
                width: "15vw",
                height: "45vh",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default QrmChat;
