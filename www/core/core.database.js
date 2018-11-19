class CoreDatabase {

    constructor(version, name, description, size) {
        this.version = version;
        this.name = name;
        this.description = description;
        this.size = size;

        this.db = window.openDatabase(this.name, this.version, this.description, this.size);

        // Create if not exists
        this.rawQuery('CREATE TABLE IF NOT EXISTS progress (widgetIdentifier unique, progressIdentifier)');
    }

    getProgress(widgetIdentifier) {
        return new Promise((resolve, reject) => {
            this.db.transaction(tx => {
                tx.executeSql('SELECT progressIdentifier FROM progress WHERE widgetIdentifier = ?', [ widgetIdentifier ], (tx, result) => {
                    if(result.rows.length == 0) {
                        resolve(false);
                    } else {
                        resolve(result.rows[0].progressIdentifier);
                    }    
                });
            });
        });
    }

    saveProgress(widgetIdentifier, progressIdentifier) {
        return new Promise(resolve => {
            this.getProgress(widgetIdentifier)
            .then(result => {
                if(result) { 
                    this.db.transaction(tx => {
                        tx.executeSql('UPDATE progress SET progressIdentifier=? WHERE widgetIdentifier=?', [progressIdentifier, widgetIdentifier], (tx, result) => {
                            resolve(result);
                        });
                    });
                } else {
                    this.db.transaction(tx => {
                        tx.executeSql('INSERT INTO progress (progressIdentifier, widgetIdentifier) VALUES(?, ?)', [progressIdentifier, widgetIdentifier], (tx, result) => {
                            resolve(result);
                        });
                    });
                }
            });
        });
    }

    rawQuery(query) {
        this.db.transaction(tx => {
            tx.executeSql(query);
        });
    }
}