const vetor = [10, 1, 0];
function randomNumberAvailable(min, max, vector) {
  const indexDrawn = Math.floor(Math.random() * (max - min + 1)) + min;
  
  // Verifica casos inválidos antes de sortear
  if (min < 0 || max < 0 || max > vector.length - 1) {
    return
  }
  
  // Verifica se o valor indice sorteado e o retorna caso seja diferente de 0
  if (vector[indexDrawn] !== 0) {
    // console.log('Index: ', indexDrawn)
    return vector[indexDrawn]
  } else {
    // verifica se o subvetor tem tamanho 1
    if (max - min === 0) {
      return
    } else {
      const vectorAux = []
      const drawnInTheFirstHalf = randomNumberAvailable(indexDrawn - 1, min, vector)
      const drawnInTheSecondHalf = randomNumberAvailable(max, indexDrawn + 1, vector)
      
      if (drawnInTheFirstHalf) {
        vectorAux.push(drawnInTheFirstHalf)
      }

      if (drawnInTheSecondHalf) {
        vectorAux.push(drawnInTheSecondHalf)
      }
      console.log(vectorAux)

      if (vectorAux.length === 0) {
        console.log('Não é pra vir aqui')
        return
      }

      if (vectorAux.length === 1) {
        return vectorAux[0]
      }

      if (vectorAux.length > 1) {
        var randomIndex = Math.floor(Math.random() * 2);
        return vectorAux[randomIndex]
      }
    }
  }
}
const x = randomNumberAvailable(0, 2, vetor);
console.log('final: ', x);