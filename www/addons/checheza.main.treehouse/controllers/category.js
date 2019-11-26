class Category {
    constructor(category) {
        this.widget = core.getActiveWidget();

        // Allow zooming
		core.utils.makeZoomable();
		
		// Add exit button
        core.utils.addExitButton();
        
        // test link that opens module view
        $('#getNewModules').click(() => {
            this.openModulesView(category)
        })
    }


    openModulesView(name) {
        this.widget.loadView("Modules", name)
    }
}