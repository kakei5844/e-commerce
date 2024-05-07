import React, { useState } from 'react';
import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import AliceCarousel from 'react-alice-carousel';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const HomeSectionCarousel = ({data, sectionName}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const responsive = {
        0: {
          items: 2,
          itemsFit: "contain",
        },
        568: {
          items: 3,
          itemsFit: "contain",
        },
        1024: {
          items: 5.5,
          itemsFit: "contain",
        },
      };

    const slidePrev = () => setActiveIndex(activeIndex-1);
    const slideNext = () => setActiveIndex(activeIndex+1);
    const syncActiveIndex=({item}) => setActiveIndex(item);

    const items = data?.slice(0, 10).map((item) => (
        <div className="">
          {" "}
          <HomeSectionCard product={item} />
        </div>
      ));

    return (
        <div className='relative px-4 sm:px-6 lg:px-8'>
            <h2 className='text-2xl font-extrabold text-gray-800 py-5'>{sectionName}</h2>
            <div className='relative border p-5'>
                <AliceCarousel
                    items={items}
                    disableButtonsControls
                    responsive={responsive}
                    disableDotsControls
                    onSlideChanged={syncActiveIndex}
                    activeIndex={activeIndex}
                    mouseTracking
                    animationType="fadeout"
                    animationDuration={2000}
                />
                {activeIndex !== items.length-5 && (
                    <Button 
                        variant='contained'
                        className='z-50 bg-[]' 
                        onClick={slideNext} 
                        sx={{ 
                            position: 'absolute', 
                            top: "8rem", 
                            right: "0rem", 
                            transform: "translateX(50%) rotate(90deg)", 
                            bgcolor: 'white' 
                        }}
                        aria-label='next'>
                        <KeyboardArrowLeftIcon 
                            sx={{ transform: 'rotate(90deg)', color: 'black' }} 
                        />
                    </Button>
                )}

                {activeIndex !== 0 && (
                    <Button 
                        variant='contained'
                        className='z-50 bg-white' 
                        onClick={slidePrev} 
                        sx={{ 
                            position: 'absolute', 
                            top: "8rem", 
                            left: "0rem", 
                            transform: "translateX(-50%) rotate(90deg)", 
                            bgcolor: 'white' 
                        }}
                        aria-label='next'
                    >
                    <KeyboardArrowLeftIcon 
                        sx={{ transform: 'rotate(-90deg)', color: 'black' }} 
                    />
                    </Button>
                )}
            </div>

        </div>
    );
}

export default HomeSectionCarousel;