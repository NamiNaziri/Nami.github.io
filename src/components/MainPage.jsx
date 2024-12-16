/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SectionContent from './SectionContent';
import { useEffect, useState } from 'react'

import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from './Scroll/es'
import { useMediaQuery } from 'react-responsive';
import FullScrollPage from './Scroll/FullScrollPage';
import CVPage from './CV/CVPage';
import {lostRadiance, spaceInvaders,skinning, sm_skinning, sm_animation, sm_ik, sm_simplify,sm_prototypes } from './ProjectList.jsx'
import SmallProjectsSection from './SmallProjectsSection.jsx';
import LoadingPage from './LoadingPage.jsx'
const projects = [
  lostRadiance,
  spaceInvaders,
  
]

const mobileProjects =[
  [sm_prototypes],[ sm_animation],
  [sm_skinning],[sm_ik],
  [sm_simplify]
]

const smallProjects = [
  [sm_prototypes,  sm_animation],
  [sm_skinning,sm_ik],
  [sm_simplify]

]

function MainPage() {
  const isXS = useMediaQuery({ query: '(max-width: 575px)' });
  const [isLoading, setIsLoading] = useState(true);
  const [pagePercentage, setPagePercentage] = useState(5);
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {


    setTimeout(() => {
      setIsLoading(false)
    }, 3400); 

  }, []);
  return ( 
    <div>
      { isLoading && <LoadingPage></LoadingPage>}
     <FullScrollPage>
      {projects.map((project,index)=>(
        <FullpageSection key={index}>
          <SectionContent project={project}></SectionContent>
        </FullpageSection>
      ))}

      {isXS && mobileProjects.map((project,index)=>(
        <FullpageSection key={index + 50}>
          <SmallProjectsSection projects={project} index={index}></SmallProjectsSection>
        </FullpageSection>
      ))}

    {!isXS && 
    
      smallProjects.map((projects,index)=>(
        <FullpageSection key={index + 100}>
        <SmallProjectsSection projects={projects} index={index}></SmallProjectsSection>
        </FullpageSection>
      ))
        
    }
        
    </FullScrollPage> 
  
    
    </div>  
  )
}

export default MainPage