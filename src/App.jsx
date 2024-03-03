/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

/* eslint-disable react/no-unescaped-entities */
import { Slide } from "./components/Slide.jsx";
import { CodeBlock, Paragraph } from "./components/Text.jsx";
import { Deck } from "./components/Deck.jsx";
import { Image } from "./components/Image.jsx";

// Markdown

const markdown = `
# Voici du code

~~~css
CodeBlock {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8f8f2;
    background-color: #282a36;
}
~~~

Et un paragraphe.
`;

function App() {
    return (
        <Deck>
            <Slide title="Comment j'ai gagné mon combat contre tailwind">
                <Paragraph>...ou presque</Paragraph>
                <Image src={"/Fight.png"} alt={"fight"} />
            </Slide>
        </Deck>
    );
}

export default App;
