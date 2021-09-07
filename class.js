class Grass{

    constructor(x,y){
        
        this.x = x
        this.y = y

        this.multiplay = 0

        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    
    }

    chooseCell(num){
        
        let result = []

        for(let index in this.directions){
            let x = this.directions[index][0] 
            let y = this.directions[index][1] 

            if(x >= 0 && x < matrix.length && y >= 0 && y < matrix.length)
                if(matrix[y][x] == num){
                    result.push(this.directions[index])
                }

        }

        return result
    }

    mul(){
        this.multiplay++
        if(this.multiplay >= 2)
        {
            let emptyCells = this.chooseCell(0)
            let randomCell = random(emptyCells)

            
            if(emptyCells.length != 0){
                let x = randomCell[0]
                let y = randomCell[1]

                let RanNum = Math.floor(Math.random() * 101)
                if(RanNum < 10)
                {
                    matrix[y][x] = 4

                }
                else{
                matrix[y][x] = 1
                let gr = new Grass(x,y)
                grassArr.push(gr)
                }
            
            }

            this.multiplay = 0
        }

            
            
    }


}

class GrassEater{
        constructor(x,y){
            this.x = x
            this.y = y

            this.energy = 8

            this.directions = []
        }

    updateDirection(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num1, num2){
        this.updateDirection()
        let result = []

        for(let index in this.directions){
            let x = this.directions[index][0] 
            let y = this.directions[index][1] 
            
            if(x >= 0 && x < matrix.length && y >= 0 && y < matrix.length){
                if(matrix[y][x] == num1 || matrix[y][x] == num2){
                    result.push(this.directions[index])
 
                }
            }

        }

        return result
    }

    move(){
        
                
        let emptyCell = this.chooseCell(0)
  
        if(emptyCell.length != 0)
        {
            
            let randomCell = random(emptyCell)
            let x = randomCell[0]
            let y = randomCell[1]

            matrix[y][x] = 2
            matrix[this.y][this.x] = 0

            this.x = x
            this.y = y 
            this.energy--
        }
    }

    start(){
        if(this.energy > 0){
            if(this.chooseCell(1).length != 0)
            {
                this.eat()
            }
            else{
                
                this.move()
            }
            
            if(this.energy > 15) {
                this.mull()
            }
        }
        
        else{
            this.die()
        }
    }

    eat(){
        let foods = this.chooseCell(1, 4)
        if(foods.length != 0){
            let randFood = random(foods)
            let x = randFood[0]
            let y = randFood[1]
            // uteliqi kodinatner -> x , y
            // es pahin gtnvelu kodinatnery -> this.x this.y
 
            if(matrix[y][x] == 1)
            {
            matrix[y][x] = 2
            matrix[this.y][this.x] = 0
            
            
            for(let index in grassArr){
                if(x == grassArr[index].x && y == grassArr[index].y)
                {
                    grassArr.splice(index,1)
                    
                    break
                }
            }
            this.x = x
            this.y = y
            this.energy += 3
            }

            else 
            {
                matrix[y][x] = 2
                matrix[this.y][this.x] = 0
                this.x = x
                this.y = y
                this.energy = 0;
            }

        
        }

    }

    mull(){

        let emptyCells = this.chooseCell(0)
            
            if(emptyCells.length != 0){
                let randomCell = random(emptyCells)
                let x = randomCell[0]
                let y = randomCell[1]
                console.log("Nor sarqvac grasssner@ - " + x + " " + y);
                
                matrix[y][x] = 2
                let NorGrEat = new GrassEater(x,y)
                EaterArr.push(NorGrEat)

                this.energy /= 2
            }


    }

    die(){
        console.log(EaterArr);
        
        matrix[this.y][this.x] = 0
        
        
        for(let index in EaterArr){
            if(this.x = EaterArr[index] && this.y == EaterArr[index])
            {
                EaterArr.splice(index,1)
                console.log("Merav " + index);
                break
            }
        }
    }

}

class Predator{
    constructor(x,y){
        this.x = x
        this.y = y

        this.energy = 14

        this.directions = []
    }

updateDirection(){
    this.directions = [
        [this.x - 1, this.y - 1],
        [this.x    , this.y - 1],
        [this.x + 1, this.y - 1],
        [this.x - 1, this.y    ],
        [this.x + 1, this.y    ],
        [this.x - 1, this.y + 1],
        [this.x    , this.y + 1],
        [this.x + 1, this.y + 1]
    ];
}

chooseCell(num1, num2){
    this.updateDirection()
    let result = []

    for(let index in this.directions){
        let x = this.directions[index][0] 
        let y = this.directions[index][1] 
        
        if(x >= 0 && x < matrix.length && y >= 0 && y < matrix.length){
            if(matrix[y][x] == num1 || matrix[y][x] == num2){
                result.push(this.directions[index])

            }
        }

    }

    return result
}

move(){
    
            
    let emptyCell = this.chooseCell(0, 1)

    if(emptyCell.length != 0)
    {
        
        let randomCell = random(emptyCell)
        let x = randomCell[0]
        let y = randomCell[1]

        if(matrix[y][x] == 0)
        {
        matrix[y][x] = 3
        matrix[this.y][this.x] = 0
        }
        else if (matrix[y][x] == 1) {
            matrix[y][x] = 3
            matrix[this.y][this.x] = 1
        }

        this.x = x
        this.y = y 
        this.energy--
    }
}

start(){
    if(this.energy > 0){
        if(this.chooseCell(2).length != 0)
        {
            this.eat()
        }
        else{
            
            this.move()
        }
        
        if(this.energy > 15) {
            this.mull()
        }
    }
    
    else{
        this.die()
    }
}

eat(){
    let foods = this.chooseCell(2)
    if(foods.length != 0){
        let randFood = random(foods)
        let x = randFood[0]
        let y = randFood[1]
        // uteliqi kodinatner -> x , y
        // es pahin gtnvelu kodinatnery -> this.x this.y
        
        
        
        matrix[y][x] = 3
        matrix[this.y][this.x] = 0
        
        
        for(let index in EaterArr){
            if(x == EaterArr[index].x && y == EaterArr[index].y)
            {
                EaterArr.splice(index,1)
                
                break
            }
        }

        this.x = x
        this.y = y
        this.energy += 5
    }

}

mull(){

    let emptyCells = this.chooseCell(0)
        
        if(emptyCells.length != 0){
            let randomCell = random(emptyCells)
            let x = randomCell[0]
            let y = randomCell[1]
            
            matrix[y][x] = 3
            let NorPred = new Predator(x,y)
            PredArr.push(NorPred)

            this.energy /= 2
        }


}

die(){
    
    matrix[this.y][this.x] = 0
    
    
    for(let index in PredArr){
        if(this.x = PredArr[index] && this.y == PredArr[index])
        {
            PredArr.splice(index,1)

            break
        }
    }
}

}
