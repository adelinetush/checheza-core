var directoryReader = null;
var dir = null;
var fs = null;
var _self = null;

class Bootloader {
    constructor() {
        _self = this;
        window.resolveLocalFileSystemURL(cordova.file.applicationDirectory+"www/addons", this.checkForSpecifications, fail);
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
                console.log("Dave, I found a specification!");
                _self.parseAddonSpecification(entry);
            }
        }
    }

    parseAddonSpecification(addonSpecification) {
        addonSpecification.file(function (file) {
            var reader = new FileReader();
            reader.onloadend = function() {
                loadedAddons.push(new Addon(JSON.parse(this.result)));                
                console.log("Loaded addon: " + testAddon.name);
            };
            reader.readAsText(file);
        });
    }
}

function fail(e) {
    console.log("FileSystem Error");
    $("body").append(e)
}

document.addEventListener("deviceready", new Bootloader(), false);
