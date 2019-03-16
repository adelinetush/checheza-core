/**
 * @class
 * @ignore
 */
class Bootloader {

    static init() {

        // Instantiate core
        core = new Core();
        core.initializeResizeListeer();

        $.getScript("static/browserDbgAddr.js")
        .done( () => { 
            core.filesystem.initialize() // initialize filesystem
            .then( () => { 
                core.filesystem.readFolder("www/addons") // Locate addonfolders
                    .then(addonFolders => {
                        return Bootloader.getSpecificationFrom(addonFolders); // Locate specifcations
                    }).then(specificationUrls => {
                        return Bootloader.parseSpecifications(specificationUrls); // Parse specifications
                    }).then(specifications => {
                        if (Bootloader.isAllDependenciesMet()) {
                            core.loadAllAddons();
                        }
                    }).catch((error) => {
                        throw ("Could not read addonfolders properly! " + error)
                    });
            }).catch(error => {
                throw("Could not initialize filesystem. " + error);
            })
        });
    }

    static getSpecificationFrom(addonFolders) {

        var specs = [];

        for (let addonFolder of addonFolders) {
            specs.push(new Promise((resolve, reject) => {
                core.filesystem.readFolder(addonFolder)
                    .then((addonFiles) => {
                        if(addonFiles.length > 0) {
                            let count = 0;
                            let found = false;
                            for (let addonFile of addonFiles) {
                                if (addonFile.includes("specification.json")) {
                                    found = true;
                                    resolve(addonFile);
                                }
                                count++;
                            }
                            if (count === addonFiles.length && found === false){
                                $('.status').append('<p class="animated fadeInUp">Could not find specification in '+addonFolder+'</p>');
                                reject(addonFolder+"is missing a specification");
                            }
                        } else {
                            $('.status').append('<p class="animated fadeInUp">'+addonFolder+' is empty. Stopping</p>');
                            reject(addonFolder+" is empty. Stopping");
                        }
                    }).catch((error) => {
                        reject("Could not read addonfolders properly, check your " + addonFolder + "folder for anomalies!");
                    });
            }));
        }

        return Promise.all(specs)
            .then(specifications => {
                return specifications;
            });

    }


    static parseSpecifications(specificationUrls) {
        var promises = [];

        return new Promise((res) => {
            for (let specificationUrl of specificationUrls) {
                promises.push(
                    new Promise((resolve, reject) => {
                        core.filesystem.readFile(specificationUrl)
                            .then(data => {
                                // Parse specification file data as a JSON string
                                let spec = JSON.parse(data);

                                // Get widget url
                                let url = specificationUrl.replace("specification.json", "");

                                if (spec.MainClassFile)
                                    spec.MainClassFile = url + spec.MainClassFile;

                                if (spec.MainView)
                                    spec.MainView = url + spec.MainView;

                                if (spec.Views)
                                    $.each(spec.Views, (i, view) => { spec.Views[i] = url + spec.Views[i].file });

                                core.addSpecification(spec); // Add loaded specification to core
                                
                                // Add message to bootscreen
                                $('.status').append('<p class="animated fadeInUp">Identified: ' + spec.AddonIdentifier + '</p>');
                                resolve(spec);
                                
                            }).catch((err) => {
                                reject(err)
                            });
                    })
                );
            }

            Promise.all(promises)
                .then(data => {
                    res(data);
                });
        })
    }


    static isAllDependenciesMet() {
        var dependencyList = [];
        var numDependenciesNotMet = 0;

        $('.status').append('<p class="animated fadeInUp">Checking dependencies...</p>');

        /**
         * First, collect all the addons dependencies.
         */
        for ( let addon of core.getAddonSpecifications() ) {
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
            for (let addon of core.getAddons()) {

                // If it matches, a dependency was met. Increment numDependencies by 1.
                if (dependency == addon.AddonIdentifier) {
                    numDependenciesMet += 1;
                }
            }

            // If no dependencies was met, warn the user and increment the numDependenciesNotMet by 1.
            if (numDependenciesMet == 0) {
                $('.status').append('<p class="animated fadeInUp">Dependency not met: ' + dependency + '</p>');
                numDependenciesNotMet += 1;
            }
        }

        if (numDependenciesNotMet > 0) {
            return false;
        }
        else {
            return true;
        }
    }

    static tryInit(i) {
        if (i < 3) {
            try {
                Bootloader.init();
                return true;
            } catch (err) {
                setTimeout(() => {
                    Bootloader.tryInit(i + 1);
                }, 5000);
            }
        } else {
            $('.status').append('<p class="animated fadeInUp">Bootloader could not initialize</p>');
            return false;
        }
    }
}


document.addEventListener("deviceready", () => {
    Bootloader.tryInit(0);
});

