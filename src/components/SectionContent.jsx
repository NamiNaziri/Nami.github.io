/* eslint-disable react/prop-types */
import {Chip} from "@nextui-org/react";
import { FaItchIo } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import {Button} from "@nextui-org/react";
import Grid from '@mui/material/Unstable_Grid2';
import ImageGalleryComponent from './ImageGallery'
import { useMediaQuery } from 'react-responsive';

import 'bootstrap/dist/css/bootstrap.min.css';
import zIndex from "@mui/material/styles/zIndex";

const items = [
  {
      original: 'img/s.png',
      thumbnail: 'img/s.png',
    },
  {
    original: 'img/lostRadiance.jpg',
    thumbnail: 'img/lostRadiance.jpg',
  },
  {
    original: 'https://www.youtube.com/embed/dR0P4tOlGsU',
    thumbnail: 'img/lostRadiance.jpg',
    embedUrl: 'https://www.youtube.com/embed/dR0P4tOlGsU',
  },
];


const projects = [
  {
    title: "Lost Radiance",
    description: "This game is created using Unreal Engine 5 for the Games Now Game Jam, where the theme 'missing' takes center stage. Dive into a cosmic odyssey where light has gone astray, and you find yourself as the new star amidst the void. As shadows and darkness compel other stars to assail you, your survival becomes crucial. Beware, for if you falter, the cosmos will plunge into an everlasting darkness. Navigate this celestial challenge, illuminate the universe, and stave",
    tags:["C++", "Blueprint", "Unreal Engine"],
    backgroundImage: "/img/lostRadiance.jpg",
    itch: 'https://naminaziri.itch.io/lost-radiance',
    github: 'https://naminaziri.itch.io/lost-radiance',
    more: 'https://naminaziri.itch.io/lost-radiance',
    galeryItems: [
      {
          original: 'img/s.png',
          thumbnail: 'img/s.png',
        },
      {
        original: 'img/lostRadiance.jpg',
        thumbnail: 'img/lostRadiance.jpg',
      },
      {
        original: 'https://www.youtube.com/embed/dR0P4tOlGsU',
        thumbnail: 'img/lostRadiance.jpg',
        embedUrl: 'https://www.youtube.com/embed/dR0P4tOlGsU',
      },
    ]
  }
]
const SectionContent = ({project}) => {


  const isXS = useMediaQuery({ query: '(max-width: 575px)' });

  const handleButtonClick = (link) => {
    window.open(link, '_blank'); // Replace with your desired URL
  };

  const backgroundImage = project.backgroundImage
  
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

  return (
    <div>
      <div style={dynamicBackgroundImage}></div>
      <Grid className="rowStyle" columnSpacing={{ xs: 2, md: 5 }} paddingTop={{ xs: "5vh"}} marginTop={{ xs: "1.8vh"}} rowSpacing={{xs: 0}} container display="flex" height='100vh' marginBottom={0} justifyContent="center" alignItems="center">
        
        <Grid container xs={10} sm={10} md={10} lg={10} xl={10} >

          <Grid className=" justify-center text-center w-full md:w-1/2 max-w-xl"  justifyContent="center" alignItems="top">
            
            <ImageGalleryComponent items={project.galeryItems}></ImageGalleryComponent>
          </Grid>
          <Grid container className="text-justify  w-full md:w-1/2 text-sm xl:text-base">
            <Grid xs={12}  >
            {!isXS && <h1>{project.title}</h1>}
            
            </Grid>
            <Grid  xs={12}>
              <Grid className={isXS? "flex justify-center flex gap-2": "flex gap-2"} marginTop={1}>
                {project.tags.map((tag,index)=>(<Chip key={index} color="default">{tag}</Chip>))}
              </Grid> 
            </Grid>
            <Grid xs={12} marginTop={2} marginBottom={isXS? 0 : 2}>
            <p >
          {project.description}
            </p>
            </Grid>
            <Grid xs={12} >
            <div className="flex gap-2">
                {Object.prototype.hasOwnProperty.call(project, "itch") && 
                <Button color="danger" variant="bordered" startContent={<FaItchIo />} onPress={()=>{handleButtonClick(project.itch)}}>
                itch.io
                </Button>}
                {Object.prototype.hasOwnProperty.call(project, "github") && <Button color="white" variant="bordered" startContent={<FaGithub />} onPress={()=>{handleButtonClick(project.github)}}>
                github
                </Button>}
                {Object.prototype.hasOwnProperty.call(project, "more") && <Button color="warning" variant="bordered" startContent={<IoGameController />} onPress={()=>{handleButtonClick(project.more)}}>
                more
                </Button>}
                </div>

                
                </Grid>
          </Grid>
        </Grid>
      </Grid>
      </div>
  );
};

export default SectionContent;










  // const [dimensions, setDimensions] = useState({
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // });

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newDimensions = {
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     };
  //     setDimensions(newDimensions);
  //     newDimensions.height
  //     console.log(`Width changed to: ${newDimensions.width}px`);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
