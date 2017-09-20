class Widget extends Addon {
	constructor (specification) {
		super (specification);
	}

	start() {
		/** Shall become more sophisticated and shouldn't be an $ ajax call, 
		 * which means we get more control over the content, 
		 * we could even define our own kind of view format.*/

		// get head from view and append to active head
		$.ajax({
			url: this.mainView,
			aSync: false,
			type: 'GET',
			context: document.head,
			success: function(viewHead) {
				$('head').append(viewHead);
			}
		});

		// get body and replace with current body
		$.ajax({
			url: this.mainView,
			aSync: false,
			type: 'GET',
			context: document.body,
			success: function(viewBody) {
				$('body').html(viewBody);
			}
		});
	}
}
