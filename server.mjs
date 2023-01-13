import http from 'http';
import url from 'url';
import WebSocket, { WebSocketServer } from 'ws';

const server = http.createServer();
const port = 8091;

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  console.log(new Date() + ' | A new client is connected.');

  // ws.send("Welcome to WSS server!");
  sendCommands(ws);

  ws.on('message', function(msgStr) {
    console.log('Message: '+msgStr);
    ws.send(msgStr);
  });

  ws.on('close', function(connection) {
    console.log(new Date() + ' | Closing connection for a client.');
  });
});

server.listen(port, function() {
  console.log(new Date() + ' | Server is listening on port ' + port);
})

var sendCommands = (ws) => {
  ws.send("cmd 1")
  ws.send("cmd 2")
  ws.send("cmd 3")
  ws.send("cmd 4")
  ws.send("cmd 5")
}
