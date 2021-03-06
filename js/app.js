//#region Enemy Section

// Enemies our player must 
class Enemy {
    constructor(xAxis, yAxis) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.x = xAxis;
        this.y = yAxis;
        this.baseSpeed = 50;  // arbitrary base speed to ensure adequate enemy speed

        // randomizes enemy speed by randomly multiplying baseSpeed 
        // with a number between 1 and 5
        this.speed = this.baseSpeed * Math.floor(Math.random() * 5 + 1);
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;

        //ensures that enemy is within the gameboard boundary 
        if(this.x > 505) {
            this.x = -101;
            this.speed = this.baseSpeed * Math.floor(Math.random() * 5 + 1);
        }
        
    }
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//#endregion    

//#region Player Section

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor (xAxis, yAxis) {
        this.sprite = 'images/char-horn-girl.png';
        this.x = xAxis;
        this.y = yAxis;
        this.xInitial = xAxis;      // Initial x-position
        this.yInitial = yAxis;      // Initial y-position 
        this.horizontalStep = 101;  // amount, player's horizontal movement
        this.verticalStep = 83;     // amount, player's vertical movement
        
    }
    reset() {
        this.x = this.xInitial;
        this.y = this.yInitial;
    }

    update() {

        //checking for collision
        for (let enemy of allEnemies) {
            // inspired by 
            // http://blog.sklambert.com/html5-canvas-game-2d-collision-detection
            if(enemy.x < this.x + 65 && enemy.x + 65 > this.x &&
                enemy.y < this.y + 65 && enemy.y + 65 > this.y ) {
                    // resets x & y back to initial positions
                    this.reset();
            }
            if(this.y < 0) {
                this.reset();
            } 

        }
        

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(direction) {
        switch(direction) {
            case 'left':
                if(this.x > 0) {
                    this.x -= this.horizontalStep;
                }
                break;
            case 'up':
                if(this.y > 0) {
                    this.y -= this.verticalStep;
                }
                break;
            case 'right':
                if(this.x < 404) {
                    this.x += this.horizontalStep;
                }
                break;
            case 'down':
                if(this.y < 332) {
                    this.y += this.verticalStep;
                }   
        }

    }

}

//#endregion

//#region Object Instantiation Section

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//centering bug: y-offset +-20 (83)
let firstBug = new Enemy(0, 63),
    secondBug = new Enemy(0, 146),
    thirdBug = new Enemy(0, 229)
    allEnemies = [firstBug, secondBug, thirdBug];


// Place the player object in a variable called player

let player = new Player(202, 405);

//#endregion

//#region Keyup Event Handler Section

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//#endregion
