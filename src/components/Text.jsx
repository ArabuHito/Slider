/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

// TODO : Add Ordered and Unordered Lists

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PropTypes from "prop-types";

function Paragraph(props) {
    return (
        <p className="text py-8 text-text dark:text-primary text-3xl">
            {props.children}
        </p>
    );
}

function Title(props) {
    return (
        <h1 className="title text-7xl font-bold p-8 text-accent dark:text-secondary">
            {props.children}
        </h1>
    );
}

function CodeBlock(props) {
    return (
    <div className="text-left relative">
        <SyntaxHighlighter language={props.syntax} style={dark} customStyle={{
            maxHeight: "62vh",
        }}>
            {props.code}
        </SyntaxHighlighter>
        <div className="absolute top-4 right-4 text-white">
            {props.syntax}
        </div>
    </div>
    );
}

// Prop types
Paragraph.propTypes = {
    text: PropTypes.string
};

Title.propTypes = {
    text: PropTypes.string
};

CodeBlock.propTypes = {
    syntax: PropTypes.string,
    code: PropTypes.string
};



export {Paragraph, Title, CodeBlock};