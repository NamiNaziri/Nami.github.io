/* eslint-disable react/prop-types */

import {Card,  CardBody,  Divider} from "@nextui-org/react";
import { useMediaQuery } from 'react-responsive';
import SmallProject from "./SmallProject";
import Grid from '@mui/material/Unstable_Grid2';

SmallProjectsSection


function SmallProjectsSection({projects, index}) {  
  const isXS = useMediaQuery({ query: '(max-width: 575px)' });
  console.log(index)
  const backgroundImage = `/img/bg${index}.jpg`
  
  const dynamicBackgroundImage = {
    //backgroundImage: `url(${backgroundImage}), linear-gradient(rgba(31, 31, 31, 0.048), rgba(26, 26, 26, 0.837))`,
    position:"absolute",
    width:"100%",
    height:"100vh",
    backgroundImage: `url(${backgroundImage}), linear-gradient(rgb(0, 0, 0), rgb(0, 0, 0))`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(10px)",
    marginTop:"1vh",
    zIndex: -2
  };
  const layout = isXS? "grid-rows-1" : "grid-cols-2"
  return (
    <Grid className="rowStyle" columnSpacing={{ xs: 2, md: 5 }} paddingTop={{ xs: "5vh"}} marginTop={{ xs: "1.8vh"}} rowSpacing={{xs: 0}} container display="flex" height='100vh' marginBottom={0} justifyContent="center" alignItems="center">
      <div style={dynamicBackgroundImage}></div>
    <div className={`grid ${layout} gap-16  mx-10 md:mx-20 place-items-center`}>
      
    {
      projects.map((project, index) =>(
        <SmallProject key={index} project={project}>

        </SmallProject>
      ))
    }
    </div>
    </Grid>
  );
}

export default SmallProjectsSection  