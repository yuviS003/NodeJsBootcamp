// const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

// asynchronous function
// fs.readFile('./files/starter.txt', 'utf8',(err,data) => {
//     if (err) throw err;
//     console.log(data)
//     // console.log(data.toString())
// })

const fileOps = async () => {
    try {
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8')
        console.log(data);
        await fsPromise.unlink(path.join(__dirname, 'files', 'starter.txt')) // delete a file
        await fsPromise.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data)
        await fsPromise.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet you')
        await fsPromise.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'))
        const newDate = await fsPromise.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8')
        console.log(newDate);

    } catch (err) { console.error(err) }
}
fileOps();


// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('\nusing path module')
//     console.log(data)
// })

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you',(err) => {
//     if (err) throw err;
//     console.log('\nWrite complete')
// })

// fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'Testing text',(err) => {
//     if (err) throw err;
//     console.log('\nAppend complete')
// })

/*
// This is how you control the execution of asynchronous functions - by NESTING them sequentially
fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), 'Nice to meet you',(err) => {
    if (err) throw err;
    console.log('\nWrite complete')

    fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), '\n\nYes it is.', (err) => {
        if (err) throw err; 
        console.log('\nAppend complete')

        fs.rename(path.join(__dirname, 'files', 'reply.txt'), path.join(__dirname, 'files', 'newReply.txt'), (err) => {
            if (err) throw err;
            console.log('\nRenaming complete')
        })
    })
})
*/





// console.log('Hello...');

// exit on uncaught error
process.on('uncaughtException', err => {
    console.error(`There was an unexpected error : ${err}`);
    process.exit(1)
})