/*
	Player Card
*/
function PlayerCard( player, number)
{
	this.x = 48;
	this.y = 32;
	this.player = player;
	
	this.sprite = assetMgr.assets['player_card'];
	
	this.avatar = assetMgr.assets['agent_' + this.player.type + '_avatar'];
		
}
PlayerCard.inheritsFrom( Entity );

PlayerCard.prototype.update = function()
{

}

PlayerCard.prototype.draw = function()
{
	game.screen.drawImage( this.sprite, this.x, this.y, this.sprite.width, this.sprite.height);
	game.screen.drawImage( this.avatar, this.x - 5, this.y - 18, this.avatar.width, this.avatar.height);
	
	this.drawName();
}

PlayerCard.prototype.drawName = function()
{
	game.screen.font = "bold 14px Arial";
	game.screen.textAlign = "left";
	game.screen.textBaseline = "bottom";
	game.screen.fillText("Agent " + this.player.type , 110, 50);
}