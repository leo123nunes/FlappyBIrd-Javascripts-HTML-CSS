
// function to create a new bar

var createNewBar = function (gameArea, marginLeft) {

    var newBarContent = document.createElement('div')
    newBarContent.classList.add('barContent')

    var newBarTop = document.createElement('div')
    newBarTop.classList.add('barTop')

    var heightTop = Math.random()*200 + 'px'

    newBarTop.style.height = heightTop

    var newBarBottom = document.createElement('div')
    newBarBottom.classList.add('barBottom')

    var heightBottom = 300 - heightTop.replace('px','') - 100  

    heightBottom > 0 ? newBarBottom.style.height = heightBottom + 'px' : newBarBottom.style.height = '1px' 

    newBarContent.appendChild(newBarTop)
    newBarContent.appendChild(newBarBottom)

    var newBar = document.createElement('div')
    newBar.classList.add('bars')

    newBarContent.style.marginLeft = '0px'

    newBar.appendChild(newBarContent)

    gameArea.appendChild(newBar)
}

//creating 2 bars in begin of the game

createNewBar(document.querySelector('.gameArea'))
createNewBar(document.querySelector('.gameArea'))

// loop of the game

var value = 150

setInterval(() => {

    var area = document.querySelector('.gameArea')
    var bars = document.querySelectorAll('.bars')

    value -= 1

    bars[0].style.marginLeft = value + 'px'

    if (bars[0].style.marginLeft == '0px') {
        createNewBar(area)
    }

    if (bars[0].style.marginLeft == '-80px') {
        bars[0].remove()
        value = 150
    }

}, 10)