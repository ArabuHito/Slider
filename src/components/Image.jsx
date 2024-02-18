import PropTypes from "prop-types";


function Image ({ src, alt, caption }) {
    return (
        <div className="image-container">
            <img className="image mx-auto my-2 max-h-96 rounded-lg" src={src} alt={alt} />
            {caption && <p className="image-caption text-text dark:text-primary text-2xl italic">{caption}</p>}
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