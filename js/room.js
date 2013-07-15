/*
	Room
*/
function Room( config )
{
	this.x = 0;
	this.y = 0;
	this.config = config;
	
	this.sprite = assetMgr.assets['room' + config.type];
	
	this.hitbox = [
		{ x: 0, y: 600 },
		{ x: 150, y: 400 },
		{ x: 650, y: 400 },
		{ x: 800, y: 600 }
	];
	
	this.doors = new Array();
	this.furniture = new Array();
	
	this.createDoors();
	this.createFurniture();
	
}
Room.inheritsFrom( Entity );

Room.prototype.update = function()
{

}

Room.prototype.draw = function()
{
	if( game.currentRoom == this )
	{
		game.screen.drawImage( this.sprite, this.x, this.y, this.sprite.width , this.sprite.height);
		
		for( var i=0; i<this.doors.length; i++ )
		{
			this.doors[i].draw();
		}
		
		for( var i=0; i<this.furniture.length; i++ )
		{
			this.furniture[i].draw();
		}
	}
}

Room.prototype.isWithinBoundary = function( x, y )
{
	var collision = false;
	
	// check room boundary
	if( isPointInPoly( this.hitbox, {x: x, y: y} ) )
	{
		collision = true;
	}
	
	// check furniture
	for(var i in this.furniture)
	{
		var furniture = this.furniture[i];
		
		if( isPointInPoly( furniture.hitbox, {x: x, y: y} ) )
		{			
			collision = false;
		}
	}
	
	return collision;
}

Room.prototype.createDoors = function()
{
	if( this.config.north !== null )
	{
		this.doors.push( 
			new Door("north", 345,191)
		);
	}
	
	if( this.config.east !== null )
	{
		this.doors.push( 
			new Door("east", 704,256)
		);
	}
	
	if( this.config.west !== null )
	{
		this.doors.push( 
			new Door("west", 60,256) 
		);
	}

	if( this.config.south !== null )
	{
		this.doors.push( 
			new Door("south", 345,595) 
		);
	}

}

Room.prototype.createFurniture = function()
{
	if( this.config.furniture !== null )
	{
		for( var i in this.config.furniture )
		{
			var furniture = this.config.furniture[i];
			
			this.furniture.push( 
				new Furniture( furniture.type, furniture.x, furniture.y )
			);
		}
	}
}
