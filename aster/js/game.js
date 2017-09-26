window.onload = function(){
    Game.init();
};

VAR = {
    fps:60,
    W:0,
    H:0,
    lastTime:0,
    lastUpdate:-1,
    rand:function(min,max){
		return Math.floor(Math.random()*(max-min+1))+min;
    }
};

Game = {
    init:function(){
        Game.canvas = document.createElement('canvas');
        Game.ctx= Game.canvas.getContext('2d');
        Game.hit_canvas = document.createElement('canvas');
        Game.hit_ctx= Game.hit_canvas.getContext('2d');
        Game.layout();
        
        window.addEventListener('resize', Game.layout, false);
        
        document.body.appendChild(Game.canvas);
        
        for(var i=0; i<5; i++){
            new Rock(2);
        }
        Game.ship = new Ship();
        
        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);
        
        Game.animationLoop();
    },
    stop:function(){
        window.removeEventListener('keydown', Game.onKey, false);
        window.removeEventListener('keyup', Game.onKey, false);
    },
    onKey:function(ev){
        if(ev.keyCode==32||ev.keyCode==38||ev.keyCode==37||ev.keyCode==39)
            {
                ev.preventDefault();
                if(ev.type=='keydown' && !Game['key_'+ev.keyCode]){
                    Game['key_'+ev.keyCode]=true;
                    
                    if(ev.keyCode==37){
                        Game.key_39 = false;
                    }else if(ev.keyCode==39){
                        Game.key_37 = false;
                    }else if(ev.keyCode==32){
                        new Bullet();
                    }
                }else if(ev.type=='keyup'){
                    Game['key_'+ev.keyCode] = false;
                }
            }
        
    },
    layout:function(ev){
        VAR.H = window.innerHeight;
        VAR.W = window.innerWidth;
        //
        VAR.d = Math.min(VAR.W,VAR.H);
        //
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;
        //
        Game.hit_canvas.width = VAR.W;
        Game.hit_canvas.height = VAR.H;
        //
        Game.hit_ctx.fillStyle = 'red';
        Game.ctx.fillStyle = 'white';
        Game.ctx.strokeStyle = 'white';
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = 'round';
        
       
    },
    animationLoop:function(time){
        requestAnimationFrame (Game.animationLoop);
        if(time-VAR.lastTime>=1000/VAR.fps){
            VAR.lastTime =time;
            //console.log("loop");
            Game.ctx.clearRect(0,0,VAR.W,VAR.H);
            Rock.draw();
            Game.ship.draw();
            Bullet.draw();
            Dot.draw();
        }
    }
};