/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

// TODO : Add Ordered and Unordered Lists

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from "prop-types";

function Paragraph({children: text}) {
    return (
        <p className="text text-text dark:text-primary text-3xl">
            {text}
        </p>
    );
}

function Title({children: text}) {
    return (
        <h1 className="title text-7xl font-bold p-8 text-accent dark:text-secondary">
            {text}
        </h1>
    );
}

function CodeBlock(props) {
    return (
        <div className="text-left border-black">
            <SyntaxHighlighter language={props.syntax} style={dark}>
                {props.code}
            </SyntaxHighlighter>
            <div className="absolute top-0 right-2">
                {props.syntax}
            </div>
        </div>
    );
}

// Prop types
Paragraph.propTypes = {
    children: PropTypes.string.isRequired
};

Title.propTypes = {
    children: PropTypes.string.isRequired
};

CodeBlock.propTypes = {
    children: PropTypes.node.isRequired,
    syntax: PropTypes.string
};

export {Paragraph, Title, CodeBlock};