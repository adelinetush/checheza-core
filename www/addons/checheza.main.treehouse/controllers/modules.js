class Modules {
    constructor(category) {
        this.widget = core.getActiveWidget();

        // Allow zooming
		core.utils.makeZoomable();
		
		// Add exit button
        core.utils.addExitButton();
        
        // test link that opens module view
        this.getModulesInCategory(category);
        $('#module_category').text(category);   
    }

    getModulesInCategory(category) {
        core.backend.GET("/modules/category/"+category)
        .then(response => {
            this.printModules(JSON.parse(response));
        });
    }

    printModules(modules) {
        for(let module of modules) {
            $('#'+module.id).click(() => {
                this.openModuleView(module)
            })
        }

        for (var i = 0; i < modules.length; i++) {

            var div = document.createElement("div");
            div.className = "module_class";
            document.getElementById("all-modules").appendChild(div);

            var div_child = document.createElement("div");
            div_child.className = "main_image";
            div.appendChild(div_child);

            //HREF
            var a = document.createElement('a');
            a.href = "#";
            a.id = modules[i].id;
            div_child.appendChild(a);

            //IMAGE
            var img = document.createElement("img");
            img.className = "image_class";
            img.src = modules[i].pictures[0];
            a.appendChild(img);

            var div_child_text = document.createElement("div");
            div_child_text.className = "image_text";
            div.appendChild(div_child_text);

            //BUTTON
            var btn = document.createElement("BUTTON");
            btn.className = "button";
            btn.innerHTML = "Primary 1"; 
            btn.style = "margin: 0em;";                  
            div_child_text.appendChild(btn);

            //PARAGRAPH
            var p = document.createElement("p");
            p.innerHTML = modules[i].title;
            p.id = "example_title";
            div_child_text.appendChild(p);
            
        }
    }

    openModuleView(module) {
        this.widget.loadView("Module", module)
            console.log(module);
        }
    }
}