/* eslint-disable react/no-unescaped-entities */
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
            {/*TODO: Change to a string element */}
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
                src="https://placekitten.com/1080/920"
                alt="A cute kitten"
                caption="A wide kitten"
            />
        </Slide>

        {/* Slide 5 */}
        <Slide>
            <Title>
                Programming Harmony
            </Title>
            <Paragraph>
                Programming, much like music, requires a symphony of logic and creativity.
            </Paragraph>
        </Slide>

        {/* Slide 6 */}
        <Slide>
            <Title>
                Code Evolution
            </Title>
            <Paragraph>
                Just as music evolves, so does code. Embrace change and growth in your coding journey!
            </Paragraph>
        </Slide>

        {/* Slide 7 */}
        <Slide>
            <Title>
                The Drone Dimension
            </Title>
            <Paragraph>
                Drones - a fusion of technology and innovation, soaring to new heights!
            </Paragraph>
        </Slide>

        {/* Slide 8 */}
        <Slide>
            <Title>
                Cryptic Codes
            </Title>
            <Paragraph>
                Cryptology, your passion - unraveling mysteries in the world of codes and ciphers.
            </Paragraph>
        </Slide>

        {/* Slide 9 */}
        <Slide>
            <Title>
                Tailwind's Melody
            </Title>
            <Paragraph>
                Tailwind CSS, like music notation for styling, creating a harmonious visual experience.
            </Paragraph>
        </Slide>

        {/* Slide 10 */}
        <Slide>
            <Title>
                Creative Coding
            </Title>
            <Paragraph>
                Code is your canvas; let creativity flow through every line and function.
            </Paragraph>
        </Slide>

        {/* Slide 11 */}
        <Slide>
            <Title>
                Musical Loops
            </Title>
            <Paragraph>
                Loops in code, loops in music - both create rhythm and structure.
            </Paragraph>
        </Slide>

        {/* Slide 12 */}
        <Slide>
            <Title>
                Drone Choreography
            </Title>
            <Paragraph>
                Drones dancing in the sky - a symphony of flight and technology.
            </Paragraph>
        </Slide>

        {/* Slide 13 */}
        <Slide>
            <Title>
                Code, the Universal Language
            </Title>
            <Paragraph>
                Just like music, code transcends borders, connecting minds globally.
            </Paragraph>
        </Slide>

        {/* Slide 14 */}
        <Slide>
            <Title>
                Cryptographic Puzzles
            </Title>
            <Paragraph>
                Solve cryptographic puzzles - a mental challenge as intricate as composing music.
            </Paragraph>
        </Slide>

        {/* Slide 15 */}
        <Slide>
            <Title>
                Tailwind's Palette
            </Title>
            <Paragraph>
                Tailwind's color palette, much like a musical palette, sets the tone for your UI composition.
            </Paragraph>
        </Slide>
    </Deck>)
}

export default App;
