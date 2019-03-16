class CoreUtils {

    /**
     * @ignore
     * Skip constructor
     */
    constructor() {
		console.info("CORE: Instantiated core.utils");
    }

    /**
     * @return {boolean} A boolean that is true if running on phone and false if running on a desktop computer
     * @example if core.utils.isPhone()
     *              console.log("Running on a phone");
     */
    isPhone() {
        return (window.cordova || window.PhoneGap || window.phonegap)
            && /^file:\/{3}[^\/]/i.test(window.location.href)
            && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    }


    /**
     * @example core.utils.makeZoomable(); // Enables viewport zoom. (phone devices)
     */
    makeZoomable() {
        $('meta[name=viewport]').remove();
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">' );
    }


    /**
     * @param {string} identifier - the widget identifier that you want to exit to
     * @example core.utils.addExitButton('checheza.main.treehouse') // Spawns button that if clicked, exits to treehouse
     */    
    addExitButton (identifier) {
        if(identifier === undefined)
            identifier = "checheza.main.treehouse";

        $('#core_app_container').append('<a class="core-exit-button fadeIn animated" onclick="core.startWidget(\''+identifier+'\');"></a>')
    }

    adjustAspectRatioFor(boxElem) { 
        var outer = $('#core_container');
        var box = $(boxElem);

            if (outer.height() > outer.width() * 0.5625) {
                box.css({'width': '100%'});
                box.css({'height': box.width() * 0.5625});

            } else {
                box.css({'height': '100%'});
                box.css({'width': box.height() / 0.5625});
            }
        
    }

    adjustAspectRatio() {   
        this.adjustAspectRatioFor("#core_app_container");
        this.adjustAspectRatioFor("#core_background_container");
    }

    setSkyColor(colorCode) { 
        $('.sky').css('backgroundColor', colorCode);
    }

    addSky(weather) {
        var backgroundElem = $("#core_background_container");

        switch(weather) {
            case 'partly-cloudy':
                backgroundElem.prepend('<div class="sky"><div class="cloud_1 animate very-slow move-left infinite"></div><div class="cloud_2 animate very-slow move-right infinite"></div></div>');
                break;
        }
    }
}