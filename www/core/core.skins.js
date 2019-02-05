class Skin extends Addon {
	constructor (specification) {
		super (specification);

		this.resources = null;

		core.filesystem.readFile(specification.ResourceMap)
		.then(resourceMap => { 
			var resources = JSON.parse(resourceMap);
			Object.keys(resources.css)
			.forEach(key => {
				resources.css[key] = this.fullPath + "/" + resources.css[key];
			});

			Object.keys(resources.assets)
			.forEach(key => {
				resources.assets[key] = this.fullPath +  "/" + resources.assets[key]
			});

			this.resources = resources;
		});
	}

	getTheme(identifier) {
		return this.resources.css[identifier];
	}

	getAsset(identifier) {
		return this.resources.assets[identifier];
	}
}
