/**
 * Addon Class
 * 
 */

class Addon {

	constructor (specification, meta) {
		this.name 			= specification.Name;
		this.identifier 	= specification.AddonIdentifier;
		this.version 		= specification.Version;
		this.supportedCores = specification.SupportedCores;
		this.addonType 		= specification.AddonType;
		this.dependencies 	= specification.Dependencies;
		this.widgetentry    = meta.fullPath + specification.MainClass;
		this.mainview		= meta.fullPath + specification.MainView;
	}

	start() {
		$('body').append(mainview);
	}

}
