//Каждый класс должен лежать в своем собственном файле
// Идеально если имя класса совпадает с именем файла с учетом регистра

const shiftRef = [{"workShift" : "07-16" , "isWeekendsShift" : false },
{"workShift" : "08-17" , "isWeekendsShift" : false },
{"workShift" : "09-18" , "isWeekendsShift" : false },
{"workShift" : "10-19" , "isWeekendsShift" : false },
{"workShift" : "11-20" , "isWeekendsShift" : false },
{"workShift" : "12-21" , "isWeekendsShift" : false },
{"workShift" : "В" , "isWeekendsShift" : true },
];

const  getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const countOfDate = (yearMonth) => { //2022-02
  const yearMonthArr = yearMonth.split("-");
  const date1 = new Date(Number(yearMonthArr[0]), Number(yearMonthArr[1]) - 1, 1);
  const date2 = new Date(Number(yearMonthArr[0]), Number(yearMonthArr[1]), 1);
  console.log(yearMonthArr);
  console.log(' date1 ' + date1 + ' date2 ' + date2 );
  return Math.round((date2 - date1) / 1000 / 3600 / 24);
}

const getShift = (dt, login, currentShift ,onlyWorkerDays = true , typeOfGeneration = "random", shftRef = shiftRef ) => {
  const workShiftRef = shftRef.filter((item) => item.isWeekendsShift == false);
  const dateNumber = dt.getDay();
  const ch = currentShift;
  let shift = "В";
  if ((dateNumber > 0) && (dateNumber < 6)) {
    let randInd = getRandomInt(workShiftRef.length);
    shift = workShiftRef[randInd].workShift;
    if (ch) {
      shift = ch;
    }
  };
 
  return shift;
};

export default class ShiftGenarator { // Generator - это класс для генерации графика рабочих смен (Shift)
    //     
   /* params= 
    {
        "employeerslist" : [{ "fio": "Ivanov II", "login" : "emp1", "constantShift" : "" },
                            { "fio": "Ivanov IB", "login" : "emp2", "constantShift" : "" }],
        "setting" : { "yearMonth" : "" , "typeOfGeneration" : "" }

    }

    /*{
        "employeerslist" : [{ "fio": "Ivanov II", "login" : "emp1", "constantShift" : "" },
                            { "fio": "Ivanov IB", "login" : "emp2", "constantShift" : "" },
                            { "fio": "Dava AA", "login" : "emp3", "constantShift" : "" },
                            { "fio": "Petrov PP", "login" : "emp4", "constantShift" : "" }],
        "setting" : { "month" : "" , "typeOfGeneration" :"" }
    }

    
    /*{"date":"2023-02-02T21:00:00.000Z","login":"emp1","fio":"Ivanov II","workShift":"08-17","employee_id":1},
    */
    constructor(params) {
      //console.log(JSON.stringify(params));
      let dt = new Date();
      dt.setHours(12);
      console.log( ' dt = ' + dt + ' st month ' +  dt.getMonth());
      const month = dt.getMonth() + 1; 
      console.log('month ' + month);
      const year = dt.getFullYear()
      const yearMonth = year.toString() + '-' + month.toString();
      const defaultSetting = { "typeOfGeneration": "random", "yearMonth" : yearMonth , "isWeekendsWork" : false };
      const defEmpList = [];/* [{ "fio": "Ivanov II", "login" : "emp1", "constantShift" : "" },
      { "fio": "Ivanov IB", "login" : "emp2", "constantShift" : "" },
      { "fio": "Dava AA", "login" : "emp3", "constantShift" : "" },
      { "fio": "Petrov PP", "login" : "emp4", "constantShift" : "" }]; */

      this.employeerslist = defEmpList.concat(params.employeerslist);
      //this.employeerslist = params.employeerslist;
      this.setting = { ...defaultSetting, ...params.setting };
      console.log(JSON.stringify(this.setting));
    }
     
    generate() {
      console.log(JSON.stringify(this.setting));
      const emplList = this.employeerslist;
      const sett = this.setting;
      const yearMonthArr = sett.yearMonth.split("-");
      const maxCountDate = countOfDate(sett.yearMonth);
      console.log('кол-во дней ' + maxCountDate);
      const resArrList = [];
      for (var i = 1; i <= maxCountDate; i++) {
        console.log(yearMonthArr[0] + ' - ' + yearMonthArr[1])
        let cDate = new Date(Number(yearMonthArr[0]), Number(yearMonthArr[1]) -1 , i);
        cDate.setHours(12);
        console.log(cDate);
        resArrList.push(...emplList.map((item) => { 
          return {"date" : cDate , "login" : item.login , "fio" : item.fio , "workShift" : getShift(cDate,item.login, item.constantShift) }
        }));
      };
      console.log(JSON.stringify(sett));
      console.log('кол-во сгенеренных смен ' + resArrList.length);
      console.log('результат ' + JSON.stringify(resArrList));
      return resArrList;
    }
  }
