exports.UpdatePotentialGains = (description, id_pgain, id_insight) =>{
    return "UPDATE potential_gains " +
        "SET description = '" + description + " " +
        "WHERE potential_gains = " + id_pgain + "AND potential_gains.id_insight = " + id_insight
}