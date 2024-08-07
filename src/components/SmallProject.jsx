/* eslint-disable react/prop-types */

import {Chip, Card,  CardBody,  CardHeader, Divider} from "@nextui-org/react";
import { IoGameController } from "react-icons/io5";
import {Button} from "@nextui-org/react";

import { useMediaQuery } from 'react-responsive';
import "./SmallProject.css"
import CustomDevider from "./CV/CustomDevider";


const Experience =[
  {
    description: "Designed and implemented NPC behaviors utilizing behavior trees, enabling dynamic interactions such as mantling using Nav Link Proxies and NPC following the player or predefined paths.\
• Developed a crowd system using the Mas",
    image: "img/RR.jfif",
    title1:"Game AI Programmer",
    title2:"RichardRendering · Freelance",
    date: "Apr 2023 - Present",
    Location: "Remote"


  }
]

const tags = ['c++', 'OpenGL']

function SmallProject({project}) {  

  const handleButtonClick = (link) => {
    window.open(link, '_blank'); // Replace with your desired URL
  };


  return (
    <div className="backdrop-blur-3xl samll-project-container">
    <Card>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <h4 className="font-bold text-large">{project.title}</h4>
        <div className="flex gap-2">
        {project.tags.map((tag,index)=>(<Chip key={index} color="default">{tag}</Chip>))}
        </div>
      </CardHeader>
      <CardBody className="flex items-center">
      <div className="project-image-container">
        <img
          
            radius="sm"
            src={project.img}
          />
          </div>
      </CardBody >
      <CardBody className="items-center gap-0">
        <div className="text-justify">{project.description}</div>
        <Button className="flex w-full mt-4 min-h-10"  variant="bordered" startContent={<IoGameController />} onPress={()=>{handleButtonClick(project.link)}}>
                more
                </Button>
        </CardBody>

    </Card>
    </div>
  );
}

export default SmallProject  