import PropTypes from "prop-types";


function Image ({ src, alt, caption }) {
    return (
        <div className="image-container">
            <img className="image" src={src} alt={alt} />
            {caption && <p className="image-caption">{caption}</p>}
        </div>
    )
}

// Prop-types
Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    caption: PropTypes.string
};

export { Image };