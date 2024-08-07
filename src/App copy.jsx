/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { Scroller, Section } from 'react-fully-scrolled';
import SectionContent from './components/SectionContent';
import {NextUIProvider} from "@nextui-org/react";
import NavBar from './components/NavBar';
import Fullpage, { FullPageSections, FullpageSection ,FullpageNavigation,} from '@ap.cx/react-fullpage'

const App = () => {
  const [showNavBar, setShowNavBar] = useState(true)
  return (
    <Fullpage>
      <FullPageSections>
      <NavBar />

      
      <FullpageSection>
      <SectionContent></SectionContent>
      </FullpageSection>
      
        <FullpageSection style={{
          backgroundColor: 'lime',
          height: '100vh',
          padding: '1em',
        }}>1</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'coral',
          padding: '1em',
        }}>2</FullpageSection>
        <FullpageSection style={{
          backgroundColor: 'firebrick',
          padding: '1em',
        }}>3</FullpageSection>

      </FullPageSections>

    </Fullpage>
  )
}

export default App