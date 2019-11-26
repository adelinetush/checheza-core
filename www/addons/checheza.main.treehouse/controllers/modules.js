class Modules {
    constructor(category) {
        this.widget = core.getActiveWidget();

        // Allow zooming
		core.utils.makeZoomable();
		
		// Add exit button
        core.utils.addExitButton();
        
        // test link that opens module view
        $('#exampleModule').click(() => {
            this.openModuleView("exampleModule")
        })

        this.getModulesInCategory(category);
    }

    getModulesInCategory(category) {
        core.backend.GET("/modules/category/"+category)
        .then(response => {
            this.printModules(JSON.parse(response));
        });
    }

    printModules(modules) {
        for(let module of modules) {
            console.log(module);
        }
    }

    openModuleView(name) {
        this.widget.loadView("Module", name)
    }
}