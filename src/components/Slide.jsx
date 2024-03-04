/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

import PropTypes from "prop-types";
import Markdown from "react-markdown";
import {Title} from "./Text.jsx";
import {CodeBlock, Paragraph} from "./Text.jsx";

function Slide(props) {

    // - Read slide from markdown

    if (props.markdown) {
        const components = {
            h1({node, children, ...props}) {
                return (
                    <Title>
                        {children}
                    </Title>
                );
            },
            code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                    <CodeBlock syntax={match[1]} code={String(children).replace(/\n$/, '')} />
                ) : (
                    <code className={className} {...props}>
                        {children}
                    </code>
                );
            },
            p({node, children, ...props}) {
                return (
                    <Paragraph>
                        {children}
                    </Paragraph>
                );
            }
        };

        return (
            <div className="slide h-screen w-screen text-left
            bg-background dark:bg-stone-800 overflow-clip pt-20 pb-40">
                <div className="title flex-2">
                    <Title>{props.title}</Title>
                </div>
                <div className="slide-content px-20">
                    <Markdown components={components}>
                        {props.markdown}
                    </Markdown>
                </div>
            </div>
        );
    }

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
                    <div className="slide-content px-20">
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
    title: PropTypes.string,
    markdown: PropTypes.string
};

export {Slide};