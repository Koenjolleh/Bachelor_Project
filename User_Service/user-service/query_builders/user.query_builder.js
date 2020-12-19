
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
/** Admin: List all customers (Brokers) */
exports.GetAdminListAllCustomers = () => {
    return "SELECT users.name " +
        "FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE roles.name = 'BROKER'"
}
/** Is it necessary to do the inner join? users dependent on the broker should all be shop owners anyway.*/
exports.GetOwnersDependentOnBroker = (id_broker) => {

    return "SELECT users.id_user, users.name, users.username, users.email, users.depend, users.description FROM users " +
        "INNER JOIN user_roles ON users.id_user = user_roles.id_user " +
        "INNER JOIN roles ON user_roles.id_role = roles.id_role " +
        "WHERE depend = " + id_broker + " " +
        "AND roles.name = 'SHOP_OWNER'";

}
exports.GetUserListAllLocationsFromBroker = (id_user) => {
    return "SELECT " +
        "c.id_user, " +
        "c.name AS owner, " +
        "f.name, " +
        "c.id_user " +
        "FROM users c " +
        "INNER JOIN user_roles d ON c.id_user = d.id_user " +
        "INNER JOIN roles f ON d.id_role = f.id_role " +
        "WHERE f.name = 'BROKER' AND c.id_user = " + id_user;
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