/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import SectionContent from './components/SectionContent';
import NavBar from './components/NavBar';
import {NextUIProvider} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom';
import CVPage from './components/CV/CVPage';
import {
  HashRouter as Router, Routes, Route, useLocation 
} from 'react-router-dom'
import MarkdownRenderer from './components/MarkdownRenderer'
import './App.css'; 
import MainPage from './components/MainPage';
import SmallProjectsSection from './components/SmallProjectsSection';

const blogs=[
  {
    title:'Unreal Prototypes',
    link: '/blogs/2023-05-23-Unreal-Prototypes.md',
    path:'/Unreal-Prototypes'
  },
  {
    title:'Dual Quaternion Skinning',
    link: '/blogs/2023-03-22-Dual-quaternion-skinning.md',
    path:'/Dual-Quaternion-Skinning'
  },
  {
    title:'Inverse Kinematics',
    link: '/blogs/2023-03-14-Inverse-Kinematics.md',
    path:'/inverse-kinematics'
  }
]


const App = () => {
  const [currentPrimary, setCurrentPrimary]=useState(0)
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    // Set the active route value when the route changes
    console.log(location.pathname)
    switch(location.pathname)
    {
      case '/':
        setCurrentPrimary(0);
        break;
      case '/cv':
        setCurrentPrimary(1);
        break;
      case '/contact':
        setCurrentPrimary(2);
        break;
      default:
        setCurrentPrimary(-1);
        break;
    }
  }, [location]);

  return (
    <NextUIProvider navigate={navigate} >
      <main className="dark text-foreground bg-background">
        
          <NavBar primary={currentPrimary}   />
        
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/cv" element={<CVPage/>}/>
            <Route path="/contact" element={<SmallProjectsSection></SmallProjectsSection>}/>
            {blogs.map((blog,index) => (<Route key={index}path={blog.path} element={<MarkdownRenderer markdownObject={blog}/>}/>))
            }

            {/* ... */}
          </Routes>

              </main  >
              
    </NextUIProvider>
  )
}

export default App