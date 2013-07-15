<!DOCTYPE html>
<html>

	<head>
		<title>Agent</title>
			
		<script src="js/soundmanager2.js"></script>
		<script src="js/core.js"></script>
		<script src="js/timer.js"></script>
		<script src="js/game.js"></script>
		<script src="js/entity.js"></script>
		<script src="js/map.js"></script>
		<script src="js/door.js"></script>
		<script src="js/furniture.js"></script>
		<script src="js/room.js"></script>
		<script src="js/assetMgr.js"></script>
		<script src="js/animation.js"></script>
		<script src="js/player.js"></script>
		<script src="js/playerCard.js"></script>		
		
	</head>

	<body bgcolor="black">

		<canvas id="screen" width="800" height="600" style="border: 1px solid gray"></canvas>
		
		<script>
			
			var assetMgr = new AssetManager();
			var game = new GameEngine();
			
			window.onload = function()
			{				
				// Show loading
				game.showLoadingScreen();
				
				// Load all images
				assetMgr.loadAssets(function(){
					
					// Load all sounds
					assetMgr.loadSounds( function()
					{					
						var map1 = new Map(
							[
								{ // 0
									type : 1, 
									north : 3,
									east : 1,
									south : null,
									west : null,
									furniture : [
										{ 
											type: 'desk_left',
											x : 126,
											y : 345
										}
									]
								},
								{ // 1
									type : 2, 
									north : null,
									east : 2,
									south : null,
									west : 0
								},
								{ // 2
									type : 1, 
									north : 5,
									east : null,
									south : null,
									west : 1
								},
								{ // 3
									type : 1, 
									north : null,
									east : 4,
									south : 0,
									west : null
								},
								{ // 4
									type : 2, 
									north : 6,
									east : 5,
									south : null,
									west : 3
								},
								{ // 5
									type : 1, 
									north : null,
									east : null,
									south : 2,
									west : 4
								},
								{ // 6
									type : 2, 
									north : 7,
									east : null,
									south : 4,
									west : null
								},
								{ // 7
									type : 2, 
									north : null,
									east : null,
									south : 6,
									west : null
								}
							]
						)
						
						// Set the map
						game.setMap( map1 );
												
						// Create a player
						game.createPlayer("red");
						
						// Start the game
						game.start();
						
						// Play level music						
						assetMgr.sounds['music2'].play({ loops: 10});
					
					});
					
				});
			}

		</script>
		
	</body>

</html>