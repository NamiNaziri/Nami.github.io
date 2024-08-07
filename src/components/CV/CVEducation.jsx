import CVElement from "./CVElement"
import Grid from '@mui/material/Unstable_Grid2';

const Education =[
  {
    description: "Master Thesis: Multi-character collision avoidance",
    image: "img/aalto.png",
    title1:"Aalto University",
    title2:"Master's degree, Computer Science",
    date: "Aug 2022 - Present",
    location: "Espoo, Finland"
  },
  {
    description: "Thesis. Analysis of the animation graph in Unreal Engine and implementation of an animation system using OpenGL",
    image: "img/iut.jfif",
    title1:"Isfahan University of Technology",
    title2:"Bachelor of Science, Computer Engineering",
    date: "2018 - 2022",
    location: "GPA: 18.13/20"
  }
]



function CVEducation() {
  return (
    <Grid className="object-contain  flex flex-col  items-center space-x-2 md:space-x-5 space-y-1" >
      <Grid className="object-contain justify-center text-center w-full h-full">
        <h1>Education</h1>
      </Grid>
      {Education.map((e,index)=>(
        <Grid key={index} className="object-contain justify-center   w-full h-full" >
          <CVElement element={e}></CVElement>
      </Grid>
      ))}

    </Grid>
  )
}

export default CVEducation