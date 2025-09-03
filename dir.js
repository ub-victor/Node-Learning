const fs = require('fs');


if(!fs.existsSync('./new')){ // checks if a file or directory already exists.
    fs.mkdirSync('./new', (err)=>{
       if (err) throw err;
       console.log('Directory created successfully!');
   });
}

