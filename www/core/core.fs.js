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

        this.fs = null;
        this.browser = null;

    }

    initialize() {
        if (core.utils.isPhone()) {

            /** Resolve a filesystem object */
            this.fs = window.resolveLocalFileSystemURL(cordova.file.applicationDirectory, (fs) => { return fs }, fail);
            


        } else {
            
            // Cordova in browser-mode does not support proper filesystem access. 
            // This means that we will use the browser-debug node module instead.
            this.browser = true;

        }

        console.log("Filesystem got properly initialized. Cheers!");
        
    }

    readFolder(folderUrl) {
        
        if (this.browser) {
            /**
            * Ask browser-debug for folder contents.
            */

            return new Promise((resolve, reject) => {
                $.ajax({
                    url: "http://localhost:27000/readFolder",
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
            return new Promise((resolve, reject) => {     

                if(entry.isDirectory) {

                    var directoryReader = entry.createReader();
                    directoryReader = Promise.promisifyAll(directoryReader);
                    
                    directoryReader.readEntriesAsync()
                    .then((entries) => {
                        resolve(entries);
                    }).catch((err) => {
                        reject(err);
                    });;

                }

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
                    url: "http://localhost:27000/readFile",
                    method: "POST",
                    data: { filePath: fileUrl }
                }).done((data) => {
                    resolve(data);
                }).fail((err) => {
                    reject(err);
                })
            });
            
        } else {
            return new Promise((resolve, reject) => {
                window.resolveLocalFileSystemURL(fileUrl, (fileEntry) => {
                    var reader = new FileReader();
                    reader.readAsText(fileEntry);
                    
                    reader.onloadend = (file) => {
                        resolve(file)
                    }

                    reader.onerror = (err) => {
                        reject(err)
                    }
                });
            });
        }
    }
}