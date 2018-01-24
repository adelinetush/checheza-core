var directoryReader = null;
var dir = null;
var _fs = null;
var _self = null;

/**
 * Todo: add comments, add deeper verification, make sure the weird promise catches becomes real .then's instead of .catch.
 */
class Bootloader {

    constructor() { 
        if (isPhone()) {
            window.resolveLocalFileSystemURL(cordova.file.applicationDirectory+"www/addons", Bootloader.initializeBoot, fail);
        } else {
            $.ajax({
                url: "http://localhost:8001/",
                method: "get",
                dataType: 'json'
            }).done(function(specs){
                for(let spec of specs) {
                    Bootloader.loadAddonSpecification(spec);
                }

                if(Bootloader.isAllDependenciesMet()) {
                    Core.loadAllAddons();
                }
            });
        }
    }

    static initializeBoot(filesystem) {
        if(filesystem == undefined) {
            $('.status').append('<p class="animated fadeInUp">FileSystem not initialized...</p>');
        } else {
            Bootloader.checkForSpecifications(filesystem)
            .then(function(){
                if(Bootloader.isAllDependenciesMet()) {
                    $('.status').append('<p class="animated fadeInUp">All dependencies are met!</p>');                    
                    Core.loadAllAddons();
                } else {
                    $('.status').append('<p class="animated fadeInUp">Not all dependencies are met. Cannot start.</p>');                                        
                }
            })
        }
    }

    static checkForSpecifications(entry) {
        return new Promise(function(resolve, reject) {            
            if(entry.isDirectory) {
                var directoryReader = entry.createReader();
                directoryReader = Promise.promisifyAll(directoryReader);
                
                directoryReader.readEntriesAsync()
                .then(function(entries) {
                    console.log(entries);
                }).catch(function(entries) { // what is going on here?      
                    for(let _entry of entries) {
                        Bootloader.checkForSpecifications(_entry)
                        .then(function(){
                            resolve("Success");
                        }).catch(function(){

                        });
                    }    
                });
            }
            else if(entry.isFile){
                if(entry.name == "specification.json") {
                    Bootloader.loadAddonSpecification(entry)
                    .then(function(){
                        resolve("Success");                        
                    });
                } else {
                    reject("Not the correct file, but continue");
                }
            }
        });
    }

    static parseAddonSpecification(addonSpecification, file) {
        let spec = JSON.parse(addonSpecification)
        Core.addIdentifiedAddon(spec, file);                
        $('.status').append('<p class="animated fadeInUp">Identified: '+spec.AddonIdentifier+'</p>');
    }

    static loadAddonSpecification(addonSpecificationFile) {
        if(isPhone()){
            return new Promise(function(resolve, reject) {
                addonSpecificationFile = Promise.promisifyAll(addonSpecificationFile)
                addonSpecificationFile.fileAsync()
                .then(function(file){
                    
                }).catch(function(file){ // again, what is going on here?                
                    
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onloadend = function(){
                            Bootloader.parseAddonSpecification(this.result, addonSpecificationFile);
                            resolve("Success!");
                        };
                    });
                });
        } else {
            var res = $.ajax({
                url: "http://localhost:8000"+addonSpecificationFile.path+"/"+addonSpecificationFile.file,
                method: "get",
                dataType: 'json',
                async: false
            }).responseText;

            Bootloader.parseAddonSpecification(res, "http://localhost:8000"+addonSpecificationFile.path+"/"+addonSpecificationFile.file);
        }
    }

    static isAllDependenciesMet() {
        var dependencyList = [];
        var numDependenciesNotMet = 0;

        $('.status').append('<p class="animated fadeInUp">Checking dependencies...</p>');

        /**
         * First, collect all the addons dependencies.
         */
        for (let addon of Core.getIdentifiedAddons()) {
            // Make sure that the addon has dependencies.
            if (addon.Dependencies.length > 0) {
                
                // If it does, add dependencies to dependencyList.
                for (let dependency of addon.Dependencies) {
                    dependencyList.push(addon.Dependencies);
                }
            }
        }

        /**
         * Loop through all dependencies and compare them to
         * all the loaded AddonIdentifiers
         */
        for (let dependency of dependencyList) {
            var numDependenciesMet = 0;

            // Run through the identified addons and compare their unique identifier
            // to the dependency identifier.
            for (let addon of Core.getIdentifiedAddons()) {

                // If it matches, a dependency was met. Increment numDependencies by 1.
                if (dependency == addon.AddonIdentifier) {
                    numDependenciesMet += 1;        
                }
            }
            
            // If no dependencies was met, warn the user and increment the numDependenciesNotMet by 1.
            if (numDependenciesMet == 0) {
                $('.status').append('<p class="animated fadeInUp">Dependency not met: '+dependency+'</p>');
                numDependenciesNotMet +=1;
            }
        }

        if (numDependenciesNotMet > 0) {
            return false;
        }
        else {
            return true;
        }
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
        tryInit();
    }); 
}, false);
