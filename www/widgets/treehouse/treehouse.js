var Treehouse = function Treehouse() {
  var minWorldMultiplier = 1;
  var worldMultiplier = 2;
  var maxMultiplier = 2;

  //this.changeMultiplier = function() {e
//
//  }

  currentWidget = this;

  this.resizeWorld = function() {

  	var windowSize = {
  		x: $(window).width() * worldMultiplier,
  		y: $(window).height() * worldMultiplier
  	};

  	$('.widgetBackground').css('width', windowSize.x+'px');
  	$('.widgetBackground').css('height', windowSize.y+'px');
  }

  var elm = document.getElementById('bg');
  var pan = new Hammer(document.body);
  var curXPos = ($(window).width() * worldMultiplier / 2) - ($(window).width() / 2);
  var curYPos = ($(window).height() * worldMultiplier / 2) - ($(window).height() / 2);

  $(document).bind("touchmove",function(event){
    event.preventDefault();
  });
 
  pan.get('pan').set({direction: Hammer.DIRECTION_ALL });
  pan.get('pinch').set({ enable: true });

  pan.on('pan', function(ev) {
    var changeVector = {
      x: (ev.velocityX * 20) * -1,
      y: (ev.velocityY * 20) * -1
    };

    $(window).scrollTop($(window).scrollTop() + changeVector.y); 
    $(window).scrollLeft($(window).scrollLeft() + changeVector.x);
  });

  //pan.on('pinch', function(ev) { 
  //  worldMultiplier = ev.originalEvent.gesture.scale;
  //  this.resizeWorld();
  //});

  this.resizeWorld();

  /**
    Bind all widgetbuttons.
  */
  $('.treehouse.widget.btn').click(function(e) {
      pan.off('pan');
      pan.off('pinch');      
      WidgetLoader.loadWidget(e.target.id);
  });

  $(window).resize(function(){
  	currentWidget.resizeWorld();
  });
}
