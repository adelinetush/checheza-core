class Widget extends Addon {
	constructor (specification) {
		super (specification);

		this.path = "/addons/"+specification.AddonIdentifier;
	}

	start() {

		activeWidget = this;
		/** Shall become more sophisticated and shouldn't be an $ ajax call, 
		 * which means we get more control over the content, 
		 * we could even define our own kind of view format.*/

		// get head from view and append to active head
		Widget.changeView(this.identifier, this.mainView)
		.then(() => {
			this.initialize();			
		});
	}

	static changeView(identifier, viewurl) {
		return $.ajax({
			url: viewurl,
			aSync: false,
			type: 'GET',
			dataType: "html",
		}).done(function(view) {
				var jqView = $(view);
				
				// make sure full paths for resources are added to head.
				_.map(jqView.filter("link"), (link) => {					
					var href = link.outerHTML.replace('href="', 'href="/addons/'+identifier.toLowerCase()+'/');
					$('head').append(href);
				});

				_.map(jqView.filter("script"), (script) => {					
					var src = script.outerHTML.replace('src="', 'src="/addons/'+identifier.toLowerCase()+'/');
					$('head').append(src);
				});



				//append view body
				$('body').html(view);
				return Promise.resolve();
		});
	}
}
