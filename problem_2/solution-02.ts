// 각 셀의 좌표를 나타내는 자료구조 타입
type Grid = number[][];

const directions = [
  [-1, 0], // 12시
  [0, 1], // 3시
  [1, 0], // 6시
  [0, -1], // 9시
  [-1, 1], // 우상단
  [1, 1], // 우하단
  [1, -1], // 좌하단
  [-1, -1], // 좌상단
];

const getNumberOfIsland = (grid: Grid): number => {
  if (grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  let numberOfIsland: number = 0;

  const rows = grid.length;
  const cols = grid[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 1) {
        grid[row][col] = 0;
        numberOfIsland++;
        markLand(grid, row, col);
      }
    }
  }

  return numberOfIsland;
};

function markLand(grid: Grid, startRow: number, startCol: number): void {
  const stack: [number, number][] = [[startRow, startCol]];

  while (stack.length > 0) {
    const [row, col] = stack.pop();

    for (const [y, x] of directions) {
      const nextRow = row + y;
      const nextCol = col + x;

      if (isValidCell(grid, nextRow, nextCol) && grid[nextRow][nextCol] === 1) {
        grid[nextRow][nextCol] = 0;
        stack.push([nextRow, nextCol]);
      }
    }
  }
}

function isValidCell(grid: Grid, row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < grid.length && col < grid[0].length;
}

const grid: Grid = [
  [1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0],
  [1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0],
];

console.log(getNumberOfIsland(grid));
