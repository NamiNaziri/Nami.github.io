/**
 * @class Fullpage
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';
import { absoluteFullClasses } from '@nextui-org/react';

class Fullpage extends PureComponent {
  static contextType = FullpageContext;
  

  static propTypes = {
    children: PropTypes.node.isRequired,
    transitionTiming: PropTypes.number,
    scrollLockTiming: PropTypes.number,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    className: PropTypes.string,
    onChange: PropTypes.func,
    keyboardShortcut: PropTypes.bool,
  };

  static defaultProps = {
    transitionTiming: 700,
    scrollLockTiming: 700,
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
    },
    className: '',
    onChange: null,
    keyboardShortcut: true,
  };

  constructor(props, context) {
    super(props, context);
    this.slides = [];
    this.state = {
      slide: null,
      translateY: 0,
      pageYOffset: 0,
      prevScrollPos:0,
      prevTouchScrollPos:0,
      offsetHeight: 0,
      count: 0,
      number: 0,
      resetScroll: false,
      instantScroll:false,
    };
    this.ticking = false;
    this.fullPageHeight = 0;
    this.viewportHeight = 0;
    // binds
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.update = this.update.bind(this);
    this.getIndex = this.getIndex.bind(this);
    // handle
    this.handleScroll = this.handleScroll.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleKeys = this.handleKeys.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    // refs
    this.driverRef = React.createRef();
    this.warperRef = React.createRef();
    this.fullpageRef = React.createRef();
  }

  componentDidMount() {
   
    this.handleResize();
    this.setState({
      slide: this.slides[0],
    });
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll);
      window.addEventListener('touchmove', this.handleTouchMove, {passive: false }); // Set passive to false
      
      window.addEventListener('touchend', this.handleTouchEnd);
      window.addEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('resize', this.handleResize);
    }
    if (typeof document !== 'undefined') {
      document.addEventListener('keydown', this.handleKeys);
    }
  }

  componentWillUnmount() {
    // set body height == to 'auto'
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
      
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('touchend', this.handleTouchEnd);
      window.removeEventListener('touchstart', this.handleTouchStart);
      window.removeEventListener('touchmove', this.handleTouchMove);
    }
    if (typeof document !== 'undefined') {
      document.removeEventListener('keydown', this.handleKeys);
    }
  }

  getIndex(slide) {
    return this.slides.indexOf(slide);
  }

  subscribe(slide) {
    // add new slide (push)
    const newSlides = [...this.slides, slide];
    // sort slide for top to bottom
    this.slides = newSlides.sort((a, b) => {
      const aTop = a.el.current.offsetTop;
      const bTop = b.el.current.offsetTop;
      return aTop - bTop;
    });
    this.setState({
      count: this.slides.length,
    });
    this.ticking = false;
    this.handleResize();
    return slide;
  }

  unsubscribe(slide) {
    this.slides = this.slides.filter(s => s.el !== slide.el);
    this.setState({
      count: this.slides.length,
    });
    this.handleResize();
    this.handleScroll();
    return slide;
  }

  handleScroll(e) {
    const {
      resetScroll,
      translateY,
    } = this.state;

    const {
      scrollLockTiming,
    } = this.props;

    console.log(`handle scroll: ${this.lockScroll}`)

    //return false;
    if(this.disableScroll) {
      console.log('disable scroll')
      window.scrollTo({
        top:  translateY * -1,
        left: 0,
        behavior: 'instant'
      });
      return false;
    }

    if (this.lockScroll) {
     
      // if > top and bottom < fix scroll
      //window.scrollTo(0, translateY * -1);
      window.scrollTo({
        top:  translateY * -1,
        left: 0,
        behavior: 'instant'
      });
      
      //TODO this is how i'm hardcoding the mobile users! fix this!
      if(scrollLockTiming === 400)
      {
        this.disableScroll = true
      }
      
      return false;

    }

    else if (!this.ticking) {
      // this is the scrolling behavior in general. and also finds us the new slide
      window.requestAnimationFrame(() => {
        if (resetScroll) {
          console.log('reset scroll')
          window.scrollTo(0, translateY * -1);
        }
        const {

          prevScrollPos,
        } = this.state;

        const pageYOffset = window.scrollY || 0;
        const delta = pageYOffset -prevScrollPos
        console.log(`ticking: ${delta}`)
        const factor = delta > 0 ? 0.2: 0.8
        const newPrevScrollPos = pageYOffset
        this.setState({
          pageYOffset,
          prevScrollPos:newPrevScrollPos,
          resetScroll: false,
        });
        

        const newSlide = this.slides.find((slide) => {
          const el = slide.el.current;

          return pageYOffset < el.offsetTop + (el.offsetHeight * factor);
        });
        this.goto(newSlide);
        this.ticking = false;
      });
    }
    this.ticking = true;
    return true;
  }
  
  handleResize() {
    if (!this.ticking) {
      window.requestAnimationFrame(() => {
        // update count
        this.viewportHeight = Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0,
        );
        this.fullPageHeight = this.fullpageRef.current.clientHeight;
        this.driverRef.current.style.height = `${this.fullPageHeight}px`;
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  handleTouchStart = (e) => {
    // Handle touch end event
    console.log('touchstart')
   //this.disableScroll = false
   const newPrevTouchScrollPos = e.touches[0].clientY;
   this.setState({
    prevTouchScrollPos:newPrevTouchScrollPos,
  });

  }


  handleTouchMove = (e) => {
    e.preventDefault();

    // const {

    //   prevTouchScrollPos,
    // } = this.state;
    // if (prevTouchScrollPos) {
    //   if (e.touches[0].clientY - prevTouchScrollPos < 0 ) {
    //     this.back();
    //   } else {
    //     this.next();
    //   }
    //   const newPrevTouchScrollPos = e.touches[0].clientY;
    //   this.setState({
    //     prevTouchScrollPos:null,
    //   });
    // } else {
    //   const newPrevTouchScrollPos = e.touches[0].clientY;

    //   this.setState({
    //     prevTouchScrollPos:newPrevTouchScrollPos,
    //   });
    // }

    // console.log(`touchmove: ${e.touches[0].clientY - prevTouchScrollPos}`);
  }

  handleTouchEnd = (e) => {
    // Handle touch end event
    const {prevTouchScrollPos} = this.state;


    console.log(`touchend ${e.changedTouches[0].clientY - prevTouchScrollPos}`);
    //this.disableScroll = false
   
    // const {




    if (prevTouchScrollPos  && Math.abs(e.changedTouches[0].clientY - prevTouchScrollPos) > 50) 
    {
      if (e.changedTouches[0].clientY - prevTouchScrollPos > 0 ) 
      {
        this.back();
      } 
      else 
      {
        this.next();
      }
    } 


    
    // window.scrollTo({
    //   top:  translateY * -1,
    //   left: 0,
    //   behavior: 'instant'
    // });
    //e.preventDefault();
    // this.lockScroll =true;
    //   setTimeout(() => {
    //     this.disableScroll=false;
    //     this.lockScroll = false;
    //   }, 10000);

  }

  

  handleKeys(event) {
    const {
      keyboardShortcut,
    } = this.props;
    if (!keyboardShortcut) {
      return true;
    }

    if (
      event.keyCode === 33 // pageUp:    33,
      || event.keyCode === 37 // left:      37,
      || event.keyCode === 38 // up:        38,
    ) {
      event.preventDefault();
      return (event.shiftKey) ? this.first(event) : this.back(event);
    }
    if (
      event.keyCode === 34 // pageDown:  34,
      || event.keyCode === 39 // right:     39,
      || event.keyCode === 40 // down:      40,
    ) {
      event.preventDefault();
      return (event.shiftKey) ? this.last(event) : this.next(event);
    }
    if (
      event.keyCode === 35 // end:       35,
    ) {
      event.preventDefault();
      return this.last(event);
    }
    if (
      event.keyCode === 36 // home:      36,
    ) {
      event.preventDefault();
      return this.first(event);
    }

    return true;
  }

  // TODO: add update methode
  update() {
    return this;
  }

  goto(newSlide, resetScroll = false, instantScroll=false) {
    const {
      slide,
    } = this.state;
    const {
      transitionTiming,
      onChange,
      scrollLockTiming,
    } = this.props;

    if (slide !== newSlide) {
     
      const translateY = Math.max((this.fullPageHeight - this.viewportHeight) * -1, newSlide.el.current.offsetTop * -1,);

      const {onHide,} = slide.props;

      if (onHide && typeof onHide === 'function') 
      {
        setTimeout(() => onHide(translateY), transitionTiming);
      }

      this.lockScroll = true;
      //window.scrollTo(0, translateY * -1);
      console.log(`instant scroll: ${instantScroll}`)
      if(instantScroll)
      {
        this.disableScroll =true;
        window.scrollTo({
          top:  translateY * -1,
          left: 0,
          behavior: 'instant'
        });

        setTimeout(() => {
          this.disableScroll=false;
          this.lockScroll = false;
        }, scrollLockTiming);
      }
      
      this.setState({
        slide: newSlide,
        number: this.getIndex(newSlide),
        translateY,
        offsetHeight: newSlide.el.current.offsetHeight,
        resetScroll,
      });

      setTimeout(() => {
        //this.disableScroll=false;
        this.lockScroll = false;
      }, scrollLockTiming);

      const {
        onShow,
      } = newSlide.props;
      if (onShow && typeof onShow === 'function') {
        onShow(translateY);
      }
      // call back function
      if (typeof onChange === "function") {
        onChange(this.state);
      }
    }

    return newSlide;
  }

  back() {
    const {
      number,
    } = this.state;
    if(!this.disableScroll && !this.lockScroll)
      {
    const index = Math.max(0, number - 1);
    this.goto(this.slides[index], true, true);
  }
  }

  next() {
    const {
      length,
    } = this.slides;
    const {
      number,
    } = this.state;
    if(!this.disableScroll && !this.lockScroll)
    {
    const index = Math.min(length - 1, number + 1);
    this.goto(this.slides[index], true, true);
  }

  }

  first() {
    this.goto(this.slides[0], true, true);
  }

  last() {
    this.goto(this.slides[this.slides.length - 1], true, true);
  }

  render() {
    const {
      children,
      style,
      className,
      transitionTiming,
      scrollLockTiming,
    } = this.props;

    const {
      translateY,
      pageYOffset,
      prevScrollPos,
      prevTouchScrollPos,
      offsetHeight,
      number,
      count,
      resetScroll,
      instantScroll,
    } = this.state;

    return (
      <FullpageContext.Provider
        value={{
          translateY,
          pageYOffset,
          prevScrollPos,
          prevTouchScrollPos,
          offsetHeight,
          number,
          count,
          subscribe: this.subscribe,
          unsubscribe: this.unsubscribe,
          update: this.update,
          goto: (slide, resetScroll,instantScroll) => this.goto(slide, resetScroll,instantScroll),
          back: this.back,
          next: this.next,
          getIndex: this.getIndex,
          transitionTiming,
          scrollLockTiming,
          className,
          style,
          warperRef: this.warperRef,
          fullpageRef: this.fullpageRef,
          slides: this.slides,
        }}
      >
        <div
          name="Driver"
          style={{
            position: 'relative',
          }}
          ref={this.driverRef}
        />
        {children}
      </FullpageContext.Provider>
    );
  }
}

export default Fullpage;
