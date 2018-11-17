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
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">' );
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

    adjustAspectRatio() {   
        var outer = $('#core_container');
        var box = $('#core_app_container');

        if (outer.height() > outer.width() * 0.5625) {
            box.css({'width': '100%'});
            box.css({'height': box.width() * 0.5625});

        } else {
            box.css({'height': '100%'});
            box.css({'width': box.height() / 0.5625});
        }
            
    }
}