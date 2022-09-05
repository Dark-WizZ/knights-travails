class GameBoard{
  constructor(){
    this.board = [];
    this.generateBoard();
  }

  generateBoard(){
    for(let i=0; i<8; i++){
      this.board[i] = new Array(8).fill(0);
    }
  }
}

class Node{
  constructor(value){
    this.value = value;
    this.children = [];
  }
}

class Tree{
  constructor(node){
    this.root = node;
  }
}

class AI{
  constructor(knight, board){
    this.board = board;
    this.knight = knight;
  }

  calcMoves(from, to){

  }
}

class Knight{
  constructor(board){
    this.board = board;
  }
  possibleMove(from){
    let moves = [];
    let a = from[0], b = from[1];
    let x = 1, y=2;
    for(let i=0; i<2; i++){
      moves.push([a+x,b+y],[a-x,b+y],[a+y,b-x],[a-x,b-y]);
      let temp = x; x=y; y=temp;
    }
    return moves.filter(m => {
      try{
        let board = this.board[m[0]][m[1]]
        return !board && board != undefined;
      }catch{
        return false;
      };
    });
  }
}

const board = new GameBoard();
const knight = new Knight(board.board);
const ai = new AI(knight, board.board);

console.log(knight.possibleMove([6,4]))
