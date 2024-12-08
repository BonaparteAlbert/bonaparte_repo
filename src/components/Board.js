import React, { Component } from 'react'
import Square from './Square';


var cols = 10;
var rows = 10;
var array = Array(rows * cols).fill(0).map((val, idx) => (val = idx + 1));
var secondId = -Infinity;
var firstId = -Infinity;


export default class Board extends Component {
    static propTypes = {

    }

    highlightSquares = i => {
        // if(squares.indexof(i) > 0){
        return "square";
        // }
    }

    shuffleArray(n) {
        for (let i = 0; i < n; i++) {
            let temp = array[i];
            let idx = Math.floor(Math.random() * n);
            array[i] = array[idx];
            array[idx] = temp;
        }
        return array;
    }

    clickHandle = event => {
        let id = event.target.id;
        firstId = secondId;
        secondId = id;
        if (this.isMovable(firstId, secondId)) {
            this.move(firstId, secondId);
            firstId = secondId = -Infinity;
        }
    }

    isMovable = (id1, id2) => {
        let x1, y1, x2, y2;
        x1 = id1 % cols;
        y1 = Math.ceil(id1 / cols);
        x2 = id2 % cols;
        y2 = Math.ceil(id2 / cols);

        if (x1 == x2) {
            if ((y1 - y2) * (y1 - y2) == 1) return true;
            else return false;
        }
        else if (y1 == y2) {
            if ((x1 - x2) * (x1 - x2) == 1) return true;
            else return false;
        }
        else {
            return false;
        }
    }

    move = (id1, id2) => {
        var square1 = document.getElementById(id1);
        var square2 = document.getElementById(id2);
        const rect1 = square1.getBoundingClientRect();
        const rect2 = square2.getBoundingClientRect();

        // Calculate the translation distances
        const deltaX = rect2.left - rect1.left;
        const deltaY = rect2.top - rect1.top;

        // Apply transformations
        square1.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        square2.style.transform = `translate(${-deltaX}px, ${-deltaY}px)`;

        // setTimeout(() => {
        //     const parent = square1.parentNode;
        //     let temp = square1;
        //     parent.replaceChild(square1, square2);
        //     parent.replaceChild(square2, temp);
        //     // square1.style.transform = '';
        //     // square2.style.transform = '';
        // }, 500);
        // square1.style.transform = '';
        // square1 = document.getElementById(id2);
        // square2 = document.getElementById(id1);
        setTimeout(() => {
            let temp = square1.id;
            square1.id = square2.id;
            square2.id = temp;
            // square1.style.transform = '';
            // square2.style.transform = '';
        }, 500);
        // // square1.style.transform = '';
        // // square1 = document.getElementById(id2);
        // // square2 = document.getElementById(id1);

    }

    renderSquare(id, value) {
        let highlight = this.highlightSquares(id);
        return (
            <Square
                class={highlight}
                value={value}
                id={id}
                onClickHandle={this.clickHandle}
            />
        )
    }

    generateRow(index, nc) {
        let squares = [];
        for (let j = 0; j < nc; j++) {
            let idx = index * cols + j;
            squares.push(this.renderSquare(idx, array.shift()));
        }
        return squares;
    }
    generateBoard(nr, nc) {
        let board = [];
        this.shuffleArray(100);
        for (let i = 0; i < nr; i++) {
            board.push(
                <div className='row'>
                    {this.generateRow(i, nc)}
                </div >
            );
        }

        return board;
    }

    render() {
        return (

            <div align='center'>
                <h2>Welcome to learn React!</h2>
                <div className='row'>{this.generateBoard(rows, cols)}</div>
            </div>
        );
    }
}