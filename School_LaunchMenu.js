const scriptName = "School_LaunchMenu.js"



const ATPT_OFCDC_SC_CODE = "시도교육청코드";
const SD_SCHUL_CODE = "학교표준코드";
const KEY = "나이스교육정보개방포털 API KEY를 입력하세요.";
let SchoolName = "OO고";


Date.prototype.toYYYYMMDD = function() {

    var MM = this.getMonth() + 1;
    var DD = this.getDate();
    var result = this.getFullYear() + "" + (MM > 9 ? "":"0") + MM + (DD > 9 ? "":"0") + DD;

    return result;
}


function getLaunchMenu(day) {
    if(day != null) {
        var yyyymmdd;
        var d;
        if(day == "today") {
            d = new Date();
            yyyymmdd = d.toYYYYMMDD();
        } else if(day == "tomorrow") {
            d = new Date();
            d.setDate(new Date().getDate() + 1);
            yyyymmdd = d.toYYYYMMDD();
        }
        try{
            var data=JSON.parse(org.jsoup.Jsoup.connect("https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=" + KEY + "&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=" + ATPT_OFCDC_SC_CODE + "&SD_SCHUL_CODE=" + SD_SCHUL_CODE + "&MLSV_YMD="+yyyymmdd).get().body().text())["mealServiceDietInfo"][1]["row"][0];
            var menu = data["DDISH_NM"].split(" ").join("\n");
            var origin = "| 원산지\n\n" + data["ORPLC_INFO"].replace(/ : /g,":").split(" ").join("\n").replace(/:/g,": ") + "\n\n";
            var cal = "| 칼로리\n\n" + data["CAL_INFO"] + "\n\n";
            var ntr = "| 영양정보\n\n" + data["NTR_INFO"].replace(/ : /g,":").split(" ").join("\n").replace(/:/g,": ") + "\n\n";
            result =
                d.getMonth() + 1 + "월 " + d.getDate() + "일 " + " 급식메뉴\n\n"
                + data["DDISH_NM"].split(" ").join("\n")
                + "\n\n>>원산지 및 영양정보 (클릭)" + "\u200b".repeat(600) + "\n\n" + origin + cal + ntr + "\n정보제공: 나이스 교육정보 개방 포털";
            return result;
        } catch(e) {
            return null;
        }
    } else {
        try {
            var data = org.jsoup.Jsoup.connect("http://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + SchoolName + "+급식").get()
                .select("#main_pack > section.sc_new.cs_school._cs_school > div > div.api_cs_wrap > div.school_area > div:nth-child(6)")
                .select("li.menu_info") + "";
            var result = new Date().getMonth() + 1 + "월 급식표" + "\u200b".repeat(600) + data.replace(/(<([^>]+)>)/g, "");
            return result;
        }    catch (e) {
            return null;
        }
    }
}


function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
    if (msg == "/급식표") {
            var menu = getLaunchMenu();
            if(menu != null) {
                replier.reply(menu);
            } else {
                replier.reply("급식표를 가져올 수 없습니다. ㄴ(ㅇㅁㅇ)ㄱ");
            }
        }

        if (msg == "/오늘급식") {
            var luch = getLaunchMenu("today");
            if(luch != null) {
                replier.reply(luch);
            } else {
                replier.reply("오늘의 급식메뉴를 가져올 수 없습니다. ㄴ(ㅇㅁㅇ)ㄱ");
            }
        }

        if (msg == "/내일급식") {
            var luch = getLaunchMenu("tomorrow");
            if(luch != null) {
                replier.reply(luch);
            } else {
                replier.reply("내일의 급식메뉴를 가져올 수 없습니다. ㄴ(ㅇㅁㅇ)ㄱ");
            }
        }
}
