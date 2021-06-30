import React, {Component, KeyboardEvent} from 'react';
import {getRandomTextFromApi, onLetterTyped} from './Logic'
import {StopWatch, WordsPerMinute} from './Statistics'
import Timer from './Timer'
import Progress_bar from './ProgressBar'
import {textChangeRangeIsUnchanged} from 'typescript';

interface wordInParts {
    word_good: string;
    word_bad: string;
    word_normal: string;
}

type InputState = {
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

    constructor() {
        super({});
        let text = getRandomTextFromApi().split(" ");
        this.state = {
            good_part: "",
            allWords: text,
            currentWordIndex: 0,
            userWord: "",
            finished: false,
            mistakes: 0,
            accuracy: 100,
            previousUserWord: "",
            charEntries: 0,
            currentWordInParts: {word_good: "", word_bad: "", word_normal: text[0]}
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        if (this.state.currentWordIndex >= this.state.allWords.length)
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
        const accuracy = Number(Math.round((this.state.charEntries - mistakes) / this.state.charEntries * 100).toFixed(0));

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
                    <Progress_bar progression={this.state.currentWordIndex / this.state.allWords.length} />
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
                        <div className="col-4">Author: Kizo </div>
                    </div>
                </div>
            </div>
        );
    }
}
