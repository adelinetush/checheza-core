var Treehouse = function Treehouse() {
  /**
    Bind all widgetbuttons.
  */
  $('.treehouse.widget.btn').click(function(e) {
      WidgetLoader.loadWidget(e.target.id);
  });
}
