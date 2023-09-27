import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  MobileStepper,
  Button,
  Box
} from '@mui/material';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material';
import { Step1, Step2, Step3, Step4, Step5 } from './Steps';

const styles = {
  carouselWrapper: {
    transition: "0.1s",
    cursor: "grab",
    width: "100%",
    overflowX: "hidden",
    '& .carousel': {
      whiteSpace: "nowrap"
    },
    '& .dragging': {
      scrollBehavior: "auto"
    }
  },
  carouselContent: {
    scrollBehavior: "smooth",
    width: "auto",
    display: "flex",
    gap: "1rem",
    // overflowX: "auto",
    overflowX: "hidden",
    // whiteSpace: "nowrap",
    // height: "60px",
    // justifyContent: "center"
  },
  mobileStepper: {
    height: "auto !important",
    width: "100%",
    margin: "0 auto",
    maxWidth: "390px"
  }
}

const Carousel = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [dragStart, setDragStart] = useState(false)
  const [prevPageX, setPrevPageX] = useState(0)
  const [prevScrollLeft, setPrevScrollLeft] = useState(0)
  const carousel = useRef(null);

  let slideWidth, totalWidth;
  if (carousel.current) {
    slideWidth = carousel.current.clientWidth;
    totalWidth = slideWidth * 5;
  }

  let positionDiff;

  window.addEventListener('resize', () => {
    if (carousel.current) {
      slideWidth = carousel.current.clientWidth;
      carousel.current.scrollLeft = (slideWidth + 16) * activeStep
    }
  })

  const handleNext = () => {
    slideWidth = carousel.current.clientWidth;
    setActiveStep((activeStep) => activeStep + 1);
    // carousel.current.scrollLeft += (slideWidth + 16);
    console.log(slideWidth)
    carousel.current.scrollLeft = (slideWidth + 16) * (activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep((activeStep) => activeStep - 1);
    // carousel.current.scrollLeft -= (slideWidth + 16);
    carousel.current.scrollLeft = (slideWidth + 16) * (activeStep - 1);
  };

  const autoSlide = () => {
    // if the slide difference is greater than half the slide width, snap to the previous slide
    // else, snap to the next slide
    if (!positionDiff) return;
    // positionDiff = Math.abs(positionDiff);
    // let valDifference = slideWidth - positionDiff;
    // if (carousel.current.scrollLeft > prevScrollLeft) {
    //   console.log(valDifference, positionDiff)
    //   return carousel.current.scrollLeft += (valDifference + 16);
    // }
    // carousel.current.scrollLeft -= (valDifference + 16);
    // console.log(slideWidth)
    const underStep = carousel.current.scrollLeft / slideWidth;
    const step = Math.ceil(underStep);
    if (carousel.current.scrollLeft > prevScrollLeft) {
      carousel.current.scrollLeft = (slideWidth + 16) * step;
      setActiveStep((activeStep) => activeStep + 1);
      return;
    }
    if (step !== 5) {
      carousel.current.scrollLeft = (slideWidth + 16) * (step - 1);
      if (underStep !== 0)
        setActiveStep((activeStep) => activeStep - 1);
    }
  }

  const handleDragStart = (e) => {
    // updates state variables on mousedown event
    setDragStart(true)
    setPrevPageX((e.pageX || e.changedTouches[0].pageX) - carousel.current.getBoundingClientRect().x)
    setPrevScrollLeft(carousel.current.scrollLeft)
  };

  const handleDragStop = (e) => {
    if (!dragStart) return;
    // const action = e.pageX || e.changedTouches[0].pageX;
    // if (action === NaN) {
    //   console.log('hi')
    //   return
    // }
    // console.log("hi")
    setDragStart(false)
    carousel.current.classList.remove("dragging")
    autoSlide()
  };

  // scrolling images/carousel to the left according to the mosuse pointer
  const dragging = (e) => {
    if (!dragStart) return;
    e.preventDefault();
    carousel.current.classList.add("dragging")
    positionDiff = (e.pageX || e.changedTouches[0].pageX) - carousel.current.getBoundingClientRect().x - prevPageX;
    carousel.current.scrollLeft = prevScrollLeft - positionDiff;
  }

  const handleScroll = (e) => {
    console.log(carousel.current.scrollLeft)
    const step = Math.floor((carousel.current.scrollLeft / slideWidth) + 1);
    console.log(step)
    // carousel.current.scrollLeft = slideWidth * step;
  }

  // useEffect(() => { }, [carousel.current])

  return (
    <React.Fragment>
      <Box sx={styles.carouselWrapper}>
        <Box
          ref={carousel}
          className="carousel"
          onMouseDown={(e) => handleDragStart(e)}
          onTouchStart={(e) => handleDragStart(e)}
          onMouseMove={(e) => dragging(e)}
          onTouchMove={(e) => dragging(e)}
          onMouseUp={(e) => handleDragStop(e)}
          onMouseLeave={(e) => handleDragStop(e)}
          onTouchEnd={(e) => handleDragStop(e)}
          // onScroll={(e) => handleScroll(e)}
          sx={styles.carouselContent}>
          <Step1 />
          <Step2 />
          <Step3 />
          <Step4 />
          <Step5 />
        </Box>
      </Box>
      <MobileStepper
        variant="dots"
        steps={5}
        position="static"
        activeStep={activeStep}
        // sx={{ maxWidth: 400, flexGrow: 1 }}
        sx={styles.mobileStepper}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 4}>
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </React.Fragment>

  );
}

export default Carousel