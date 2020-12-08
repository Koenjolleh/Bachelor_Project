const verifySignUp = require('../controllers/verifySignUp');
const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/user.schema');
const adminSchemas = require('../validators/schemas/admin.schema')
module.exports = function(app) {

    const userController = require('../controllers/user.controller');
 
    /** MANAGEMENT USERS */
    app.post('/api/user_service/signup', middlewareValidator.middlewareValidatorBody(schemas.signup, 'body'), [verifySignUp.checkRolesExisted], userController.signup);
    app.post('/api/user_service/signin', middlewareValidator.middlewareValidatorBody(schemas.signin, 'body'), userController.signin);
    app.get('/api/user_service/loaduser', userController.loaduser);
    app.post('/api/user_service/forgotpassword', middlewareValidator.middlewareValidatorBody(schemas.forgotpassword, 'body'), userController.forgotpassword);
    app.get('/api/user_service/resetpassword/:resetpasswordtoken', userController.resetpassword);
    app.put('/api/user_service/updatepasswordviaemail', middlewareValidator.middlewareValidatorBody(schemas.updatepasswordviaemail, 'params'), userController.updatepasswordviaemail);
    
    /** USER FUNCTIONS? */
    app.get('/api/user_service/getownersofbroker/:id_user', middlewareValidator.middlewareValidatorParams(schemas.userid, 'params'), userController.getOwnersOfBroker)
    app.get('/api/user_service/getownersdependentonbroker', middlewareValidator.middlewareValidatorBody(schemas.getownersdependentonbroker,'body'), userController.getOwnersDependentOnBroker);
    app.delete('/api/user_service/removeownerdependentonbroker', middlewareValidator.middlewareValidatorBody(schemas.removeownerdependentonbroker,'body'), userController.removeOwnerDependentOnBroker);
    app.put('/api/user_service/updateownerdependentonbroker', middlewareValidator.middlewareValidatorBody(schemas.updateownerdependentonbroker,'body'), userController.updateOwnerDependentOnBroker);


    /** Authentication call from jwt passport in API Composer service */
    app.get('/api/user_service/getusers/:id_user', middlewareValidator.middlewareValidatorParams(schemas.userid,'params'), userController.getUsers);

    const adminController = require('../controllers/user.admin.controller')
    /* ADMIN LOCATION */
    app.post('/api/user_service/getAdminListAllCustomers', middlewareValidator.middlewareValidatorParams(adminSchemas.GetAdminListAllCustomers, 'body'), adminController.getAdminListAllCustomers)

}