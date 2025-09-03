const fs = require('fs');

if (!fs.existsSync('./new')) {
    fs.mkdirSync('./new'); 
    console.log('Directory created successfully!');
}

if (fs.existsSync('./new')) {
    fs.rmdirSync('./new');  // use the sync version to match as the Sync it allows for error handling
    console.log('Directory removed successfully!');
}
