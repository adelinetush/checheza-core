var core;

class Core {

	constructor() {
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

		if (specification.MainClassFile != undefined) {
			specification.MainClassFile = url + specification.MainClassFile;
		}

		if (specification.MainView != undefined) {
			specification.MainView = url + specification.MainView;
		}

		if (specification.Views != undefined) {
			$.each(specification.Views, (i, view) => {
				specification.Views[i] = url + specification.Views[i].file;
			});
		}


		this.identifiedAddons.push(specification);
	}


	/**
	 * This method loads all the addons that are identified at the application boot.
	 * Identified addons should be considered to be addons that have been verified by the boot code.
	 */
	loadAllAddons() {
		for (let addon of core.getIdentifiedAddons()) {
			if (addon.AddonType) {
				
				core.filesystem.readFile(addon.MainClassFile)
				.then((contents) => {
					$('head').append('<script type="text/javascript">'+contents+'</script>');
					this.addons[addon.AddonIdentifier] = Function("param", "return new " + addon.MainClass + "(param)");
					this.addonSpecs[addon.AddonIdentifier] = addon;


					if (addon.AddonType == "Skin" || addon.AddonType == "Sounds") {
						// Here we should add the resources to a list
					}

					if (addon.AddonType == "Main" && this.activeWidget == null) {
						// Instantiate addon class //
						let mainAddon = new this.addons[addon.AddonIdentifier](addon);

						console.log("Hmm!");
						// Start main addon //
						mainAddon.start();
					}
				});
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
		// Delete any previous resources
		$("head").find('.resource').remove();

		let widget = new this.addons[identifier](this.addonSpecs[identifier]);
		widget.start();
	}
}