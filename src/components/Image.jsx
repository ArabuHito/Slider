import PropTypes from "prop-types";


function Image ({ src, alt }) {
    return (<img className="image" src={src} alt={alt} />)
}

// Prop-types
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
};

export { Image };