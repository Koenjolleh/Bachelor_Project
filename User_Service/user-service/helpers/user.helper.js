/** List Customers */
exports.JsonAdminCustomerList = (customerList) => {

    return customerList.map(d => {
        return {
            customerList: d.name
        };
    });
}