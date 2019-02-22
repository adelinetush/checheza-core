#!/usr/bin/env node

const fs = require("fs");
const _ = require('lodash');

getAllSkins = () => {
    let base = './www/addons';
    
    fs.readdir(base, (error, entries) => {
        if(error) { 
            return "failed";
        }

        return formatAssets(_.flatten(entries.filter((entry) => {
            return entry.includes(".skin.") === true
        }).map(entry => {
            return [ findAllAssetsIn(base + "/" + entry + "/assets"), findAllAssetsIn(base + "/" + entry + "/stylesheets"), entry];
        })));
    })
}

findAllAssetsIn = (path) => { 

    let data = [];

    fs.readdirSync(path)
    .forEach(asset => { 
        if(fs.lstatSync(path + "/" +  asset).isDirectory()) { 
            findAllAssetsIn(path + "/" +  asset).forEach(entry => {
               data.push(entry);
            });
        } else {
            data.push([path.split("./www/addons/checheza.skin.official/")[1], asset ]);
        }
    });

    return data;
}

formatAssets = (assetData) => {
    let assetArray = assetData[0];
    let themeArray = assetData[1];
    let skinName = assetData[2];

    let resourceMap = {
        "themes": {},
        "assets": {}
    }

    assetArray.forEach(asset => {
        resourceMap.assets[asset[1].split(".")[0]] = asset[0] + "/" + asset[1];
    });

    themeArray.forEach(theme => {
        resourceMap.themes[theme[1].split(".")[0]] = theme[0] + "/" + theme[1];
    })
    
    writeResourceFileToAddon(skinName, resourceMap);
}

writeResourceFileToAddon = (addonName, resourceMap) => {
    fs.writeFileSync("./www/addons/" + addonName + "/resourcemap.json", JSON.stringify(resourceMap));
}

execute = () => { 
    getAllSkins();
}

execute();