exports.GetUserRole = (id_user) => {
    return "SELECT roles.name " +
        "FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE users.id_user = " + id_user + ";";
}