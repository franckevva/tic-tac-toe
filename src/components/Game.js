import React from 'react';
import Board from './Board';

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
        const [a, b, c] = lines[i];
        if (squares[a] !== undefined && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {winner: squares[a], winnerRow: lines[i]};
        }
    }

    return {winner: null, winnerRow: null};
};

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getClearBoard();
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares).winner !== null || squares[i] !== undefined) {
            return;
        }
        squares[i] = this.state.xIsNext ? 1 : 0;
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    returnToStart() {
        this.setState(this.getClearBoard());
    }

    getClearBoard() {
        return {
            squares: Array(9).fill(undefined),
            xIsNext: true,
            currentStep: 0,
        }
    }

    render() {
        const {squares} = this.state;
        const {winner, winnerRow} = calculateWinner(squares);

        let status, finished;
        if (winner !== null) {
            status = `Winner ${winner ? 'X' : 'O'}`;
            finished = true;
        } else if (squares.filter(x => x === undefined).length === 0) {
            status = 'Draw. No one won.';
            finished = true;
        } else {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        }

        return (
            <div className="game">
                <div className="board">
                    <Board
                        squares={squares}
                        winnerSquares={winnerRow}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="info">
                    <div>{status}</div>
                    <button className={`button ${finished ? 'button--green' : ''}`} onClick={() => this.returnToStart()}>
                        {`Restart game`}
                    </button>
                </div>
            </div>
        );
    }
}

export default Game;