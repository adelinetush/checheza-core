class Widget extends Addon {
	constructor(specification) {
		super(specification);
	}

	start() {

		core.setActiveWidget(this);

		// get head from view and append to active head
		Widget.changeView(this.identifier, this.mainView)
			.then(() => {

				
				var scale = 'scale(1)';
				document.body.style.webkitTransform = scale;     // Chrome, Opera, Safari
				document.body.style.msTransform = scale;       // IE 9
				document.body.style.transform = scale; 
				document.body.style.zoom = 1.0;
			
				$('meta[name=viewport]').remove();
				$('head').append('<meta name="viewport" content="initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">' );

				this.initialize();
				$('#core_app_container').fadeIn(500);
				
			});
	}

	getProgress(){
		core.database.getProgress(this.identifier)
		.then(result => {
			return result;
		})
	}

	saveProgress(progress) {
		core.database.saveProgress(this.identifier, progress)
		.then(() => {
			return true;
		})
	}

	static changeView(identifier, viewurl) {
		return new Promise((resolve, reject) => {
			core.filesystem.readFile(viewurl)
				.then(view => {
					$('#core_app_container').fadeOut(250, () => {
						/** neautralize aspect ratio if it's called for from utils */
						$('#core_app_container').css('width', 'auto');
						$('#core_app_container').css('height', '100%');

						// Delete any previous resources to free up memory
						$("head").find('.resource').remove();
						//append view body
						$('#core_app_container').html("");
						var jqView = $(view);
						let v = /<body.*?>([\s\S]*)<\/body>/.exec(view)[1];
						$('#core_app_container').html(v);

						// make sure full paths for resources are added to head.
						_.map(jqView.filter("link"), (link) => {
							var href = link.outerHTML.replace('href="', 'class="' + identifier.toLowerCase() + ' resource" href="addons/' + identifier.toLowerCase() + '/');
							$('head').append(href);
						});
						
						_.map(jqView.filter("script"), (script) => {
							var src = script.outerHTML.replace('src="', 'class="' + identifier.toLowerCase() + ' resource" src="addons/' + identifier.toLowerCase() + '/');
							$('head').append(src);
						});
							resolve(v);
					});

				}).catch(err => {
					reject(err);
				});
		});
	}
}
