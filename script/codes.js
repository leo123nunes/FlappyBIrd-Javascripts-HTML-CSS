
// function to create a new bar

var createNewBar = function (gameArea) {

    var newBarContent = document.createElement('div')
    newBarContent.classList.add('barContent')

    var top = document.createElement('div')
    top.classList.add('top')

    var newBarTop = document.createElement('div')
    newBarTop.classList.add('barTop')

    var newBarTopTip = document.createElement('div')
    newBarTopTip.classList.add('barTopTip')

    var heightTop = Math.random() * 150 + 'px'

    newBarTop.style.height = heightTop

    top.appendChild(newBarTop)
    top.appendChild(newBarTopTip)

    var bottom = document.createElement('bottom')
    bottom.classList.add('bottom')

    var newBarBottom = document.createElement('div')
    newBarBottom.classList.add('barBottom')

    var newBarBottomTip = document.createElement('div')
    newBarBottomTip.classList.add('barBottomTip')

    var heightBottom = 300 - heightTop.replace('px', '') - 160

    heightBottom > 0 ? newBarBottom.style.height = heightBottom + 'px' : newBarBottom.style.height = '0px'

    bottom.appendChild(newBarBottomTip)
    bottom.appendChild(newBarBottom)

    newBarContent.appendChild(top)
    newBarContent.appendChild(bottom)

    var newBar = document.createElement('div')
    newBar.classList.add('bars')

    newBarContent.style.marginLeft = '0px'

    newBar.appendChild(newBarContent)

    gameArea.appendChild(newBar)
}

// function to get first bar position

var score = document.querySelector('.score')
var initialScore = 0
score.innerHTML = `&nbsp${initialScore}`
var bird = document.querySelector('.birdImage')
var birdMovement = 150

var gameLooping = function () {
    var area = document.querySelector('.gameArea')
    var bars = document.querySelectorAll('.bars')
    bird.style.marginTop = birdMovement.toFixed(2) + 'px'

    if (birdMovement >= 300 - bird.clientHeight) {
        loseGame()
    } else {
        birdMovement += 1
    }

    document.onkeypress = function (e) {
        if (e.key == " ") {
            if (gameIsRunning) {
                if(birdMovement - 40 < 0){
                    birdMovement = 0
                }else {
                    birdMovement -= 40
                }
            }
        }
    }

    value -= 1

    bars[0].style.marginLeft = value + 'px'

    if (bars[0].style.marginLeft == '0px') {
        createNewBar(area)
    }

    if (bars[0].style.marginLeft == '-80px') {
        bars[0].remove()
        value = 150
        initialScore++
        score.innerHTML = `&nbsp${initialScore}`
    }

}

// function to lose game

var loseGame = function(){
    stop()
    game = false
}

//creating 2 bars in begin of the game

createNewBar(document.querySelector('.gameArea'))
createNewBar(document.querySelector('.gameArea'))

// loop of the game

var buttonStart = document.querySelector('.buttonStart')
var buttonPause = document.querySelector('.buttonPause')
var score = document.querySelector('.score')

var value = 150

var startGame
var playerMovement
var gameIsRunning = false
var game = true

var start = function () {
    startGame = setInterval(gameLooping, 10)
    gameIsRunning = true
}

var stop = function () {
    clearInterval(startGame)
    gameIsRunning = false
}

buttonStart.addEventListener('click', event => {
    if (gameIsRunning == false && game==true ) {
        start()
    }
})

buttonPause.addEventListener('click', event => {
    if(game == true && gameIsRunning == true){
       stop() 
    } 
})