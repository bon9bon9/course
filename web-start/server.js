let http = require('http'); // node.js 가 가지고 있는 모듈을 부르는 함수
let url = require('url');


function start(route, handle){
    function onRequest(request, response) { // 요청이 온다면..
        // let pathname = url.parse(request.url).pathname; - 강사님이 이렇게 설명해주셨으나 현재는 url.parse가 deprecate됨..
        let parsedUrl = new url.URL(request.url, `http://${request.headers.host}`);
        let pathname = parsedUrl.pathname;
        route(pathname,handle,response);
    }
    
    http.createServer(onRequest).listen(8888); // http 모듈을 사용하여 서버를 만들고 8888 포트를 사용한다.
    
}

exports.start = start; // 내가 밖에서 이 함수를 사용할 수 있도록 하겠다