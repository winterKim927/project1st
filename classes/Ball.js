class Ball{
    constructor(container, x, y, width, height, velX, velY){
        this.container=document.getElementById(container);
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.velX=velX;
        this.velY=velY;
        this.div = document.createElement("div");
        this.div.style.width=this.width+"px";
        this.div.style.height=this.height+"px";
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.div.style.background="white";
        this.div.style.borderRadius="50%";
        this.div.style.position="absolute";
        this.container.appendChild(this.div);
        this.createSensor();
        setTimeout(()=>{
            this.difficultyControl();
        }, adjTime);
    }

    tick(){
        this.x+=this.velX;
        this.y+=this.velY;
    }

    render(){
        this.div.style.left=this.x+"px";
        this.div.style.top=this.y+"px";
        this.collisionWithBorder();
        this.collisionWithBricks();
    }

    /* 기존의 충돌체크 함수로는 각각의 방향에 대한 결과값을 따로 지정할 수가 없기 때문에
        공이 x축의 방향으로 벽돌과 충돌했을 때는  x축의 방향으로 튕겨나오고
        y축의 방향으로 충돌했을 경우 y축의 방향으로 튕겨나오게 하기 위해,
        좌, 우에 따로 센서라는 div를 붙여 x축 방향의 충돌을 따로 정의한다
    */
    createSensor(){
        let sensorL =new LeftSensor(stage, "transparent", this.x-1, this.y, 5, this.height*(0.85));
        let sensorR =new RightSensor(stage, "transparent", this.x+this.width+1, this.y+2, 5, this.height*(0.85));
        sensorArrayL.push(sensorL);
        sensorArrayR.push(sensorR);
    }
    
    //30초마다 볼의 속도가 BALL_ACCEL_RATIO 만큼 증가하도록하는 메서드.
    difficultyControl(){
        if(Math.abs(this.velX)<maxSpeed && Math.abs(this.velY)<maxSpeed && gameFlag && (ballArray.indexOf(this) >= 0)){ //볼의 속도가 일정 값을 넘어가지 않도록
            this.velX = BALL_ACCEL_RATIO*this.velX; 
            this.velY = BALL_ACCEL_RATIO*this.velY;
            console.log((ballArray.indexOf(this)+1)+"번째 볼 난이도 조절 실행됨")
        }
        setTimeout(()=>{
            this.difficultyControl();
        }, adjTime);
    }
        
    
    //ball 화면 밖으로 나가지 않게 하는 메서드
    //밑으로 떨어질 경우 gameover 메서드를 호출한다.
    collisionWithBorder(){
        if(this.x >= 487 || this.x <= 0){
            this.velX=-this.velX;
        }
        if(this.y <= 0){
            this.velY=-this.velY;
        }
        else if(this.y >= 700){
            let index = ballArray.indexOf(this);
            this.container.removeChild(sensorArrayL[index].div);
            this.container.removeChild(sensorArrayR[index].div);
            sensorArrayL.splice(index, 1);
            sensorArrayR.splice(index, 1);
            this.container.removeChild(this.div);
            ballArray.splice(index, 1);
            if(ballArray.length==0){
                this.gameOver();
            }
        }
    }
    
    //벽돌과의 충돌시 효과  메서드
    collisionWithBricks(){
        for(let i=0; i<brickArray.length; i++){
            if(collisionCheck(this, brickArray[i])){
                this.container.removeChild(brickArray[i].img);
                brickArray.splice(i, 1);
                this.velY = -this.velY;
            }
        }
        for(let i=0; i<itemBrickArray.length; i++){
            if(collisionCheck(this, itemBrickArray[i])){
                itemBrickArray[i].createItem();
                this.container.removeChild(itemBrickArray[i].img);
                itemBrickArray.splice(i, 1);
                this.velY = -this.velY;
            }
        }
        if(brickArray.length <= 0 && itemBrickArray.length <= 0){
            this.gameWin();
        }
    }

    /* ball이 추락했을 때  남은 목숨 수에 따라
        남아있는 목숨이 1 이상이면 목숨을 하나 줄이고 ball을 재생성
        남아있는 목숨이 없으면 gameover 메시지를 띄우고 게임을 초기화한다
    */
    gameOver(){
        if(hpCount>=1){
            this.container.removeChild(heartArray[hpCount].img);
            hpCount--;
            createBall();
        } else if(hpCount == 0) {
            gameFlag=!gameFlag;
            alert("gameover");
            document.location.reload();
        }
    }
    
    // 스테이지 클리어시 호출될 함수
    gameWin(){
        winCount++;
        if(winCount%2 == 0){ // 2판마다 최대속도가 증가한다
            maxSpeed++; 
        }
        adjTime *= 0.8; // 매판 속도가 빨라지는 간격이 짧아진다
        if(winCount==5){ //모든 스테이지 클리어시 승리화면을 보여준다
            winCount++;
            gameFlag=!gameFlag;
            alert("WINNER!");
            cover.src="./images/end.png";
            cover.style.display="block";
        } else {
            rightPressed = false;
            leftPressed = false;    
            nextStage();
            alert("Stage Clear!");
            gameFlag=!gameFlag;
        }
    }
}