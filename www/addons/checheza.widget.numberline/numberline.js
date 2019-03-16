class Numberline extends Widget { 

    constructor(specification) {
        super(specification);

        this.sliderTouchOptions = {};
        this.numberOfBlocks = 0;
    }

    preinit() {
        core.utils.adjustAspectRatio();
        core.utils.addExitButton();

        
        core.utils.addSky('partly-cloudy'); // Partly cloudy
        core.utils.setSkyColor("#4488ff"); //
    }

    initialize() {
        // Initialize slider
        this.slider = document.getElementById("slider");
        
        // Initialize touch event object on slider
        this.sliderTouchEvent = new Hammer(this.slider, this.sliderTouchOptions);

        // Handle touch events on slider
        this.sliderTouchEvent.on('pan', (e) => { this.handlePanEvent(e); })
    }


    deinit() { 

    }

    handlePanEvent(event) {


        // Get the position of the slider on screen
        let sliderPositionX = parseFloat(this.slider.offsetLeft) + parseFloat(window.getComputedStyle(this.slider).paddingLeft);

        // Get the width of a block
        let blockWidth = parseFloat(window.getComputedStyle(core.getActiveWidget().slider).width) / 10;

        // Calculate the number of blocks that is to be placed on the slider
        let n = parseInt( ( event.center.x - sliderPositionX ) / blockWidth);
        console.log("this is called now");
        // If the number of blocks have not changed, do not setBlocks (re-render with n blocks)
        if ( n !== this.numberOfBlocks ) {
            console.log("this is only called now")
            this.setBlocks(n);
        }

    }

    setBlocks(numberOfBlocks) {

        // Restrict n blocks to 10
        this.numberOfBlocks = numberOfBlocks < 10 ? numberOfBlocks: 10;

        // add n blocks to blocksHtml
        let blocksHtml = "";
        for (let i = 0; i < this.numberOfBlocks; i++) { 
            blocksHtml+= '<div class="block"></div>';
        }
        
        // Add n blocks to DOM
        this.slider.innerHTML = blocksHtml;

    }
}