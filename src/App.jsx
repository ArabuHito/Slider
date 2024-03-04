/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

/* eslint-disable react/no-unescaped-entities */
import { Slide } from "./components/Slide.jsx";
import { CodeBlock, Paragraph } from "./components/Text.jsx";
import { Deck } from "./components/Deck.jsx";
import { Image } from "./components/Image.jsx";

// Markdown

const Slides = {
    markdownDemo: `
# Slide en markdown !
Cette slide a été généré entièrement en markdown !

~~~bash
echo C'est fou non ?
~~~

Pour cela, je remplace les *composants* par défaut de markdown par mes propres composants !
`,
};

function App() {
    return (
        <Deck>
            {/* Title Slide */}
            <Slide title="Comment j'ai gagné mon combat contre tailwind">
                <Paragraph>...ou presque</Paragraph>
                <Image src={"/Fight.png"} alt={"fight"} />
            </Slide>

            {/*  Table of contents */}
            <Slide layout="full" title="Sommaire">
                <Paragraph>
                    <ol>
                        <li>Hiérarchie composants</li>
                        <li>Détail de chaque composant : </li>
                        <ol>
                            <li>Deck</li>
                            <li>Slide</li>
                            <li>Text</li>
                            <li>Image</li>
                        </ol>
                        <li>Charte graphique</li>
                        <li>Usage TailwindCSS</li>
                        <li>Fonctionnel (Mosaique, Toolbar...)</li>
                        <li>Liens utiles</li>
                    </ol>
                </Paragraph>
            </Slide>

            {/* Hierarchy */}
            <Slide title="Hiérarchie des composants" layout="column">
                <Paragraph>
                    Le <code>deck</code> est le composant principal, il contient
                    les <code>slides</code>. La <code>toolbar</code> et la{" "}
                    <code>mosaic</code> sont contenu dans le deck. Enfin, toutes
                    les options de styles de textes et images sont appelé par la{" "}
                    <code>slide</code>.
                </Paragraph>
                <Image
                    src="/Hierarchie.png"
                    alt="hierarchy"
                    caption="Schéma Hiérarchie"
                />
            </Slide>

            {/* Deck */}
            <Slide title="Deck" layout="full">
                <CodeBlock
                    syntax="jsx"
                    code={`
                    function Deck({ children }) {
                        // Check valid children
                        if (!children) {
                            throw new Error("Deck component must have at least one child.");
                        }
                    
                        // Hooks
                        const [currentSlide, setCurrentSlide] = useState(0);
                        const [progressWidth, setProgressWidth] = useState(0);
                        const [mosaicView, setMosaicView] = useState(false);
                    
                        // Variables
                        let slides;
                    
                        // Index the slides
                        if (children.length) {
                            slides = children;
                        } else {
                            slides = [children];
                        }
                    
                        // Constants
                        const totalSlides = slides.length;
                    
                        // Navigation
                        const nextSlide = useCallback(() => {
                            if (currentSlide < totalSlides - 1) {
                                setCurrentSlide(currentSlide + 1);
                                if (totalSlides > 1) {
                                    setProgressWidth(
                                        ((currentSlide + 1) / (totalSlides - 1)) * 100
                                    );
                                }
                            }
                        }, [currentSlide, totalSlides]);
                    
                        const prevSlide = useCallback(() => {
                            if (currentSlide > 0) {
                                setCurrentSlide(currentSlide - 1);
                                if (totalSlides > 1) {
                                    setProgressWidth(
                                        ((currentSlide - 1) / (totalSlides - 1)) * 100
                                    );
                                }
                            }
                        }, [currentSlide, totalSlides]);
                    
                        // GoToSlide
                        const goToSlide = (index) => {
                            setCurrentSlide(index);
                            setMosaicView(false);
                        };
                    
                        // Keyboard navigation
                        useEffect(() => {
                            const handleKeyUp = (event) => {
                                if (event.key === "ArrowRight" && !mosaicView) {
                                    nextSlide();
                                }
                                if (event.key === "ArrowLeft" && !mosaicView) {
                                    prevSlide();
                                }
                            };
                    
                            window.addEventListener("keyup", handleKeyUp);
                    
                            return () => {
                                window.removeEventListener("keyup", handleKeyUp);
                            };
                        }, [nextSlide, prevSlide, mosaicView]);
                    
                        // Set the progress bar width
                        useEffect(() => {
                            if (totalSlides > 1) {
                                setProgressWidth((currentSlide / (totalSlides - 1)) * 100);
                            }
                        }, [currentSlide, totalSlides]);
                    
                        return (
                            <div className={"deck"}>
                                {mosaicView ? (
                                    <MosaicView
                                        slides={slides}
                                        currentSlide={currentSlide}
                                        goToSlideFromMosaic={goToSlide}
                                    />
                                ) : (
                                    slides[currentSlide]
                                )}
                                <ToolBar
                                    mosaicView={mosaicView}
                                    onClickFirst={() => setCurrentSlide(0)}
                                    onClickPrev={prevSlide}
                                    onClickNext={nextSlide}
                                    onClickLast={() => setCurrentSlide(totalSlides - 1)}
                                    onClickMosaic={() => setMosaicView(!mosaicView)}
                                    currentSlide={currentSlide}
                                    totalSlides={totalSlides}
                                />
                                {!mosaicView ? (
                                    <div
                                        className="progress-bar fixed top-0 left-0 w-0 h-2 transition-all duration-500 ease-in-out
                                    bg-primary dark:bg-primary"
                                        style={{ width: \`\${progressWidth}%\` }}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        );
                    }
                `}
                />
            </Slide>

            {/* Slide */}
            <Slide title="Slide" layout="full">
                <CodeBlock
                    syntax="jsx"
                    code={`
                    function Slide(props) {

                        // - Read slide from markdown
                    
                        if (props.markdown) {
                            const components = {
                                h1({node, children, ...props}) {
                                    return (
                                        <Title>
                                            {children}
                                        </Title>
                                    );
                                },
                                code({node, inline, className, children, ...props}) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                        <CodeBlock syntax={match[1]} code={String(children).replace(/\n$/, '')} />
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                p({node, children, ...props}) {
                                    return (
                                        <Paragraph>
                                            {children}
                                        </Paragraph>
                                    );
                                }
                            };
                    
                            return (
                                <div className="slide h-screen w-screen text-center flex flex-col justify-center
                                bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-40">
                                    <div className="title flex-2">
                                        <Title>{props.title}</Title>
                                    </div>
                                    <div className="slide-content">
                                        <Markdown components={components}>
                                            {props.markdown}
                                        </Markdown>
                                    </div>
                                </div>
                            );
                        }
                    
                        switch (props.layout) {
                    
                            // - Column Layout
                            case "column":
                                return (
                                    <div className="slide h-screen w-screen
                                            text-center flex flex-col justify-center
                                        bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-20">
                                        <div className="title flex-2">
                                            <Title>{props.title}</Title>
                                        </div>
                                        <div className="slide-content h-full text-balance place-items-center grid grid-cols-2">
                                            {props.children}
                                        </div>
                                    </div>
                                );
                    
                            // - Full Layout
                            case "full":
                                return (
                                    <div className="slide h-screen w-screen text-left
                                        bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-40">
                                        <div className="title flex-2">
                                            <Title>{props.title}</Title>
                                        </div>
                                        <div className="slide-content px-20">
                                            {props.children}
                                        </div>
                                    </div>
                                );
                    
                            // - Default Layout
                            default:
                                return (
                                    <div className="slide h-screen w-screen text-center flex flex-col justify-center
                                        bg-background dark:bg-stone-800 overflow-clip pt-20 px-20 pb-40">
                                        <div className="title flex-2">
                                            <Title>{props.title}</Title>
                                        </div>
                                        <div className="slide-content">
                                            {props.children}
                                        </div>
                                    </div>
                                );
                        }
                    }
                `}
                />
            </Slide>

            {/* Text */}
            <Slide title="Text" layout="full">
                <CodeBlock
                    syntax="jsx"
                    code={`
                    function Paragraph(props) {
                        return (
                            <p className="text text-text dark:text-primary text-3xl">
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
                `}
                />
            </Slide>

            {/* Image */}
            <Slide title="Image" layout="full">
                <CodeBlock
                    syntax="jsx"
                    code={`
                    function Image ({ src, alt, caption }) {
                        return (
                            <div className="image-container">
                                <img className="image mx-auto my-2 max-h-96 rounded-lg" src={src} alt={alt} />
                                {caption && <p className="image-caption text-text dark:text-primary text-2xl italic pt-2">{caption}</p>}
                            </div>
                        )
                    }
                `}
                />
            </Slide>

            {/* Chart */}
            <Slide title="Charte graphique">
                <Paragraph>
                    La charte graphique est basée sur TailwindCSS. Le thème est
                    défini dans le fichier <code>tailwind.config.js</code>.
                </Paragraph>
                <Image
                    src="/Palette.png"
                    alt="palette"
                    caption="Palette de couleurs"
                />
            </Slide>
        </Deck>
    );
}

export default App;
