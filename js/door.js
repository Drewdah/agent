/*
	Door
*/
function Door( type, x, y )
{
	this.type = type;
	this.x = x;
	this.y = y;
	
	this.sprite = assetMgr.assets['door_' + type];
	
	switch( type )
	{
		case "north":
			
			this.hitbox = [
				{ x: 345, y: 191 },
				{ x: 455, y: 191 },
				{ x: 455, y: 406 },
				{ x: 345, y: 406 }
			];		
			
		break;
		
		case "west":
		
			this.hitbox = [
				{ x: 60, y: 282 },
				{ x: 98, y: 255 },
				{ x: 98, y: 472 },
				{ x: 60, y: 519 }
			];
		
		break;
				
		case "east":
			
			this.hitbox = [
				{ x: 703, y: 256 },
				{ x: 741, y: 281 },
				{ x: 741, y: 519 },
				{ x: 703, y: 471 }
			];		
			
		break;
		
		case "south":
			
			this.hitbox = [
				{ x: 345, y: 595 },
				{ x: 455, y: 595 },
				{ x: 455, y: 605 },
				{ x: 345, y: 605 }
			];		
			
		break;
	
	}
	this.hitbox;
}
Door.inheritsFrom( Entity );

Door.prototype.update = function()
{

}

Door.prototype.draw = function()
{
	game.screen.drawImage( this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
}

Door.prototype.isWithinBoundary = function( x, y )
{
	return isPointInPoly( this.hitbox, {x: x, y: y});
}