import React from "react";

function Paragraph({ children: text }) {
  return (
    <p className="text">
      { text }
    </p>
  );
}

function Title({ children: text }) {
  return (
    <h1 className="title">
      { text }
    </h1>
  );
}

function CodeBlock({ children: code }) {
  return (
    <div className="code">
      { code }
    </div>
  );
}

export { Paragraph, Title, CodeBlock };