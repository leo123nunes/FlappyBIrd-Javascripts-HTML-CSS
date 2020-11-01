
var value = 150

setInterval(() => {

    var area = document.querySelector('.gameArea')
    var bars = document.querySelectorAll('.bars')

    value -= 1

    bars[0].style.marginLeft = value+'px'

    if(bars[0].style.marginLeft=='-80px'){
        console.log('entrou if')
        bars[0].remove()
    }

    if(area.children.length <= 2){
        console.log("creating new bar")
        var newBarContent = document.createElement('div')
        newBarContent.classList.add('barContent')

        var newBarTop = document.createElement('div')
        newBarTop.classList.add('barTop')

        var newBarBottom = document.createElement('div')
        newBarBottom.classList.add('barBottom')

        newBarContent.appendChild(newBarTop)
        newBarContent.appendChild(newBarBottom)

        var newBar = document.createElement('div')
        newBar.classList.add('bars')

        newBarContent.style.marginLeft = '150px'

        newBar.appendChild(newBarContent)

        value = 150

        area.appendChild(newBar)
    }
}, 10)