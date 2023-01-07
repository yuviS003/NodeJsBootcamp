const fs = require('fs');

// creating unique directories

if (!fs.existsSync('./new')) { // check whether the dir already exists
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory created')
    })
}

if (fs.existsSync('./new')) { // check whether the dir does exists
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory removed')
    })
}
