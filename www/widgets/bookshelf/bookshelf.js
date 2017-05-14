var Bookshelf = function(){

  this.currentPage = 1;
  this.currentBook;

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
      },
      'english': {
        'the_sprouting_bean': {
          name: 'The Sprouting Bean',
          id: 'the_sprouting_bean',
          path: 'widgets/bookshelf/books/english/the_sprouting_bean/',
          cover_picture: 'front.png',
          pages: 9
        },
        'the_adventures_of_supercow': {
          name: 'The Adventures of Supercow',
          id: 'the_adventures_of_supercow',
          path: 'widgets/bookshelf/books/english/the_adventures_of_supercow/',
          cover_picture: 'front.png',
          pages: 12
        },
        'tortoise_finds_his_house': {
          name: 'Tortoise Finds His House',
          id: 'tortoise_finds_his_house',
          path: 'widgets/bookshelf/books/english/tortoise_finds_his_house/',
          cover_picture: 'front.png',
          pages: 17
        },
        'market_cows': {
          name: 'Market Cows',
          id: 'market_cows',
          path: 'widgets/bookshelf/books/english/market_cows/',
          cover_picture: 'front.png',
          pages: 18
        },
        'holidays_with_grandmother': {
          name: 'Holidays with grandmother',
          id: 'holidays_with_grandmother',
          path: 'widgets/bookshelf/books/english/holidays_with_grandmother/',
          cover_picture: 'front.png',
          pages: 22
        }
      }
  }

  for (var bookname in this.books.english) {
    $('#swipe').append('<div class="book_preview" id="'+bookname+'"><img class="cover_thumb" src="'+this.books.english[bookname].path+this.books.english[bookname].cover_picture+'" alt=""/></div>');
  }


  $('.book_preview').click(function(e) {
    if(e.target.className == "cover_thumb") {
      currentWidget.openBook(e.target.parentElement.id);
    } else {
      currentWidget.openBook(e.target.id);
    }
  });

  var myElement = document.getElementById("bg");

  var posx = 0;
  var viewport_x = $( window ).width();
  var max_x = 0;
  $(window).resize(function() {
    max_x = (($('.book_preview').width()  * parseInt($('.book_preview').length)) * -1);
  });

  setTimeout(function (){
    max_x = (($('.book_preview').width()  * parseInt($('.book_preview').length)) * -1);
  }, 1000);
  
  var swipespeed = viewport_x / 50;
  var hammertime = new Hammer(myElement);
  hammertime.on('panleft', function(ev) {
    $(".book_preview").css("pointer-events", "none");
    //console.log(posx);
    if(posx > max_x) {
      if(ev.isFinal) { 
        $(".book_preview").css("pointer-events", "auto");
      }
      else {
        $('#swipe').css({left: "-="+swipespeed * Math.abs(ev.velocityX)});
                $(".book_preview").css("pointer-events", "auto"); 
      }
    } else {
      if(ev.isFinal) { 
        $(".book_preview").css("pointer-events", "auto");
      }
    }

    posx = parseInt($('#swipe').css('left'));
  });

  hammertime.on('panright', function(ev) {
    $(".book_preview").css("pointer-events", "none");

    if(posx <= 0) {
        if(ev.isFinal) {
          $(".book_preview").css("pointer-events", "auto");
        }
        else {
          $('#swipe').css({left: "+="+swipespeed * Math.abs(ev.velocityX)})
                  $(".book_preview").css("pointer-events", "auto");

        }
    } else {
      if(ev.isFinal) { 
        $(".book_preview").css("pointer-events", "auto");
      }
    }

    posx = parseInt($('#swipe').css('left'));
    //console.log(posx);
    //console.log(max_x);
  });
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

  var to;

  this.changePage = function(page_n) {
    if(page_n >= 1 && page_n <= this.currentBook.pages) {
      clearTimeout(to);
      $('audio').each(function(){
          this.pause(); // Stop playing
          this.currentTime = 0; // Reset time
      }); 

      $('.swipe-wrap div:nth-child('+page_n+')').show("fast");
      $('.swipe-wrap div:nth-child('+this.currentPage+')').hide("fast");
      this.currentPage = page_n;
      to = setTimeout(function(){
        $('audio')[page_n-1].play();
      },1000);
      
    }
  }

  this.openBook = function(id) {
    _self = this;

    $.ajax({
        url: Widgets.bookshelf.views.book,
        context: document.body
    }).done(function(response) {
        $('body').html(response);

        _self.currentBook = _self.books.english[id];

        for(var i = 1; i <= _self.books.english[id].pages; i++) {
            $('.swipe-wrap').append('<div><img class="page" src="'+_self.books.english[id].path+'page'+i+'.png"></div>');
            $('.audiosources').append('<audio><source src="'+_self.books.english[id].path+'page'+i+'.ogg"></audio>');
        }

        $(document).ready(function(){$('audio')[0].play();});

        var elm = document.getElementById('swipe_book');
        var bookSwipe = new Hammer(elm);
        bookSwipe.on('swiperight', function(ev) {
          _self.left();
        });
        bookSwipe.on('swipeleft', function(ev) {
          _self.right();
        });

        $('.widgetBackground').hide().fadeIn(200);
    });
  };
}
