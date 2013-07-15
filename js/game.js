/*
	Game Engine
*/
function GameEngine() 
{
	this.entities = [];
	
	// Grab the canvas context
	this.canvas = document.getElementById("screen");
	this.screen = this.canvas.getContext("2d"); 
	
	this.scale = 3.5;
	
	this.currentMap;
	this.currentRoom;
	this.currentPlayer;
	
	this.timer = new Timer();

	// Input
	this.click;
	this.mouse;
	this.keys = {};
	this.keysHistory = {};
	
}

GameEngine.prototype.start = function()
{
	// Game start
	console.log("starting game");
		
	var _this = this;
	
	this.startInput();
	
	// First draw
	(function gameLoop(){
		_this.loop();
		window.requestAnimFrame( gameLoop, _this.screen );
	})();	
}

// Show loading screen
GameEngine.prototype.showLoadingScreen = function()
{
	var img = document.createElement("img");
	img.onload = function(screen)
	{
		return function()
		{
			screen.drawImage( this, 0, 0, 800, 600 );
		}
		
	}(this.screen)
	img.src = "assets/loading.png";
}

// Listen for user input
GameEngine.prototype.startInput = function()
{
	var _this = this;
	
	this.canvas.addEventListener("click", function(e){
		_this.click = { x : e.clientX, y : e.clientY };
	}, false);
	
	this.canvas.addEventListener("mousemove", function(e){
		_this.mouse = { x : e.clientX, y : e.clientY };
	}, false);
	
	document.addEventListener("keydown", function(e){
		
		// If the key isnt alreay being held
		if(!_this.keys[e.keyCode])
		{
			var lastPressedTime = new Date().getTime() - _this.keysHistory[e.keyCode];

			var doublePress = ( lastPressedTime < 200 ) ? true : false;
			
			// Mark the key as pressed
			_this.keys[e.keyCode] = { ctrl : e.ctrlKey, shift : e.shiftKey, doublePress: doublePress };

			// Mark the keys history
			_this.keysHistory[e.keyCode] = new Date().getTime();
		}

	}, false);
	
	document.addEventListener("keyup", function(e){
		delete _this.keys[e.keyCode];
	}, false);
	
}

// Add new entities to loop
GameEngine.prototype.addEntity = function( entity )
{
	this.entities.push( entity );
	
	return entity;
}

// Update entities drawing
GameEngine.prototype.update = function()
{
	var entitiesLength = this.entities.length;
	
	for(var i = 0; i < entitiesLength; i++)
	{
		this.entities[i].update(this.screen);
	}
}

// Draw each entity to the screen
GameEngine.prototype.draw = function()
{
	this.screen.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.screen.save();

	var entitiesLength = this.entities.length;
	
	for(var i = 0; i < entitiesLength; i++)
	{
		this.entities[i].draw(this.screen);
	}
	
	this.screen.restore();
}

// Actual game loop
GameEngine.prototype.loop = function()
{
	this.clockTick = this.timer.tick();
	this.update();
	this.draw();
	this.click = null;
}

// Set the current player
GameEngine.prototype.setPlayer = function( player, number )
{
	this.currentPlayer = player;
}

// Create a player
GameEngine.prototype.createPlayer = function( type )
{
	// Create a new player
	var player = game.addEntity( new Player( 100, 510, type));
	var playerCard = game.addEntity(new PlayerCard( player, 1));
	
	this.setPlayer( player, 1);
	
	player.setLocation(100, 510);
}


// Set the current map
GameEngine.prototype.setMap = function( map )
{
	this.currentMap = map;
	
	this.setRoom( 0 );
}

// Set the current room
GameEngine.prototype.setRoom = function( index )
{
	this.currentRoom = this.currentMap.rooms[ index ];
}