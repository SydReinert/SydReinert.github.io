document.addEventListener('DOMContentLoaded',() => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 //first div in grid
    let appleIndex = 0 //first div in grid
    let currentSnek = [2,1,0]
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    //start and restart
    function startGame(){
        currentSnek.forEach(index => squares[index].classList.remove('snek'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innterText = score
        intervalTime = 1000
        currentSnek = [2,1,0]
        currentIndex = 0
        currentSnek.forEach(index => squares[index].classList.add('snek'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

//function that deals with all the outcomes of the Snek
function moveOutcomes(){

    //snake hitting border and hitting self
    if (
        (currentSnek[0] + width >= (width * width) && direction === width) || //hits bottoms
        (currentSnek[0] % width === width -1 && direction ===1) || //hits right 
        (currentSnek[0] % width === 0 && direction === -1) || //hits left
        (currentSnek[0] - width < 0 && direction === -width) || //hits top
        squares[currentSnek[0] + direction].classList.contains('snek') //hits itself
    )
    {
        return clearInterval(interval) //clears interval if lost
    }
    const tail = currentSnek.pop()//remoes last item of the array and shows it
    squares[tail].classList.remove('snek')//removes class of snake from the tail
    currentSnek.unshift(currentSnek[0] + direction)//gives direction to the head of the array

    //deals with getting the apple
    if(squares[currentSnek[0]].classList.contains('apple')){
        squares[currentSnek[0]].classList.remove('apple')
        squares[tail].classList.add('snek')
        currentSnek.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
    }
    squares[currentSnek[0]].classList.add('snek')
}

//generate new apple once previouse is eaten
function randomApple() {
    do{
        appleIndex = Math.floor(Math.random() * squares.length)
    }
    while(squares[appleIndex].classList.contains('snek'))//makes sure apple dont appear on the sneeeek
    squares[appleIndex].classList.add('apple')
}

//assign functions to le keyboard
function control(e){
    squares[currentIndex].classList.remove('snek')

    if(e.keyCode === 39){
        direction = 1 //press the right arrow snek will go over one
    }
    else if (e.keyCode === 38){
        direction = -width //press the up arrow snek will go back 10 divs appearing to go up
    }
    else if (e.keyCode === 37){
        direction = -1 //press left arrow snek will go left
    }
    else if (e.keyCode === 40){
        direction = +width //press down arrow 
    }
}

document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)
})