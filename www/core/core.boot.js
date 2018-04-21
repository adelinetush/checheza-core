/**
 * Todo: add deeper verification
 */
class Bootloader {

    static init() {

        // Instantiate core
        core = new Core();

        
        $('<script src="static/browserDbgAddr.js"></' + 'script>').appendTo(document.body);

        // Initialize filesystem
        core.filesystem.initialize();


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
    }

    static getSpecificationFrom(addonFolders) {

        var specs = [];

        for (let addonFolder of addonFolders) {
            specs.push(new Promise((resolve, reject) => {
                core.filesystem.readFolder(addonFolder)
                    .then((addonFiles) => {
                        for (let addonFile of addonFiles) {
                            if (addonFile.includes("specification.json")) {
                                resolve(addonFile);
                            }
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
                                let spec = JSON.parse(data);
                                core.addIdentifiedAddon(spec, specificationUrl.replace("specification.json", ""));
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
        for (let addon of core.getIdentifiedAddons()) {
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
            for (let addon of core.getIdentifiedAddons()) {

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
            return false;
        }
    }
}


document.addEventListener("deviceready", () => {
    $('.logo').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
        $('.logo').removeClass('animated zoomInDown');
        $('.logo').addClass('infinite pulse animated');
        Bootloader.tryInit(0);
    });
});

