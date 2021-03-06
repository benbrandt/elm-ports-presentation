port module Main exposing (..)

import Html exposing (..)
import Html.App exposing (program)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


-- MODEL


type alias AudioMarker =
    { speaking : Bool
    , timestamp : Float
    }


type alias AudioSegment =
    { speaking : Bool
    , start : Float
    , end : Float
    }


type alias Model =
    { audio : String
    , playing : Bool
    , duration : Float
    , segments : List AudioSegment
    }


port setup : () -> Cmd msg


init : ( Model, Cmd Msg )
init =
    ( { audio = "static/media/buccaneers.mp3"
      , playing = False
      , duration = 0
      , segments = []
      }
    , setup ()
    )



-- UPDATE


type Msg
    = Play
    | Pause
    | Speak AudioMarker


port play : () -> Cmd msg


port pause : () -> Cmd msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Play ->
            ( { model | playing = True }, play () )

        Pause ->
            ( { model | playing = False }, pause () )

        Speak speakEvent ->
            let
                newSegment =
                    createSegment
                        speakEvent
                        model.segments
            in
                ( { model
                    | segments = newSegment :: model.segments
                    , duration = speakEvent.timestamp
                  }
                , Cmd.none
                )


createSegment : AudioMarker -> List AudioSegment -> AudioSegment
createSegment marker segments =
    let
        segmentStart =
            case List.head segments of
                Just segment ->
                    segment.end

                Nothing ->
                    0.0
    in
        { speaking = not marker.speaking
        , start = segmentStart
        , end = marker.timestamp
        }



-- SUBSCRIPTIONS


port speaking : (AudioMarker -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    speaking Speak



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "audio" ]
        [ audio
            [ id "audiofile"
            , src model.audio
            , controls True
            ]
            []
        , viewPlayButton model.playing
        , viewSegments model.duration model.segments
        ]


viewPlayButton : Bool -> Html Msg
viewPlayButton playing =
    if playing then
        button
            [ class "pause"
            , name "pause"
            , onClick Pause
            ]
            [ text "Pause" ]
    else
        button
            [ class "play"
            , name "play"
            , onClick Play
            ]
            [ text "Play" ]


viewSegments : Float -> List AudioSegment -> Html Msg
viewSegments duration segments =
    segments
        |> List.reverse
        |> List.map (viewSegment duration)
        |> div
            [ style
                [ ( "display", "flex" )
                , ( "margin-top", "40px" )
                ]
            ]


viewSegment : Float -> AudioSegment -> Html Msg
viewSegment duration segment =
    let
        color =
            case segment.speaking of
                True ->
                    "#00d1b2"

                False ->
                    "#3273dc"

        width =
            (segment.end - segment.start) / duration * 100
    in
        div
            [ style
                [ ( "background", color )
                , ( "flex-basis", (toString width) ++ "%" )
                , ( "height", "40px" )
                ]
            ]
            []



-- MAIN


main : Program Never
main =
    program
        { view = view
        , init = init
        , update = update
        , subscriptions = subscriptions
        }
