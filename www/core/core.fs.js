/** This class provides methods for reading and writing to the filesystem.
 * @class
 * @hideconstructor
*/
class CoreFilesystem {

    /**
     * @ignore
     * This method is not included in the documentation simply because it is only supposed to be used
     * by the core bootsequence.
     */
    initialize() {

        /**
         * Return a promise in case there is a need to make sure that the filesystem is resolved before continuing.
         * (used in: core.boot.js)
         */
        return new Promise((resolve, reject) => {

            // If the app is running on a phone
            if (core.utils.isPhone()) {

                // Resolve filesystem access from webview.
                window.resolveLocalFileSystemURL(
                    cordova.file.applicationDirectory, (fs) => {
                        // Return success message
                        resolve("Filesystem resolved");
                    }, (err) => {
                        // Return error message
                        reject(err)
                    }
                );

            } else {

                // Cordova in browser-mode does not support proper filesystem access. 
                // This means that we will use an external node module for reading and writing to the filesystem.
                this.browser = true;
                resolve("Filesystem resolved");

            }
        });
    }

    /**
     * @param {string} folder - the path of the folder you want to read from.
     * @return {Promise} A promise that resolves all the entries inside the folder.
     * @example core.filesystem.readFolder("/")
     *          .then(entries => { // successfully read folder "/"
     *              console.log(entries); // print all folder entries in 
     *          }).catch(error => { // if something went wrong
     *              console.log(error); // print error
     *          });
     */
    readFolder(folder) {

        // Return a promise to make sure all data is received before continuing
        return new Promise((resolve, reject) => {

            if (this.browser) { // If running app in browser mode

                // AJAX request to the external node module that gives file access.
                $.ajax({
                    url: "http://localhost:27000/readFolder",
                    method: "POST",
                    data: { readPath: folder }
                }).done((data) => {
                    // Return folder contents
                    resolve(data);
                }).fail((err) => {
                    // Return error message
                    reject(err);
                });

            } else { // If running app in phone mode 

                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + folderUrl, (entry) => {

                    // If returned entry is a directory
                    if (entry.isDirectory) {

                        // Create a directory reader
                        var directoryReader = entry.createReader();

                        // read all entries
                        directoryReader.readEntries((entries) => {
                            // return array of all the entries
                            resolve(_.map(entries, entry => {
                                return entry.fullPath;
                            }));

                        }, (error) => {
                            // Return error message
                            reject(error)
                        });
                    }

                }, (err) => {
                    // Return error message
                    reject(err);
                });
            }
        });
    }


    /**
     * @param {string} file - the path and filename for the file you want to read.
     * @return {Promise} A promise that resolves all the entries inside the folder.
     * @example core.filesystem.readFile("/www/addons/my.widget.name/myfile.txt")
     *          .then(filecontent => { // successfully read file "/"
     *              console.log(filecontent); // print file content
     *          }).catch(error => { // if something went wrong
     *              console.log(error); // print error
     *          });
     */
    readFile(file) {

        // Return a promise to make sure all data is received before continuing
        return new Promise((resolve, reject) => {

            if (this.browser) { // If running app in browser mode

                // AJAX request to the external node module that gives file access.
                $.ajax({
                    url: "http://localhost:27000/readFile",
                    method: "POST",
                    data: { filePath: file }
                }).done((data) => {
                    // Return file data
                    resolve(data);
                }).fail((err) => {
                    // Return error message
                    reject(err);
                })

            } else { // If running app in phone mode 
                
                window.resolveLocalFileSystemURL(cordova.file.applicationDirectory + file, (file) => {
                    
                    if (file.isFile) { // If returned entry is a file
                    
                        file.file((f) => { // create a file object (f) containing file properties
                            var reader = new FileReader(); // Instiantiate a new filereader

                            reader.onloadend = function (data) { // When finshed reading
                                resolve(data.target.result); // return file data
                            }

                            reader.readAsText(f); // read file object as text -> onloadend when finished
                        });
                    }
                });
            }
        });
    }
}
