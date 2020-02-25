class CoreAnalytics {
    initialize() {
        window.onmousedown = this.clickListener;
        console.info("CORE: Anaytics click listener enabled");

        core.backend.checkConnection()
        .then(hasConnection => {
            if (hasConnection) {
                console.info("CORE: Anaytics data dispatcher enabled");
                core.analytics.dispatchData();
                setInterval(() => {
                    core.analytics.dispatchData();
                }, 60000);
            }
        })
    }

    dispatchData() {
        core.database.getClicks()
        .then(clicks => {
            console.info("CORE: Dispatching data to analytics server");
            core.backend.POST("/report/clicks", { "clicks": clicks })
            .then(response => {
                if(response.success) {
                    core.database.clearClicks();
                }
            });
        })
    }
    
    createClickObject(event) {
        return {
            "widget": core.getActiveWidget().identifier,
            "x": event.clientX,
            "y": event.clientY,
            "targetElem": event.path[0].id !== undefined ? event.path[0].id : undefined 
        }
    }

    clickListener(event) {
        core.database.storeClick(core.analytics.createClickObject(event));
    }
}