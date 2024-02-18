import {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';

function Deck({children}) {
    // Hooks
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const [mosaicView, setMosaicView] = useState(false);

    // Index the slides
    const slides = children;

    // Constants
    const totalSlides = slides.length;

    // Navigation
    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
            setProgressWidth(((currentSlide + 1) / (totalSlides - 1)) * 100);
        }
    }, [currentSlide, totalSlides]);
    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            setProgressWidth(((currentSlide - 1) / (totalSlides - 1)) * 100);
        }
    }, [currentSlide, totalSlides]);

    // Toggle mosaic view
    const toggleMosaicView = () => {
        setMosaicView(!mosaicView);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === "ArrowRight") {
                nextSlide();
            }
            if (event.key === "ArrowLeft") {
                prevSlide();
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [nextSlide, prevSlide]);

    // Set the progress bar width
    useEffect(() => {
        setProgressWidth(((currentSlide) / (totalSlides - 1)) * 100);
    }, [currentSlide, totalSlides]);

    return (
        <div className={"deck"}>
            {mosaicView ?
                <MosaicView slides={slides}/>
                : <div className="slide h-screen w-screen text-center flex flex-col justify-center
                    bg-background dark:bg-stone-800 overflow-clip"> {slides[currentSlide]}</div>
            }
            <div className="toolbar fixed bottom-0 left-0 flex flex-row justify-start px-4 w-full text-accent
             dark:text-primary">
                <button className="prev" onClick={prevSlide}><span
                    className="material-symbols-outlined">arrow_back_ios</span></button>
                <button className="next" onClick={nextSlide}><span
                    className="material-symbols-outlined">arrow_forward_ios</span></button>
                <button className="mosaic-view" onClick={toggleMosaicView}><span
                    className="material-symbols-outlined">view_cozy</span></button>
            </div>
            <div className="progress-bar fixed top-0 left-0 w-0 h-2 transition-all duration-500 ease-in-out bg-primary dark:bg-primary" style={{width: `${progressWidth}%`}}/>
        </div>
    );
}

// Mosaic view
function MosaicView({slides}) {
    return (
        <div className={"mosaic-view grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4"}>
            {slides.map((slide, index) => (
                <div key={index} className="mosaic-slide h-96 w-full rounded-lg flex flex-col
                    justify-center bg-background dark:bg-stone-800 items-center overflow-clip">
                    <div className="mosaic-slide-content scale-[0.4] flex flex-col items-center text-center mx-0">
                        {slide}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Prop types
MosaicView.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.node).isRequired
};

Deck.propTypes = {
    children: PropTypes.array.isRequired,
};

export {Deck};