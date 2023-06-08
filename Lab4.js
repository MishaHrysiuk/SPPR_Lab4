const lessons = [
    "СППР",
    "КІСТ",
    "Англійська мова",
    "СІР",
    "ПДПС із ШІ",
    "УРІБ"
]
const n = lessons.length

const showLessons = (lessons) => {
    console.log("Наші предмети")
    lessons.forEach((lesson, i) => {
        console.log(`A${i} - ${lesson}`)
    })
    console.log("")
} 

const returnCreatedMatrix = (n) => {
    const matrix = []
    for (let i = 0; i < n; i++) {
        matrix.push(Array(n).fill(0))
        for (let j = i+1; j < n; j++) {
            matrix[i][j]= Math.floor(Math.random()*3)-1
        }
    }
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            matrix[j][i]=  matrix[i][j] ? -matrix[i][j] : 0
        }
    }
    return matrix
}

const matrix1 = [[0, -1, -1, 1, 1, 0],
                [1, 0, 1, 0, -1, 1],
                [1, -1, 0, 1, 1, -1],
                [-1, 0, -1, 0, 1, -1],
                [-1, 1, -1, -1, 0, 1],
                [0, -1, 1, 1, -1, 0]]

const matrix = returnCreatedMatrix(n)
            
const sumMatrix = matrix.map(x => x.reduce((a, b) => a+b, 0))

const maxIndexArr = sumMatrix.indexOf(Math.max(...sumMatrix));

const transitiveMatrix = (matrix) => {
    let step = 1;
    let allTrans = 0;
    let failTrans = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i+1; j < n; j++) {
            for (let k = j+1; k < n; k++){
                let compareIandJ = matrix[i][j] === 1 ? ">" : (matrix[i][j] === -1 ? "<" : "=")
                let compareJandK = matrix[j][k] === 1 ? ">" : (matrix[j][k] === -1 ? "<" : "=")
                let compareIandK = matrix[i][k] === 1 ? ">" : (matrix[i][k] === -1 ? "<" : "=")
                
                if (compareIandJ === compareJandK) allTrans++;
                if (compareIandJ === compareJandK && compareIandJ !== compareIandK) failTrans++;

                console.log(`№${step++}\t(A${i}, A${j}, A${k}):\tA${i} ${compareIandJ} A${j},\t` + 
                `A${j} ${compareJandK} A${k} \t->\t ` + 
                `${compareIandJ === compareJandK ? `A${i} ${compareIandJ} A${k} ${
                    (compareIandJ === compareIandK ? `=== A${i} ${compareIandK} A${k} \t=====> \tOK`: `!== A${i} ${compareIandK} A${k} \t=====> \tFAIL`)}` 
                    : "транзитивність не може бути перевірено"}`)
            }
        }
    }
    console.log()
    console.log("Результат аналізу:")
    if (failTrans === 0) {
        console.log("Матриця узгоджена. Експерт у своїх оцінках був послідовним")
    } else {
        console.log(`Перевірка на транзитивність показала що у ${failTrans} випадках з ${allTrans} можливих для перевірки 
транзитивність була порушена. Це означає, що експерт у своїх оцінках був непослідовним.`)
    }
}

showLessons(lessons)

console.log("Матриця попарних порівнянь")
console.table(matrix)
console.log("")

console.log("Значення рядкових сум")
console.table(sumMatrix)
console.log("")

console.log(`Найбільш значущий предмет A${maxIndexArr} - ${lessons[maxIndexArr]}`)
console.log("")

console.log("Перевірка матриці на узгодженість експертних оцінок")
transitiveMatrix(matrix)
