var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("X-M2M-RI", "12345");
myHeaders.append("X-M2M-Origin", "{{aei}}");
myHeaders.append("Content-Type", "application/vnd.onem2m-res+json; ty=4");

var raw = "{\n    \"m2m:cin\": {\n        \"con\": \"aisl 37.54687 127.123548 23.2135\"\n    }\n}";

var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
};

var string
var arr
var lat
var long

fetch("http://203.250.148.120:20519/Mobius/kick/gps", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(string = result["m2m:cin"].con)
        arr = string.split(" ")
        console.log("lat : ", lat = arr[1])
        console.log("long : ", long = arr[2])
    })
    .catch(error => console.log('error', error));
