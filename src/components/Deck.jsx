import {useState, useEffect, useCallback} from "react";
import PropTypes from 'prop-types';

function Deck( {children} ) {

    const slides = children.map((slide, index) => {
        return (
            <div key={index} className="slide">
                {slide}
            </div>
        );
    });

    const totalSlides = slides.length;
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);

    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
            setProgressWidth(((currentSlide + 2) / totalSlides) * 100);
        }
    }, [currentSlide, totalSlides]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            setProgressWidth(((currentSlide) / totalSlides) * 100);
        }
    }, [currentSlide, totalSlides]);

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
        setProgressWidth(((currentSlide + 1) / totalSlides) * 100);
    }, [currentSlide, totalSlides]);

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
            </div>
            <div className="progress-bar" style={{width: `${progressWidth}%`}}/>
        </div>
    );
}

Deck.propTypes = {
    children: PropTypes.array.isRequired,
};

export {Deck};