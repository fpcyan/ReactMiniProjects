var AutoComplete = React.createClass({
    getInitialState: function () {
      return { searchString: '' };
    },
    handleChange: function(e) {

      this.setState( { searchString: e.target.value });
    },
    handleClick: function(l) {
      this.setState( { searchString: l})
    },
    render: function() {

      var libraries = this.props.items,
        searchString = this.state.searchString.trim().toLowerCase(),
        that = this;
      if (searchString.length > 0) {
        libraries = libraries.filter( function (l) {
          return l.toLowerCase().match( searchString );
        });
      }
      return(
        <div>
          <input
            type="text"
            value={this.state.searchString}
            onChange={this.handleChange}
            placeholder="Enter a name!" />

          <ul>
            {
              libraries.map( function (l, idx) {
                return <li key={idx} onClick={that.handleClick.bind(that, l)}> {l} </li>

            })

            }

          </ul>
        </div>
      )

  }

});
