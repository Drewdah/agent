/*
	Player
*/
function Player( x, y, type)
{
	this.x;
	this.y;
	this.type = type;
	
	this.animation = new Animation(assetMgr.assets['agent_' + type], 30, 60, 0.20, true);
		
	this.facing = "right";
	
	this.walking = false;
	this.running = false;
	this.jumping = false;

	this.walkSpeed = 3;
	this.runSpeed = 6;
	this.jumpSpeed = 6;
	
	this.jumpHeight = 70;
	this.jumpPosition = 0;
	this.jumpLandingY = 0;
	
	this.health = 100;
		
	this.setLocation( x, y );
}
Player.inheritsFrom( Entity );

Player.prototype.draw = function( screen )
{
	if( this.walking )
	{	
		switch ( this.facing )
		{
			case "right":
				this.animation.drawFrame( game.clockTick, game.screen, this.x, this.y, false, 0, game.scale );
			break;
			
			case "left":
				this.animation.drawFrame( game.clockTick, game.screen, this.x, this.y, false, 60, game.scale );
			break;
		}
	} else {
	
		switch ( this.facing )
		{
			case "right":
				this.animation.drawFrame( game.clockTick, game.screen, this.x, this.y, 30, 0, game.scale );			
			break;
			
			case "left":
				this.animation.drawFrame( game.clockTick, game.screen, this.x, this.y, 30, 60, game.scale );
			break;
		}
	}
	
	this.walking = false;
}

Player.prototype.update = function()
{	
	// If he's jumping
	if( this.jumping )
	{   
		// Set the landing y
		if( this.jumpLandingY == 0 )
		{
			this.jumpLandingY = this.y;
		}
		
		// the last position on the sine wave
		var lastHeight = this.jumpPosition;
		
		// the new position on the sine wave
		this.jumpPosition += this.jumpSpeed * game.clockTick;

		//if (this.jumpPosition >= Math.PI)
		//{
			//this.y += this.jumpHeight / this.jumpSpeed * game.clockTick;
		//} else {
			this.y -= (Math.sin(this.jumpPosition) - Math.sin(lastHeight)) * this.jumpHeight;
		//}
		
		//console.log( this.jumpLandingY, this.y );
			
		// Land!
		if( this.y >= this.jumpLandingY)
		{
			this.y = this.jumpLandingY;
			this.jumping = false;
			this.jumpPosition = 0;
			this.jumpLandingY = 0;
			
			assetMgr.sounds['player_land'].play({ volume: 50 });
		}
		
	}	
	// Respond to key events
	this.checkInput();
}

Player.prototype.checkInput = function()
{
	// Right
	if( game.keys['39'] )
	{
		var speed = ( game.keys['39'].doublePress ) ? this.runSpeed : this.walkSpeed;

		this.moveRight( speed );
	};
	
	// Left
	if( game.keys['37'])
	{	
		var speed = ( game.keys['37'].doublePress ) ? this.runSpeed : this.walkSpeed;

		this.moveLeft( speed );
	};
	
	// Up
	if( game.keys['38'])
	{
		var speed = ( game.keys['38'].doublePress ) ? this.runSpeed : this.walkSpeed;

		this.moveUp( speed );
	};
	
	// Down
	if( game.keys['40'])
	{
		var speed = ( game.keys['40'].doublePress ) ? this.runSpeed : this.walkSpeed;

		this.moveDown( speed );
	};

	// Jump
	if( game.keys['32'])
	{
		this.jump();
	}
}

Player.prototype.setLocation = function( x, y ) 
{
	this.x = x;
	this.y = y - (60 * game.scale);
}

Player.prototype.moveRight = function( speed )
{
	var currentX = this.x + (30 * game.scale);
	var currentY = this.y + (60 * game.scale);
	
	if( game.currentRoom.isWithinBoundary( currentX + speed, currentY - 10 ) && game.currentRoom.isWithinBoundary( this.x, currentY ) )
	{
		this.x = this.x + speed;
	}
	else
	{
		for( var i=0; i<game.currentRoom.doors.length; i++ )
		{
			var door = game.currentRoom.doors[i];
			
			// If the player collides with a door
			if( door.isWithinBoundary( currentX + speed, currentY - 10 ) )
			{	
				if( door.type == "east" )
				{
					game.setRoom( game.currentRoom.config[door.type] );	
					game.currentPlayer.setLocation(100, currentY);
					
					break;
				}
			}
		}
	}
	
	this.facing = "right";
	this.walking = true;		
}

Player.prototype.moveLeft = function( speed )
{
	var currentX = this.x;
	var currentY = this.y + (60 * game.scale);
			
	if( game.currentRoom.isWithinBoundary( currentX - speed, currentY - 10 ) && game.currentRoom.isWithinBoundary( this.x, currentY ) )
	{
		this.x = this.x - speed;
	}
	else
	{
		for( var i=0; i<game.currentRoom.doors.length; i++ )
		{
			var door = game.currentRoom.doors[i];
			
			// If the player collides with a door
			if( door.isWithinBoundary( currentX - speed, currentY - 10) )
			{	
				if( door.type == "west" )
				{
					game.setRoom( game.currentRoom.config[door.type] );
					game.currentPlayer.setLocation( 620, currentY);
					
					break;
				}
			}
		}
	}
	
	this.facing = "left";
	this.walking = true;
}

Player.prototype.moveUp = function( speed )
{
	var currentX = (this.facing == "right") ? this.x + (30 * game.scale) : this.x;
	var currentY = this.y + (60 * game.scale) - 10;
	
	if( game.currentRoom.isWithinBoundary( currentX, currentY - speed) && game.currentRoom.isWithinBoundary( this.x, currentY ) && !this.jumping)
	{
		this.y = this.y - speed;
	}
	else
	{			
		for( var i=0; i<game.currentRoom.doors.length; i++ )
		{
			var door = game.currentRoom.doors[i];
			
			var xCenter = (this.facing == "right") ? currentX - (15 * game.scale) : currentX + (15 * game.scale);
			
			// If the players xCenter and Y collides with a door
			if( door.isWithinBoundary( xCenter , currentY - speed) )
			{		
				if( door.type == "north" )
				{
					game.setRoom( game.currentRoom.config[door.type] );
					game.currentPlayer.setLocation( this.x, 590);
					
					break;					
				}
			}
		}
	}
	
	this.walking = true;
}

Player.prototype.moveDown = function( speed )
{
	var currentX = (this.facing == "right") ? this.x + (30 * game.scale) : this.x;
	var currentY = this.y + (60 * game.scale) - 10;
		
	if( game.currentRoom.isWithinBoundary( currentX, currentY + speed) && game.currentRoom.isWithinBoundary( this.x, currentY ) )
	{
		this.y = this.y + speed;
	}
	else
	{						
		for( var i=0; i<game.currentRoom.doors.length; i++ )
		{
			var door = game.currentRoom.doors[i];
			
			var xCenter = (this.facing == "right") ? currentX - (15 * game.scale) : currentX + (15 * game.scale);

			// If the player collides with a door
			if( door.isWithinBoundary( xCenter, currentY + speed) )
			{						
				if( door.type == "south" )
				{
					game.setRoom( game.currentRoom.config[door.type] );
					game.currentPlayer.setLocation( this.x, 415);
				
					break;
				}
			}
		}
	}
	
	this.walking = true;
}

Player.prototype.jump = function( )
{
	if(!this.jumping)
	{
		this.jumping = true;
		
		assetMgr.sounds['player_jump'].play({ volume: 50 });		
	}
}