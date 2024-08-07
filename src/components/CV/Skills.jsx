/* eslint-disable react/prop-types */
import {Chip} from "@nextui-org/react";
import  {Divider} from "@nextui-org/react";

const skillSet =[
  {
    Title: "Programming",
    Set: ["C/C++", "Python", "JavaScrip", "MATLAB", "C#", "SQL"]
  },
  {
    Title: "Software",
    Set: ["Unreal Engine", "GitHub", "Perforce", "MATLAB", "Docker"]
  },
  {
    Title: "AI",
    Set: ["Behavior tree", "State Tree", "Mass AI"]
  },
  {
    Title: "Animation",
    Set: ["State Machines", "Blend Spaces","Animation Blueprint",  "IK"]
  }

]

function Skills({SkillsText}) {

  return (
    <>
      <h3 >Skills</h3>
    <Divider></Divider>
  {skillSet.map((skill, index) => (
    <div key={index} className="ml-10	">
      <h4>{skill.Title}</h4>
      <div className="flex flex-wrap gap-2">
        {skill.Set.map((item, subIndex) => (
          <Chip  radius="sm" key={subIndex}> {item} </Chip>
        ))}
       </div>
       <Divider></Divider>
    </div>
  ))}
   </>
  )
}

export default Skills