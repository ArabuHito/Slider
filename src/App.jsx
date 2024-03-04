/*
 * BOUDOUAYA Ayoub, AMU 2024.
 */

/* eslint-disable react/no-unescaped-entities */
import { Slide } from "./components/Slide.jsx";
import { CodeBlock, Paragraph, Title } from "./components/Text.jsx";
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
            <Slide title="Deck" layout="column">
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
                <Paragraph>
                    Le deck est le composant principal, il contient les slides, la toolbar et la mosaique.
                    Il gère la navigation entre les slides, la barre de progression et le mode mosaique.
                    C'est aussi le composant qui gère les évènements clavier.
                </Paragraph>
            </Slide>

            {/* Slide */}
            <Slide title="Slide" layout="column">
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
                <Paragraph>
                    Le composant slide est le composant qui affiche le contenu de la slide.
                    Il peut afficher du markdown, des composants enfants ou un contenu simple.
                    Il gère aussi les différentes mises en page.
                </Paragraph>
            </Slide>

            {/* Text */}
            <Slide title="Text" layout="column">
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
                <Paragraph>
                    Les composants textes sont des composants simples qui affichent du texte.
                    Ils sont utilisés pour afficher les titres, les paragraphes et les blocs de code.
                </Paragraph>
            </Slide>

            {/* Image */}
            <Slide title="Image" layout="column">
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
                <Paragraph>
                    Le composant image est un composant simple qui affiche une image avec une légende.
                </Paragraph>
            </Slide>

            {/* Chart */}
            <Slide title="Charte graphique">
                <Paragraph>
                    L'aspect visuel de l'application est basé sur l'outil de présentation
                    utilisé par M. Colombel. La barre d'outil y est constamment affichée sans
                    que cela ne gêne la lecture. Les couleurs sont inspirés de ma palette personnelle
                    que vous pouvez retrouver sur mon <a href="https://boudouaya.freeboxos.fr">site web</a> par exemple.
                </Paragraph>
                <Image
                    src="/Palette.png"
                    alt="palette"
                    caption="Palette de couleurs"
                />
            </Slide>

            {/* TailwindCSS */}
            <Slide title="Ce fichu tailwind..." layout="column">
                <Paragraph>
                    Donc malgré tout ce que j'ai pu dire, vous m'avez forcé à utiliser TailwindCSS.
                    Et bien je l'ai fait, mais je crois avoir péché par excès de zèle. J'ai utilisé
                    des classes pour tout et n'importe quoi. J'ai même fait des composants pour les
                    textes et les images. C'est dire.
                </Paragraph>
                <CodeBlock syntax="css" code={`
/*
* BOUDOUAYA Ayoub, AMU 2024.
*/

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
   body {
       @apply bg-secondary dark:bg-stone-600;
   }

   h2 {
       @apply text-3xl font-bold text-primary dark:text-stone-100;
   }

   h3 {
       @apply text-2xl font-bold text-primary dark:text-stone-100;
   }

   h4 {
       @apply text-xl font-bold text-primary dark:text-stone-100;
   }

   h5 {
       @apply text-lg font-bold text-primary dark:text-stone-100;
   }

   h6 {
       @apply text-base font-bold text-primary dark:text-stone-100;
   }

   p {
       @apply text-base text-primary dark:text-stone-100;
   }

   ul {
       @apply list-disc list-inside;
   }

   code {
       @apply text-code bg-stone-100 dark:bg-stone-800 dark:text-secondary;
   }

   ol {
       @apply list-decimal list-inside;
   }

   ol > ol, ul > ul {
       @apply ml-2 mb-2 pl-6 border-l-2 border-primary dark:border-stone-100;
   }

   input[type="number"]{
       -moz-appearance: textfield;
       @apply w-3 text-center placeholder:text-text dark:placeholder:text-primary mr-1 bg-background dark:bg-stone-800;
   }

   a {
       @apply text-primary dark:text-stone-100 hover:animate-pulse;
   }
}

@font-face {
   font-family: 'Outfit';
   src: url('assets/fonts/Outfit-VariableFont_wght.ttf') format('truetype');
   font-weight: 400;
   font-style: normal;
}
                `}/>
            </Slide>

            {/* Functionnal */}
            <Slide title="Fonctionnel" layout="column">
                <Paragraph>
                    L'application est fonctionnelle. Elle permet de naviguer entre les slides,
                    d'afficher les slides en mode mosaique, de naviguer avec le clavier et de
                    naviguer avec la barre de progression.
                </Paragraph>
                <Image
                    src="/Mosaic.png"
                    alt="mosaic"
                    caption="Mode mosaique"
                />
            </Slide>

            {/* Links */}
            <Slide>
                <Titlez>
                    Vous pouvez retrouver le code source de cette application sur mon <a href="https://github.com/ArabuHito/Slider">github</a>
                </Titlez>
            </Slide>
        </Deck>
    );
}

export default App;
