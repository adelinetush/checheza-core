/**
 * Addon Class
 * @example
 * let myClass = new MyClass();
 */
class Addon {
	/**
	 * @param {*} specification 
	 * @param {*} meta 
	 */
	constructor (specification, meta) {
		this.name 			= specification.Name;
		this.identifier 	= specification.AddonIdentifier;
		this.version 		= specification.Version;
		this.supportedCores = specification.SupportedCores;
		this.addonType 		= specification.AddonType;
		this.dependencies 	= specification.Dependencies;
		this.mainClass    	= specification.MainClass;
		this.mainView		= specification.MainView;
		this.views			= specification.Views;
		this.path 			= "addons/" + specification.AddonIdentifier;
		this.fullPath = "/www/addons/" + specification.AddonIdentifier;
	}
}
