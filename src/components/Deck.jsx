import {useCallback, useEffect, useState} from "react";
import {MosaicView} from "./MosaicView.jsx";
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
            {mosaicView ? slides[currentSlide] : <MosaicView
                slides={slides}
            />}
            <div className="toolbar">
                <button className="prev" onClick={prevSlide}><span
                    className="material-symbols-outlined">arrow_back_ios</span></button>
                <button className="next" onClick={nextSlide}><span
                    className="material-symbols-outlined">arrow_forward_ios</span></button>
                <button className="mosaic-view" onClick={toggleMosaicView}><span
                    className="material-symbols-outlined">view_cozy</span></button>
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