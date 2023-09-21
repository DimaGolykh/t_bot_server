import getConnectionString from '../../config/db_connect.js';
import mongoose from 'mongoose';
//import shifts from './model.js';


const shiftsSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    date: String,
    login: String,
    fio: String,
    workShift: String,
    company_name: String,
    edit_date: String,
    change_user: String
});

const shifts = mongoose.model('shifts', shiftsSchema);

class Worksheet {
  async getSheets(query_params = {}){
   const db_connection_str = await getConnectionString('sheduller').toString();
    console.log('db connect:  ' + db_connection_str);
    await mongoose.connect(db_connection_str)
    .then(() => console.log('Connected!'));
    let res = null;
    try {
        res = (await shifts.find({ login: query_params.query.login })).map(user => user.toObject());
        console.log('res = ' + res);
    } catch (err) {
        //const res = 'Error';
        console.log(err);
    }
    mongoose.disconnect() 
    return res;
  }  
}
export default Worksheet;