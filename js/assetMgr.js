/*
	Asset Manager
*/
function AssetManager() 
{
	this.assetQueue = new Array();
	this.soundQueue = new Array();
	
	this.assets = new Object();
	this.sounds = new Object();
}

AssetManager.prototype.queueAsset = function( name, path )
{
	this.assetQueue.push({ 'name' : name, 'path' : path });
}

AssetManager.prototype.loadAssets = function( callback )
{
	// Load assets
	this.queueAsset('agent_blue','assets/agent_blue.png');
	this.queueAsset('agent_blue_avatar','assets/agent_blue_avatar.png');
	this.queueAsset('agent_red','assets/agent_red.png');
	this.queueAsset('agent_red_avatar','assets/agent_red_avatar.png');
	this.queueAsset('player_card','assets/player_card.png');
	this.queueAsset('room1','assets/room1.png');
	this.queueAsset('room2','assets/room2.png');
	this.queueAsset('door_north','assets/door_north.png');
	this.queueAsset('door_south','assets/door_south.png');
	this.queueAsset('door_west','assets/door_west.png');
	this.queueAsset('door_east','assets/door_east.png');
	this.queueAsset('furniture_desk_left','assets/furniture_desk_left.png');
	
	var queueLength = this.assetQueue.length;
	var loadedAssets = queueLength;
	
	// Loaded asset callback
	function assetLoaded()
	{
		loadedAssets--;
		
		if(loadedAssets == 0)
		{
			callback();
		}
	}
	
	// Loop through all the assets
	for(var i = 0; i < queueLength; i++)
	{			
		var asset = this.assetQueue[i];
		
		this.assets[asset.name] = new Image();
		this.assets[asset.name].src = asset.path;
		this.assets[asset.name].onload = function(asset) {
		
			return function(){
				// Do something			
				console.log("loaded asset", asset.name);
				
				assetLoaded();
			}
			
		}(asset);
	}	
}

// Queue a sound to be downloaded
AssetManager.prototype.queueSound = function( name, path )
{
	this.soundQueue.push({ 'name' : name, 'path' : path });
}

AssetManager.prototype.loadSounds = function( callback )
{
	// Load sounds
	this.queueSound('music1','sounds/music1.mp3');
	this.queueSound('music2','sounds/music2.mp3');
	this.queueSound('player_jump','sounds/player_jump.wav');
	this.queueSound('player_land','sounds/player_land.wav');	

	var queueLength = this.soundQueue.length;
	var loadedSounds = queueLength;
	
	// Loaded sound callback
	function soundLoaded()
	{
		loadedSounds--;
		
		if(loadedSounds == 0)
		{
			callback();
		}
	}
	
	var _this = this;
	
	soundManager.onready(function() {
		
		// Loop through all the sounds
		for(var i = 0; i < queueLength; i++)
		{				
			var sound = _this.soundQueue[i];

			_this.sounds[sound.name] = soundManager.createSound({
				id: sound.name,
				autoLoad: true,
				url: sound.path,
				onload: function(sound) {
					return function()
					{
						console.log("loaded sound " + sound.name);
					
						soundLoaded();
					}
				}(sound)
			});
		}
	
	});
	

	
}