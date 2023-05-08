//1. deposit some money
//2. determine number of lines to bet
//3. collect the bet amount
//4. spin the machine
//5. check if the user won
//6. if the user won, add the winnings to the balance
//7. if the user lost, subtract the bet amount from the balance
//8. display the results to the user
//9. ask the user if they want to play again
//10. if the user wants to play again, go to step 1
//11. if the user doesn't want to play again, exit the program
//12. To be continued: ADD GUI..!

const prompt = require('prompt-sync')();

// global variables
const ROWS = 4;
const COLS = 4;

const SYMBOLS_COUNT = {"$":7, "#":5, "@":9, "%":6, "&":8};

//multiply the number of symbols by their values to get the total number of symbols
const SYMBOLS_VALUES = {"$":3, "#":4, "@":1, "%":2, "&":5};
//step 1
//es6 style
const depositMoney = () => {
    while (true)
    {const deposit = prompt("How much money would you like to deposit? ");
    const depositNum = parseFloat(deposit);
    if (isNaN(depositNum) || depositNum<=0) {
        console.log("Invalid input. Please enter a number greater than 0.");  
    }
    else {
        console.log(`You have deposited $${depositNum}.`);
        return depositNum;
    }
    }
};


// step 2
const betLines = () => {
  while (true)
    {
    const lines = prompt("How many lines would you like to bet? (1-4) ");
    const linesNum = parseInt(lines);
    if (isNaN(linesNum) || linesNum<=0 || linesNum>4) {
        console.log("Invalid input. Please enter a number between 1 and 4.");   
        betLines();
    }
    else {
        console.log(`You have bet ${linesNum} lines.`);
        return linesNum;
    }
  }
};

// step 3
const betAmount = (balance,linesNum) => {
    while (true)
    {
    const bet = prompt("How much would you like to bet per line? ");
    const betNum = parseFloat(bet);
    //the bet is distributed evenly among the number of lines
    if (isNaN(betNum) || betNum<=0 || betNum>(balance/linesNum)) {
        console.log("Invalid bet amount. Please try again!");   
    }
    else {
        console.log(`You have bet $${betNum}.`);
        return betNum;
    }
  }
};


// step 4

const spin = () => {
    //generate an array of available symbols
    const symbols = [];
    //loop through the enteries of the object as symbols and count to add them to the array
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i=0; i<count; i++) {
            symbols.push(symbol);
        }
    }
    //the temporary array as a grid
    const grid = [];
    //loop through the grid and add a random symbol to each cell
    for (let i=0; i<ROWS; i++) {
        grid.push([]);
        const gridSymbols = [...symbols];
        for (let j=0; j<COLS; j++) {
            const randomIndex = Math.floor(Math.random()*symbols.length);
            // grid[i][j] = symbols[randomIndex];
            grid[i].push(symbols[randomIndex]);
            gridSymbols.splice(randomIndex, 1);
        }
    }
    return grid;
}



// transposing the grid
const transpose = (grid) => {
    const newGrid = [];
    for (let i=0; i<COLS; i++) {
        newGrid.push([]);
        for (let j=0; j<ROWS; j++) {
            newGrid[i].push(grid[j][i]);
        }
    }
    return newGrid;
};

const printNewGrid = (newGrid) => {
    for (const row of newGrid) {
        let rowString = "";
        for (const [i,symbol] of row.entries()) {
            rowString += symbol
            if (i<row.length-1) {
                rowString += " | "
            }
        }
        console.log(rowString)
    }
};

// step 5 & 6
const winning = (newGrid,bet,lines) => {
    let winnings = 0;
    //check for winning lines
    for (let row=0; row<lines; row++) {
        const symbols = newGrid[row];
        let all_same = true;
        for (let i=0; i<symbols.length-1; i++) {
            if (symbols[i] != symbols[i+1]) {
                all_same = false;
                break;
            }
        }
        if (all_same) {
            winnings += SYMBOLS_VALUES[symbols[0]]*bet;
        }
    }
    return winnings;
}


// steps 7 to 11
const gameLoop = () => {
    //we chose let so that we can change the value of balance later
    let balance=depositMoney();
    while(true){
        console.log(`Your balance is $${balance}.`);
        const linesNum=betLines();
        const betNum=betAmount(balance,linesNum);
        balance-=betNum*linesNum;
        const newGrid=spin();
        printNewGrid(newGrid);
        const winnings=winning(newGrid,betNum,linesNum);
        balance+=winnings;
        console.log(`You have won $${winnings}.`);
        
        if (balance<=0) {
            console.log("You have no more money to play with.");
            break;
        }
        const playAgain=prompt("Would you like to play again? (y/n) ");
        if (playAgain=="n") {
            console.log(`You have $${balance} left.`);
            break;
        }}
}

gameLoop();

