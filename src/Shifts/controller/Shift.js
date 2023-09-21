import WorksheetService from '../../services/Worksheet/service.js';

class Work_sheet_controller {
    getSheets(params){
            app.get("/", async function(request, response){
    
            const whs = new WorksheetService();
            const res = await whs.getSheets(request);
            console.log('**** = ');
            response.send(res);
        });
    }
}

export default Work_sheet_controller;