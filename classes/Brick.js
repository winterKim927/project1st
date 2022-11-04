class Brick{
    constructor(container, x, y, width, height){
        this.container=document.getElementById(container);
        this.width=width;
        this.height=height;
        this.x=x;
        this.y=y;
        this.img = document.createElement("img");
        this.img.style.width=this.width+"px";
        this.img.style.height=this.height+"px";
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
        this.img.style.position="absolute";
        this.img.src="./images/brick.png";
        this.container.appendChild(this.img);
    }

    render(){
        this.img.style.left=this.x+"px";
        this.img.style.top=this.y+"px";
    }
}

//맞추면 아이템을 생성하는 벽돌
class ItemBrick extends Brick{
    constructor(container, x, y, width, height){
        super(container, x, y, width, height);
        this.img.src="./images/itembrick.png";
    }
    
    createItem(){ //벽돌이 제거됐을 때 아이템 생성
        let item = new Item("stage", this.x, this.y, this.width, this.height);
        itemArray.push(item);
    }
}

// 생성되는 아이템 정의
class Item extends Brick{
    constructor(container, x, y, width, height){
        super(container, x, y, width, height);
        this.img.src="./images/item1.png";
    }
    tick(){
        this.y += 3;
    }
    render(){
        this.img.style.top=this.y+"px";
        
        // 내려오면서 이미지가 바뀌는 효과
        if(this.y%2 == 0){
            this.img.src="./images/item1.png";
        } else {
            this.img.src="./images/item2.png";
        }

        if(this.y >parseInt(stage.style.height)){
            this.container.removeChild(this.img);
            itemArray.splice(itemArray.indexOf(this), 1);
        }
        
        if(collisionCheck(this, bar)){
            this.container.removeChild(this.img);
            itemArray.splice(itemArray.indexOf(this), 1);
            this.itemOdds();
        }
    }

    /*-----------------------------------------------------------------------------------------------------
                                                            아이템의 종류            
    ------------------------------------------------------------------------------------------------------*/

    sizeUp(){ //바의 길이가 길어지는 아이템
        let barWidth = bar.width*1.5;
        let barX = bar.x;
        this.container.removeChild(bar.div);
        bar = new Bar("stage", barX, 580, barWidth, 15, 0, 0);
        bar.div.style.background="url(./images/longbar.png)";
        bar.div.style.backgroundSize="contain";
    }

    oneMoreBall(){ // ball을 하나 더 생성하는 아이템
        createBall();
    }

    speedDown(){ // ball의 속도를 낮춰주는 아이템
        for(let i=0; i<ballArray.length; i++){
            ballArray[i].velX *= 0.8;
            ballArray[i].velY *= 0.8;
        }
    }
    
    /*-----------------------------------------------------------------------------------------------------
                                                            아이템 확률 설정            
    ------------------------------------------------------------------------------------------------------*/

    itemOdds(){ 
        let odd = getRandomWithRange(1, 10);
        if(1 <= odd && odd <= 2){ // 20%의 확률
            this.speedDown();
        } else if (2 < odd && odd <=6){ // 40%의 확률
            this.sizeUp();
        } else { // 40% 확률
            this.oneMoreBall();
        }
    }
}