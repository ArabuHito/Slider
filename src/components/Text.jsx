/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

import PropTypes from "prop-types";

function Paragraph({ children: text }) {
  return (
    <p className="text text-text dark:text-primary text-3xl mx-32">
      { text }
    </p>
  );
}

function Title({ children: text }) {
  return (
    <h1 className="title text-7xl font-bold m-8 text-accent dark:text-secondary">
      { text }
    </h1>
  );
}

function CodeBlock({ children: code }) {
  return (
    <div className="code rounded w-fit mx-auto bg-code p-4 text-white border-border border-2">
      { code }
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
    children: PropTypes.node.isRequired
}

export { Paragraph, Title, CodeBlock };