// 화면에 표시될 목숨 수의 객체
class Heart extends Brick{
    constructor(container, x, y, width, height){
        super(container, x, y, width, height);
        this.img.src="./images/heart.png";
    }
}