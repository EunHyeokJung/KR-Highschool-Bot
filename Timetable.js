const scriptName = "HighSchool Timetable.js"


let KEY = "API 키";
let ATPT_OFCDC_SC_CODE = "시도교육청코드";
let SD_SCHUL_CODE = "학교표준코드";
let grade = "학년";
let classnum = "반";



function getTimetable(day) {
    try{
        var data = JSON.parse(org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/hisTimetable?KEY=" + KEY + "&Type=json&ATPT_OFCDC_SC_CODE=" + ATPT_OFCDC_SC_CODE + "&SD_SCHUL_CODE=" + SD_SCHUL_CODE + "&ALL_TI_YMD=" + day + "&GRADE="+grade+"&CLASS_NM="+classnum).get().body().text())["hisTimetable"][1]["row"];
        var data_length = data.length;
        var objnm = [];
        for(var i=0;i<data_length;i++) {
            objnm.push(data[i]["ITRT_CNTNT"]);
        }
        objnm = objnm.map(e => objnm.indexOf(e) + 1 + "교시: " + e);
        var result = "[" + day + " 시간표]\n" + objnm.join("\n");
        return result;
    } catch(e) {
        return "[오류]\n" + e + "(" + e.lineNumber + ")";
    }
}



function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    replier.reply(getTimetable("20210331"));
}
