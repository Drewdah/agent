/*
	Animation
*/
function Animation( spriteSheet, frameWidth, frameHeight, frameDuration, loop )
{
	this.spriteSheet = spriteSheet;
	this.frameWidth = frameWidth;
	this.frameHeight = frameHeight;
	this.frameDuration = frameDuration;
	this.loop = loop;
	
	this.totalTime = ( this.spriteSheet.width / this.frameWidth ) * this.frameDuration;
	
	this.elapsedTime = 0;
}

Animation.prototype.drawFrame = function( time, screen, x, y, xOffset, yOffset, scale )
{
	var scale = scale || 1;
	
    this.elapsedTime += time;
	
    if (this.loop) {
        if (this.isDone()) {
            this.elapsedTime = 0;
        }
    } else if (this.isDone()) {
        return;
    }
	
	var offsetTop = yOffset;
	var offsetLeft = (xOffset === false) ? this.currentFrame()*this.frameWidth : xOffset ;
			
    screen.drawImage(this.spriteSheet, offsetLeft, offsetTop, this.frameWidth, this.frameHeight, x, y, this.frameWidth*scale, this.frameHeight*scale);
}

Animation.prototype.isDone = function()
{
	 return (this.elapsedTime >= this.totalTime);
}

Animation.prototype.currentFrame = function()
{
	return Math.floor(this.elapsedTime / this.frameDuration);
}