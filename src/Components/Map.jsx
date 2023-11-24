import React from "react";
import "leaflet/dist/leaflet.css";
import Punjab from "../StateData/punjab.json";
import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import locationIcon from "../Img/location.png";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 300,
      width: 100,
    },
  },
};

const markerCoordinates = [
  [31.5722768, 75.0397582, "Amritsar", 2110],
  [31.5272948615872, 75.2684040555133, "Amritsar", 6871],
  [30.13929, 74.9077041, "Bathinda", 2101],
  [30.23193, 75.2365, "Bathinda", 7580],
  [30.29595, 75.2345393, "Bathinda", 7687],
  [30.08846, 75.214387, "Bathinda", 7656],
  [30.802705, 76.564575, "SAS_Nagar", 5571],
  [30.6148688, 76.8459693, "SAS_Nagar", 7748],
  [30.5815472, 76.7143515, "SAS_Nagar", 7746],
  [30.5574254, 76.703748, "SAS_Nagar", 5635],
  [31.05675, 76.10148, "SBS NAGAR", 7546],
  [30.5438389, 76.7049884, "SAS_Nagar", 7496],
  [31.8529346021177, 74.9158444678236, "Amritsar", 1708],
  [31.8148886837804, 74.7697728078379, "Amritsar", 1994],
  [31.7021988353042, 74.6891613444497, "Amritsar", 1988],
  [31.7077785, 74.9261539, "Amritsar", 1764],
  [31.55953000815, 75.178480592297, "Amritsar", 2142],
  [30.16206, 74.979929, "Bathinda", 7586],
  [30.30961, 74.9337215, "Bathinda", 7617],
  [30.33901, 74.906913, "Bathinda", 7674],
  [30.23249, 75.111968, "Bathinda", 2011],
  [30.296654, 75.095033, "Bathinda", 7660],
  [30.4697, 75.11588574, "Bathinda", 6421],
  [30.40103, 75.187571, "Bathinda", 7098],
  [30.40004, 75.188037, "Bathinda", 7099],
  [29.99658, 75.111177, "Bathinda", 1991],
  [30.5744899, 76.8690332, "SAS_Nagar", 5542],
  [31.07661, 76.31904, "SBS NAGAR", 2117],
  [31.187532, 76.0067308, "SBS NAGAR", 1781],
  [31.1076581567512, 76.1168700671232, "SBS NAGAR", 2082],
  [31.35299, 75.13514, "Tarn Taran", 1966],
  [31.41102, 74.92594, "Tarn Taran", 2170],
  [31.272731, 74.870433, "Tarn Taran", 1754],
  [31.45898, 74.93029, "Tarn Taran", 1872],
  [31.47086, 74.77302, "Tarn Taran", 4457],
  [31.32843, 74.67985, "Tarn Taran", 1997],
  [31.32852, 74.68572, "Tarn Taran", 1905],
  [31.056666, 74.826309, "Ferozepur", 7681],
  [30.89989, 74.64783, "Ferozepur", 7688],
  [30.87304, 75.85502, "Ludhiana West", 1861],
  [30.87304, 75.85502, "Ludhiana West", 1861],
  [30.6796, 75.8243, "Malerkotla", 1759],
  [30.6796, 75.8243, "Malerkotla", 2967],
  [30.454768, 76.0292, "Malerkotla", 6559],
  [32.2535583, 75.52444, "Pathankot", 1795],
  [32.371921, 75.675943, "Pathankot", 2135],
  [32.26327, 75.59394, "Pathankot", 5642],
  [32.2011153, 75.4317414, "Pathankot", 1910],
  [30.9625726, 76.5389882, "Rupnagar", 7488],
  [30.9622849, 76.5387, "Rupnagar", 5530],
  [31.2363595, 76.461072, "Rupnagar", 7482],
  [31.3305516666666, 76.4184133333333, "Rupnagar", 1703],
  [30.8932082, 76.4205986, "Rupnagar", 2256],
  [30.817901, 76.5562958, "Rupnagar", 1771],
  [30.8179001, 76.5562989, "Rupnagar", 1772],
  [31.0954826, 76.5154026, "Rupnagar", 1802],
  [31.1499148, 76.4669361, "Rupnagar", 7500],
  [29.8175, 76.1161, "Patiala", 6686],
  [29.8175, 76.1178, "Patiala", 7390],
  [30.113575, 75.667934, "Sangrur", 7723],
  [30.100119, 75.657266, "Sangrur", 7722],
  [30.372283, 75.901118, "Sangrur", 7076],
  [30.28632, 76.07812, "Sangrur", 6929],
  [30.054984, 75.823702, "Sangrur", 6679],
  [30.19434, 75.693312, "Sangrur", 1786],
  [30.181705, 75.698429, "Sangrur", 6775],
  [30.215138, 75.8595379, "Sangrur", 2225],
  [30.45624, 75.73799, "Sangrur", 6667],
  [30.40416, 75.78858, "Sangrur", 6668],
  [30.059785, 75.996196, "Sangrur", 7203],
  [30.077182, 75.976179, "Sangrur", 7202],
  [30.37045, 75.54527, "Barnala", 1874],
  [30.30576, 75.58049, "Barnala", 2095],
  [30.48256, 75.38023, "Barnala", 7507],
  [30.52189, 75.57805, "Barnala", 1907],
  [30.48256, 75.38023, "Barnala", 1938],
  [30.48256, 75.38023, "Barnala", 1928],
  [30.597577, 74.801847, "Faridkot", 1888],
  [30.443325, 74.878264, "Faridkot", 1881],
  [30.5625533, 74.2291467, "Fazilka", 7649],
  [30.0879315570355, 74.2090843887797, "Fazilka", 1697],
  [30.163677055741, 74.1853180264343, "Fazilka", 1960],
  [30.851208, 74.890927, "Ferozepur", 2211],
  [31.1053172, 74.983686, "Ferozepur", 2267],
  [30.6911633, 74.416165, "Ferozepur", 2274],
  [30.9274756438531, 74.6431436788797, "Ferozepur", 2033],
  [31.8206, 75.18311, "Gurdaspur", 3659],
  [31.8246, 75.15208, "Gurdaspur", 2066],
  [31.88296, 75.03051, "Gurdaspur", 5645],
  [31.8328, 75.37555, "Gurdaspur", 1763],
  [32.0246, 75.36312, "Gurdaspur", 1762],
  [32.05234, 75.43485, "Gurdaspur", 2061],
  [32.0235113, 75.0174861, "Gurdaspur", 7734],
  [32.0255113, 75.0174861, "Gurdaspur", 7706],
  [31.95654, 75.31592, "Gurdaspur", 7733],
  [31.9471, 75.32427, "Gurdaspur", 2059],
  [32.13353, 75.45755, "Gurdaspur", 5487],
  [31.90569, 75.43101, "Gurdaspur", 7707],
  [31.9063, 75.43655, "Gurdaspur", 5648],
  [31.68575, 75.44695, "Gurdaspur", 2121],
  [31.68575, 75.44695, "Gurdaspur", 2120],
  [31.222113, 76.135585, "Hoshiarpur", 1873],
  [31.222113, 76.135585, "Hoshiarpur", 1871],
  [31.222113, 76.135585, "Hoshiarpur", 5534],
  [31.232513, 76.191073, "Hoshiarpur", 2239],
  [31.805502, 75.666774, "Hoshiarpur", 2118],
  [31.93624, 75.616782, "Hoshiarpur", 2046],
  [31.467015, 75.874631, "Hoshiarpur", 2155],
  [31.512988, 75.894764, "Hoshiarpur", 7676],
  [31.40847, 75.6861, "Jalandhar", 2089],
  [31.1003, 75.898, "Jalandhar", 5525],
  [31.55517, 75.65821, "Jalandhar", 1949],
  [31.27422, 75.53641, "Jalandhar", 1835],
  [31.38428, 75.66027, "Jalandhar", 1944],
  [31.29918, 75.65817, "Jalandhar", 3691],
  [31.241021, 75.522131, "Jalandhar", 7666],
  [31.3627, 75.65851, "Jalandhar", 2244],
  [31.13255, 75.78015, "Jalandhar", 2021],
  [31.13232, 75.78055, "Jalandhar", 2275],
  [31.10484, 75.46218, "Jalandhar", 2067],
  [31.086194, 75.593495, "Jalandhar", 5528],
  [31.03643, 75.77403, "Jalandhar", 1973],
  [31.03625, 75.77448, "Jalandhar", 2197],
  [31.38557, 75.53675, "Jalandhar", 1806],
  [31.100713, 75.341265, "Jalandhar", 7579],
  [31.03474, 75.463, "Jalandhar", 2258],
  [31.169753, 75.211948, "Jalandhar", 6905],
  [31.43774, 75.48557, "Jalandhar", 1968],
  [30.6168185, 75.950269, "Ludhiana East", 7518],
  [30.7096, 76.04919, "Ludhiana East", 2108],
  [30.7107, 76.05008, "Ludhiana East", 5548],
  [30.71022, 76.04976, "Ludhiana East", 1939],
  [30.71034, 76.21357, "Ludhiana East", 1800],
  [30.69274, 76.25098, "Ludhiana East", 2138],
  [30.77411, 76.05208, "Ludhiana East", 7492],
  [30.754078, 75.896321, "Ludhiana East", 1765],
  [30.775055, 75.914083, "Ludhiana East", 2193],
  [30.856586, 75.993104, "Ludhiana East", 2048],
  [30.883111, 76.021311, "Ludhiana East", 7490],
  [30.884617, 76.020897, "Ludhiana East", 7127],
  [30.898119, 76.189706, "Ludhiana East", 2137],
  [30.90743, 76.195782, "Ludhiana East", 2236],
  [30.624288, 75.584932, "Ludhiana West", 5489],
  [30.6528872, 75.7679442, "Ludhiana West", 2283],
  [30.8175297, 75.6540601, "Ludhiana West", 4743],
  [30.83112419, 75.65811143, "Ludhiana West", 2004],
  [30.816533, 75.4617, "Ludhiana West", 2191],
  [30.804954, 75.466622, "Ludhiana West", 5484],
  [29.798511, 75.338897, "Mansa", 7626],
  [29.820306, 75.528388, "Mansa", 5560],
  [29.972776, 75.335204, "Mansa", 5564],
  [30.225217, 75.41865, "Mansa", 2288],
  [29.9464937, 75.5453597, "Mansa", 2349],
  [30.0460285, 75.5293451, "Mansa", 2299],
  [29.878136, 75.685567, "Mansa", 2075],
  [30.682732, 75.073999, "Moga", 4647],
  [30.653191, 75.162259, "Moga", 4645],
  [30.696612, 75.097477, "Moga", 5638],
  [30.9331375, 75.1505222, "Moga", 4401],
  [30.811779, 75.318299, "Moga", 1700],
  [30.811802, 75.319071, "Moga", 6928],
  [30.80093, 75.1724, "Moga", 1740],
  [30.81651, 75.15975, "Moga", 4214],
  [30.84893, 75.14171, "Moga", 7559],
  [30.931775, 75.29016, "Moga", 1956],
  [30.932184, 75.289807, "Moga", 4201],
  [30.932358, 75.290392, "Moga", 2241],
  [30.336661, 76.522149, "Patiala", 7533],
  [30.17869, 76.529401, "Patiala", 2377],
  [30.357876, 76.400888, "Patiala", 2387],
  [30.357772, 76.401861, "Patiala", 3419],
  [30.28217, 76.424478, "Patiala", 2383],
  [30.290902, 76.325349, "Patiala", 6826],
  [30.290841, 76.325906, "Patiala", 6827],
  [30.292326, 76.425409, "Patiala", 5605],
  [30.307244, 76.473779, "Patiala", 5606],
  [30.369045, 76.150194, "Patiala", 7523],
  [30.505903, 76.2573, "Patiala", 7578],
  [30.128709, 76.189141, "Patiala", 6678],
  [30.12684, 76.191511, "Patiala", 3579],
  [30.2075048612868, 74.4788586198232, "Sri Muktsar Sahib", 2158],
  [30.0520993, 74.6113118, "Sri Muktsar Sahib", 1768],
  [30.2123193, 74.6292466, "Sri Muktsar Sahib", 1999],
  [30.5512805439395, 74.6507186070084, "Sri Muktsar Sahib", 2084],
  [31.67084, 74.77682, "Amritsar", 2246],
  [31.5759765, 75.0561865, "Amritsar", 1922],
  [31.7077785, 74.9261539, "Amritsar", 7235],
  [31.6660145, 75.2343127, "Amritsar", 1753],
  [30.70141, 74.61488, "Faridkot", 2252],
  [30.6917, 76.4184, "Fatehgarh Sahib", 6448],
  [30.7189, 76.4634, "Fatehgarh Sahib", 7712],
  [30.7066, 76.4203, "Fatehgarh Sahib", 1917],
  [30.6658728, 76.5045617, "Fatehgarh Sahib", 2136],
  [30.63041, 76.38278, "Fatehgarh Sahib", 1878],
  [30.61629, 76.38176, "Fatehgarh Sahib", 6445],
  [30.602018, 76.230886, "Fatehgarh Sahib", 2024],
  [30.597684, 76.229788, "Fatehgarh Sahib", 2057],
  [30.635671, 76.530861, "Fatehgarh Sahib", 7645],
  [30.635681, 76.53085, "Fatehgarh Sahib", 7644],
  [30.61894, 76.545255, "Fatehgarh Sahib", 7585],
  [30.773443, 76.3785, "Fatehgarh Sahib", 2113],
  [30.7867, 76.34377, "Fatehgarh Sahib", 1790],
  [31.95547, 75.65372, "Hoshiarpur", 2374],
  [30.8205074, 76.2154563, "Ludhiana East", 5586],
  [30.7605368, 75.7978645, "Ludhiana West", 7175],
  [30.693601, 75.808527, "Ludhiana West", 1690],
  [30.61923775, 75.43441207, "Ludhiana West", 1852],
  [30.83112419, 75.65811143, "Ludhiana West", 2005],
  [29.665885, 75.2551168, "Mansa", 1975],
  [29.67147, 75.244042, "Mansa", 1813],
  [30.600096, 75.25168, "Moga", 7157],
  [30.595887, 75.272522, "Moga", 7158],
  [30.40204, 75.17426, "Moga", 1930],
  [32.3400793, 75.5882532, "Pathankot", 1841],
  [32.25597, 75.56434, "Pathankot", 1728],
  [32.244266, 75.4743434, "Pathankot", 2173],
  [32.2484246, 75.4062473, "Pathankot", 1837],
  [30.481853, 76.2573, "Patiala", 7048],
  [30.96257, 76.538992, "Rupnagar", 1886],
  [31.3413389, 76.3298987, "Rupnagar", 2017],
  [30.253815, 76.02719, "Sangrur", 7682],
  [30.194277, 75.630937, "Sangrur", 6772],
  [30.7235561, 76.6410907, "SAS_Nagar", 7499],
  [30.7772788, 76.6196134, "SAS_Nagar", 5545],
  [30.856605, 76.612405, "SAS_Nagar", 7498],
  [30.5856865, 76.8438069, "SAS_Nagar", 5541],
  [30.4692615, 76.7912224, "SAS_Nagar", 5664],
  [30.7209301, 76.8342288, "SAS_Nagar", 2015],
  [30.37071, 75.54598, "Barnala", 7742],
  [30.50329, 75.57891, "Barnala", 5675],
  [30.47811, 75.29018, "Barnala", 5666],
  [30.6834, 74.71537, "Faridkot", 2189],
  [31.125944, 75.643639, "Fatehgarh Sahib", 7755],
  [30.4503168, 74.0426058, "Fazilka", 7752],
  [30.9560208, 74.9750597, "Ferozepur", 2032],
  [30.9602545, 74.5925901, "Ferozepur", 6948],
  [30.9652112081468, 74.5993680506944, "Ferozepur", 7732],
  [31.626213, 75.641011, "Hoshiarpur", 1189],
  [31.40829, 75.68725, "Jalandhar", 2031],
  [30.642453, 76.499864, "Fatehgarh Sahib", 7755],
  [31.46939, 75.47525, "Jalandhar", 1747],
  [31.1261782, 75.2444464, "Jalandhar", 7753],
  [31.208699, 75.193841, "Kapurthala", 3702],
  [31.35288, 75.388388, "Kapurthala", 3693],
  [31.24128, 75.755799, "Kapurthala", 3698],
  [31.38762, 75.23387, "Kapurthala", 3702],
  [30.6169263, 75.9500728, "Ludhiana East", 7750],
  [30.80747, 76.00692, "Ludhiana East", 7749],
  [30.851331, 75.985553, "Ludhiana East", 1925],
  [30.7598776, 75.797205, "Ludhiana West", 7757],
  [30.816533, 75.4617, "Ludhiana West", 2190],
  [30.557256, 75.69351, "Malerkotla", 2254],
  [30.557356, 75.69451, "Malerkotla", 7619],
  [30.5417469, 75.9139072, "Malerkotla", 7242],
  [30.5166694, 75.8825618, "Malerkotla", 3069],
  [30.510069, 75.916066, "Malerkotla", 7762],
  [30.40198, 76.690407, "Patiala", 7758],
  [30.336562, 76.600984, "Patiala", 1984],
  [30.218604, 76.454826, "Patiala", 2378],
  [30.2186, 76.4548, "Patiala", 5688],
  [30.480517, 76.554063, "Patiala", 7566],
  [30.413409, 76.408041, "Patiala", 7232],
  [30.359402, 76.131373, "Patiala", 6792],
  [30.369045, 76.150194, "Patiala", 1876],
  [29.988611, 76.02856, "Patiala", 7764],
  [30.16776, 76.21734, "Patiala", 6444],
  [30.156679, 76.159428, "Patiala", 3633],
  [30.8928345, 76.4183875, "Rupnagar", 1895],
  [29.91805, 75.784818, "Sangrur", 7069],
  [30.340514, 75.884591, "Sangrur", 7763],
  [30.24705, 76.0405, "Sangrur", 7760],
  [29.830617, 75.865222, "Sangrur", 6993],
  [29.824597, 75.873181, "Sangrur", 7759],
  [30.212903, 75.8618242, "Sangrur", 7761],
  [30.046338, 76.017433, "Sangrur", 7207],
  [30.045082, 76.011684, "Sangrur", 7201],
  [30.4646866, 74.5153838, "Sri Muktsar Sahib", 1696],
  [30.1807536241431, 74.5339267048528, "Sri Muktsar Sahib", 1721],
  [31.65368, 75.82447, "Hoshiarpur", 5539],
];

const Map = () => {
  const [state, setState] = useState("Punjab");
  // const [selectedStateData, setSelectedStateData] = useState("");

  const markerIcon = new L.Icon({
    iconUrl: locationIcon,
    iconSize: [20, 20],
  });

  const handleChange = (event) => {
    setState(event.target.value);
  };

  // useEffect(() => {
  //   const filteredData = Punjab.features.filter(
  //     (feature) => feature.properties.dtname === state
  //   );
  //   setSelectedStateData(filteredData);
  // }, [state]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "25px 25px 0px 0px",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 200 }} size="medium">
          <InputLabel id="demo-simple-select-autowidth-label">State</InputLabel>
          <Select
            value={state}
            onChange={handleChange}
            label="State"
            MenuProps={MenuProps}
          >
            <MenuItem value="Punjab">Punjab</MenuItem>
            <MenuItem value={"Amritsar"}>Amritsar</MenuItem>
            <MenuItem value={"Bathinda"}>Bathinda</MenuItem>
            <MenuItem value={"Barnala"}>Barnala</MenuItem>
            <MenuItem value={"Faridkot"}>Faridkot</MenuItem>
            <MenuItem value={"Firozpur"}>Firozpur</MenuItem>
            <MenuItem value={"Jalandhar"}>Jalandhar</MenuItem>
            <MenuItem value={"Fatehgarh Sahib"}>Fatehgarh Sahib</MenuItem>
            <MenuItem value={"Fazilka"}>Fazilka</MenuItem>
            <MenuItem value={"Faridkot"}>Faridkot</MenuItem>
            <MenuItem value={"Kapurthala"}>Kapurthala</MenuItem>
            <MenuItem value={"Patiala"}>Patiala</MenuItem>
            <MenuItem value={"Pathankot"}>Pathankot</MenuItem>
            <MenuItem value={"Gurdaspur"}>Gurdaspur</MenuItem>
            <MenuItem value={"Hoshiarpur"}>Hoshiarpur</MenuItem>
            <MenuItem value={"Ludhiana East"}>Ludhiana East</MenuItem>
            <MenuItem value={"Ludhiana West"}>Ludhiana West</MenuItem>
            <MenuItem value={"Mansa"}>Mansa</MenuItem>
            <MenuItem value={"Moga"}>Moga</MenuItem>
            <MenuItem value={"Sahibzada Ajit Singh Nag*"}>
              Sahibzada Ajit Singh Nag*
            </MenuItem>
            <MenuItem value={"Sri Muktsar Sahib"}>Sri Muktsar Sahib</MenuItem>
            <MenuItem value={"Shahid Bhagat Singh Nagar"}>
              Shahid Bhagat Singh Nagar
            </MenuItem>
            <MenuItem value={"Rupnagar"}>Rupnagar</MenuItem>
            <MenuItem value={"Sangrur"}>Sangrur</MenuItem>
            <MenuItem value={"Tarn Taran"}>Tarn Taran</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <MapContainer
          style={{
            height: "75vh",
            width: "40vw",
            backgroundColor: "white",
          }}
          zoom={7.5}
          center={[31.0722768, 75.5398582]}
          scrollWheelZoom={false}
        >
          <GeoJSON
            data={Punjab}
            // data={{
            //   type: "FeatureCollection",
            //   features: selectedStateData,
            // }}
            // style={{ fillColor: "green" }}
            style={(feature) => ({
              fillColor:
                feature.properties.dtname === state ? "green" : "lightGreen",
              weight: 2,
              opacity: 1,
              // color: "red",
              fillOpacity: 0.5,
            })}
          >
            {markerCoordinates
              .filter(
                (coordinate) => state === "Punjab" || coordinate[2] === state
              )
              .map((coordinate, index) => (
                <Marker
                  key={index}
                  position={[coordinate[0], coordinate[1]]}
                  icon={markerIcon}
                >
                  <Tooltip>Warehouse_ID: {coordinate[3]}</Tooltip>
                </Marker>
              ))}
            {/* <Polyline positions={markerCoordinates} color="magenta" /> */}
          </GeoJSON>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
//  https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png  // world map
