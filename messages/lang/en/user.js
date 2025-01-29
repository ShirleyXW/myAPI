function UserMessage(name){
    this.greeting = `Hello ${name}, What a beautiful day. Server current date and time is: ${new Date().toLocaleString()}`;
}
module.exports = UserMessage;