class Treehouse extends MainWidget {
	constructor(specification) {
		super(specification);
	}

	preinit() {
		// adjust aspect ratio
		core.utils.adjustAspectRatio();
		core.utils.alignScreenLayers();
		core.utils.addSky('partly-cloudy');
        core.utils.setSkyColor("#55ddff");
	}

	deinit() { 
		$('audio').pause();
	}

	initialize() {
		$('.widget').addClass('fadeindelay');
		$('#tree').addClass('climb-fast');

		// Add click listeners on the buttons in the treehouse
		$('.treehouse.widget.btn').click(function(e) {
			core.startWidget(e.target.id.split("_").join("."));
		});

		// Allow zooming
		core.utils.makeZoomable();
		
		// Add exit button
		core.utils.addExitButton("quit");

		$('#as').attr('src', this.path + "/loop.ogg");
		$('audio')[0].volume = 0.20;
		$('audio')[0].play();
		$('audio')[0].load();
  
	
		setTimeout(() => {
			$('.widget').each((i, widget) => {
				$(widget).removeClass("fadeindelay");
				$(widget).css('opacity', 1);
				$(widget).addClass("pulse animated infinite");
			});
		}, 2000);
	}
}