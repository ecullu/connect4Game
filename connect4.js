var Game = function(rows, columns) {
    let board = []
    this.gameOverState = false
    this.gameBoard = board
    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let j = 0; j < columns; j++) {
            board[i][j] = undefined
        }
    }
    
    this.showGameBoard = function (){
        board.forEach(function(arr){
            log(arr)
        })
    }
    
    this.gameOver = function() {
        let gameOver = false
        // PART A: implementing a winning state
        // Creates all possible sub arrays that can have 4 indexes and filters 
        // each array if it contains either 4 yellow or 4 red disc connected.
        // This function runs for both vertical, horizontal and diagonal variations
        this.checkConnect4 = function(arr) {
            for (let i = 0; i < arr.length; i++) {
                for (let k = 0; k < 4; k++) {
                    let stateArr = []
                    for (let j = k; j < (4 + k); j++) {
                        stateArr.push(arr[i][j])
                    }
                    let winStateYellow = stateArr.filter(function(color) {
                        return color === 'yellow'
                    }).length
                    let winStateRed = stateArr.filter(function(color) {
                        return color === 'red'
                    }).length

                    if (winStateYellow === 4 || winStateRed === 4 && !this.gameOverState) {
                        this.showGameBoard()
                        log('*** Game Over ***')
                        this.gameOverState = true
                    }
                }
            }
        }
        //generates a new vertical array 
        this.genVerticalArr = function() {
            let verticalArr = []
            let tempArr = []
            for (let i = 0; i < 7; i++) {
                board.forEach(function(row) {
                    tempArr.push(row[i])
                })
                verticalArr.push(tempArr)
                tempArr = []
            }
            return verticalArr
        }

        //creates an array from all possible diagonal arrays where the array length 
        //is greater than or equal to 4. (ignores diagonal arrays if their length is less than 4)  
        this.genDiagonalArr = function() {
                let diagonalArr = []
                let tempArr = []
                let rowIndex = 3
                //top row to bottom row'/'
                for (let j = 0; j < 3; j++) {
                    rowIndex = 3 + j
                    let rowNo = 0
                    while (rowIndex >= 0) {
                        tempArr.push(board[rowNo][rowIndex])
                        rowIndex--
                        rowNo++
                    }
                    diagonalArr.push(tempArr)
                    tempArr = []
                }
                //bottom row to top row '\' 
                for (let j = 0; j < 3; j++) {
                    rowIndex = 3 + j
                    let rowNo = 5
                    while (rowIndex >= 0) {
                        tempArr.push(board[rowNo][rowIndex])
                        rowIndex--
                        rowNo--
                    }
                    diagonalArr.push(tempArr)
                    tempArr = []
                }
                //top row to bottom row'\'
                for (let j = 0; j < 3; j++) {
                    rowIndex = 3 - j
                    let rowNo = 0
                    while (rowIndex <= 6) {
                        tempArr.push(board[rowNo][rowIndex])
                        rowIndex++
                        rowNo++
                    }
                    diagonalArr.push(tempArr)
                    tempArr = []
                }
                //bottom row to top row '/'
                for (let j = 0; j < 3; j++) {
                    rowIndex = 3 - j
                    let rowNo = 5
                    while (rowIndex >= 0) {
                        tempArr.push(board[rowNo][rowIndex])
                        rowIndex--
                        rowNo--
                    }
                    diagonalArr.push(tempArr)
                    tempArr = []
                }
                return diagonalArr
            }
            //checks if 4 same color discs are connected after each play 
            this.checkConnect4(board) //checks default array (horizontal)
            this.checkConnect4(this.genVerticalArr()) //checks vertical array variations
            this.checkConnect4(this.genDiagonalArr()) //checks diagonal array variations
    }
}

var Player = function(game, color) {
    this.game = game
    this.color = color
    //PART B: implementing a legal move
    // This function checks if there is already a disc in the last row of the column. 
    // If column is empty it places the next disc at the bottom. If there is already 
    // a disc at the bottom, it places the disc into the upper row.
    this.dropDisc = function(column) { 
        if (!game.gameOverState && column <= 6) {
            this.column = column
            for (let i = (game.gameBoard.length - 1); i >= 0; i--) {
                if (game.gameBoard[i][column] === undefined) {
                    game.gameBoard[i][column] = this.color
                    break
                }
            }
            game.gameOver()
        }
        if (column > 6 || column < 0){
            log('Invalid column no, column must be between 0 and 6')
        }

    }
}
var connect4 = new Game(6, 7)
var player1 = new Player(connect4, 'yellow')
var player2 = new Player(connect4, 'red')


player1.dropDisc(0)
player1.dropDisc(0)
player1.dropDisc(0)
player1.dropDisc(0)

player1.dropDisc(1)
player1.dropDisc(2)
player1.dropDisc(3)
player1.dropDisc(4)
