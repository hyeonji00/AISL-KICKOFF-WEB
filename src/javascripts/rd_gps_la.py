import requests

url = "http://203.250.148.120:20519/Mobius/kick/gps/la"

#특정 킥보드의 아이디
kick_id="MFBE29"

payload={}
headers = {
  'Accept': 'application/json',
  'X-M2M-RI': '12345',
  'X-M2M-Origin': 'SOrigin'
}

#연결체크
print("listening!")

#킥보드의 자료형의 데이터를 가져옴
while True:
    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.text)
    lst=response.text.split(":")
    for i in range(0,len(lst)):
        if "con" in lst[i]:
            lst[i+1]=lst[i+1].replace('}','').replace('"','')

            
            if kick_id in lst[i+1]:
              
              print(lst[i+1])
