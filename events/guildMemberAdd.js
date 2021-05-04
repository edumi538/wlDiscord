const moment = require('moment')
module.exports.run = async (member, client) => {
    const newUser = ({
        status: 'newUser',
        user: client.user.username,
        userId: client.user.id,
        discriminator: client.user.discriminator,
        daysSinceCreation: moment().diff(moment(client.user.createdAt), 'days')
    })
    if (newUser.daysSinceCreation < 3) return (() => { console.log({ antiSelf: true, userId: newUser.userId, return: 'Possivel Selfbot'}) })()

}