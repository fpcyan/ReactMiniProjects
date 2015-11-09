var TabContent = React.createClass({
  getInitialState: function () {
    return {active: 0}
  },

  clickHandler: function (idx) {
    this.setState({active: idx});
  },

  render: function () {
    var that = this;
    var titles = this.props.data.map( function (object, i) {
      var className = (that.state.active === i) ?  "active" : "";
      return(
        <li
          className={className}
          onClick={that.clickHandler.bind(that, i)}
          key={i}>
          {object.title}
        </li>
      )
    })

    var contents = this.props.data.map( function (object, i) {
      return <li key={i}> <article key={i}> {object.content} </article> </li>
    })

    return (
      <section>
        <ul className="headers">
          {titles}
        </ul>

        <ul className="content">
          {contents[this.state.active]}
        </ul>
      </section>
    )
  }


})
