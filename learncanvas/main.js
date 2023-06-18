/**
 * 
 * * This is Documentation for Canvas
 * 
 */

// creating rectangle
// let rectangle1 = [200,200,50,50]
// contxt.fillStyle = "red"
// contxt.fillRect(rectangle1[0], rectangle1[1], rectangle1[2], rectangle1[3])

//line 
// contxt.beginPath()
// contxt.moveTo(50, 300)
// contxt.lineTo(rectangle1[0] + rectangle1[3], rectangle1[1] + rectangle1[3])
// contxt.lineTo(50*10,300)
// contxt.strokeStyle = 'green'
// contxt.stroke()

// creating circle
// let arc1 = [200,200,50,50]
// contxt.beginPath()
// contxt.arc(x,y, Radius, start_angle, end_angle)
// contxt.strokeStyle = 'green'
// contxt.stroke()


// * ---------------------------------------------------------------------------------------------------------------
// !                        Below are the code, carefull on what your changing
// * ---------------------------------------------------------------------------------------------------------------

// * -------------------------------------------------------
// !               Canvas Configuration
// * -------------------------------------------------------

/*
 - Get the tag canvas by calling the Id
 - configure the size of canvas by size of the visible window
*/
const canvas = document.getElementById("myCanvas")
canvas.height = window.innerHeight - 5
canvas.width = window.innerWidth - 5

//calling the canvas drawing context
let contxt = canvas.getContext("2d")

// * ---------------------------------------------------------------------------------------------------------------

// * -------------------------------------------------------
// !                Drawing Object
// * -------------------------------------------------------

let mouse = {
    x:undefined,
    y:undefined
}

// * get the mouse position
window.addEventListener('mousemove', (event)=>{
    mouse.x = event.x, 
    mouse.y = event.y
    
})

class Circle {

    x = 0
    y = 0
    radius = 0
    x_movement = 0
    y_movement = 0
    borderColor = ""
    fillColor = ""
    colorList = ""
    rgbindex = 0
    
    
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.radius = radius

        
    }
    draw = () => {
        contxt.beginPath()
        contxt.arc(this.x, this.y, this.radius, 0,Math.PI * 2)
        contxt.strokeStyle = this.borderColor
        contxt.fillStyle = this.fillColor
        contxt.stroke()
        contxt.fill()
    }

    animation = () => {
        //Creating bounce effect on x axis
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0 ){
            // negating the value of valocity variable
            this.x_movement = -this.x_movement
        }
        this.x += this.x_movement
        
        //Creating bounce effect on y axis
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0 ){
            // negating the value of valocity variable
            this.y_movement = -this.y_movement
        }
        this.y += this.y_movement

        
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50){
            
            if(this.rgbindex < 255){
                this.rgbindex = 255
                this.borderColor = "rgb("+this.rgbindex+", "+this.rgbindex+", "+this.rgbindex+")"
                this.fillColor = "rgb("+this.rgbindex+", "+this.rgbindex+", "+this.rgbindex+")"
            }
                
            
        }else{
            this.rgbindex -= 10
            this.borderColor = "rgb("+this.rgbindex+", "+this.rgbindex+", "+this.rgbindex+")"
            this.fillColor = "rgb("+this.rgbindex+", "+this.rgbindex+", "+this.rgbindex+")"
        }
    }

}





// * ---------------------------------------------------------------------------------------------------------------

// * -------------------------------------------------------
// !                        Generate Shape 
// * -------------------------------------------------------


let Generate_circle = []

console.log(mouse.x, mouse.y)

function main(){
    

    for(let i = 0; i < 500; i++){
        Generate_circle.push(new Circle(Math.random() * innerWidth,Math.random() * innerHeight,10))
        Generate_circle[i].x_movement = (Math.random() - 0.5) * 1
        Generate_circle[i].y_movement = (Math.random() - 0.5) * 1
    }

    // console.table(Generate_circle)
}

main()

// * ---------------------------------------------------------------------------------------------------------------

// * -------------------------------------------------------
// !                   Animation Frame 
// * -------------------------------------------------------
/*
    * Animation
    * var dx : used to measure the velocity of moving object
    *  
*/
function animate(){
    // function that create a loop by calling animation function again and again
    requestAnimationFrame(animate)
    // clearing the canvas everytime the animation function were called
    contxt.clearRect(0,0,innerWidth, innerHeight)
    
    for(let i of Generate_circle){
        i.draw()
        i.animation()
    }
    
}

animate()
