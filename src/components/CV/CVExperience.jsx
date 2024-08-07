import CVElement from "./CVElement"
import Grid from '@mui/material/Unstable_Grid2';
import "./CVExperience.css"

const Experience =[
  {
    description: "I designed and implemented NPC behaviors utilizing behavior trees, enabling dynamic interactions such as mantling using Nav Link Proxies and NPC following of the player or predefined paths. I developed a crowd system using the MassEntity framework, enhancing it by integrating an accessory and animation system for crowd agents. I utilized smart objects to enhance crowd interactions, allowing crowds to identify, claim, and use objects such as benches. Additionally, I analyzed and addressed performance bottlenecks within the crowd systems, resulting in significant optimization and improved frame rates.",
    image: "img/RR.jfif",
    title1:"Game AI Programmer",
    title2:"RichardRendering · Freelance",
    date: "Apr 2023 - Present",
    location: "Remote"


  },
  {
    description: "I conduct research in machine learning, specializing in deep reinforcement learning (RL) and deep learning for character animation. My work involves both physics-based and kinematic characters. I develop solutions to avoid full-body collisions in environments with multiple characters, utilizing Isaac Gym as the physical simulation and reinforcement learning tool.",
    image: "img/aalto.png",
    title1:"Graduate Research Assistant",
    title2:"Aalto University Department of Computer Science · Full-time",
    date: "Apr 2024 - Jun 2024",
    location: "On-site"


  }
]


function CVExperience() {

  // const sectionStyle = {
  //   height: '100vh',
  //   display: 'flex',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   fontSize: '2rem',
  // };
  //<Grid className="rowStyle" columnSpacing={{ xs: 2, md: 5 }} container display="flex" height='100vh' justifyContent="center" alignItems="center">
  return (
    <Grid className="object-contain  flex flex-col  items-center space-x-2 md:space-x-5 space-y-1" >
      <Grid className="object-contain justify-center text-center w-full h-full">
        <h1>Experience</h1>
      </Grid>
      {Experience.map((e,index)=>(
        <Grid key={index} className="object-contain justify-center   w-full h-full" >
          <CVElement element={e}></CVElement>
      </Grid>
      ))}
      {/* <Grid  className="object-contain justify-center   w-full h-full" >
        <CVElement></CVElement>
      </Grid>
      <Grid  className="object-contain justify-center  w-full h-full" >
        <CVElement></CVElement>
      </Grid> */}
    </Grid>
  )
}

export default CVExperience