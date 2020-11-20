const canvas = document.querySelector("canvas")
const btn = document.querySelector(".click")

canvas.width = 600;
canvas.height = 300;

const ctx = canvas.getContext("2d");

let play = true

const newRand = (min, max)=>{
    let randomCount = Math.floor(Math.random()*(max-min+1)+min)
    return randomCount;
}



class Balls{
    constructor(x, y, updateX, updateY, radius, bgcolor){
        this.x = x
        this.y = y
        this.updateX = updateX
        this.updateY = updateY
        this.radius = radius
        this.bgcolor = bgcolor
        
        this.update=()=>{
                this.x += this.updateX
                this.y += this.updateY


            this.draw()
        }
        
        this.draw=()=>{
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
            ctx.stroke()
            ctx.fillStyle = bgcolor?"rgb(168, 24, 96)":"rgb(226, 39, 233)"
            ctx.fill()
        }

    }
}

let balls = []
const init = ()=>{
    balls = []
    for(let i=0; i<15; i++){
        const x = canvas.width/2
        const y = canvas.height/2
        const updateX = newRand(-3, 3);
        const updateY = newRand(-3, 3);
        const radius = newRand(10, 15);
        const bgcolor = newRand(0, 1)
        balls.push(new Balls(x, y, updateX, updateY, radius, bgcolor))
    }
}
init()
const animate = () => {
    if(play){
    requestAnimationFrame(animate)
    }
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    balls.forEach(ball=>ball.update())
}


btn.addEventListener("mousedown", ()=>{
    play = false;
})
btn.addEventListener("mouseup", ()=>{
    init()
    play = true
    animate()
})