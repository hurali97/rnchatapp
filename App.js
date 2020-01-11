
import React from 'react';import {
  View,
  TextInput,
  Text, 
  TouchableOpacity
} from 'react-native';
import io from "socket.io-client";
 


class App extends React.Component {

constructor(props){
  super(props)
  this.state = {
    chatMessage: "",
    chatMessages: [],
    room: null
 };
}


componentDidMount() {
  this.socket = io("http://192.168.1.108:3000");
   this.socket.on("chat message", msg => {
         this.setState({ chatMessages: [...this.state.chatMessages, msg]   
    });
 });
}

submitChatMessage( room ) {
  this.socket.emit('chat message', { room: room, msg: this.state.chatMessage});
  this.setState({chatMessage: ''});
}
 

  render(){

    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text style={{borderWidth: 2}}>{chatMessage}</Text>
    ));

    return (
      <View style={{flex:1}}>
        <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center',marginTop:10}}>
          <TouchableOpacity style={{backgroundColor:'green'}} onPress={()=> {
          // this.socket.on('connection', function() {
            // Connected, let's sign-up for to receive messages for this room
            this.setState({room:1})
            this.socket.emit('room', {room : 1});
        //  });
          }} >
      <Text> Room 1  </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'green',marginTop:5}} onPress={()=> {
            // this.socket.on('connect', function() {
              // Connected, let's sign-up for to receive messages for this room
              this.setState({room:2})
              this.socket.emit('room', {room : 2});
            // })
          }}>
      <Text> Room 2  </Text>
          </TouchableOpacity>
        </View>
      {chatMessages}
      <View style={{backgroundColor:'red',marginTop:10}}>
      <TextInput
        style={{height: 40, borderWidth: 2}}
        autoCorrect={false}
        value={this.state.chatMessage}
        onSubmitEditing={() => this.submitChatMessage(this.state.room)}
        onChangeText={chatMessage => {
          this.setState({chatMessage});
        }}
      />
      </View>
    </View>
    );
  }
 
};

 
export default App;
