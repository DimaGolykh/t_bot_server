import fs from 'fs';

 const getConnectionString = (name_schema) =>  {
    let fileContent =  fs.readFileSync('../src/config/db_source/db_connect.json','utf-8'); //src/config/db_connect.json
    let conn_str = JSON.parse(fileContent);
    let res = conn_str.source + name_schema;
    console.log('file str source = ' + res);
    return res;
  /* return await fs.readFile('./db_connect.json', (err, data) => {
        if (err) {
        
            return res(false);
        }
        return res(JSON.parse(data.source));
    });*/
};

export default getConnectionString;

