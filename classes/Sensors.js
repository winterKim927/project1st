//충돌 감지를 위한 센서
class Sensor{
    constructor(container, color, x, y, width, height, velX, velY){
        this.container=container; 
        this.div=document.createElement("div");
        this.color=color;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.velX=velX;
        this.velY=velY;
        
        this.div.style.background=this.color;
        this.div.style.position="absolute";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        
        this.container.appendChild(this.div);
    }    

    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
    }

    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
    }
}



class LeftSensor extends Sensor{
    constructor(container, color, x, y, width, height, velX, velY){
        super(container, color, x, y, width, height, velX, velY);
    }
    
    tick(){
        let index = sensorArrayL.indexOf(this);
        this.x=ballArray[index].x-2; //공의 좌측보다 1픽셀 바깥쪽에 위치하게
        this.y=ballArray[index].y+1; //공의 안쪽에 위치하게 하여 y축 방향으로 충돌시에는 작동하지 않게 하기 위해
        
        //일반 벽돌과의 충돌체크 + 아이템 벽돌과의 충돌체크
        for(let i=0; i<brickArray.length; i++){
            if(collisionCheck(this, brickArray[i])){
                this.container.removeChild(brickArray[i].img);
                brickArray.splice(i, 1);
                ballArray[index].velX = -ballArray[index].velX;
            }
        }
        for(let i=0; i<itemBrickArray.length; i++){
            if(collisionCheck(this, itemBrickArray[i])){
                itemBrickArray[i].createItem();
                this.container.removeChild(itemBrickArray[i].img);
                itemBrickArray.splice(i, 1);
                ballArray[index].velX = -ballArray[index].velX;
            }
        }
        
        //bar에 x축 방향으로 충돌했을 경우 옆으로 튕겨나갈 수 있게
        if(collisionCheck(this, bar)){
            ballArray[index].velX=-ballArray[index].velX;
            ballArray[index].velY=-ballArray[index].velY;
        }
    }
}

class RightSensor extends Sensor{
    constructor(container, color, x, y, width, height, velX, velY){
        super(container, color, x, y, width, height, velX, velY);
    }

    tick(){
        let index = sensorArrayR.indexOf(this);
        this.x=ballArray[index].x+ballArray[index].width-3;
        this.y=ballArray[index].y+1;
        
        for(let i=0; i<brickArray.length; i++){
            if(collisionCheck(this, brickArray[i])){
                this.container.removeChild(brickArray[i].img);
                brickArray.splice(i, 1);
                ballArray[index].velX = -ballArray[index].velX;
            }
        }

        for(let i=0; i<itemBrickArray.length; i++){
            if(collisionCheck(this, itemBrickArray[i])){
                itemBrickArray[i].createItem();
                this.container.removeChild(itemBrickArray[i].img);
                itemBrickArray.splice(i, 1);
                ballArray[index].velX = -ballArray[index].velX;
            }
        }

        if(collisionCheck(this, bar)){
            ballArray[index].velX=-ballArray[index].velX;
            ballArray[index].velY=-ballArray[index].velY;
        }


    }
}