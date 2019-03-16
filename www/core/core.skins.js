class Skin extends Addon {
	constructor (specification) {
		super (specification);

		this.resources = null;

		core.filesystem.readFile(specification.ResourceMap)
		.then(resourceMap => { 
			var resources = JSON.parse(resourceMap);
			Object.keys(resources.css)
			.forEach(key => {
				if(core.utils.isPhone())
					resources.css[key] = this.path + "/" + resources.css[key];
				else 
					resources.css[key] = this.fullPath + "/" + resources.css[key];
			});

			Object.keys(resources.assets)
			.forEach(key => {
				if(core.utils.isPhone())
					resources.assets[key] = this.path +  "/" + resources.assets[key]
				else
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
