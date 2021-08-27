const scriptName = "LunchMenu_function";



const ATPT_OFCDC_SC_CODE = "지역코드";
const SD_SCHUL_CODE = "학교표준코드";
const KEY = "나이스교육정보개방포털 API KEY를 입력하세요.";


function getYYYYMMDD(day) {
    var d = new Date();
    d.setDate(new Date().getDate() + day);
    var mm = d.getMonth() + 1;
    var dd = d.getDate();
    var yyyymmdd = [d.getFullYear(), (mm < 9 ? '0':'') + mm, (dd < 9 ? '0':'') + dd].join('');
    return yyyymmdd;
}

function getData(MLSV_YMD) {
    try {
        var data=JSON.parse(org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=" + KEY + "&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=" + ATPT_OFCDC_SC_CODE + "&SD_SCHUL_CODE=" + SD_SCHUL_CODE + "&MLSV_YMD=" + MLSV_YMD).get().body().text())["mealServiceDietInfo"][1]["row"][0];
        var menu = data["DDISH_NM"].split(" ").join("\n");
        var origin = "| 원산지\n\n" + data["ORPLC_INFO"].replace(/ : /g,":").split(" ").join("\n").replace(/:/g,": ") + "\n\n";
        var cal = "| 칼로리\n\n" + data["CAL_INFO"] + "\n\n";
        var ntr = "| 영양정보\n\n" + data["NTR_INFO"].replace(/ : /g,":").split(" ").join("\n").replace(/:/g,": ") + "\n\n";
        result =
            mm + "/" + dd + " 급식 메뉴\n\n"
            + data["DDISH_NM"].split(" ").join("\n")
            + "\n\n>>원산지 및 영양정보 (클릭)" + "\u200b".repeat(600)
            + "\n\n" + origin + cal + ntr
            + "\n정보제공: 나이스 교육정보 개방 포털";
        return result;
    } catch (e) {
        return null;
    }
}

function getMenu(day_str) {
    if(day_str == "오늘") {
        return getData(getYYYYMMDD(0));
    } else if(day_str == "내일") {
        return getData(getYYYYMMDD(1));
    } else if(day_str == "어제") {
        return getData(getYYYYMMDD(-1));
    } else {
        return "getMenu()의 인자는 [어제, 오늘, 내일, null] 중 하나이어야 합니다.";
    }
}

