class Widget extends Addon {
	constructor (specification) {
		super (specification);
	}

	start() {
		/** Shall become more sophisticated and shouldn't be an $ ajax call, 
		 * which means we get more control over the content, 
		 * we could even define our own kind of view format.*/

		// get head from view and append to active head
		_self = this;

		$.ajax({
			url: this.mainView,
			aSync: false,
			type: 'GET',
			dataType: "html",
			success: function(view) {
				var jqView = $(view);
				
				// make sure full paths for resources are added to head.
				_.map(jqView.filter("link"), (link) => {					
					var href = link.outerHTML.replace('href="', 'href="/addons/'+_self.identifier.toLowerCase()+'/');
					$('head').append(href);
				});

				//append view body
				$('body').html(view);

				_self.initialize();
			}
		});
	}
}
