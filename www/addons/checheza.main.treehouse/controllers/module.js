class Module {
    constructor(module)  {
        // Add exit button
        core.utils.addExitButton();
        $('#module_title').text(module.title); 
        $('#module_description').text(module.description);   
        $('#module_image').attr("src", module.pictures[0]);
        $('#module_download').attr("href", module.file); 
    }
}