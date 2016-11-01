// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Code,
  CodePane,
  Deck,
  Fill,
  Fit,
  Heading,
  Image,
  Layout,
  Link,
  ListItem,
  List,
  Markdown,
  Quote,
  Slide,
  Spectacle,
  Text
} from "spectacle";

import CodeSlide from 'spectacle-code-slide';

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");


const images = {
  poster: require("../assets/images/movie-poster.jpg"),
  port2: require("../assets/images/port2.jpg"),
  british: require("../assets/images/British_Empire.png"),
  ship1: require("../assets/images/ship1.png"),
  ship2: require("../assets/images/ship2.png"),
  pirate: require("../assets/images/pirates.jpg"),
  pirate2: require("../assets/images/pirates2.jpg"),
  pirate3: require("../assets/images/pirates3.jpg"),

  logo: require("../assets/images/Elm-Logo.png"),
  github: require("../assets/images/github.svg"),
  twitter: require("../assets/images/twitter.svg")
};

preloader(images);

const theme = createTheme({
  primary: "#60B5CC",
  secondary: "#293c4b",
  quartenary: "#34495E"
}, {
  primary: "Source Sans Pro",
  secondary: "Source Sans Pro",
});

export default class Presentation extends React.Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["slide"]} transitionDuration={500}>
          <Slide bgColor="primary" notes="<ul><li>Using Elm for a few months</li>
<li>Declarative UIs</li>
<li>Functional Programming Concepts</li>
<li>Ports threw me off, trouble understanding from docs</li><li>wasn't until I used in project and wanted to share so hopefully you grasp it quicker</li></ul>">
            <Heading size={1} fit caps lineHeight={1} textColor="tertiary">
              Using Ports in Elm
            </Heading>
            <Layout>
              <Fill>
                <Heading margin="50px 0 0" size={6} textColor="quartenary">
                  <Image margin="0" src={images.twitter}/> @benjaminbrandt
                </Heading>
              </Fill>
              <Fill>
                <Heading margin="50px 0 0" size={6} textColor="quartenary">
                  <Image margin="0" src={images.github}/> benbrandt
                </Heading>
              </Fill>
            </Layout>
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={3} caps textColor="secondary">
              Agenda
            </Heading>
            <List>
              <ListItem>The Issue</ListItem>
              <ListItem>Basic Overview</ListItem>
              <ListItem>How Elm Protects Your App</ListItem>
              <ListItem>Demo: Audio App</ListItem>
            </List>
          </Slide>
          <Slide bgColor="tertiary" notes="<ul><li>So you're using Elm</li><li>Model, View, Update</li><li>Different Modules</li><li>What if Elm doesn't cover your use case yet?</li></ul>">
            <Image height="100" src={images.logo.replace("/", "")} />
            <Appear><Heading size={3} caps margin="0 0 20px">The Issue</Heading></Appear>
            <Appear><Text>Elm doesn't support specific Browser API?</Text></Appear>
            <Appear><Text>Previous JavaScript code or Library?</Text></Appear>
            <Appear><Text>Firebase/Horizon/AWS/etc...?</Text></Appear>
          </Slide>
          <Slide bgColor="tertiary">
            <Appear><Heading size={3} caps margin="0 0 20px">The Solution</Heading></Appear>
            <Appear><Text>Ports.</Text></Appear>
            <Appear><Text>Hole in your app where you can send values in and out between Elm and JS.</Text></Appear>
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={4} margin="0 0 20px">Send Values to JS as Cmd</Heading>
            <CodePane
              margin="40px 0 20px"
              textSize="1.5rem"
              lang="haskell"
              source="port check : String -> Cmd msg"
            />
            <Text>Use like any other Cmd in update function</Text>
            <CodePane
              margin="40px 0 20px"
              textSize="1.5rem"
              lang="javascript"
              source="app.ports.check.subscribe(function() { // code to run });"
            />
            <Text>Called every time Elm sends value out of port</Text>
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={4} margin="0 0 20px">Receive Values from JS as Sub</Heading>
            <CodePane
              margin="40px 0 20px"
              textSize="1.5rem"
              lang="haskell"
              source="port suggestions : (List String -> msg) -> Sub msg"
            />
            <Text>Handle in your Subscriptions function</Text>
            <CodePane
              margin="40px 0 20px"
              textSize="1.5rem"
              lang="javascript"
              source="app.ports.suggestions.send({ // data to send });"
            />
            <Text>Sends values to Elm every time it's called</Text>
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={3} caps textColor="secondary">
              What Can We Send?
            </Heading>
            <List>
              <ListItem>Booleans and Strings</ListItem>
              <ListItem>Numbers</ListItem>
              <ListItem>Lists and Arrays (Arrays in JS)</ListItem>
              <ListItem>Tuples (Fixed-length, mixed-type arrays in JS)</ListItem>
              <ListItem>Records (JS Objects)</ListItem>
              <ListItem>Maybes (Nothing / Just 42 == null / 42 in JS)</ListItem>
              <ListItem>JSON</ListItem>
            </List>
          </Slide>
          <Slide bgColor="tertiary" notes="I thought the whole point of Elm was that we didn't have to deal with JS, dynamic types\n RUNTIME ERRORS?!">
            <Text>Cool, we can send stuff back and forth...</Text>
            <Heading size={3} caps textColor="secondary">
              But what about Runtime Errors?!
            </Heading>
          </Slide>
          <Slide bgColor="tertiary" notes="<ul>
<li>Elm Guide Section - JS Interop</li>
<li>Customs and Border Protection</li>
<li>Got me thinking about real ports with ships/cargo</li></ul>">
            <Layout>
              <Fill>
                <Heading size={4} margin="100px 0 0" caps textColor="secondary">
                  Customs and Border Protection
                </Heading>
              </Fill>
              <Fill>
                <Appear><Image src={images.poster.replace("/", "")} width="80%" /></Appear>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="center flex-start" bgImage={images.british.replace("/", "")} notes="<ul>
<li>Imagine Elm like the British Empire</li>
<li>Data going around their vast Program</li>
<li>Strict rules about data, ensuring it ends up where it needs to be</li>
<li>People can count on the data being what it says it is</li>
<li>Elm-pire growing fast, need more supplies, certain processed data</li>
</ul>">
            <Heading size={3} caps >
              The Elm-pire
            </Heading>
            <Layout>
              <Fill>
                <Appear>
                  <Image margin="0 40px 0 0" height="250px" src={images.ship1.replace("/", "")} />
                </Appear>
                <Appear>
                  <CodePane
                    textSize="1.1rem"
                    lang="haskell"
                    source="type alias Ship = { cargo : List Box }"
                  />
                </Appear>
              </Fill>
              <Fill>
                <Appear>
                 <Image margin="180px 0 0 120px" height="250px" src={images.ship2.replace("/", "")} />
                </Appear>
                <Appear>
                  <CodePane
                    textSize="1.1rem"
                    lang="haskell"
                    source="type alias Ship = { cargo : List Box }"
                  />
                </Appear>
              </Fill>
            </Layout>
          </Slide>
          <Slide align="flex-start flex-start" bgImage={images.pirate.replace("/", "")} bgDarken="0.25" notes="<ul><li>On the high seas they hear of some JS pirates that can offer the data they need</li>
<li>Their 'types' can't be trusted, their methods aren't always 'pure', but they can usually get the job done</li>
<li>The Elm-pire usually wants to keep its distance from this type of programming, but they realize they need to rely on them occaisionally</li>
            </ul>">
            <Heading textAlign="left" size={3} caps textColor="tertiary">
              JS
            </Heading>
            <Layout>
              <Fit>
                <Appear>
                  <CodePane
                    textSize="1.5rem"
                    lang="javascript"
                    source={`// Types can't be trusted
var ship = {
  cargo: [box, box, box]
};
ship.cargo = 42;`}
                  />
                </Appear>
              </Fit>
            </Layout>
            <Layout>
              <Fit>
                <Appear>
                  <CodePane
                    margin="10px 0 0"
                    textSize="1.5rem"
                    lang="javascript"
                    source={`// Impure Functions
function stealShip() {
 globalFleet--;
 pirateGold += 50;
}
`}
                  />
                </Appear>
              </Fit>
            </Layout>
          </Slide>
          <Slide align="flex-end center" bgImage={images.port2.replace("/", "")} bgDarken="0.25" notes="<ul>
<li>Elm-pire sets up ports for the cargo to come in</li>
<li>Since JS can't always be trusted and might try and smuggle something else in, Elm sets up explicit 'contracts' with pirates</li>
<li>Elm doesn't care what they do in their own ports, as long as they follow Elm's rules when working with them</li>
            </ul>">
            <Layout>
              <Fill />
              <Fit>
                <CodePane
                  textSize="1.5rem"
                  lang="haskell"
                  source={`-- Only allows ships with specific cargo
type alias Ship = { cargo : List Box }
port dock : (Ship -> msg) -> Sub msg`}
                />
              </Fit>
            </Layout>
            <Layout>
              <Fill />
              <Fit>
                <CodePane
                  margin="30px 0 0"
                  textSize="1.5rem"
                  lang="javascript"
                  source={`// JS Ships must follow these rules
var ship = {
  cargo: [box, box, box]
};
app.ports.dock.send(ship);`}
                />
              </Fit>
            </Layout>
          </Slide>
          <Slide align="flex-end flex-start" bgImage={images.pirate2.replace("/", "")} notes="<ul>
              <li>If JS tries to bring in smuggled goods, you can bet Elm is going to stop them</li>
            </ul>">
            <Layout>
              <Fit>
                <CodePane
                  margin="100px 0 0"
                  textSize="1.5rem"
                  lang="javascript"
                  source={`// Invalid Cargo
var ship = {
  cargo: 0
};
app.ports.dock.send(ship);`}
                />
              </Fit>
            </Layout>
          </Slide>
          <Slide align="flex-end flex-end" bgImage={images.pirate3.replace("/", "")} notes="<ul>
              <li>Elm is going to cause an error at the port rather than let the data make it somewhere in the app to cause issues later</li>
              <li>Elm runtime will reject any values that don't match type annotations</li>
              <li>Makes sure errors on JS side, no runtime errors Elm</li>
            </ul>">
            <CodePane
              margin="100px 0 0"
              textSize="1.5rem"
              lang="javascript"
              source={`Uncaught Error: Trying to send an unexpected
type of value through port \`dock\`:
Expecting a List at _.cargo but instead got: 0
`}
            />
          </Slide>
          <Slide bgColor="quartenary" notes="Elm can't ensure your JS code is perfect, but it will make sure your experience on the Elm side isn't spoiled by opening up a hole in your app">
            <BlockQuote>
              <Quote textSize="4.25rem">"...by enforcing some architectural rules, you can make full use of the old language without making sacrifices in the new one."</Quote>
              <Cite>Evan Czaplicki - An Introduction to Elm</Cite>
            </BlockQuote>
          </Slide>
          <Slide bgColor="quartenary" notes="Build up audio app, Find Pauses in Audio">
            <Heading size={4} caps textColor="tertiary">
              Demo: Audio App
            </Heading>
          </Slide>
          <Slide bgColor="primary">
            <Heading size={4} textColor="tertiary">create-elm-app</Heading>
            <Link textSize="3rem" href="https://github.com/halfzebra/create-elm-app" textColor="tertiary">github.com/halfzebra/create-elm-app</Link>
          </Slide>
          <CodeSlide
            transition={[]}
            lang="html"
            code={require("raw!../assets/1-embed/index.html")}
            ranges={[
              { loc: [0, 11] },
            ]}
          />
          <Slide bgColor="quartenary">
            <Heading size={4} caps textColor="tertiary">
              Step 1 - Embed
            </Heading>
          </Slide>
          <CodeSlide
            transition={[]}
            lang="haskell"
            code={require("raw!../assets/1-embed/Main.elm.example")}
            ranges={[
              { loc: [0, 61], title: "Main.elm" },
              { loc: [0, 4] },
              { loc: [6, 16] },
              { loc: [19, 29] },
              { loc: [32, 38] },
              { loc: [41, 47] },
              { loc: [50, 61] },
            ]}
          />
          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/1-embed/index.js.example")}
            ranges={[
              { loc: [0, 5], title: "index.js" },
            ]}
          />
          <Slide bgColor="quartenary">
            <Heading size={4} caps textColor="tertiary">
              Step 2 - Audio Player
            </Heading>
          </Slide>
          <CodeSlide
            transition={[]}
            lang="haskell"
            code={require("raw!../assets/2-audioplayer/Main.elm.example")}
            ranges={[
              { loc: [0, 107], title: "Main.elm" },
              { loc: [0, 1] },
              { loc: [8, 15] },
              { loc: [17, 24] },
              { loc: [27, 33] },
              { loc: [35, 40] },
              { loc: [41, 53] },
              { loc: [65, 79] },
              { loc: [81, 91] },
              { loc: [90, 97] },
            ]}
          />
          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/2-audioplayer/index.js.example")}
            ranges={[
              { loc: [0, 18], title: "index.js" },
              { loc: [6, 12] },
              { loc: [13, 19] },
            ]}
          />
          <Slide bgColor="quartenary">
            <Heading size={4} caps textColor="tertiary">
              Step 3 - Find Pauses
            </Heading>
          </Slide>
          <CodeSlide
            transition={[]}
            lang="haskell"
            code={require("raw!../assets/3-hark/Main.elm.example")}
            ranges={[
              { loc: [0, 184], title: "Main.elm" },
              { loc: [8, 15] },
              { loc: [17, 22] },
              { loc: [24, 30] },
              { loc: [32, 44] },
              { loc: [50, 54] },
              { loc: [71, 78] },
              { loc: [77, 84] },
              { loc: [86, 97] },
              { loc: [96, 101] },
              { loc: [104, 113] },
              { loc: [119, 131] },
              { loc: [151, 162] },
              { loc: [164, 174] },
              { loc: [174, 178] },
              { loc: [177, 186] },
            ]}
          />
          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/3-hark/index.js.example")}
            ranges={[
              { loc: [0, 45], title: "index.js" },
              { loc: [3, 4] },
              { loc: [11, 17] },
              { loc: [18, 24] },
              { loc: [25, 32] },
            ]}
          />
          <Slide bgColor="quartenary">
            <Heading size={4} caps textColor="tertiary">
              Step 4 - DB
            </Heading>
          </Slide>
          <CodeSlide
            transition={[]}
            lang="haskell"
            code={require("raw!../assets/4-db/Main.elm.example")}
            ranges={[
              { loc: [0, 208], title: "Main.elm" },
              { loc: [47, 55] },
              { loc: [63, 64] },
              { loc: [89, 91] },
              { loc: [136, 137] },
            ]}
          />
          <CodeSlide
            transition={[]}
            lang="javascript"
            code={require("raw!../assets/4-db/index.js.example")}
            ranges={[
              { loc: [0, 73], title: "index.js" },
              { loc: [4, 5] },
              { loc: [11, 17] },
              { loc: [18, 20] },
              { loc: [21, 32] },
              { loc: [67, 73] },
            ]}
          />
          <Slide bgColor="tertiary">
            <Heading size={4} margin="0 0 20px">Flags</Heading>
            <CodePane
              margin="20px 0"
              textSize="1.5rem"
              lang="haskell"
              source={`type alias Flags =
    { user : String
    , token : String
    }

init : Flags -> ( Model, Cmd Msg )
init flags =
  ...

main =
  programWithFlags { init = init, ... }`}
          />
          </Slide>
          <Slide bgColor="tertiary">
            <Heading size={4} margin="0 0 20px">Flags</Heading>
            <Text>Can allow for data in model to come from JS</Text>
            <CodePane
              margin="20px 0"
              textSize="1.5rem"
              lang="javascript"
              source={`var app = Elm.MyApp.fullscreen({
  user: 'Tom',
  token: '12345'
});`}
            />
          </Slide>
          <Slide bgColor="tertiary" notes="<ul>
              <li>Put all ports in their own module</li>
              <li>Packages: would have to know how to hook them up, could be bad expereince for new users</li>
            </ul>">
            <Heading size={3} caps textColor="secondary">
              Issues with Ports
            </Heading>
            <List>
              <Appear>
                <ListItem>
                  Can't have ports from different modules with same name
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  Can't list them on Elm Package Repository
                </ListItem>
              </Appear>
              <Appear>
                <ListItem>
                  You're still dealing with JS
                </ListItem>
              </Appear>
            </List>
          </Slide>
          <Slide bgColor="primary" notes="<ul><li>Questions?</li><li>Thanks to Julio!</li><li>Could use more speakers, places to meet</li><li>Be great to see the Portland Elm community grow!</li></ul>">
            <Heading size={1} caps lineHeight={1} textColor="tertiary">
              The End
            </Heading>
            <Layout>
              <Fill>
                <Heading margin="50px 0 0" size={6} textColor="quartenary">
                  <Image margin="0" src={images.twitter}/> @benjaminbrandt
                </Heading>
              </Fill>
              <Fill>
                <Heading margin="50px 0 0" size={6} textColor="quartenary">
                  <Image margin="0" src={images.github}/> benbrandt
                </Heading>
              </Fill>
            </Layout>
            <Link href="https://benbrandt.github.io/elm-ports-presentation ">benbrandt.github.io/elm-ports-presentation</Link>
            <Link href="https://github.com/benbrandt/elm-audio-demo">github.com/benbrandt/elm-audio-demo</Link>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}
