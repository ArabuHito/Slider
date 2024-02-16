import PropTypes from "prop-types";

function MosaicView({slides}){

    return (
        <div className={"mosaic-view"}>
            {slides.map((slide, index) => (
                <div key={index} className={"mosaic-slide"}>
                    {slide}
                </div>
            ))}
        </div>
    );
}

// Prop types
MosaicView.propTypes = {
    slides: PropTypes.arrayOf(PropTypes.node).isRequired
};

export { MosaicView };