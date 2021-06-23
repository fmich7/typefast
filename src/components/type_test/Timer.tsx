import React from "react";

interface StopWatchState {
  time: number;
  minutes: number;
  seconds: number;
  timer: number | undefined;
}
interface StopWatchProps {
  autoStart?: boolean;
  stop?: boolean;
}
export default class StopWatch extends React.Component<StopWatchProps, StopWatchState> {

  constructor(props: StopWatchProps){
    super(props);
    this.state = {
      time: 0,
      minutes: 0,
      seconds: 0,
      timer: undefined
    };
  }

  start = (time: number): void => {
    clearInterval(this.state.timer);
    let timer: number = window.setInterval(() => {

      if (this.props.stop)
        this.stop();

      let time = this.state.time + 1;
      if (time < 60) {
        this.setState({time: time, minutes: 0, seconds: time});
      } 
      else {
        let min = Math.floor(time / 60);
        let sec = time - min * 60;
        this.setState({time: time, minutes: min, seconds: sec});
      }

    }, 1000);

    return this.setState({
      time: time,
      timer: timer
    });
  };

  stop = (): void => {
    clearInterval(this.state.timer);
    this.setState({
      timer: undefined
    });
  };

  componentDidMount(){
    if(this.props.autoStart)
      this.start(0);
  };

  render(){
    return (
      <div>
        <span className="time">{this.state.minutes}</span>
        <span className="unit">min</span>
        <span className="time right">{this.state.seconds}</span>
        <span className="unit">sec</span>
      </div>
    );
  }
}