import React, {Component} from 'react';
import {getRandomTextFromApi, getListOfWordsFromText, onLetterTyped} from './Logic'
import {StopWatch, WordsPerMinute} from './Statistics'
import ProgressBar from './ProgressBar'

interface wordInParts {
    word_good: string;
    word_bad: string;
    word_normal: string;
}

type InputState = {
    author: string,
    good_part: string,
    allWords: string[],
    currentWordIndex: number,
    userWord: string,
    finished: boolean,
    mistakes: number,
    accuracy: number,
    previousUserWord: string,
    charEntries: number,
    currentWordInParts: wordInParts
};

export default class TypeTestInput extends Component<{}, InputState>{

    constructor(props: {}) {
        super(props);
        this.state = {
            author: "",
            good_part: "",
            allWords: [],
            currentWordIndex: 0,
            userWord: "",
            finished: false,
            mistakes: 0,
            accuracy: 100,
            previousUserWord: "",
            charEntries: 0,
            currentWordInParts: {word_good: "", word_bad: "", word_normal: ""}
        };
        this.handleChange = this.handleChange.bind(this);
        console.log("constructor done")
    }

    componentDidMount() {
        getRandomTextFromApi().then((response) => {
            const textSplit = getListOfWordsFromText(response['content']);
            this.setState({
                author: response['author'],
                allWords: textSplit,
                currentWordInParts: {
                    word_bad: this.state.currentWordInParts.word_bad,
                    word_good: this.state.currentWordInParts.word_good,
                    word_normal: textSplit[0]
                }
            });
        }).catch((err) => {
            alert("could not get random text from api: " + err);
        });

    }

    handleChange(event: any) {
        if (this.state.currentWordIndex >= this.state.allWords.length || this.state.allWords.length === 0)
            return;
        //sprawdza czy jest nowy znak, czy jest usuwanie poprzednihc
        let newCharTyped = false;
        if (this.state.previousUserWord.length < event.target.value.length) {
            this.setState({charEntries: this.state.charEntries + 1});
            newCharTyped = true;
        }
        //funkcja zwracająca wszystko
        const response = onLetterTyped(event.target.value, this.state.allWords, this.state.currentWordIndex,
            this.state.good_part, newCharTyped);

        //liczy accuracy
        const mistakes = (response.mistake ? 1 : 0) + this.state.mistakes;
        let accuracy = 0;
        if (newCharTyped)
            accuracy = Number(Math.round((this.state.charEntries - mistakes) / this.state.charEntries * 100).toFixed(0));

        this.setState({
            userWord: response.userWord,
            allWords: response.allWords,
            currentWordIndex: response.index,
            good_part: response.good_part,
            finished: response.finished,
            mistakes: mistakes,
            accuracy: accuracy,
            previousUserWord: event.target.value,
            currentWordInParts: response.currentWordInParts
        });
    }

    render() {
        return (
            <div className="container">
                <div className="test_main">
                    <div className="jumbotron text-start">
                        <span className="lead good-part">
                            {this.state.good_part}
                        </span>
                    &nbsp; {/* one char space */}
                        <span className="lead current-word">
                            {/*this.state.allWords[this.state.currentWordIndex]*/}
                            <span className="good-part">{this.state.currentWordInParts.word_good}</span>
                            <span className="bad-part">{this.state.currentWordInParts.word_bad}</span>
                            <span className="normal-part">{this.state.currentWordInParts.word_normal}</span>
                        </span>
                    &nbsp; {/* one char space */}
                        <span className="lead normal-part">{this.state.allWords.slice(this.state.currentWordIndex + 1).join(" ")}</span>
                    </div>
                    <div className="input-group input-group-lg pb-2">
                        <input onChange={this.handleChange} value={this.state.userWord} type="text" className="form-control" placeholder="Type text here..." aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" />
                    </div>
                    <ProgressBar progression={this.state.currentWordIndex / this.state.allWords.length} />
                </div>
                {/* 2nd part */}
                <div className="test_statistics">
                    <div className="row">
                        <div className="col-4">WPM: <WordsPerMinute autoStart={true} charEntries={this.state.charEntries} stop={this.state.finished} /></div>
                        <div className="col-4">Accuracy: {this.state.accuracy}%</div>
                        <div className="col-4">Mistakes: {this.state.mistakes}</div>
                    </div>
                    <div className="row">
                        <div className="col-4">Duration: <StopWatch autoStart={true} stop={this.state.finished} /></div>
                        <div className="col-4">Text words: {this.state.allWords.length} </div>
                        <div className="col-4">Author: {this.state.author} </div>
                    </div>
                </div>
            </div>
        );
    }
}
