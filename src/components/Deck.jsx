import {useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types';

function Deck( {children} ) {
    // Hooks
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const [mosaicView, setMosaicView] = useState(false);

    // Index the slides
    const slides = children.map((slide, index) => {
        return (
            <div key={index} className={`slide ${mosaicView ? 'mosaic-slide' : ''}`}
                 onClick={() => handleSlideClick(index)}>
                {slide}
            </div>
        );
    });

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

    // Handle slide click in mosaic view
    const handleSlideClick = (index) => {
        if (mosaicView) {
            setCurrentSlide(index);
            setMosaicView(false);
        }
    };

    // Toggle mosaic view
    const toggleMosaicView = () => {
        setMosaicView(!mosaicView);
    };

    // Keyboard navigation
    // TODO : Remake this with the event listener "keyup" in React
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "ArrowRight") {
                nextSlide();
            }
            if (event.key === "ArrowLeft") {
                prevSlide();
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [nextSlide, prevSlide]);

    // Set the progress bar width
    useEffect(() => {
        setProgressWidth(((currentSlide) / (totalSlides - 1)) * 100);
    }, [currentSlide, totalSlides]);

    return (
        <div className={`deck ${mosaicView ? 'mosaic-view' : ''}`}>
            {mosaicView ? slides : slides[currentSlide]}
            <div className="toolbar">
                <div className="controls">
                    <button className="prev" onClick={prevSlide}><span
                        className="material-symbols-outlined">arrow_back_ios</span></button>
                    <button className="next" onClick={nextSlide}><span
                        className="material-symbols-outlined">arrow_forward_ios</span></button>
                    <button className="mosaic-view" onClick={toggleMosaicView}><span className="material-symbols-outlined">view_cozy</span></button>
                </div>
            </div>
            <div className="progress-bar" style={{width: `${progressWidth}%`}}/>
        </div>
    );
}

// Prop types
Deck.propTypes = {
    children: PropTypes.array.isRequired,
};

export {Deck};