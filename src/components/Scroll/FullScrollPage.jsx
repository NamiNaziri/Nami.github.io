
import Fullpage, { FullPageSections, FullpageSection, FullpageNavigation } from './es'
import { useMediaQuery } from 'react-responsive';

const FullScrollPage = ({ children }) => {

  const isXS = useMediaQuery({ query: '(max-width: 575px)' });
    return (
      <Fullpage
      transitionTiming={550}
      scrollLockTiming={isXS? 400: 250}
      
      desktopForceStep={true}
      >
        <FullpageNavigation itemStyle={{backgroundColor:"red"}}/>
        <FullPageSections >
          {children}
        </FullPageSections>
      </Fullpage>
    );
  };
  
export default FullScrollPage;