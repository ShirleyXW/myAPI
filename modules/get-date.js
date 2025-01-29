const UserMessage = require('../messages/lang/en/user');

exports.getDate = (name) =>{
    const userMessage = new UserMessage(name);
    return userMessage.greeting;
}
