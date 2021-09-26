import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { List } from './ListComponent/index.tsx'
import TestContextBlock from './test/testContext'
function calculateWinner (squares) {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [0, 4, 8],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < winnerLines.length; i++){
        let [a, b, c] = winnerLines[i]
        if((squares[a] === squares[b]) && (squares[b] === squares[c])){
            return squares[a]
        }
    }
    return null
}


function Square (props) {
    return (
        <button className="square" onClick={ props.onClick }>
            {props.value}
        </button>
    )
}

class Board extends React.Component {

    renderSquare(i) {
        return (
        <Square 
            value={ this.props.squares[i] }
            onClick={ () => {this.props.onClick(i)} }
        />
        )
    }

    render() {
        return (
        <div>
            <h1>main app</h1>
            <hr />
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
            <h1>demo1</h1>
            <hr />
            <List items={[1, 2, 3]} render={item => String(item) + '-'}></List>
            <h1>test context block demo</h1>
            <hr />
            <TestContextBlock />
        </div>
        );
    }
}

class Game extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            xIsNext: true,
            history: [{
                squares: Array(9).fill(null),
            }]
        }
    }


    getText () {
        return this.state.xIsNext ? 'x' : 'o'
    }

    handleClick (i) {
        const history = this.state.history
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        if(squares[i] || this.state.result){
            return
        }
        squares[i] = this.getText()
        let result = calculateWinner(squares)        
        this.setState({
            history: history.concat([{
                squares
            }]),
            xIsNext: !this.state.xIsNext,
            result
        })
    }

    jumpTo (index) {
        const history = this.state.history  
        const backHistory = history.slice(0, index + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()
        let result = calculateWinner(squares)                
        this.setState({
            history: backHistory,
            result
        })
    }

    render() {
        let status
        const history = this.state.history
        const current = history[history.length - 1]
        if(this.state.result) {
            status = `Winner is player: ${ this.state.result }`
        }
        else {
            status = `Next player: ${ this.getText() }`
        }

        const move = history.map((step, index) => {
            const desc = index ? `move to #${index}` : 'Go to game start'
            return (
                <li key={ index }>
                    <button  onClick={() => { this.jumpTo(index) }}>
                        { desc }
                    </button>
                </li>
            )
        })

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={ current.squares } onClick={ (i) => { this.handleClick(i) } } />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    <ol>{ move }</ol>
                </div>
            </div>
        )
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
