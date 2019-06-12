class Bookshelf extends Widget {

  constructor(specification) {
    super(specification)

    this.currentPage = 0;
    this.currentBook;
    this.to;
    this.audioTimeout = null;
    this.books = [];

    this.touch;
    this.mc;

    this.colors = {
      "a": "#000000",
      "b": "#000000",
      "c": "#000000",
      "d": "#000000",
      "e": "#000000",
      "f": "#000000",
      "g": "#000000",
      "h": "#000000",
      "i": "#000000",
      "j": "#000000",
      "k": "#000000",
      "l": "#000000",
      "m": "#000000",
      "n": "#000000",
      "o": "#000000",
      "p": "#000000",
      "q": "#000000",
      "r": "#000000",
      "s": "#000000",
      "t": "#000000",
      "u": "#000000",
      "v": "#000000",
      "w": "#000000",
      "x": "#000000",
      "y": "#000000",
      "z": "#000000"
    }
  }

  // Return a hexadecimal color value for books starting on certain letters.
  getBookColor(bookName) {
    return this.colors[bookName[0]];
  }

  preinit() {
    // adjust aspect ratio
    core.utils.adjustAspectRatio();

  }

  initialize() {

    $('#swipe').slick({
      slidesToShow: 3,
      swipeToSlide: true,
      arrows: false,
      infinite: true,
      centerMode: false,
      adaptiveHeight: true,
      touchTreshold: 1
    });


    core.utils.addExitButton();
    let bookRoot = core.getActiveWidget().path + "/books/english/";
    let phoneFix = core.utils.isPhone() ? "www/" : "";

    core.filesystem.readFolder(phoneFix + bookRoot)
      .then(books => {
        for (let book of books) {
          let computerFix = core.utils.isPhone() ? "" : "addons/checheza.widget.bookshelf/books/english/";
          let bookObject = {
            id: book,
            pages: 0,
            cover_picture: 'front.png',
            path: computerFix + book + "/",
            language: "english"
          }

          this.books.push(bookObject);

          var color = this.getBookColor(book);
          $('#swipe').slick('slickAdd', '<div><div onclick=core.getActiveWidget().openBook("' + bookObject.id + '") class="book_preview fadeIn animated" id="' + bookObject.id + '"><img class="cover_thumb" src="' + bookObject.path.replace("/www/", "") + bookObject.cover_picture + '" alt=""/></div></div>');
        }
      });
  }

  playAudio(page) {
    page += 1;
    if (this.audioTimeout)
      clearTimeout(this.audioTimeout)

    this.audioTimeout = setTimeout(() => {
      let audio = $('audio');
      // Change source
      $('#audio_source').attr('src', this.currentBook.path.replace("/www/", "") + "/page" + page + ".ogg");

      audio[0].pause();
      audio[0].load();

      audio[0].oncanplaythrough = audio[0].play();
    }, 1000);
  }

  changePage(to) {
    if (to >= 0 && to < this.currentBook.pages - 1) {
      this.currentPage = to;
      let left = to * $('#core_app_container').width() + "px";
      $('.swipe-wrap').css("-webkit-transform", "translateX(-" + left + ")");
      this.playAudio(this.currentPage);
    }

    if (to < 0) {
      this.closeBook();
    }


    if (to >= this.currentBook.pages - 1) {
      this.closeBook();
    }
  }

  nextPage() {
    this.changePage(this.currentPage + 1);
  }

  prevPage() {
    this.changePage(this.currentPage - 1);
  }

  closeBook() {
    this.mc.off('swipeleft');
    this.mc.off('swiperight');
    this.touch.off('singletap');
    this.touch.off('doubletap');
    this.mc.destroy();
    this.touch.destroy();
    
    this.loadView(core.getActiveWidget().mainView)
    .then(() => { 

      this.preinit();
      this.initialize();
    });
  }

  openBook(id) {
    this.loadView("bookview")
      .then(() => { 
        this.currentPage = 0;
        this.touch = new Hammer.Manager(document.getElementById("core_container"))
        this.mc = new Hammer(document.getElementById("core_container"));
        // Add exit button
        core.utils.adjustAspectRatio();
        core.utils.alignScreenLayers();
        $('#core_ui_container').append('<a class="core-exit-button fadeIn animated" onclick="core.getActiveWidget().closeBook();"></a>')

        this.currentBook = this.books.find(book => book.id === id);
        this.playAudio(0);

        // Tap recognizer with minimal 2 taps
        this.touch.add(new Hammer.Tap({ event: 'doubletap', taps: 2 }));
        // Single tap recognizer
        this.touch.add(new Hammer.Tap({ event: 'singletap' }));
        // we want to recognize this simulatenous, so a quadrupletap will be detected even while a tap has been recognized.
        this.touch.get('doubletap').recognizeWith('singletap');
        // we only want to trigger a tap, when we don't have detected a doubletap
        this.touch.get('singletap').requireFailure('doubletap');

        this.mc.on("swipeleft swiperight", (event) => {
          switch (event.type) {
            case "swiperight":
              this.prevPage();
              break;
            case "swipeleft":
              this.nextPage();
              break;
          }
        });

        this.touch.on("singletap doubletap", (event) => {
          switch (event.type) {
            case "doubletap":
              this.prevPage();
              break;
            case "singletap":
              this.nextPage();
              break;
          }
        });


        core.filesystem.readFolder(this.currentBook.path)
          .then(bookFolder => {
            this.currentBook.pages = bookFolder.filter(resource => resource.indexOf(".png") == -1).length + 2;
            for (var i = 1; i < this.currentBook.pages; i++) {
              $('.swipe-wrap').append('<div class="page" style="width:' + $('#core_app_container').width() + 'px;" data-page="' + i + '"><img src="' + this.currentBook.path.replace("/www/", "") + '/page' + i + '.png"></div>');
            }
            $('.swipe-wrap').css('width', ($('.swipe-wrap > div').length * $('#core_app_container').width()) + "px");

          });
      });
  }
}
