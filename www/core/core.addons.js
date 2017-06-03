/**
 * Addon Super Class
 */

class Addon {
	constructor (specification) {
		this.name = specification.Name;
		this.identifier = specification.AddonIdentifier;
		this.version = specification.Version;
		this.supportedCores = specification.SupportedCores;
		this.addonType = specification.AddonType;
		this.dependencies = specification.Dependencies;
	}
}
