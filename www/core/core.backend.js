class CoreBackend {
    initialize() { 
        console.log("CORE: Instantiated core.backend");
        this.activeRequests = [];

        if(core.configuration.backend.use) {
            this.address = core.configuration.backend.address;
            this.auth = btoa(core.configuration.backend.username+":"+core.configuration.backend.password);
            console.log("CORE: Instantiated core.backend");
        } else {
            console.log("Skipping backend module. Not configured");
        }
    }

    request = async(method, resource, data) => { 
        let requestIndex = this.activeRequests.length;

        let infoObject = {
            resource: resource,
            receivedLength: 0,
            contentLength: 0,
            chunks: []
        }

        let response = await fetch(this.address + resource, {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + this.auth
            },
            body: data === null ? null: JSON.stringify(data)
        });

        const reader = response.body.getReader();
        infoObject.contentLength =+ response.headers.get('Content-Length');
        
        while (true) {
            const {done, value} = await reader.read();

            if (done)
                break;

            infoObject.chunks.push(value);
            infoObject.receivedLength += value.length;
        }

        this.activeRequests[requestIndex] = infoObject;

        let chunksAll = new Uint8Array(infoObject.receivedLength);
        let position = 0;
        
        for(let chunk of infoObject.chunks) {
          chunksAll.set(chunk, position); 
          position += chunk.length;
        }

        return chunksAll;
    }

    checkConnection() {
        return this.GET("/report/", false)
        .then(response => {
            return response.available;
        })
    }
    
    downloadModule(url) {
        return this.GET(url, true)
        .then(response => { 
            return response.blob()
        }).then(file => {

        })
    }

    POST(resource, data, asBlob) {
        return this.request('POST', resource, data)
        .then(response => {
            if(asBlob) {
                return new Blob(response)
            } else {
                return new TextDecoder("utf-8").decode(response);
            }
        });
    }

    GET(resource, asBlob) {
        return this.request('GET', resource, null)
        .then(response => {
            if(asBlob) {
                return new Blob(response)
            } else {
                return new TextDecoder("utf-8").decode(response);
            }
        })
    }

    PUT(resource, data, asBlob)  {
        return this.request('PUT', resource, data)
        .then(response => {
            if(asBlob) {
                return new Blob(response)
            } else {
                return new TextDecoder("utf-8").decode(response);
            }
        });
    }

    DELETE(resource, asBlob) {
        return this.request('DELETE', resource, null)
        .then(response => {
            if(asBlob) {
                return new Blob(response)
            } else {
                return new TextDecoder("utf-8").decode(response);
            }
        });
    }
}