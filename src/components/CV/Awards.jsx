/* eslint-disable react/prop-types */
import { FaAward } from "react-icons/fa";

function Awards({AwardsText}) {

  return (
    <>
      <h3 >Awards</h3>
      <ul className="m-0 pl-1">
        {AwardsText.map((award,index) => (
          <li key={index} >
            <div className="flex items-start  ">
            <div className="mt-1 mr-2"><FaAward></FaAward></div>
            <div className="text-sm md:text-large font-bold">{award.title}</div>
            </div>
          <div>
          
          <div className="text-xs md:text-base font-semibold text-foreground/90 ml-8 mb-3">{award.text()}</div>
          </div>
          </li>
          ))}
      
      </ul>
    </>
  )
}

{/* <div className="text-sm md:text-large font-bold mt-2  m-0">{element.title1}</div>
                <div className="text-xs md:text-base font-semibold text-foreground/90  m-0">{element.title2}</div> */}

export default Awards