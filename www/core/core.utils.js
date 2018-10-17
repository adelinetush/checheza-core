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

        $('body').append('<a class="core-exit-button" onclick="core.startWidget(\''+identifier+'\');"></a>')
    }
}