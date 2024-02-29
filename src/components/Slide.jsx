/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

import PropTypes from "prop-types";
import {Title} from "./Text.jsx";

function Slide(props) {

    switch (props.layout) {

        // - Column Layout
        case "column":
            return (
                <div className="slide h-screen w-screen
                        text-center flex flex-col justify-center
                    bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-20">
                    <div className="title flex-2">
                        <Title>{props.title}</Title>
                    </div>
                    <div className="slide-content h-full text-balance place-items-center grid grid-cols-2">
                        {props.children}
                    </div>
                </div>
            );

        // - Full Layout
        case "full":
            return (
                <div className="slide h-screen w-screen text-left
                    bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-40">
                    <div className="title flex-2">
                        <Title>{props.title}</Title>
                    </div>
                    <div className="slide-content">
                        {props.children}
                    </div>
                </div>
            );

        // - Default Layout
        default:
            return (
                <div className="slide h-screen w-screen text-center flex flex-col justify-center
                    bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-40">
                    <div className="title flex-2">
                        <Title>{props.title}</Title>
                    </div>
                    <div className="slide-content">
                        {props.children}
                    </div>
                </div>
            );
    }
}

// Prop types
Slide.propTypes = {
    children: PropTypes.node,
    props: PropTypes.any,
    layout: PropTypes.string,
    title: PropTypes.string
};

export {Slide};