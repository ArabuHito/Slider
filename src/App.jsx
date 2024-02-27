/* eslint-disable react/no-unescaped-entities */
import {Slide} from "./components/Slide.jsx";
import {Paragraph, Title} from "./components/Text.jsx";
import {Deck} from "./components/Deck.jsx";
import {Image} from "./components/Image.jsx";

function App() {

    return (
        <Deck>
            <Slide>
                <Title>
                    Comment j'ai gagné mon combat contre tailwind
                </Title>
                <Paragraph>
                    ...ou presque
                </Paragraph>
                <Image src={"public/Fight.png"} alt={"fight"}/>
            </Slide>
            <Slide>
                <Title>
                    En fait je ne l'ai pas vraiment gagné...
                </Title>
            </Slide>
        </Deck>)
}

export default App;
