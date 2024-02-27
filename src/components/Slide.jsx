/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

import PropTypes from "prop-types";

function Slide({children}) {

    return (
        <div className="slide h-screen w-screen text-center flex flex-col justify-center
                    bg-background dark:bg-stone-800 overflow-clip">
            {children}
        </div>
    )
}

// Prop types
Slide.propTypes = {
    children: PropTypes.node.isRequired,
    props: PropTypes.any
};

export {Slide};