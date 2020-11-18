
/** Lists all owners of a specific broker */
exports.BrokerOwners = (id_user) => {

    return 'SELECT ' +
        'id_user, ' +
        'name, ' +
        'username, ' +
        'email, ' +
        'depend ' +
        'FROM users ' +
        'WHERE depend = (' + id_user + ') ' +
        'ORDER BY name ASC;';

}

/** Is it necessary to do the inner join? users dependent on the broker should all be shop owners anyway.*/
exports.GetOwnersDependentOnBroker = (id_broker) => {

    return "SELECT users.id_user, users.name, users.username, users.email, users.depend, users.description FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE depend = " + id_broker + " " +
        "AND roles.name = 'SHOP_OWNER'";

}

exports.RemoveOwnerDependentOnBroker = (id_broker, id_owner) => {

    return "DELETE FROM users " +
        "WHERE depend = " + id_broker + " " +
        "AND id_user = " + id_owner + " " +
        "RETURNING *;";

}

exports.UpdateOwnerDependentOnBroker = (id_broker, id_owner, name, username, email, depend, description) => {

    return "UPDATE users " +
        "SET name = '" + name + "', " +
        "username = '" + username + "', " +
        "email = '" + email + "', " +
        "depend = " + depend + ", " +
        "description = '" + description + "' " +
        "WHERE id_user = " + id_owner + " " +
        "AND depend = " + id_broker + " " +
        "RETURNING *;";

}

exports.GetUserRole = (id_user) => {
    return "SELECT roles.name " +
        "FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE users.id_user = " + id_user + ";";
}