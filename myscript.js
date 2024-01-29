let direction = 'ArrowRight'
let gamerStarter = false

const snakeBody = [{top: 0, left: 60}, {top: 0, left: 40}, {top: 0, left: 20}, {top: 0, left: 0}]
const limitPositions = [400, -20]
let positionFood = null
let score = 0
var scoreElement = document.querySelector('#score-text')

columnSpaceAvailability = [16, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
rowSpaceAvailability = [19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]

function positionsAreEqual(position1, position2) {
    return position1.top === position2.top && position1.left === position2.left
}

function createSnakeBody(arrayOfBody) {
  for(let i = 0; i < arrayOfBody.length; i++) {
    let newBodyPart = document.createElement('div')
    newBodyPart.className = 'snake-area'
    newBodyPart.id = `part-snake-${arrayOfBody[i].top}-${arrayOfBody[i].left}`
    newBodyPart.style.top = `${arrayOfBody[i].top}px`
    newBodyPart.style.left = `${arrayOfBody[i].left}px`
    document.querySelector('.game-scope').appendChild(newBodyPart)
  }
}

function isPositionInBody(headPosition, snakeBody) {
  return snakeBody.some((bodyPartPosition) => positionsAreEqual(bodyPartPosition, headPosition))
}

function moveSnake(newHeadPosition) {
  if (isPositionInBody(newHeadPosition, snakeBody) || limitPositions.includes(newHeadPosition.left) || limitPositions.includes(newHeadPosition.top)) {
    direction = null
    alert('You lost the game!')
    location.reload()
  } else {
    const lastBodyPart = snakeBody[snakeBody.length - 1]
    if (positionsAreEqual(newHeadPosition, positionFood)) {
      document.querySelector(`#food-area`).remove()
      score += 1
      let span = document.getElementById("score-text")
      span.textContent = `${score}`
      createFood()
    } else {
      document.querySelector(`#part-snake-${lastBodyPart.top}-${lastBodyPart.left}`).remove()
      snakeBody.pop()
    }
    createSnakeBody([newHeadPosition])
    updateSpaceAvailability(newHeadPosition, lastBodyPart)
    snakeBody.unshift(newHeadPosition)
  }
}

function gameLooper() {
  setInterval(() => {
    if (direction === null) {
      return
    }
    if (direction === 'ArrowRight') {
      const newHeadPosition = { top: snakeBody[0].top, left: snakeBody[0].left + 20 }
      moveSnake(newHeadPosition)
    }
    if (direction === 'ArrowLeft') {
      const newHeadPosition = { top: snakeBody[0].top, left: snakeBody[0].left - 20 }
      moveSnake(newHeadPosition)
    }
    if (direction === 'ArrowDown') {
      const newHeadPosition = { top: snakeBody[0].top + 20, left: snakeBody[0].left }
      moveSnake(newHeadPosition)
    }
    if (direction === 'ArrowUp') {
      const newHeadPosition = { top: snakeBody[0].top - 20, left: snakeBody[0].left }
      moveSnake(newHeadPosition)
    }
    if (direction === null) {
      return
    }
  }, 1000)
}

function getRandomAvailable(min, max, vector, topPositionDrawn) {
  const indexDrawn = Math.floor(Math.random() * (max - min + 1)) + min
  let positionInBody = false

  if (topPositionDrawn) {
    positionInBody = isPositionInBody({top: topPositionDrawn, left: indexDrawn * 20}, snakeBody)
  }

  if (positionInBody) {
    console.log(snakeBody)
  }

  if (min < 0 || max < 0 || max > vector.length - 1) {
    return
  }
  
  if (vector[indexDrawn] !== 0 && !positionInBody) {
    return indexDrawn
  } else {
    if (max - min === 0) {
      return
    } else {
      const vectorAux = []
      const drawnInTheFirstHalf = getRandomAvailable(indexDrawn - 1, min, vector, topPositionDrawn)
      const drawnInTheSecondHalf = getRandomAvailable(max, indexDrawn + 1, vector, topPositionDrawn)
      
      if (drawnInTheFirstHalf) {
        vectorAux.push(drawnInTheFirstHalf)
      }

      if (drawnInTheSecondHalf) {
        vectorAux.push(drawnInTheSecondHalf)
      }

      if (vectorAux.length === 0) {
        return
      }

      if (vectorAux.length === 1) {
        return vectorAux[0]
      }

      if (vectorAux.length > 1) {
        var randomIndex = Math.floor(Math.random() * 2)
        return vectorAux[randomIndex]
      }
    }
  }

  return -1
}

function updateSpaceAvailability(newHeadPosition, oldTailPosition) {
  const lastIndexOfSnake = snakeBody.length - 1

  rowSpaceAvailability[oldTailPosition.left / 20] += 1
  columnSpaceAvailability[oldTailPosition.top / 20] += 1

  rowSpaceAvailability[newHeadPosition.left / 20] -= 1
  columnSpaceAvailability[newHeadPosition.top / 20] -= 1
}

function createFood() {
  const topPosition = getRandomAvailable(0, 19, columnSpaceAvailability) * 20
  const leftPosition = getRandomAvailable(0, 19, rowSpaceAvailability, topPosition) * 20

  let newFood = document.createElement('div')
  newFood.className = 'snake-area'
  newFood.id = 'food-area'
  newFood.style.top = `${topPosition}px`
  newFood.style.left = `${leftPosition}px`
  positionFood = {top: topPosition, left: leftPosition}

  document.querySelector('.game-scope').appendChild(newFood)
}

document.addEventListener("DOMContentLoaded", (event) => {
  createSnakeBody(snakeBody)
  createFood()
})

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      gamerStarter = true
      gameLooper()
      document.querySelector('#start-text').style.visibility = 'hidden'
    }

    if (event.code === 'ArrowRight' && direction !== 'ArrowLeft' && gamerStarter) {
      direction = event.code
      const newHeadPosition = { top: snakeBody[0].top, left: snakeBody[0].left + 20 }
      moveSnake(newHeadPosition)
    }

    if (event.code === 'ArrowLeft' && direction !== 'ArrowRight' && gamerStarter) {
      direction = event.code
      const newHeadPosition = { top: snakeBody[0].top, left: snakeBody[0].left - 20 }
      moveSnake(newHeadPosition)
    }
    
    if (event.code === 'ArrowDown' && direction !== 'ArrowUp' && gamerStarter) {
      direction = event.code
      const newHeadPosition = { top: snakeBody[0].top + 20, left: snakeBody[0].left }
      moveSnake(newHeadPosition)
    }

    if (event.code === 'ArrowUp' && direction !== 'ArrowDown' && gamerStarter) {
      direction = event.code
      const newHeadPosition = { top: snakeBody[0].top - 20, left: snakeBody[0].left }
      moveSnake(newHeadPosition)
    }
  }
)
