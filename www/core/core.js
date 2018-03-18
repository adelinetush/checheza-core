var core;

class Core {

	constructor () {
		this.identifiedAddons = [];
		this.addons = [];
		this.addonSpecs = [];
		this.activeWidget = null;

		console.log("Initializing core.utils");
		this.utils = new CoreUtils();

		console.log("Initializing core.filesystem");
		this.filesystem = new CoreFilesystem();
	}

	addIdentifiedAddon(specification, url) {

		if(this.utils.isPhone()) {
			if(specification.MainClassFile != undefined) {
				specification.MainClassFile = url.fullPath.replace("/www/", "").replace("specification.json", "") + specification.MainClassFile;
			} 

			if(specification.MainView != undefined) {
				specification.MainView = url.fullPath.replace("/www/", "").replace("specification.json", "") + specification.MainView;
			}

			if(specification.Views != undefined) {
				$.each(specification.Views, (i, view) => {
					specification.Views[i] = url.replace("/www/", "").replace("specification.json", "") + specification.Views[i];
				});
			}
		}  else {
			if(specification.MainClassFile != undefined) {
				specification.MainClassFile = url.replace("http://localhost:8000/", "").replace("specification.json", "") + specification.MainClassFile;
			} 

			if(specification.MainView != undefined) {
				specification.MainView = url.replace("http://localhost:8000/", "").replace("specification.json", "") + specification.MainView;
			}

			if(specification.Views != undefined) {
				$.each(specification.Views, (i, view) => {
					specification.Views[i].file = url.replace("http://localhost:8000/", "").replace("specification.json", "") + specification.Views[i].file;
				});
			}
		}
		
		this.identifiedAddons.push(specification);
	}


	/**
	 * This method loads all the addons that are identified at the application boot.
	 * Identified addons should be considered to be addons that have been verified by the boot code.
	 */
	loadAllAddons() {
		for(let addon of core.getIdentifiedAddons()) {
			if(addon.AddonType) {

				$('head').append('<script type=text/javascript" src="'+addon.MainClassFile+'"></script>');
				this.addons[addon.AddonIdentifier] = Function("param", "return new "+addon.MainClass+"(param)");
				this.addonSpecs[addon.AddonIdentifier] = addon;


				if(addon.AddonType == "Skin" || addon.AddonType == "Sounds") {
					// Here we should add the resources to a list
				}

				if(addon.AddonType == "Main" && this.activeWidget == null) {
					// Instantiate addon class //
					let mainAddon = new this.addons[addon.AddonIdentifier](addon);

					// Start main addon //
					mainAddon.start();
				}
			}			
		}
	}

	getIdentifiedAddons() {
		return this.identifiedAddons;
	}

	getActiveWidget() {
		return this.activeWidget;
	}

	setActiveWidget(widgetObject) {
		this.activeWidget = widgetObject;
	}

	startWidget(identifier) {
		let widget = new this.addons[identifier](this.addonSpecs[identifier]);
		widget.start();
	}
}