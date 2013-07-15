/*
	Map
*/
function Map( rooms )
{
	this.x = 0;
	this.y = 0;

	this.rooms = new Array();
	
	this.createRooms( rooms );
}

Map.prototype.createRooms = function( rooms )
{	
	for( var i = 0; i < rooms.length; i++ )
	{
		this.addRoom( rooms[i] );
	}
}

Map.prototype.addRoom = function( room )
{
	this.rooms.push( game.addEntity( new Room( room ) ) );
}