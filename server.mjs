import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer();
const listenPort = 8091;
const serverPort = 8080;

const wss = new WebSocketServer({ port: serverPort });

var cmdSender;

var commands = [
  'dr_fwd_10',
  'dr_rgt_3',
  'dr_lft_8',
  'dr_fwd_5',
  'dr_rev_5',
  'dr_rgt_15',
  'dr_lft_15',
  'dr_rgt_25',
  'dr_up_5'
]

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

server.listen(listenPort, function() {
  console.log(new Date() + ' | Server is listening on port ' + listenPort);
})

var sendCommands = (ws) => {
  let index = 0;
  let nCmds = commands.length - 1;

  cmdSender = setInterval(() => {
    if(index >= nCmds)
      index = 0;
    else
      index++;
    
    ws.send(commands[index]);
  }, 500)
}
