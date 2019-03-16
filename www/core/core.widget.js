class Widget extends Addon {

	constructor(specification) {
		super(specification);
		this.skins = [];
		if(specification.Skins) {
			specification.Skins.map(skin => {
				this.skins[Object.keys(skin)[0]] = { "addon": core.getAddon(Object.keys(skin)), "themes": skin[Object.keys(skin)] };
			});
		}
	}

	/**
	 * convenience method to fetch a skin addon tied to the widget
	 * - makes for neater code
	 * 
	 * @param {addonIdentifier} skin addon identifier
	 * @returns { SkinAddon } returns a skin addon objec 
	 */
	skin(identifier) { 

		// Iterate through the skins
		for(let skin in this.skins) { 
			// If the skin matches the provided identifier
			if(skin === identifier) { 
				return this.skins[skin]; // return the skin
			}
		}

		return undefined; // return undefined if no match
	}

	/**
	 * @ignore
	 * Only used by core to start a new widget.
	 */
	start() {

		core.setActiveWidget(this);

		// get head from view and append to active head
		Widget.changeView(this.identifier, this.mainView)
			.then(() => {
				$('body').removeAttr("style");
				var scale = 'scale(1)';
				document.body.style.webkitTransform = scale;     // Chrome, Opera, Safari
				document.body.style.msTransform = scale;       // IE 9
				document.body.style.transform = scale; 
				document.body.style.zoom = 1.0;
			
				$('meta[name=viewport]').remove();
				$('head').append('<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">' );

				this.initialize();
			});
	}

	/**
	 * method to retrieve users progress in current widget
	 * returns a promise to be resolved
	 */
	getProgress(){
		return core.database.getProgress(this.identifier)
		.then(result => {
			return result;
		})
	}

	/**
	 * method to save the users progress in the current widget
	 * returns a promise to be resolved
	 * @param {*} progress 
	 */
	saveProgress(progress) {
		return core.database.saveProgress(this.identifier, progress)
		.then(() => {
			return true;
		})
	}

	/** 
	 * Method used by the core to change the views.
	 * @ignore
	 */
	static changeView(identifier, viewurl) {

		return new Promise((resolve, reject) => {
			core.filesystem.readFile(viewurl)
				.then(view => {
					$('#core_app_container').fadeOut(250, () => {
						
						/** neautralize aspect ratio if it's called for from utils */
						$('#core_app_container').css('width', 'auto');
						$('#core_app_container').css('height', '100%');

						// empty view body
						$('#core_app_container').html("");
						
						// append view
						$('#core_app_container').html(view);

						resolve(view);
					});

					let v = /<body.*?>([\s\S]*)<\/body>/.exec(view)[1];

					//append view body
					$('body').html(v);
					resolve(v)
				}).catch(err => {
					reject(err);
				});
		});
	}
}
