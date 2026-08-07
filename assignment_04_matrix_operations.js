// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

const readlineSync = require("readline-sync");

// -----------------------------------------------------------------------------
// readMatrix: prompts for rows/columns and each row of values, returns 2D array
// -----------------------------------------------------------------------------
function readMatrix(label) {
  console.log(`\n${label}`);
  const rows = readlineSync.questionInt("Enter number of rows: ");
  const cols = readlineSync.questionInt("Enter number of columns: ");

  const matrix = [];
  for (let i = 0; i < rows; i++) {
    const line = readlineSync.question(`Enter row ${i + 1}: `);
    const row = line.trim().split(/\s+/).map(Number);
    matrix.push(row);
  }
  return matrix;
}

// -----------------------------------------------------------------------------
// printMatrix: displays a matrix in an aligned grid
// -----------------------------------------------------------------------------
function printMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    let rowStr = "";
    for (let j = 0; j < matrix[i].length; j++) {
      rowStr += String(matrix[i][j]).padStart(5);
    }
    console.log(rowStr);
  }
}

// -----------------------------------------------------------------------------
// transpose: swaps rows and columns of a matrix
// -----------------------------------------------------------------------------
function transpose(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }
  return result;
}

// -----------------------------------------------------------------------------
// addMatrices: element-wise sum of two same-sized matrices
// -----------------------------------------------------------------------------
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }
  return result;
}

// -----------------------------------------------------------------------------
// multiplyMatrices: standard matrix product A (MxN) x B (NxP) = result (MxP)
// -----------------------------------------------------------------------------
function multiplyMatrices(a, b) {
  const m = a.length;
  const n = a[0].length;
  const p = b[0].length;
  const result = [];

  for (let i = 0; i < m; i++) {
    const newRow = [];
    for (let j = 0; j < p; j++) {
      let sum = 0;
      for (let k = 0; k < n; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }
  return result;
}

// -----------------------------------------------------------------------------
// main: lets the user pick an operation, gathers input, prints the result
// -----------------------------------------------------------------------------
function main() {
  console.log("Matrix Operations");
  console.log("1. Transpose a matrix");
  console.log("2. Add two matrices");
  console.log("3. Multiply two matrices");
  const choice = readlineSync.questionInt("\nChoose an operation (1-3): ");

  if (choice === 1) {
    const matrix = readMatrix("Matrix A");
    console.log("\nOriginal Matrix:");
    printMatrix(matrix);
    console.log("\nTransposed Matrix:");
    printMatrix(transpose(matrix));
  } else if (choice === 2) {
    const a = readMatrix("Matrix A");
    const b = readMatrix("Matrix B (must match size of Matrix A)");

    if (a.length !== b.length || a[0].length !== b[0].length) {
      console.log("\nError: Matrices must be the same size to add.");
      return;
    }

    console.log("\nSum:");
    printMatrix(addMatrices(a, b));
  } else if (choice === 3) {
    const a = readMatrix("Matrix A (M x N)");
    const b = readMatrix("Matrix B (N x P)");

    if (a[0].length !== b.length) {
      console.log(
        "\nError: Number of columns in A must equal number of rows in B.",
      );
      return;
    }

    console.log("\nProduct:");
    printMatrix(multiplyMatrices(a, b));
  } else {
    console.log("Error: Invalid choice. Please select 1, 2, or 3.");
  }
}

main();
