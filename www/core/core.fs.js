/**
 * Written by: Andréas Forsbom
 * 
 * One of the laraland-core modules. 
 * 
 * This provides a simple interface to read and write files to the filesystem.
 * 
 * Note: 
 *  - Do not instantiate this class, access it from core.filesystem instead!
 */

class CoreFilesystem {

    constructor() {

    }

    initialize() {
        return new Promise((resolve, reject) => {
            if (core.utils.isPhone()) {
                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, (fs) => {
                    resolve("success");
                }, (err) => { reject(err) });
            } else {
                
                // Cordova in browser-mode does not support proper filesystem access. 
                // This means that we will use the browser-debug node module instead.
                this.browser = true;
                resolve(this.browser);
            }
        });
    }

    readFolder(folderUrl) {

        if (this.browser) {
            /**
            * Ask browser-debug for folder contents.
            */
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: browserdebug + "/readFolder",
                    method: "POST",
                    data: { readPath: folderUrl }
                }).done((data) => {
                    resolve(data);
                }).fail((err) => {
                    reject(err);
                })
            });

        } else {
            /**
             * Read directory and return entries
             */
            var directoryEntries;
            let paths = [];

            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + folderUrl, (entry) => {
                    if (entry.isDirectory) {
                       var directoryReader = entry.createReader();

                        directoryReader.readEntries((entries) => {
                            resolve(_.map(entries, entry => { 
                                return entry.fullPath;
                            }));
                        }, (error) => {
                            reject(error)
                        });
                    }
                }, (err) => {
                    throw err;
                });
            });
        }
    }

    readFile(fileUrl) {
        if (this.browser) {

            
            /**
            * Ask browser-debug for file contents.
            */

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: browserdebug + "/readFile",
                    method: "POST",
                    data: { filePath: fileUrl }
                }).done((data) => {
                    resolve(data);
                }).fail((err) => {
                    reject(err);
                })
            });

        } else {
            return new Promise(resolve => {
                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + fileUrl, (file) => {
                    if (file.isFile) {
                        console.log(file);
                        file.file((f) => {
                            var reader = new FileReader();

                            reader.onloadend = function(data) {
                                resolve(data.target.result);
                            }   
    
                            reader.readAsText(f);
                        })
                    }
                });
            })
        }
    }
}
