const canvas=document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;
const explosion =[];
let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);

class Explosion {
    constructor(x,y){
      
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.width = this.spriteWidth*0.5;
        this.height = this.spriteHeight*0.5;
        this.x = x-this.width/2;
        this.y = y-this.height/2;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame=0;
        this.timer = 0;
        this.angle = Math.random()*6.2; //360 degree is roughly 6.2 radiant. 
        this.sound = new Audio();
        this.sound.src = 'Fire impact 1.wav';
    }

    update(){
        if (this.frame === 0) this.sound.play();
        this.timer++;
        if(this.timer%10 ===0){
            this.frame++;
        };
        
    }
    draw(){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(this.image,this.spriteWidth*this.frame,0,this.spriteWidth,this.spriteHeight,0,0,this.width, this.height);
        ctx.restore();
    }
}

canvas.addEventListener('click', function(e){
    createAnimation(e);

})

/*
canvas.addEventListener('mousemove', function(e){
    createAnimation(e);

})
*/
function createAnimation(e){
    let positionX = e.x-canvasPosition.left;
    let positionY = e.y-canvasPosition.top;
    explosion.push(new Explosion(positionX,positionY));
    console.log(explosion);
}


function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    for(let i=0;i<explosion.length;i++){
        explosion[i].update();
        explosion[i].draw();
        if(explosion[i].frame >5){
            explosion.splice(i,1);
            i--;
        }
    }
    requestAnimationFrame(animate);
};

animate();


