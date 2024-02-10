import {useState} from "react";
import PropTypes from 'prop-types';

/**
 * The deck component is the main container for the slides.
 * Shows the controls and manages the slides, transition, progress, etc.
 *
 */
function Deck( {children: slides} ) {
    const totalSlides = slides.length;

    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const progress = `${currentSlide + 1}/${totalSlides}`;

    // Next and previous slide functions
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
            setProgressWidth((currentSlide + 2) / totalSlides * 100);
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            setProgressWidth((currentSlide) / totalSlides * 100);

        }
    }

    // Key navigation
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            nextSlide();
        }
        if (event.key === "ArrowLeft") {
            prevSlide();
        }
    });

    return (
        <div className="deck">
            {slides[currentSlide]}
            <div className="toolbar">
                <div className="controls">
                    <button className="prev" onClick={prevSlide}><span
                        className="material-symbols-outlined">arrow_back_ios</span></button>
                    <button className="next" onClick={nextSlide}><span
                        className="material-symbols-outlined">arrow_forward_ios</span></button>
                    <button className="view cozy"><span className="material-symbols-outlined">view_cozy</span></button>
                </div>
                <div className="progress">
                    {progress}
                </div>
            </div>
            <div className="progress-bar" style={{width: `${progressWidth}%`}}/>
        </div>
    );
}

Deck.propTypes = {
    children: PropTypes.array.isRequired,
};

export {Deck};
