var Game = React.createClass({
  getInitialState: function () {
    return {
      board: new Minesweeper.Board(10, 10), gameover: false, gamewon: false
    }

  },
  updateGame: function (tile, flagging) {
    var gameover = false,
      gamewon = false

    flagging ? tile.toggleFlag() : tile.explore()
    if (this.state.board.won || this.state.board.lost) {
      gameover = true
      gamewon = this.state.board.won()
    }

    this.setState({ gameover: gameover, gamewon: gamewon })
  },
  render: function () {
    return(
      <Board board={this.state.board} update={this.updateGame} />
    )
  }
});

var Board = React.createClass({
  render: function () {
    var that = this
    var rows = this.props.board.grid.map( function (row, rowNum) {
      return(
        <div className="row group" key={rowNum}>
          {row.map( function (tile, tileIdx) {
            return <Tile square={tile} update={that.props.update} key={[rowNum, tileIdx]} />
          })}
        </div>
      )
    })
    return(
      <div className="game-board">
        {rows}
      </div>
    )
  }
})

var Tile = React.createClass({
  handleClick: function (event) {
    event.preventDefault();

    var flagging = (event.button === 2) ? true : false
    this.props.update(this.props.square, flagging)
  },
  render: function () {
    var tile = this.props.square;
    var tileState = "tile "
    var dataBombs = null
    if (tile.explored) {

      if (tile.bombed) {
        tileState += "bombed"
      } else {
        tileState += (tile.adjacentBombCount > 0) ? "revealed adj-bombs" : "revealed";
        dataBombs = tile.adjacentBombCount();
      }

    } else {

      if (tile.flagged) {
        tileState += "flagged";
      } else {
        tileState += "unrevealed"
      }

    }
    return(
      <div data-bombs={dataBombs} onClick={this.handleClick} onContextMenu={this.handleClick} className={tileState}></div>
    )
  }
});














React.render(
  <Game />,
  document.getElementById("game")
);
