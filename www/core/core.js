var core;

class Core {

	/**
     * @ignore
     * This method is not supposed to be used by anything other than starting up the application.
     */
	constructor() {
		// This array contains paths to addon specs
		this.addonSpecifications = [];

		// This array contains the actual addon classe
		this.addons = [];

		// This variable points on the current widget object
		this.activeWidget = null;

		// Initialize the core utilities
		this.utils = new CoreUtils();

		// Initialize filesystem access
		this.filesystem = new CoreFilesystem();
	}


	/**
	 * @ignore
	 * Adds a new specification to the cores list of parsed specificaitons
	 */
	addSpecification(specification) {
		this.addonSpecifications.push(specification);
	}

	/**
	 * @ignore
	 * Fetches all the parsed specifications and loads all addons into the applications.
	 */
	loadAllAddons() {
		for (let addon of core.getAddonSpecifications()) {

			if (addon.AddonType) {
			
				core.filesystem.readFile(addon.MainClassFile) // Read main class file
				.then((contents) => {
					
					$('head').append('<script type="text/javascript">'+contents+'</script>'); // Append class file to DOM

					this.addons[addon.AddonIdentifier] = Function("param", "return new " + addon.MainClass + "(param)"); // Add function that returns a new obj call

					if (addon.AddonType == "Skin" || addon.AddonType == "Sounds") {
						// Here we should add the resources to a list
					}

					if (addon.AddonType == "Main" && this.activeWidget == null) {
						// Instantiate main addon class //
						let mainAddon = new this.addons[addon.AddonIdentifier](addon);

						// Start main addon //
						mainAddon.start();
					}
				});

			}
		}
	}

	/**
	 * @return {Array} returns all loaded addons
	 */
	getAddons() {
		return this.addons;
	}


	/**
	 * @return {Array} returns all parsed addon specifications
	 */
	getAddonSpecifications() {
		return this.addonSpecifications;
	}

	getAddonSpecification(identifier) {
		return new Promise(resolve  => {
			resolve(this.addonSpecifications.find(specification => {
				return specification.AddonIdentifier === identifier;
			}));
		});
	}

	/**
	 * @return {Object} Returns the active widget.
	 */
	getActiveWidget() {
		return this.activeWidget;
	}

	/**
	 * Method used to set which widget is the current active widget.
	 * @ignore
	 * @param {*} widgetObject
	 */
	setActiveWidget(widgetObject) {
		this.activeWidget = widgetObject;
	}

	/**
	 * @param {String} identifier 
	 */
	startWidget(identifier) {
		if (identifier === "quit") {
			
			if(core.utils.isPhone()) {
				navigator.app.exitApp();
			} 

			console.info("Cannot close app in browser-mode");
		}
		else {
			
			// Delete any previous resources to free up memory
			$("head").find('.resource').remove();

			core.getAddonSpecification(identifier) // Get addon with AddonIdentifier
			.then(specification => {
				let widget = new this.addons[identifier](specification); // Instantiate new widget addon
				widget.start(); // start widget addon
			});

		}
	}
}