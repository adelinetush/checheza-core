class Widget extends Addon {
	constructor(specification) {
		super(specification);
	}

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

	static changeView(identifier, viewurl) {

		return new Promise((resolve, reject) => {
			core.filesystem.readFile(viewurl)
				.then(view => {
					var jqView = $(view);

					// make sure full paths for resources are added to head.
					_.map(jqView.filter("link"), (link) => {
						var href = link.outerHTML.replace('href="', 'class="' + identifier.toLowerCase() + ' resource" href="addons/' + identifier.toLowerCase() + '/');
						$('head').append(href);
					});

					_.map(jqView.filter("script"), (script) => {
						var src = script.outerHTML.replace('src="', 'class="' + identifier.toLowerCase() + ' resource" src="addons/' + identifier.toLowerCase() + '/');
						$('head').append(src);
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
