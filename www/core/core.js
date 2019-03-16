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

		// Initialize database
		this.database = new CoreDatabase("1", "chechezaCoreDb", "Database for Checheza core", 2*1024*1024);
		
		// All skins
		this.skins = [];

		this.countdown = 0;
	}

	initializeResizeListeer() {
		$(window).on("resize", () => {
			$("#core_resize_overlay").show(100);
			this.countdown += 1;
			
			setTimeout(()=>{
				this.countdown-=1;
				if(this.countdown === 0) {
					core.utils.adjustAspectRatio();
					$("#core_resize_overlay").hide(100);
				}
			},1000);
		})
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
		let loadedAddons = [];

		for (let addon of core.getAddonSpecifications()) {
			loadedAddons.push(new Promise(resolve => {
				if (addon.AddonType === "Main" || addon.AddonType === "Widget") {
				
					core.filesystem.readFile(addon.MainClassFile) // Read main class file
					.then((contents) => {
						
						$('head').append('<script type="text/javascript">'+contents+'</script>'); // Append class file to DOM
						
						const _addon = Function("param", "return new " + addon.MainClass + "(param)"); // Add function that returns a new obj call
						this.addons[addon.AddonIdentifier] = _addon(addon);
						resolve();
					});
				}

				if (addon.AddonType === "Skin") {
					this.addons[addon.AddonIdentifier] = new Skin(addon);
					resolve();
				}
			}));
		}

		return Promise.all(loadedAddons);
	}

	/**
	 * @return {Array} returns all loaded addons
	 */
	getAddons() {
		return this.addons;
	}

	getAddon(identifier) {
		return this.addons[identifier];
	}

	/**
	 * @return {Array} returns all addons of a specific type
	 * @param {type} WidgetType (ref:)
	 */
	getAllAddonsOfType(type) {
		let result = [];
		return new Promise(resolve => {
			for (let addon in this.addons) {
				if(this.addons[addon].addonType === type) {
					result.push(this.addons[addon]);
				}
			}
			resolve(result);
		});
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
			this.addons[identifier].start(); // start widget addon
		}
	}
}