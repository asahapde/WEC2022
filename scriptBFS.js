// Test
let grid = [
    ['o', '*', 'b', 's'],
    ['*', '*', '*', '*'],
    ['*', 'o', '*', 'b'],
    ['e', '*', '*', 'o']
  ];
  /*let grid = [
    ['o', '*', 'o', 's'],
    ['*', 'o', '*', '*'],
    ['o', '*', '*', '*'],
    ['e', '*', '*', '*']
  ];*/
  
  
  // Save locations
  let start = [];
  let stop = [];
  let end = [];
  let path = [];
  
  
  // Structure to store the nodes
  class node {
    constructor(i, j, d) {
      this.row = i;
      this.col = j;
      this.distance = d;
    }
  }
  
  // function to calculate shortest path
  function shortestPath(matrix) {
    let rows = matrix.length;
    let columns = matrix[0].length;
    let visited = Array.from(Array(rows), () => Array(columns).fill(0));
  
    // Find out the start, end and stops
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (matrix[i][j] == 's') {
          start[0] = i;
          start[1] = j;
        }
        if (matrix[i][j] == 'e') {
          end[0] = i;
          end[1] = j;
        }
        if (matrix[i][j] == 'b') {
          stop.push(i);
          stop.push(j);
        }
        if (matrix[i][j] == 'o') {
          visited[i][j] = true;
        }
      }
    }
  
    // Create starting node
    let n = new node(0, 0, 0);
    n.row = start[0]
    n.col = start[1]
  
    // Perform breadth first search
    let queue = [];
    queue.push(n);
    visited[n.row][n.col] = true;
  
    while (queue.length != 0) {
  
      let curr = queue[0];
      //path.push([curr.row, curr.col]);
      queue.shift();
  
      // Reached endpoint
      if (matrix[curr.row][curr.col] == 'e') {
        return curr.distance;
      }
  
  
      // Moving the path up
      if (curr.row - 1 >= 0 && !visited[curr.row - 1][curr.col]) {
        queue.push(new node(curr.row - 1, curr.col, curr.distance + 1));
        visited[curr.row - 1][curr.col] = true;
  
      }
  
      // Moving the path down
      if (curr.row + 1 < rows && !visited[curr.row + 1][curr.col]) {
        queue.push(new node(curr.row + 1, curr.col, curr.distance + 1));
        visited[curr.row + 1][curr.col] = true;
  
      }
  
      // Moving the path left
      if (curr.col - 1 >= 0 && !visited[curr.row][curr.col - 1]) {
        queue.push(new node(curr.row, curr.col - 1, curr.distance + 1));
        visited[curr.row][curr.col - 1] = true;
  
      }
  
      // Moving the path right
      if (curr.col + 1 < columns && !visited[curr.row][curr.col + 1]) {
        queue.push(new node(curr.row, curr.col + 1, curr.distance + 1));
  
      }
    }
    
    return -1;
  
  }
  
  
  console.log(shortestPath(grid))
  console.log(path)
  