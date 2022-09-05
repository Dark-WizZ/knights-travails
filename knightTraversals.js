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

class Position{
  constructor(pos){
    this.pos = pos;
    this.nextPos = [];
  }

  genNextPos(arr){
    this.nextPos = arr.map(p => new Position(p));
  }
}

class MovesMap{
  constructor(pos){
    this.root = pos;
  }
}

class AI{
  constructor(knight, board){
    this.board = board;
    this.knight = knight;
    this.cnt = 0;
  }

  calcMoves(from, to){
    const pos = new Position(from);
    const movesMap = new MovesMap(pos);
    const res = this.calcMovesRecurse(movesMap.root, to);
  }

  calcMovesRecurse(root, to){
    this.cnt++;
    if(!root || root.pos.join()==to.join() ) return 0;
    root.genNextPos(knight.possibleMove(root.pos))
    // console.log(this.board)
    let res;
    for(let p of root.nextPos){
      console.log(p.pos);
      this.board[root.pos[0]][root.pos[1]] = 1;
      res = this.calcMovesRecurse(p, to) + 1;
      this.board[root.pos[0]][root.pos[1]] = 0;
      return res;
    }
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
const position = new Position([2,3]);
position.genNextPos(knight.possibleMove(position.pos))

ai.calcMoves([1,1],[1,7])