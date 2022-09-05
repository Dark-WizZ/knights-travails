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

class Vertex{
  constructor(from, to){
    this.from = from;
    this.to = to;
  }
}

class Knight{
  constructor(board){
    this.board = board;
    this.waySheet = [];
    this.genWaySheet();
  }

  bestMove(from, to){
    from = this.switchDim(from);
    to = this.switchDim(to);
    if(from == to) return this.switchDim(from);
    let path = new Array(64);
    let q = [];
    this.waySheet[from].forEach(m => {
      q.push(new Vertex(from, m))
    })
    while(q.length){
      if(path[to]!=null){
        let res=[];
        let index = to;
        res.push(this.switchDim(to));
        while(path[index]){
          res.push(this.switchDim(path[index]));
          index = path[index];
          if(index == from){
            res = res.reverse();
            console.log(`You made it in ${res.length} moves!
            Here's your path:`)
            res.forEach(r => console.log(r));
            return;
          };
        }
      }
      let v = q.shift();
      if(!path[v.to] && path[v.from]!=v.to){
        path[v.to] = v.from;
        this.waySheet[v.to].forEach(m => {
          q.push(new Vertex(v.to, m))
        })
      }
    }
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

  genWaySheet(){
    for(let i=0; i<8; i++){
      for(let j=0; j<8; j++){
        let temp= [];
        this.possibleMove([i,j]).forEach( m => {
          temp.push(this.switchDim(m));
        })
        this.waySheet.push(temp);
      }
    }
  }
  
  switchDim(arg){
    if(typeof arg == 'number'){
      return [Math.floor(arg/8), arg % 8];
    }else{
      return (arg[0]*8)+arg[1];
    }
  }
}

const board = new GameBoard();
const knight = new Knight(board.board);

knight.bestMove([3,3],[4,3]);