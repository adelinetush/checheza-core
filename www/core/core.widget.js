class Widget extends Addon {

	constructor(specification) {
		super(specification);
		this.skins = [];
		this.controllers = [];

		if (specification.Skins) {
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
		for (let skin in this.skins) {
			// If the skin matches the provided identifier
			if (skin === identifier) {
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
		$('#core_container').css('opacity', '0');

		$('#core_container').on('transitionend', () => { 
			$('#core_container').off('transitionend');
		// Delete any previous resources to free up memory
		$("head").find('.resource').remove();
		if (this.skins) {
			for (let skin in this.skins) {
				this.skins[skin].themes.forEach(theme => {
					$('head').append('<link class="resource" href="' + this.skins[skin].addon.getTheme(theme) + '" rel="stylesheet" type="text/css" />');
				});
			}
		}

		core.setActiveWidget(this);
		
		// get head from view and append to active head
		Widget.changeView(this.mainView, true)
			.then(() => {
				var scale = 'scale(1)';
				document.body.style.webkitTransform = scale;     // Chrome, Opera, Safari
				document.body.style.msTransform = scale;       // IE 9
				document.body.style.transform = scale;
				document.body.style.zoom = 1.0;

				$('meta[name=viewport]').remove();
				$('head').append('<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">');

				if (typeof this.preinit === "function") {
					this.preinit();
				}

				window.addEventListener ? window.addEventListener("load", $('#core_app_container').fadeIn(1000, () => { this.initialize(); $('#core_container').css('opacity', '1'); }), false) : window.attachEvent && window.attachEvent("onload", $('#core_app_container').fadeIn(1000, () => { this.initialize(); $('#core_container').css('opacity', '1'); }));
			});
		})

	}

	/**
	 * method to retrieve users progress in current widget
	 * returns a promise to be resolved
	 */
	getProgress() {
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

	loadView(view, payload) {
		return new Promise(resolve => {
			if(this.mainView == view) {
				Widget.changeView(this.mainView, false)
							.then(() => {
								
								window.addEventListener ? window.addEventListener("load", $('#core_app_container').fadeIn(1000, () => { resolve(true)  }), false) : window.attachEvent && window.attachEvent("onload", $('#core_app_container').fadeIn(1000, () => { resolve(true) }));
							});
			}

			if (this.views) {
				for (let i = 0; i < this.views.length; i++) {
					if (this.views[i].name === view) {
						Widget.changeView(this.views[i].file, false)
							.then(() => {
								if( this.views[i].controller ) { 
									$('#core_app_container').append('<script class="resource" src="' + this.views[i].controller + '" rel="javascript" type="text/javascript" /></script>');
								}
								window.addEventListener ? window.addEventListener("load", $('#core_app_container').fadeIn(1000, () => {
									if( this.views[i].controller ) {
										const _controller = Function("param", "return new " + this.views[i].name + "(param)"); // Add function that returns a new obj call
										let controller = _controller(payload);
										this.controllers.push(controller);
										resolve();
									} else {
										resolve();
									}
								}), false) : window.attachEvent && window.attachEvent("onload", $('#core_app_container').fadeIn(1000, () => { 
									if( this.views[i].controller ) {
										const _controller = Function("param", "return new " + this.views[i].name + "(param)"); // Add function that returns a new obj call
										let controller = _controller(payload);
										this.controllers.push(controller);
										resolve();
									} else {
										resolve();
									}
								}));
							});
					}
				}
			}
		});
	}

	/** 
	 * Method used by the core to change the views.
	 * @ignore
	 */
	static changeView(viewurl, resetProportions) {
		return new Promise((resolve, reject) => {
			core.filesystem.readFile(viewurl)
				.then(view => {
					$('#core_app_container').fadeOut(250, () => {

						/** neutralize aspect ratio if it's called for from utils */
						if(resetProportions) {
							$('#core_app_container').css('width', 'auto');
							$('#core_app_container').css('height', '100%');
						}

						// empty view body
						$('#core_app_container').html("");
						$('#core_background_container').html("");
						$('#core_ui_container').html("");


						$("#core_app_container").bind("DOMSubtreeModified", () => {
							resolve(view);
							$("#core_app_container").unbind("DOMSubtreeModified");
						});

						// append view
						$('#core_app_container').html(view);

					});

				}).catch(err => {
					reject(err);
				});
		});
	}
}
