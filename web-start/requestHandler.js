const mariadb = require('./database/connect/mariadb');

function main(response){
    console.log('main');

    mariadb.query("SELECT * FROM product", function(err,rows){
        console.log(rows);
    });

    response.writeHead(200, {'Content-Type' : "text/html; charset=UTF-8;"}); // 헤드넣고
    response.write('박희원 main'); // 바디 넣고
    response.end(); // 끝!
}

function login(response){
    console.log('login');

    response.writeHead(200, {'Content-Type' : "text/html"}); // 헤드넣고
    response.write('login'); // 바디 넣고
    response.end(); // 끝!
}


let handle = {}; // key:value 꼴로 이루어진 상자..
handle['/'] = main;
handle['/login'] = login;

exports.handle = handle;