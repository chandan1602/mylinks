const ServerLink = 'https://git.heroku.com/mylinkserver.git'
const GlobalLink = ServerLink + '/myLinks'

module.exports = {
    ServerLink,
    loginRoute : GlobalLink + '/signin',
    SignupRoute : GlobalLink + '/signup',
    requestUser : GlobalLink + '/requestUser',
    addData : GlobalLink + '/addData',
    requestData : GlobalLink + '/requestData',
}