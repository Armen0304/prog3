var matrix = [
    [0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,2,0,0],
    [0,0,3,0,0,0,0,0],
    [0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0]
]

var side = 50
var grassArr = []
var EaterArr = []
var PredArr = []


function setup(){
    createCanvas(matrix[0].length * side, matrix.length * side)
    background("gray")
    frameRate(2)
    
    let gr1 = new Grass(2,1)
    grassArr.push(gr1)

    let gr2 = new Grass(5,5)
    grassArr.push(gr2)

    let grEt = new GrassEater(5, 3)
    EaterArr.push(grEt)

    let Pred = new Predator(2, 4)
    PredArr.push(Pred)

}

function draw(){
    for(let y = 0 ; y < matrix.length ; y++)
    {
        for(let x = 0 ; x < matrix[y].length; x++)
        {
            if(matrix[y][x] == 1)
            {
                fill("green")
            }

            else if(matrix[y][x] == 2)
            {
                fill("yellow")
            }

            else if(matrix[y][x] == 3)
            {
                fill("red")
            }
            else if(matrix[y][x] == 4)
            {
                fill("purple")
            }

            else
            {
                fill("gray")
            }
            rect(x * side , y * side, side, side)
        }
    }


    for(let index in PredArr)
    {
        PredArr[index].start()


    }

    for(let index in EaterArr)
    {
        EaterArr[index].start()


    }

    

    for(let index in grassArr)
    {
        grassArr[index].mul()
    }
}
