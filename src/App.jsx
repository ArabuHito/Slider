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
`

function App() {
    return (
        <Deck>
            <Slide markdown={markdown}/>
            <Slide title="Comment j'ai gagné mon combat contre tailwind">
                <Paragraph>...ou presque</Paragraph>
                <Image src={"/Fight.png"} alt={"fight"} />
            </Slide>
            <Slide
                layout="column"
                title="En fait je ne l'ai pas vraiment gagné..."
            >
                <Paragraph>
                    Parce que j'ai en quelque sortes triché, en utilisant @apply
                </Paragraph>
                <CodeBlock
                    syntax="css"
                    code={`                
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    body {
        @apply bg-secondary dark:bg-stone-600;
    }
}

@font-face {
    font-family: 'Outfit';
    src: url('assets/fonts/Outfit-VariableFont_wght.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}
                `}
                />
            </Slide>
            <Slide layout="column" title="Admirez mon chat.">
                <Paragraph>
                    <i>
                        Il est mignon, n'est-ce pas ? Il faut que je le montre à
                        tout le monde. Le problème c'est que je n'ai pas de
                        chat. Alors voici un chat aléatoire.
                    </i>
                </Paragraph>
                <Image
                    src="https://placekitten.com/1920/1080"
                    alt="My cat"
                    caption="Mon chat"
                />
            </Slide>
            <Slide layout="full" title="Mais comme j'aime le dire...">
                <Paragraph>
                    <i>As long as it works, it works.</i>
                </Paragraph>
            </Slide>
        </Deck>
    );
}

export default App;
