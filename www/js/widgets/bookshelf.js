var Bookshelf = function(){

  this.currentPage = 1;
  this.currentBook;

  var elem = document.getElementById('swipe');
  window.mySwipe = Swipe(elem);

  $("body").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
      if(direction == "left") {
        mySwipe.next();
      } else {
        mySwipe.prev();
      }
    }
  });

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
        },
        'naweza_fanya_hivi': {
          name: 'Naweza Fanya Hivi',
          path: 'widgets/bookshelf/books/swahili/naweza_fanya_hivi/',
          cover_picture: 'page1.png',
          pages: 10
        },
        'ninapenda_kusoma': {
          name: 'Ninapenda Kusoma',
          path: 'widgets/bookshelf/books/swahili/ninapenda_kusoma/',
          cover_picture: 'page1.png',
          pages: 10
        },
        'mimi_na_familia_yangu': {
          name: 'Mimi Na Familia Yangu',
          path: 'widgets/bookshelf/books/swahili/mimi_na_familia_yangu/',
          cover_picture: 'page1.png',
          pages: 11
        },
        'maharagwe_yanayomea': {
          name: 'Maharagwe Yanayomea',
          path: 'widgets/bookshelf/books/swahili/maharagwe_yanayomea/',
          cover_picture: 'page1.png',
          pages: 9
        },
        'hadithi_ya_wa_nagari_maathai': {
          name: 'Mlinzi Na Chekechea Yake Ya Kipekee',
          path: 'widgets/bookshelf/books/swahili/hadithi_ya_wa_nagari_maathai/',
          cover_picture: 'page1.png',
          pages: 14
        },
        'mtoto_wa_tembo_mdadisi': {
          name: 'Mtoto Wa Tembo Mdadisi',
          path: 'widgets/bookshelf/books/swahili/mtoto_wa_tembo_mdadisi/',
          cover_picture: 'page1.png',
          pages: 23
        },
        'wanyama_wa_kufugwa': {
          name: 'Wanyama Wa Kufugwa',
          path: 'widgets/bookshelf/books/swahili/wanyama_wa_kufugwa/',
          cover_picture: 'page1.png',
          pages: 10
        }
      }
  }

  /*
  this.populateBookshelf = function() {
    var count = 0;
    for(var i = 0; i < len(this.Books["swahili"])) {
      if(count == 0) {
        $('.swipe_wrap').append(this.Books.swahili[i]);
      }
      if(count == 2) {
        count = 0;
      }
      count++;
    }
  }
  */
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
            console.log("Der?");
            $('.swipe-wrap').append('<div><img class="page" src="'+_self.books.swahili[id].path+'page'+i+'.png"></div>');
        }

        var elm = document.getElementById('swipe_book');
        window.bookSwipe = Swipe(elm);

        $("body").swipe( {
          swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == "left") {
              bookSwipe.next();
            } else {
              bookSwipe.prev();
            }
          }
        });

        $('.widgetBackground').hide().fadeIn(200);
    });
  };
}
