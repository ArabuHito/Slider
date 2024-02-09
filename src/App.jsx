import {Deck} from "./components/Deck.jsx";
import {Slide} from "./components/Slide.jsx";

function App() {

    return (
        <Deck>
            <Slide
                title="Slide 1"
                markdownFile="./slides/slide1.md"
            />
            <Slide
                title="Slide 2"
                markdownFile="./slides/slide2.md"
            />
        </Deck>
    )
}

export default App
