import {Slide} from "./components/Slide.jsx";
import {CodeBlock, Paragraph, Title} from "./components/Text.jsx";
import {Deck} from "./components/Deck.jsx";
import {Image} from "./components/Image.jsx";

function App() {

    return (<Deck>
        <Slide>
            <Title>
                Welcome to slider !
            </Title>
            <Paragraph>
                This is a simple slider built with React and Tailwind CSS.
            </Paragraph>
        </Slide>
        <Slide>
            <Title>
                It's a work in progress...
            </Title>
            <Paragraph>
                ..but it's promising !
            </Paragraph>
        </Slide>
        <Slide>
            <Title>
                Here's a bit of code...
            </Title>
            <CodeBlock>
                    <pre>
{`const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'text': '#617375',
        'background': '#fcf6e8',
        'primary': '#d0ae95',
        'secondary': '#b1a49a',
        'accent': '#65584e'
      }
    },
  },
  plugins: []
}`}
                    </pre>
            </CodeBlock>
        </Slide>
        <Slide>
            <Title>
                ...and a picture of my cat !
            </Title>
            <Image
                src="https://placekitten.com/720/480"
                alt="A cute kitten"
            />
        </Slide>
    </Deck>)
}

export default App;
