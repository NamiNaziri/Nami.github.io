/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import SectionContent from './SectionContent';
import ReactPageScroller from './Scroll/es/index';
import {Progress} from "@nextui-org/react";
import { useEffect, useState } from 'react'
import NavBar from './NavBar';
import {useNavigate} from 'react-router-dom';
import {
  Routes, Route, useLocation 
} from 'react-router-dom'
import "./CustomScroller.css";
const VerticalNavDots = ({ maxNumber, currentNumber }) => {
  const dots = [];

  for (let i = 0; i < maxNumber; i++) {
    dots.push(
      <div
        key={i}
        className={`dot ${i === currentNumber ? 'active' : ''}`}
      ></div>
    );
  }

  return <div className="vertical-nav-dots">{dots}</div>;
};

const CustomScroller =({children}) => {

  const childCount = children.length
  const [pagePercentage, setPagePercentage] = useState(5);
  const [currentNumber, setCurrentNumber] = useState(0);

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
    }
  }, [location]);

  const handlePageOnChange = number => {
    setCurrentNumber(number)
    setPagePercentage(Math.max(((number)/(childCount-1)) * 100,5))
    // console.log(`before ${number}`);
  };

//   <div className="flex flex-col gap-6 w-full">
//   <Progress size="sm"  value={pagePercentage} />
// </div>

  return ( 
    <div style={{overflow: "hidden"}}>
      <VerticalNavDots maxNumber={childCount} currentNumber={currentNumber} />

      <ReactPageScroller containerHeight={"100vh"} animationTimer={400} pageOnChange={handlePageOnChange}>
          {children}
      </ReactPageScroller>
      
          
      {/* <div className="flex flex-col gap-6 w-full">
        <Progress size="sm"  value={pagePercentage} />
      </div> */}
      </div>
    
  )
}

export default CustomScroller