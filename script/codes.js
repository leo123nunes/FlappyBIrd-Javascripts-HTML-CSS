
var buttonStart = document.querySelector('.buttonStart')
var buttonPause = document.querySelector('.buttonPause')
var scoreText = document.querySelector('.scoreText')

var startGame;
var playerMovement;
var gameIsRunning = false
var game = true
var birdRotation = 0.1

// creating new bar

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

// creating 2 bars in begin of the game

createNewBar(document.querySelector('.gameArea'))
createNewBar(document.querySelector('.gameArea'))

// starting the game

var gameLooping = function () {
    var scoreText = document.querySelector('.score')
    var area = document.querySelector('.gameArea')
    var bars = document.querySelectorAll('.bars')
    var bird = document.querySelector('.birdImage')

    var marginLeftFirstBar = window.getComputedStyle(bars[0]).marginLeft.replace('px', '')
    var marginTopBird = window.getComputedStyle(bird).marginTop.replace('px', '')

    marginLeftFirstBar--
    marginTopBird++

    bars[0].style.marginLeft = marginLeftFirstBar + 'px'

    bird.style.marginTop = marginTopBird + 'px'

    bird.style.transform = `rotate(${birdRotation}deg)`

    if (touchFloor(bird, area.clientHeight)) {
        loseGame()
    }

    if (barCollision(bars, bird)) {
        loseGame()
    }

    document.onkeypress = function (e) {
        if (e.key == " ") {
            if (gameIsRunning) {
                birdRotation = -5
                if (marginTopBird - 40 < 0) {
                    marginTopBird = 0
                    bird.style.marginTop = marginTopBird + 'px'
                } else {
                    marginTopBird -= 30
                    bird.style.marginTop = marginTopBird + 'px'
                }
            }
        }
    }

    if (bars[0].style.marginLeft == '0px') {
        createNewBar(area)
    }

    if (bars[0].style.marginLeft == '-80px') {
        bars[0].remove()
        marginLeftFirstBar = 150
        var score = scoreText.textContent.replace(' ', '')
        score++
        scoreText.innerHTML = `&nbsp${score}`
    }

    birdRotation += 0.2
}

// functions to lose the game when bird touch the floor and when bird collides the bar

var touchFloor = function (bird, gameArea) {
    var marginTop = bird.style.marginTop.replace("px", "")
    if (marginTop >= gameArea - bird.clientHeight) {
        return true
    }
}

var barCollision = function (bar, bird) {
    var marginLeftBar = parseInt(bar[0].style.marginLeft.replace('px', ''))

    var heightTopBar = document.querySelectorAll('.top')[0].clientHeight
    var heightBottomBar = document.querySelectorAll('.bottom')[0].clientHeight

    var marginTopBird = parseInt(bird.style.marginTop.replace('px', ''))
    var marginLeftBird = window.getComputedStyle(bird).marginLeft.replace('px', '')

    if (marginLeftBar <= 90 && marginLeftBird <= (marginLeftBar + 60)) {
        
        // collide in top bar

        if (marginTopBird <= heightTopBar) {
        return true
        }    
       
        // collide in bottom bar

        if (marginTopBird + bird.clientHeight >= 300 - parseInt(heightBottomBar)) {
            return true
        }
    }

    return false
}

// function to lose and finish game

var loseGame = function () {
    stop()
    game = false
}

var start = function () {
    startGame = setInterval(gameLooping, 10)
    gameIsRunning = true
}

var stop = function () {
    clearInterval(startGame)
    gameIsRunning = false
}

// events for the start and pause buttons

buttonStart.addEventListener('click', event => {
    if (gameIsRunning == false && game == true) {
        start()
    }
})

buttonPause.addEventListener('click', event => {
    if (game == true && gameIsRunning == true) {
        stop()
    }
})