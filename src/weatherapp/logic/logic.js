// import { FIELD_VALUES, PLAYERS } from "./const";
// import { range } from "./utils";

// export const generateBoard = (boardSize) => {
//   const sizeRange = range(boardSize);

//   return sizeRange.map(() => sizeRange.map(() => FIELD_VALUES.EMPTY));
// };

// export const calculateWinner = (board, boardSize) =>
//   generateWinningLines(boardSize).reduce((currentWinner, line) => {
//     const firstElement = board[line[0].y][line[0].x];

//     if (firstElement === FIELD_VALUES.EMPTY) {
//       return currentWinner;
//     }

//     const isLineConsistent = line.reduce(
//       (allEqual, { x, y }) => allEqual && board[y][x] == firstElement,
//       true
//     );

//     return isLineConsistent ? firstElement : currentWinner;
//   }, PLAYERS.UNKNOWN);

// const generateWinningLines = (boardSize) => {
//   const winningLineRange = range(boardSize);

//   const winningLines = winningLineRange
//     .map((i) => [
//       winningLineRange.map((j) => ({ x: i, y: j })),
//       winningLineRange.map((j) => ({ x: j, y: i })),
//     ])
//     .flat();
//   winningLines.push(winningLineRange.map((i) => ({ x: i, y: i })));
//   winningLines.push(
//     winningLineRange.map((i) => ({ x: i, y: boardSize - 1 - i }))
//   );

//   return winningLines;
// };
