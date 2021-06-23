import React, {Component} from 'react';

interface TimerProps {
    autoStart: boolean;
    stop?: boolean;
}

interface TimerState {
    time: number;
    minutes: number;
    seconds: number;
    timer: number | undefined;
}

export class StopWatch extends Component<TimerProps, TimerState>{

    constructor(props: TimerProps) {
        super(props);
        this.state = {
            time: 0,
            minutes: 0,
            seconds: 0,
            timer: undefined
        }
    }


    start = (time: number): void => {
        clearInterval(this.state.timer);
        let timer: number = window.setInterval(() => {
            if (this.props.stop === true)
                this.stop();

            let time = this.state.time + 1, min = 0, sec = 0;
            if (time < 60)
                sec = time;
            else {
                min = Math.floor(time / 60);
                sec = time - min * 60;
            }
            this.setState({time: time, minutes: min, seconds: sec});
        }, 1000);
        return this.setState({
            timer: timer
        });
    };

    stop = (): void => {
        clearInterval(this.state.timer);
        this.setState({timer: undefined});
    };

    componentDidMount() {
        if (this.props.autoStart)
            this.start(0);
    };

    render() {
        return (
            <span className="time">{this.state.minutes}:{this.state.seconds}</span>
        );
    }
}

interface WpmProps {
    charEntries: number;
    autoStart: boolean;
    stop?: boolean;
}

interface WpmState {
    time: number;
    wpm: number;
    timer: number | undefined;
}

export class WordsPerMinute extends Component<WpmProps, WpmState>{

    constructor(props: WpmProps) {
        super(props);
        this.state = {
            time: 0,
            wpm: 0,
            timer: undefined
        }
    }


    start = (time: number): void => {
        clearInterval(this.state.timer);
        let timer: number = window.setInterval(() => {
            if (this.props.stop)
                this.stop();

            let time = this.state.time + 1;
            const rawWpm = (this.props.charEntries / 5) / (this.state.time / 60);
            const beautyfiedWpm = Number(Math.round(rawWpm).toFixed(0));
            this.setState({wpm: beautyfiedWpm, time: time});
        }, 1000);
        return this.setState({
            timer: timer
        });
    };

    stop = (): void => {
        clearInterval(this.state.timer);
        this.setState({timer: undefined});
    };

    componentDidMount() {
        if (this.props.autoStart)
            this.start(0);
    };

    render() {
        return (
            <span className="wpm">{this.state.wpm}</span>
        );
    }
}
