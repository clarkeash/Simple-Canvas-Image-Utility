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

To make sure the image has been loaded before we start editing it we use the `load` function and pass it a callback like so: 

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

###Scaling an image to the largest or smallest dimension.

Sometimes you may not know if you want the width or the height to be set in those cases you can do this:

    im.load(function(){
        this.scaleMaxTo(600);
        this.draw();
    });

This will make the largest dimension of the image 600px and the other dimension will be scaled too (and be smaller);

On the reverse we have:

    im.load(function(){
        this.scaleMinTo(600);
        this.draw();
    });

This will make the smallest dimension of the image 600px and the other dimension will be scaled too (and be larger)