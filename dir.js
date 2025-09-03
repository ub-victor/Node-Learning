const fs = require('fs');


if(!fs.existsSync('./new')){ // checks if a file or directory does not already exist.
    fs.mkdirSync('./new', (err)=>{
       if (err) throw err;
       console.log('Directory created successfully!');
   });
}


// to remove a directory
if(fs.existsSync('./new')){ // checks if a file or directory already exists.
    fs.rmdir('./new', (err)=>{
       if (err) throw err;
       console.log('Directory removed successfully!');
   });
}
