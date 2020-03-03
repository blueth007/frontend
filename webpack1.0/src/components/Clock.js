import React from "react";
import '@babel/polyfill';
import "../styles/clock.scss";

export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      huor_time: {},
      minute_time: {},
      second_time: {}
    };
  }

  getTime = () => {
    const timeNow = new Date().toLocaleTimeString();
    var timeArr = timeNow.match(/(\d{2})/g);
    timeArr = timeArr.map(a => a * 1);

    var t1 = (timeArr[0] - 3) * 30 + timeArr[1] / 2,
      t2 = (timeArr[1] - 15) * 6,
      t3 = (timeArr[2] - 15) * 6;

    this.setState({
      huor_time: { transform: `rotate(${t1}deg)` },
      minute_time: { transform: `rotate(${t2}deg)` },
      second_time: { transform: `rotate(${t3}deg)` }
    });
    // console.log(timeArr, t1, t2, t3);
  };

  componentDidMount() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  }

  render() {
    const { huor_time, minute_time, second_time } = this.state;
    return (
      <div className="clock">
        <div className="huor-time" style={huor_time} />
        <div className="minute-time" style={minute_time} />
        <div className="second-time" style={second_time} />
      </div>
    );
  }
}