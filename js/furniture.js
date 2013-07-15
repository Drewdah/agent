/*
	Furniture
*/
function Furniture( type, x, y )
{
	this.type = type;
	this.x = x;
	this.y = y;

	this.sprite = assetMgr.assets['furniture_' + type];
	
	switch( type )
	{
		case "desk_left":
			
			this.hitbox = [
				{ x: 150, y: 345 },
				{ x: 319, y: 345 },
				{ x: 319, y: 400 },
				{ x: 300, y: 432 },
				{ x: 128, y: 432 },
				{ x: 128, y: 364 }
			];		
			
		break;	
	}
	this.hitbox;
}
Furniture.inheritsFrom( Entity );

Furniture.prototype.update = function()
{

}

Furniture.prototype.draw = function()
{
	game.screen.drawImage( this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
}

Furniture.prototype.isWithinBoundary = function( x, y )
{
	return isPointInPoly( this.hitbox, {x: x, y: y});
}