var WeatherClock = React.createClass({
  getInitialState: function () {
    return { time: new Date() }
  },
  componentDidMount: function () {
    this.clock = setInterval(this.tick, 1000)
  },
  componentWillUnmount: function() {
    clearInterval(this.clock)
  },
  tick: function () {
    this.setState({time: new Date() })
  },
  render: function () {
    var currentTime = this.state.time.toString();
    return (
        <h2> {currentTime} </h2>
    )
  }




});
