
import { FaItchIo, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import MediaList from './MediaList.jsx';
import "./PersonalInformation.css"
const mediaList =[
  {
    icon:<FaItchIo/>,
    link:'https://naminaziri.itch.io/'
  },
  {
    icon:<FaGithub/>,
    link:'https://github.com/NamiNaziri/'
  },
  {
    icon:<FaLinkedin/>,
    link:'https://www.linkedin.com/in/naminaziri/'
  },
  {
    icon:<FaYoutube/>,
    link:'https://github.com/NamiNaziri/'
  },


]


function PersonalInformation() {
  return (
    <>
    <div className="grid justify-center">

        <div className="pesonal-image-container">
            <img
            
            radius="sm"
            src="img/2.jpg"
          />
        </div>
        <div className="text-sm md:text-large text-center font-semibold  m-0">Nami Naziri</div>
        <div className="text-xs md:text-sm  text-center    mb-2">Game Programmer</div>

        <MediaList mediaList={mediaList}></MediaList>

    </div>
    </>
  )
}

export default PersonalInformation