// 플레이어가 조종하게 되는 bar
class Bar{
    constructor(container, x, y, width, height, velX, velY){
        this.container=document.getElementById(container);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.velX = velX;
        this.velY = velY;
        this.div = document.createElement("div");
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.position="absolute";
        this.div.style.background="url(./images/bar.png)";
        this.div.style.backgroundSize="contain";
        this.container.appendChild(this.div);
    }

    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
        if(rightPressed && this.x < parseInt(this.container.style.width)-this.width) {
            this.x += 7;
        } else if(leftPressed && this.x > 0) {
            this.x -= 7;
        }
    }

    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.collisionWithBall();
    }

    //ball과의 충돌 체크
    collisionWithBall(){
        for(let i=0; i<ballArray.length; i++){
            if(collisionCheck(this, ballArray[i])){
                ballArray[i].velY=-ballArray[i].velY;
            }
        }
    }
}