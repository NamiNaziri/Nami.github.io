/* eslint-disable react/prop-types */

import { red } from "@mui/material/colors";
import {Button} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import { IconContext } from "react-icons";  

import "./MediaList.css"
function MediaList({mediaList}) {

    const handleButtonClick = (link) => {
        window.open(link, '_blank'); // Replace with your desired URL
      };
      

  return (
    <div className="flex gap-2 justify-center">
    {mediaList.map((media,index) => (<button key={index} style={{fontSize: '20px'}} onClick={()=> handleButtonClick(media.link)}>
        <IconContext.Provider value={{  className:  "contactIcon"}}>
            <div>
                {media.icon}
            </div>
        </IconContext.Provider>
    </button>)   )} 
    
  </div>           )
}

export default MediaList