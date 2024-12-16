
import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from './es'
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState  } from 'react'

const FullScrollPage = ({ children }) => {
  const childRef = useRef();
  const [firstLoad, setFirstLoad] = useState(true);
  useEffect(() => {
    // Scroll to the bottom and then back to top after a brief delay
    const scrollToBottom = () => {
      //window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
      window.scrollTo({
        top: 5000,
        left: 0,
        behavior: 'instant'
      });
    };

    const scrollToTop = () => {
      //window.scrollTo({ top: 0, behavior: 'smooth' });
      window.scrollTo({
        top:  0,
        left: 0,
        behavior: 'instant'
      });
    };

    //console.log(document.documentElement.scrollHeight)
    // Trigger the scroll animations on initial load
    setTimeout(() => {
      scrollToBottom();
      setTimeout(() => {
        scrollToTop();
        setFirstLoad(false);
      }, 800);
    }, 200); // Delay of 2000ms (2 seconds)

    
    //Fullpage.goto(4,)
    console.log('effect')
    console.log(4 * window.innerHeight);
    
    //scrollToTop();
    //setTimeout(scrollToTop, 1); // Scroll back to the top after 2 seconds
  }, []);

  const isXS = useMediaQuery({ query: '(max-width: 575px)' });
    return (
      <Fullpage
      transitionTiming={isXS? 400 : firstLoad ? 0: 550}
      scrollLockTiming={isXS? 500: firstLoad ? 0: 250}
      ref={childRef}
      desktopForceStep={true}
      >
        <FullpageNavigation  itemStyle={{backgroundColor:"red"}}/>
        <FullPageSections >
          {children}
        </FullPageSections>
      </Fullpage>
    );
  };
  
export default FullScrollPage;