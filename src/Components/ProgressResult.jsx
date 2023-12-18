import React, { useState, useEffect } from 'react';
import { Card, Checkbox } from '@material-ui/core';
import AnalyisImage from '../Img/Analyis.jpg';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { useContext } from "react";
import userContext from '../Context/userContext';

const ProgressResult = () => {
  const [fciSupply, setFCISupply] = useState({});
  const [fciDemand, setFCIDemand] = useState({});
  const [message, setMessage] = useState('');
  const [isOptimizationProvided, setIsOptimizationProvided] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showDistricts, setShowDistricts] = useState(false);
  const [districtsAvailable, setDistrictsAvailable] = useState(true);
  const [districtNames, setDistrictNames] = useState([]);
  const { counts } = useContext(userContext);
  const [isProcessing, setIsProcessing] = useState(true); // Indicator for processing

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/getGraphData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setFCISupply(data.District_Capacity || {});
      setFCIDemand(data.District_Demand || {});

      // Check if district names are available
      const areDistrictsAvailable = data.District_Name_1 && data.District_Name_1.length > 0;
      setDistrictsAvailable(areDistrictsAvailable);

      // Set district names from the response
      if (areDistrictsAvailable) {
        setDistrictNames(data.District_Name_1);
      }

      setIsProcessing(false); // Set processing indicator to false after data fetch
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsProcessing(false); // Set processing indicator to false on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalSupply = Object.values(fciSupply).reduce((acc, curr) => acc + curr, 0);
  const totalDemand = Object.values(fciDemand).reduce((acc, curr) => acc + curr, 0);

  useEffect(() => {
    if (isChecked) {
      if (totalSupply > 0 && totalDemand > 0) {
        if (totalSupply >= totalDemand) {
          setMessage('Optimization can be provided.');
          setIsOptimizationProvided(true);
        } else {
          setMessage('Please go for optimization.');
          setIsOptimizationProvided(false);
        }
      } else {
        setMessage('Optimization cannot be provided.');
        setIsOptimizationProvided(false);
      }
    } else {
      setMessage('');
      setIsOptimizationProvided(false);
    }
  }, [isChecked, totalSupply, totalDemand]);

  const handleStateCheckbox = (e) => {
    setIsChecked(e.target.checked);
    if (!e.target.checked) {
      setShowDistricts(false); 
    }
  };

  const handleDistrictsCheckbox = (e) => {
    setShowDistricts(e.target.checked);
  };

  return (
    <Card style={{ border: '2px solid #5E35B1', padding: '20px', margin: '20px', borderRadius: "20px", backgroundColor:"#5E35B1", color:"white" }}>
      {isProcessing ? (
        <div>
          <h1 style={{ color: "white" }}>Processing...</h1>
          <Stack sx={{ color: 'grey.500' , justifyContent:"center"}} spacing={2} direction="row">
            <CircularProgress color="secondary" />
          </Stack>
        </div>
      ) : (
        <div>
          <h1 style={{ color: "white" }}>Progress Bar</h1>
          <h3>File Upload Successfully</h3>
          <img src={AnalyisImage} alt="Analysis" style={{ maxWidth: '80px', maxHeight: '80px', marginTop: '-15px' }} />

          <h3>Pre-Analysis</h3>
          <em>
            <b>State-Wise</b>
          </em>
          <Checkbox checked={isChecked} onChange={handleStateCheckbox} color="primary" />
          {isChecked && (
            <div>
              <h3>Total FCI Supply: {totalSupply}</h3>
              <h3>Total FCI Demand: {totalDemand}</h3>
              <div style={{ color: isOptimizationProvided ? 'green' : 'red', fontWeight: isOptimizationProvided ? 'bold' : 'bold' }}>{message}</div>
            </div>
          )}

          {isChecked && ( 
            <div>
              <em>
                <b>District-wise Supply and Demand</b>
              </em>
              <Checkbox checked={showDistricts} onChange={handleDistrictsCheckbox} color="primary" />
              {showDistricts && isChecked && (
                <div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {districtNames.map((district, index) => (
                      <li key={index}>
                        <strong>{district}</strong>
                      </li>
                    ))}
                  </ul>
                  {districtsAvailable ? (
                    <div style={{ color: 'red' }}><b>Intra scenario is not feasible in every district</b></div>
                  ) : (
                    <div style={{ color: 'green' }}><b>Intra scenario in every district is feasible</b></div>
                  )}
                  <h></h>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProgressResult;
