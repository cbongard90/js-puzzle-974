// todo
const button = document.getElementById('show-hint');

button.addEventListener('click', (event) => {
  document.querySelector(".hint").classList.toggle("active")
});


// Select all tiles
const tiles = document.querySelectorAll('tbody tr td');
console.log(tiles);

const canTileMove = (tile) => {
  const emptyTile = document.querySelector('.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;

  const tileRow = tile.parentElement.rowIndex
  const tileColumn = tile.cellIndex;
  // console.log(`Current Tile:row ${tileRow}, column${tileColumn}`);
  // console.log(`Empty Tile: row${emptyTileRow}, column${emptyTileColumn}`);

  return (
    // 1st scenario: tile is above empty tile
    (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1)
  // 2nd scenario: tile is below empty tile
    || (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1)
    // 3rd scenario: tile is on the right empty tile
    || (tileColumn === emptyTileColumn + 1 && tileRow === emptyTileRow)
    // 4th scenario: tile is on the left empty tile
    || (tileColumn === emptyTileColumn - 1 && tileRow === emptyTileRow)
    );
};

const moveTile = (tile) => {
  // Select the Empty Tile
  const emptyTile = document.querySelector('.empty');

  emptyTile.innerHTML = tile.innerHTML;
  tile.innerHTML = '';
  emptyTile.classList.remove('empty');
  tile.classList.add('empty');

}

// Check if the player has won
const checkIfPlayerWins = () => {
  const tilesOrder = Array.from(document.querySelectorAll('td')).map(
    tile => Number.parseInt(tile.innerHTML, 10)
  )
  if (tilesOrder.join() === "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN") {
    alert("Congratulations! You win!")
  }
}

// For each tile
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    // Checking if we can move the tile or not
    if (canTileMove(tile)) {
      moveTile(tile);
      setTimeout(() => {
        checkIfPlayerWins();
      }, 500);
    }
  })
})
