*KOREAN ONLY

School_LaunchMenu.js

급식정보는 나이스 교육정보 개방 포털과 네이버에서 가져옵니다.

나이스 교육정보 개방 포털: API
네이버: Jsoup Parsing

하단 링크를 클릭해 나이스 교육정보 개방 포털에서 개발자용 API KEY를 발급받으셔야 합니다.
https://open.neis.go.kr/portal/mainPage.do

표준 코드를 포함한 학교 관련 코드는 아래에서 검색하실 수 있습니다.
https://open.neis.go.kr/portal/data/service/selectServicePage.do?page=1&rows=10&sortColumn=&sortDirection=&infId=OPEN17020190531110010104913&infSeq=1


|변수명|타입|변수설명|예시|
|------|---|-----------|----|
|KEY|STRING|API 사용시 필요한 인증키|din8f2ef9efnd0euhfwnofj|
|ATPT_OFCDC_SC_CODE|STRING|시도교육청코드|J10|
|SD_SCHUL_CODE|STRING|학교 표준 코드|1234567|
|SchoolName|STRING|학교 명|테스트고, 테스트중, 테스트고등학교|


Timetable.js

고등학교 시간표 정보는 나이스 교육정보 개방 포털에서 가져옵니다.

|변수명|타입|변수설명|예시|
|------|---|-----------|----|
|KEY|STRING|API 사용시 필요한 인증키|din8f2ef9efnd0euhfwnofj|
|ATPT_OFCDC_SC_CODE|STRING|시도교육청코드|J10|
|SD_SCHUL_CODE|STRING|학교 표준 코드|1234567|
|grade|STRING, NUMBER|학년|1|
|classnum|STRING, NUMBER|반|1|
