class Widget extends Addon {
	constructor (specification) {
		super (specification);

		this.path = "/addons/"+specification.AddonIdentifier;
	}

	start() {

		core.setActiveWidget(this);
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
		return new Promise((resolve, reject) => {
			core.filesystem.readFile(viewurl)
			.then(view => {
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
