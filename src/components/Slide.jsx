import PropTypes from "prop-types";

function Slide({children}) {
    return (
        <>
            {children}
        </>
    )
}

// Prop types
Slide.propTypes = {
    children: PropTypes.node.isRequired
};

export {Slide};