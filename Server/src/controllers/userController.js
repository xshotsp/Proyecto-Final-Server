const { User } = require ('../db')

const getUser = async (id) => {
    const user = await User.findByPk(id)
    return user
}

const getAllUsers = async () => {
    const users = await User.findAll()
    return users
}



module.exports = { getUser,getAllUsers}
