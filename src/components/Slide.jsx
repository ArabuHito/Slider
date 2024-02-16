import PropTypes from "prop-types";

function Slide({children}) {
    return (
        <div className="slide">
            {children}
        </div>
    )
}

// Prop types
Slide.propTypes = {
    children: PropTypes.node.isRequired
};

export {Slide};