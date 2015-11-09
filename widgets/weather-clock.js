var WeatherClock = React.createClass({
  render: function () {
    return (
      <section>
        <ul>
          <li><Clock /></li>
          <li><Weather apiKey="74698c7d230b433ea263029c8e7eea5f" /></li>
        </ul>
      </section>
    )
  }
});

var Clock = React.createClass({
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

var Weather = React.createClass({
  getInitialState: function () {

    return { lat: null, lon: null, weather: null, temp: null }
  },
  componentDidMount: function () {
    var lat, lon, that, resp;
    that = this;

    var success = function (pos) {
      lat = pos.coords.latitude,
      lon = pos.coords.longitude;

      var request = new XMLHttpRequest();
      request.open("GET",
        "http://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&APPID=" +
         that.props.apiKey
      )

      request.onload = function() {
        // doesn't run even w/ send
        if (request.status <= 200 && request.status < 400) {
          resp = JSON.parse(request.responseText)
          var weather = resp.weather[0].description
          var temp = resp.main.temp

          that.setState({
            lat: lat,
            lon: lon,
            weather: weather,
            temp: temp
          })
        } else {
          //why is this here??
        }
      };
      request.onerror = function() {
        console.log(this);
      }
      request.send();

    };

    var error = function (err) {
      console.warn(err.message);
    }
    navigator.geolocation.getCurrentPosition(success, error)
  },
  render: function () {
    return(
      <ul>
        <li>{this.state.lat}</li>
        <li>{this.state.lon}</li>
        <li>{this.state.weather}</li>
        <li>{this.state.temp}</li>
      </ul>
    )
  }
})
