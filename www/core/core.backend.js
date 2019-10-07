class CoreBackend {
    initialize() { 
        if(core.configuration.backend.use) {
            this.address = core.configuration.backend.address;
            this.auth = btoa(core.configuration.backend.username+":"+core.configuration.backend.password);
            console.log("CORE: Instantiated core.backend");
        } else {
            console.log("Skipping backend module. Not configured");
        }
    }

    request(method, resource, data) { 
        return fetch(this.address + resource, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.auth
            },
            body: data === null ? null: JSON.stringify(data)
        }).then(response => {
            return response.json();
        });
    }

    checkConnection() {
        return this.GET("/report/")
        .then(response => {
            return response.available;
        })
    }

    POST(resource, data) {
        return this.request('POST', resource, data)
        .then(response => {
            return response;
        });
    }

    GET(resource) {
        return this.request('GET', resource, null)
        .then(response => {
            return response;
        });
    }

    PUT(resource, data)  {
        return this.request('PUT', resource, data)
        .then(response => {
            return response;
        });
    }

    DELETE(resource) {
        return this.request('DELETE', resource, null)
        .then(response => {
            return response;
        });
    }
}