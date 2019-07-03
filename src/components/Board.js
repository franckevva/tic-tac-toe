import React from 'react';
import PropTypes from 'prop-types';
import Square from './Square';

class Board extends React.Component {
    static propTypes = {
        winnerSquares: PropTypes.array,
        onClick: PropTypes.func.isRequired,
    };

    createBoard(row, col) {
        const board = [];
        let cellCounter = 0;

        for (let i = 0; i < row; i += 1) {
            const columns = [];
            for (let j = 0; j < col; j += 1) {
                columns.push(this.renderSquare(cellCounter++));
            }
            board.push(<div key={`row-${i}`} className="board-row">{columns}</div>);
        }

        return board;
    }

    renderSquare(i) {
        const winnerSquares = this.props.winnerSquares;
        const winnerClass = winnerSquares && winnerSquares.filter(item => item === i).length
            ? 'square--win' : '';

        return (
            <Square
                winnerClass={winnerClass}
                key={`cell-${i}`}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return <div>{this.createBoard(3, 3)}</div>;
    }
}

export default Board;