import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

	// Subscribe a listner - a callback function -
	// to the store that reads the current state, turns it into a 
	// plain JavaScript object, and emits it as a state event on 
	//the Socket.io server.
  store.subscribe(
  	() => io.emit('state', store.getState.toJS())
  	)

  //listen to 'connection' events on our Socket.io server. 
  // We get one each time a client connects. In the event 
  // listener we emit the current state 
  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
  });
}