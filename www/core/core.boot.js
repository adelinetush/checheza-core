var directoryReader = null;
var dir = null;
var fs = null;
var _self = null;

class Bootloader {
    constructor() {
        _self = this;
        window.resolveLocalFileSystemURL(cordova.file.applicationDirectory+"www/addons", this.checkForSpecifications, fail);
        $('.status').append('<p class="animated fadeInUp">Core Iniitialized...</p>');
            $('.status').append('<p class="animated fadeInUp">Loading addons...</p>');
    }

    checkForSpecifications(entry) {
        if(entry.isDirectory) {
            var directoryReader = entry.createReader();

            directoryReader.readEntries(function(entries){
                for(let _entry of entries) {
                    _self.checkForSpecifications(_entry);
                }
            });
        } else if(entry.isFile) {
            if(entry.name == "specification.json") {
                _self.parseAddonSpecification(entry);
            }
        }
    }

    parseAddonSpecification(addonSpecification) {
        addonSpecification.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function() {
                var addon = new Addon(JSON.parse(this.result), addonSpecification)
                loadedAddons.push(addon);                
                $('.status').append('<p class="animated fadeInUp">Loaded: '+addon.name+'...</p>');
            };
            reader.readAsText(file);
        });
    }
}

function fail(e) {
    console.log("FileSystem Error");
    $("body").append(e)
}

function tryInit() {
    try {
        new Bootloader();
    } catch (err) {
        tryInit();
    }
}

document.addEventListener("deviceready", function (){         
    $('.logo').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
    function(){
        $('.logo').removeClass('animated zoomInDown');
        $('.logo').addClass('infinite pulse animated');
        $('.status p').addClass('animated fadeInUp');
        $('.status p').removeClass('hidden');
    tryInit();
    }); 
}, false);
