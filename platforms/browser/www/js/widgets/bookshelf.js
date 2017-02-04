var Bookshelf = function(){

  this.currentPage = 1;
  this.currentBook;

  $('.book_preview').click(function(e) {
    if(e.target.className == "cover_thumb") {
      currentWidget.openBook(e.target.parentElement.id);
    } else {
      currentWidget.openBook(e.target.id);
    }
  });

  // Autofill this later
  this.books = {
      'swahili': {
        'mlinzi_na_chekechea_yake_ya_kipekee': {
          name: 'Mlinzi Na Chekechea Yake Ya Kipekee',
          path: 'widgets/bookshelf/books/swahili/mlinzi_na_chekechea_yake_ya_kipekee/',
          cover_picture: 'page1.png',
          pages: 22
        }
      }
  }

  this.left = function() {
    this.changePage(this.currentPage-1);
  }

  this.right = function() {
    this.changePage(this.currentPage+1);
  }

  this.changePage = function(page_n) {
    if(page_n >= 1 && page_n <= this.currentBook.pages) {

      $('.page_viewer :nth-child('+page_n+')').show("fast");
      $('.page_viewer :nth-child('+this.currentPage+')').hide("fast");

    }

    this.currentPage = page_n;

    if(page_n == 1) {
      $('.page_left').fadeOut(200);
    } else {
      $('.page_left').fadeIn(200);
    }

    if(page_n == this.currentBook.pages) {
      $('.page_right').fadeOut(200);
    } else {
      $('.page_right').fadeIn(200);
    }

    console.log(this.currentPage);
  }

  this.openBook = function(id) {
    _self = this;

    $.ajax({
        url: Widgets.bookshelf.views.book,
        context: document.body
    }).done(function(response) {
        $('body').html(response);
        console.log(id);

        _self.currentBook = _self.books.swahili[id];

        for(var i = 1; i <= _self.books.swahili[id].pages; i++) {
            $('.page_viewer').append('<img class="page" src="'+_self.books.swahili[id].path+'page'+i+'.png">');
        }

        if(_self.books.swahili[id].pages > 1) {

          $('.page_right').click(function() {
            _self.right()
          });

          $('.page_left').click(function() {
            _self.left();
          });

          $('.page_right').hide().fadeIn(200);
          $('.page_left').hide();
        }

        $('.widgetBackground').hide().fadeIn(200);
    });
  };
}
