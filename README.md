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

###Cropping

There are 4 basic cropping methods all work in the same way: 

    im.load(function(){
        this.cropRight(600);
        this.draw();
    });

Above we are using the `cropRight()` method, this will remove everything on the `right` side of the image leaving the leftmost 600px.

####Cropping methods

* `cropRight()`
* `cropLeft()`
* `cropBottom()`
* `cropTop()`

Further cropping, sometimes you may wish to crop the same amount from both sides and leave the part in the middle we can do that with:

####Cropping methods

* `cropWidth()` removes an equal amount left & right
* `cropHeight()` removes an equal amount top & bottom

These methods can be used like so:

    im.load(function(){
        this.cropHeight(600);
        this.draw();
    });

##Real Example

Lets say you have an image loaded in from another services (Flickr etc), and you want to resize it for your application, and you want a nice 500px square showing as much of the image as possible. 

It would be really simple:

The first thing you want to do is scale down your image so the smallest side 500px with `scaleMinTo()`

    im.load(function(){
        // set smallest side to 500px
        this.scaleMinTo(500);
        
    });

Now if the image is portrait we can use `cropHeight()` like so to remove the top and bottom parts

    im.load(function(){
        // set smallest side to 500px
        this.scaleMinTo(500);
        
        // removes same amount from top and bottom
        this.cropHeight(500);
    });

However if the image is landscape we will want to use `cropWidth()` to remove the left and right parts, but how do we know? 

We dont need to know we can just do both like this:

    im.load(function(){
        // set smallest side to 500px
        this.scaleMinTo(500);
        
        // removes same amount from top and bottom
        this.cropHeight(500);

        // removes same amount from left and right
        this.cropWidth(500);
    });

The reason we can just do both is if the image is portrait, then its width will already be 500px from using `scaleMinTo()` so using `cropWidth()` will have no effect.

The last thing left to do is `draw()` the image to the canvas.

    im.load(function(){
        // set smallest side to 500px
        this.scaleMinTo(500);
        
        // removes same amount from top and bottom
        this.cropHeight(500);

        // removes same amount from left and right
        this.cropWidth(500);

        // draw to canvas
        this.draw();
    });

You can combine all these methods into one line to make things a bit cleaner:

    im.load(function(){
        this.scaleMinTo(500).cropHeight(500).cropWidth(500).draw();
    });

To clean things up even further you can use the built in `square()` method which we just replicated:

    im.load(function(){
        this.square(500).draw();
    });

Contributions
=================

This mini library was built for my own needs, however if you spot any errors or have any suggestions please create an issue or pull request and I will be happy to help.
