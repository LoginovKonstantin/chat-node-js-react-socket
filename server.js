const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

let allMessages = [];
let usersOnline = ['kot'];

app.use(express.static('public'));

app.get('/entrance', (req, res, next) => {
  let name = req.query.name;
  if(usersOnline.includes(name)){
    res.send('not access')
  }else{
    console.log('----------------entrance in chat: ' + name);
    usersOnline.push(name);
    res.send('access');
  }
});

io.on('connection', socket => {
  socket.broadcast.emit('newUser', getNameByCookie(socket));
  socket.on('message', body => {
    let mess = {
      name: body.name,
      message: body.message,
      time: new Date().getHours() + ':' + ('0' + new Date().getMinutes()).slice(-2)
    }
    allMessages.push(mess)
    socket.emit('message', mess);
    socket.broadcast.emit('message', mess);
  });
  socket.emit('allMessages', allMessages);
  console.log('a user connected');
  socket.on('disconnect', () => {
    socket.broadcast.emit('exitUser', getNameByCookie(socket));
    console.log('user disconnected');
  });
});

function getNameByCookie(socket){
  let user;
  socket.request.headers.cookie.replace(/\s+/g, '').split(';').map((el, index) => {
    if(el.startsWith('nameInChatByKot')){
      user = el;      // socket.broadcast.emit('newUser', el)
    }
  })
  return user;
}
http.listen(8080, () => {
  console.log('listen: ' + 8080);
})
