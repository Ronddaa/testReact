import { createServer } from 'http';
import users from './users.js';
let body = "";

async function findUser(name, pass) {
    for (let uid in users) {
        if (users[uid].name === name && users[uid].pass === pass) return true;
    }
    return false;
}


createServer(async (req, res)=> {
    console.log('server work');
    if(req.url == "/login"){
        // буфер для получаемых данных
        body = ""; 
        // получаем данные из запроса в буфер
        for await (const chunk of req) {
            body += chunk;
            body = JSON.parse(body)
        }
        console.log(body);
        const answer = await findUser(body.name, body.pass);
        if (answer == true){
            res.setHeader('Set-Cookie',['uid='+body.name ]);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            
            res.write("true", 'utf8', () => { 
                console.log("Writing string Data..."); 
            }); 
            res.end();
            console.log("login true", answer);
        }
        else{
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("false", 'utf-8');
            console.log("login false", answer);
        }
    }
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end();
        console.log("notlogin");
    }

}).listen(3000);









       /* if (req.method =='POST') {
            console.log('post');
            body = '';
            req.on('data', chunk => {
            body += chunk.toString();
            body = JSON.parse(body);
            console.log(body);
            });
        }
        console.log("end");
        //res.setHeader('Set-Cookie', ['uid="";max-age=10000', 'u=;max-age=10000']);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(answer, 'utf-8');
*/
