        /* 랜덤값을 재사용하기 위한 함수*/
        function getRandom(n){
            return parseInt(Math.random()*n); // 0~1미만의 소수점들
        }

        /* 범위가 있는 랜덤값 */
        function getRandomWithRange(min, max){
            var result = min+parseInt(Math.random()*(max-min+1)); // 0~1미만의 소수점들
            return result;
        }
        
        /* 범위가 있는 float 랜덤값 */
        function getRandomFloatWithRange(min, max){
            var result = min+parseFloat(Math.random()*(max-min+1)); // 0~1미만의 소수점들
            return result;
        }

        /*------------------------------------------------------------------------
        게임 개발시 사용될 충돌 체크 함수
        -------------------------------------------------------------------------*/
        function collisionCheck(me, you){
            let result1 = (me.y + me.height >= you.y) && (me.x + me.width >= you.x); //북서쪽
            let result2 = (me.x + me.width >= you.x) && (me.y <= you.y + you.height); //남서쪽
            let result3 = (me.x <= you.x + you.width) && (me.y + me.height >= you.y); //북동쪽
            let result4 = (me.x <= you.x + you.width) && (me.y <= you.y + you.height); //남동쪽
            return result1&&result2&&result3&&result4;
        }
              