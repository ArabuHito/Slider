/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

function Deck({ children }) {
    // Check valid children
    if (!children) {
        throw new Error("Deck component must have at least one child.");
    }

    // Hooks
    const [currentSlide, setCurrentSlide] = useState(0);
    const [progressWidth, setProgressWidth] = useState(0);
    const [mosaicView, setMosaicView] = useState(false);

    // Variables
    let slides;

    // Index the slides
    if (children.length) {
        slides = children;
    } else {
        slides = [children];
    }

    // Constants
    const totalSlides = slides.length;

    // Navigation
    const nextSlide = useCallback(() => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(currentSlide + 1);
            if (totalSlides > 1) {
                setProgressWidth(
                    ((currentSlide + 1) / (totalSlides - 1)) * 100
                );
            }
        }
    }, [currentSlide, totalSlides]);

    const prevSlide = useCallback(() => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
            if (totalSlides > 1) {
                setProgressWidth(
                    ((currentSlide - 1) / (totalSlides - 1)) * 100
                );
            }
        }
    }, [currentSlide, totalSlides]);

    // GoToSlide
    const goToSlide = (index) => {
        setCurrentSlide(index);
        setMosaicView(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyUp = (event) => {
            if (event.key === "ArrowRight" && !mosaicView) {
                nextSlide();
            }
            if (event.key === "ArrowLeft" && !mosaicView) {
                prevSlide();
            }
        };

        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [nextSlide, prevSlide, mosaicView]);

    // Set the progress bar width
    useEffect(() => {
        if (totalSlides > 1) {
            setProgressWidth((currentSlide / (totalSlides - 1)) * 100);
        }
    }, [currentSlide, totalSlides]);

    return (
        <div className={"deck"}>
            {mosaicView ? (
                <MosaicView
                    slides={slides}
                    currentSlide={currentSlide}
                    goToSlideFromMosaic={goToSlide}
                />
            ) : (
                slides[currentSlide]
            )}
            <ToolBar
                mosaicView={mosaicView}
                onClickFirst={() => setCurrentSlide(0)}
                onClickPrev={prevSlide}
                onClickNext={nextSlide}
                onClickLast={() => setCurrentSlide(totalSlides - 1)}
                onClickMosaic={() => setMosaicView(!mosaicView)}
                totalSlides={totalSlides}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
            />
            {!mosaicView ? (
                <div
                    className="progress-bar fixed top-0 left-0 w-0 h-2 transition-all duration-500 ease-in-out
                bg-primary dark:bg-primary"
                    style={{ width: `${progressWidth}%` }}
                />
            ) : (
                ""
            )}
        </div>
    );
}

// TODO : Verify that a big image doesn't cause lag on mosaic view.

// Mosaic view
function MosaicView(props) {
    return (
        <div
            className={
                "mosaic-view grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8"
            }
        >
            {props.slides.map((slide, index) => (
                <div
                    key={index}
                    className={`${
                        index == props.currentSlide ? "active-slide" : ""
                    } mosaic-slide h-80 w-full rounded-lg flex flex-col justify-center bg-background dark:bg-stone-800 overflow-clip cursor-pointer shadow-2xl`}
                    onClick={() => props.goToSlideFromMosaic(index)}
                >
                    <div className="mosaic-slide-content scale-[0.33] flex flex-col items-center text-center mx-0">
                        {slide}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ToolBar(props) {
    const [numberVisible, setNumberVisible] = useState(true);

    function setCurrentSlide(slide){
        if(slide > 0 && slide <= props.totalSlides){
            props.setCurrentSlide(slide - 1);
        }
    }

    return (
        <div
            className="toolbar fixed bottom-0 left-0 grid grid-cols-3 justify-between px-4 py-2 w-full text-accent
    dark:text-primary bg-background dark:bg-stone-800 shadow-2xl"
        >
            <div className="left-section">
                <button
                    disabled={props.mosaicView}
                    className="first disabled:text-gray-600 pr-1"
                    onClick={props.onClickFirst}
                >
                    <span className="material-symbols-outlined">
                        first_page
                    </span>
                </button>
                <button
                    disabled={props.mosaicView}
                    className="prev disabled:text-gray-600"
                    onClick={props.onClickPrev}
                >
                    <span className="material-symbols-outlined">
                        arrow_back_ios
                    </span>
                </button>
                <button
                    disabled={props.mosaicView}
                    className="next disabled:text-gray-600"
                    onClick={props.onClickNext}
                >
                    <span className="material-symbols-outlined">
                        arrow_forward_ios
                    </span>
                </button>
                <button
                    disabled={props.mosaicView}
                    className="last disabled:text-gray-600"
                    onClick={props.onClickLast}
                >
                    <span className="material-symbols-outlined">last_page</span>
                </button>
                <button className="mosaic-view" onClick={props.onClickMosaic}>
                    <span className="material-symbols-outlined">view_cozy</span>
                </button>
            </div>
            <div className="middle-section font-bold text-center">
                {numberVisible ? (
                    <span>
                        <input
                        type="number"
                        placeholder = {props.currentSlide}
                        onChange={(event) => setCurrentSlide(Number(event.target.value))}
                        />
                        / {props.totalSlides}
                    </span>
                ) : (
                    ""
                )}
            </div>
            <div className="right-section text-right">
                <button
                    className="settings relative"
                    onClick={() => {
                        setNumberVisible(!numberVisible);
                    }}
                >
                    <span className="material-symbols-outlined">
                        {numberVisible ? "visibility" : "visibility_off"}
                    </span>
                </button>
            </div>
        </div>
    );
}

ToolBar.propTypes = {
    mosaicView: PropTypes.bool,
    onClickPrev: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickMosaic: PropTypes.func,
    currentSlide: PropTypes.number,
    totalSlides: PropTypes.number,
};

// Prop types
MosaicView.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.node).isRequired,
    goToSlideFromMosaic: PropTypes.func.isRequired,
};

Deck.propTypes = {
    children: PropTypes.any,
};

export { Deck };
