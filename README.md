Simple Canvas Image Utility
===========================

A very simplistic utility for cropping, resizing and drawing images to the canvas.

##Usage:

###Including the library


    <body>
        <canvas id="test-canvas" width="800" height="800"></canvas>
    
        <script src="ImageManager.js"></script>
        <script>
            // code here!
        </script>
    </body>

###Initialisation

The ImageManager constructor takes 2 arguments, first is the image path, and the second is the canvas id that you wish to draw to.
Inside your script tag, or seperate JS file, you can initialise the ImageManager like so:


    var im = new ImageManager('images/your-image.jpg', 'test-canvas');

###Load

To make sure the image has been loaded before we start editing it we use the `load` function and pass it a call back like so: 

    im.load(function(){
        // do everything else here
    });

###Scaling an image down

We can scale an image down to a set width with the `scaleWidthTo(value)` method:


    im.load(function(){
        this.scaleWidthTo(600);
        this.draw();
    });

The `draw()` method renders the image onto the canvas.

Similarly we can scale to a set height with `scaleHeightTo(value)`:

    im.load(function(){
        this.scaleHeightTo(600);
        this.draw();
    });
