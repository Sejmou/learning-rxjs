const http = require('http');
const port = 3000;

const server = http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Origin', '*');// f*ck CSRF

    if (req.method === 'POST') {
        console.log('received a POST request');
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        req.on('end', () => {
            console.log('body content:');
            console.log(body);
            console.log();
            console.log('echoing body content back...');
            res.write(body);
            res.end();
        });
    }
    else {
        res.write('This dumb server can only echo what you send him, so send a POST with some text in the body if you want.');
        res.write('There is nothing more this server can do for you. Bye.');
        res.end();
    }
});

server.listen(port, function (error) {
    if (error) console.log('Something went wrong', error);
    else console.log('Server listening on port', port);
});