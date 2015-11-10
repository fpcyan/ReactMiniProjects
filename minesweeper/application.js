var Game = React.createClass({
  getInitialState: function () {
    return {
      board: new Minesweeper.Board(10, 10), gameover: false, gamewon: false
    };

  },
  updateGame: function (tile, flagging) {
    var gameover = false,
      gamewon = false;

    flagging ? tile.toggleFlag() : tile.explore()
    if (this.state.board.won() || this.state.board.lost()) {
      gameover = true;
      gamewon = this.state.board.won();
      }

    this.setState({ gameover: gameover, gamewon: gamewon });
  },
  handleClick: function (event) {
    if (this.state.gameover) {
      event.preventDefault();
      this.restartGame();
    }
  },
  restartGame: function () {
    this.setState({ board: new Minesweeper.Board(10, 10), gameover: false, gamewon: false });
  },
  render: function () {
    var active, gameEnd;
    if (this.state.gameover) {
      active = "active";
      gameEnd = (this.state.gamewon) ? "You won!" : "You lost!";
    } else {
      active = "inactive";
      gameEnd = "no";
    }
    return(
      <div>
        <section id="modal" className={active}>
          <article id="modal-content" className={active}>
            <span className="modal-close js-hide-modal">
              <h2>{gameEnd}</h2>
              <p onClick={this.handleClick}>Play again?</p>
            </span>
          </article>
          <div className="modal-screen js-hide-modal" onClick={this.handleClick}></div>
        </section>

        <Board board={this.state.board} update={this.updateGame} />
      </div>
    )
  }
});

var Board = React.createClass({
  render: function () {
    var that = this;
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
    var tileState = "tile ";
    var dataBombs = null;
    if (tile.explored) {

      if (tile.bombed) {
        tileState += "bombed";
      } else if (tile.adjacentBombCount() > 0) {
        dataBombs = tile.adjacentBombCount();
        tileState += "revealed adj-bombs";
      } else {
        tileState += "revealed";
      }

    } else {

      if (tile.flagged) {
        tileState += "flagged";
      } else {
        tileState += "unrevealed";
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
