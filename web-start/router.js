function route(pathname,handle,response){
    console.log('pathname :' + pathname);

    if(typeof handle[pathname] == 'function'){
        handle[pathname](response);
    }else{
        response.writeHead(404, {'Content-Type' : "text/html"}); // 헤드넣고
        response.write('not found'); // 바디 넣고
        response.end(); // 끝!
    }
}

exports.route = route;