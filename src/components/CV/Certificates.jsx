/* eslint-disable react/prop-types */
import { FaAward } from "react-icons/fa";

function Certificates({CertificateList}) {

  return (
    <>
      <h3 >Certificates</h3>
      <ul className="m-0 pl-1">
        {CertificateList.map((certificate,index) => (
          <li key={index} >
            <a href={certificate.link} target="_blank" rel="noopener noreferrer"><div className="text-sm md:text-large font-bold">{certificate.text}</div></a>
          </li>
          ))}
      
      </ul>
    </>
  )
}

{/* <div className="text-sm md:text-large font-bold mt-2  m-0">{element.title1}</div>
                <div className="text-xs md:text-base font-semibold text-foreground/90  m-0">{element.title2}</div> */}

export default Certificates