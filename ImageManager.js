/**
 * Author: Ashley Clarke
 * Copyright: 2014
 *
 * Allows editing of images using
 * canvas, built using the facade pattern.
 */

var ImageManager = function(src, canvasId){
    
    // construct
    function init(){
        // real canvas
        _private.canvas = document.getElementById(canvasId);
        _private.context = _private.canvas.getContext('2d');

        // secret canvas
        _secretCanvas.canvas = document.createElement('canvas');
        _secretCanvas.context = _secretCanvas.canvas.getContext('2d');

        // other initialisation
        _private.image = new Image();
        _private.image.src = src;
    }

    // private
    var _secretCanvas = {
        source: {x:0, y:0, width:0, height:0},
        dest: {x:0, y:0, width:0, height:0},
        draw: function(data){
            this.clear();
            this.context.drawImage(data, 
                this.source.x, this.source.y, this.source.width, this.source.height,
                this.dest.x, this.dest.y, this.dest.width, this.dest.height
            );
        },
        setSize: function(width, height){
            this.source.width = this.dest.width = width;
            this.source.height = this.dest.height = height;
            // more than compensates for rotation
            this.canvas.width = width + height;
            this.canvas.height = width + height;
        },
        clear: function(){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // private
    var _private = {
        source: {x:0, y:0, width:0, height:0}, // prob wont use
        dest: {x:0, y:0, width:0, height:0},
        scale: 1,
        load: function(callback){
            var self = this;
            this.image.onload = function(){
                _secretCanvas.setSize(self.image.width, self.image.height);
                _secretCanvas.draw(self.image);
                callback.call(public);
            }
        },
        draw: function(){
            this.context.drawImage(_secretCanvas.canvas, 0, 0);
        },
        scaleWidthTo: function(value){
            this.scale = _secretCanvas.source.width / value;
            _secretCanvas.dest.width = _secretCanvas.source.width / this.scale;
            _secretCanvas.dest.height = _secretCanvas.source.height / this.scale;
            _secretCanvas.draw(this.image);
        },
        scaleHeightTo: function(value){
            this.scale = _secretCanvas.source.height / value;
            _secretCanvas.dest.width = _secretCanvas.source.width / this.scale;
            _secretCanvas.dest.height = _secretCanvas.source.height / this.scale;
            _secretCanvas.draw(this.image);
        },
        cropRight: function(value){
            _secretCanvas.source.width = value * this.scale;
            _secretCanvas.dest.width = value;
            _secretCanvas.draw(this.image);
        },
        cropLeft: function(value){
            _secretCanvas.source.x = _secretCanvas.source.width - (value * this.scale);
            _secretCanvas.source.width = value * this.scale;
            _secretCanvas.dest.width = value;
            _secretCanvas.draw(this.image);
        },
        cropBottom: function(value){
            _secretCanvas.source.height = value * this.scale;
            _secretCanvas.dest.height = value;
            _secretCanvas.draw(this.image);
        },
        cropTop: function(value){
            _secretCanvas.source.y = _secretCanvas.source.height - (value * this.scale);
            _secretCanvas.source.height = value * this.scale;
            _secretCanvas.dest.height = value;
            _secretCanvas.draw(this.image);
        },
        cropWidth: function(value){
            _secretCanvas.source.x = (_secretCanvas.source.width - value * this.scale)/2;
            _secretCanvas.source.width = value * this.scale;
            _secretCanvas.dest.width = value;
            _secretCanvas.draw(this.image);
        },
        cropHeight: function(value){
            _secretCanvas.source.y = (_secretCanvas.source.height - value * this.scale)/2;
            _secretCanvas.source.height = value * this.scale;
            _secretCanvas.dest.height = value;
            _secretCanvas.draw(this.image);
        }
    }

    // initialise the awesome!
    init();

    // public
    var public =  {
        load: function(callback){
            return _private.load(callback);
        },
        draw: function(){
            _private.draw();
        },
        scaleWidthTo: function(value){
            _private.scaleWidthTo(value);
            return this;
        },
        scaleHeightTo: function(value){
            _private.scaleHeightTo(value);
            return this;
        },
        scaleMaxTo: function(value){
            if (_private.image.width > _private.image.height) {
                this.scaleWidthTo(value);
            }else{
                this.scaleHeightTo(value);
            }
            return this;
        },
        scaleMinTo: function(value){
            if (_private.image.width < _private.image.height) {
                this.scaleWidthTo(value);
            }else{
                this.scaleHeightTo(value);
            }
            return this;
        },
        cropRight: function(value){
            _private.cropRight(value);
            return this;
        },
        cropLeft: function(value){
            _private.cropLeft(value);
            return this;
        },
        cropBottom: function(value){
            _private.cropBottom(value);
            return this;
        },
        cropTop: function(value){
            _private.cropTop(value);
            return this;
        },
        cropWidth: function(value){
            _private.cropWidth(value);
            return this;
        },
        cropHeight: function(value){
            _private.cropHeight(value);
            return this;
        },
        square: function(value){
            this.scaleMinTo(value);
            this.cropHeight(value);
            this.cropWidth(value);
            return this;
        }
    }

    return public;
}
