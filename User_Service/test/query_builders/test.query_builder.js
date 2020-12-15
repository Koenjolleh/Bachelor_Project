
/** Lists all users with a role */
exports.GetAllUsersWithARole = () => {

    return "SELECT * FROM users INNER JOIN user_roles " +
        "ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role";
        
}
