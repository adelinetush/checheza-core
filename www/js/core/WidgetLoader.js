var currentWidget;
var widgetHistory = [];

/**
    This code makes up one of the core functions which
    allows loading and changing between different widgets.

    Based on AJAX for 'dynamic' requests.
*/
var WidgetLoader = function(){

    this.loadWidget = function(widgetName) {

          if(currentWidget == null) {

              this.fetchWidget(widgetName);

          } else {
              _self = this; // save 'this' because of the fadeOut scope-change

              $(".widgetBackground").fadeOut(200, function() {
                  _self.fetchWidget(widgetName);
              });
          }

    };

    this.fetchWidget = function(widgetName) {

        //Have WidgetLoad object reference as _self
        //for use after scope change in .done function
        _self = this;

        $.ajax({

            url: Widgets[widgetName].views.main,
            context: document.body

        }).done(function(response) {

            $('body').html(response);

            _self.appendWidgetHistory(currentWidget);

            if(widgetName == "treehouse") {
                currentWidget = new Treehouse();
            }

            if(widgetName == "bookshelf") {
                currentWidget = new Bookshelf();
            }

            if(widgetName == "memory") {
                currentWidget = new Memory();
            }

            $('.widgetBackground').hide().fadeIn(200);
        });

    };

    this.appendWidgetHistory = function(widget) {
      if(widgetHistory.length > 5) {
        widgetHistory.shift();
      }

      widgetHistory.push(widget);
    };

    this.popWidgetHistory = function() {
      widgetHistory.pop();
    };
}
