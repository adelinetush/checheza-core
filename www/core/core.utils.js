class CoreUtils {

    constructor() {
		console.info("CORE: Instantiated core.utils");
    }

    /**
     * Static method to check if the application is running on a phone or in browser.
     * 
     * return values: true/false
     *  - true: running in phone
     *  - false: running in browser
     */
    isPhone() {
        return (window.cordova || window.PhoneGap || window.phonegap)
            && /^file:\/{3}[^\/]/i.test(window.location.href)
            && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
    }

    makeZoomable() {
        $('meta[name=viewport]').remove();
		$('head').append('<meta name="viewport" content="width=device-width, initial-scale=yes">' );
    }

    addExitButton (identifier) {
        if(identifier === undefined)
            identifier = "checheza.main.treehouse";

        $('body').append('<a class="core-exit-button" onclick="core.startWidget(\''+identifier+'\');"></a>')
    }
}