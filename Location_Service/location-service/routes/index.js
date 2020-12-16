const middlewareValidator = require('../validators/middleware.validator');
const schemas = require('../validators/schemas/location.schema');
const adminSchemas = require('../validators/schemas/admin.schema')
module.exports = function(app) {

    const locationController = require('../controllers/location.controller');
    const adminController = require('../controllers/admin.controller');

    /** LOCATIONS DATA */
    app.get('/api/location_service/getsharedlocations/:id_user', middlewareValidator.middlewareValidatorParams(schemas.location, 'params'), locationController.getSharedLocations);
    app.post('/api/location_service/getlocationdetails', middlewareValidator.middlewareValidatorBody(schemas.locationdetails,'body'), locationController.getLocationDetails);
    
    /** BROKER */
    app.get('/api/location_service/getbrokerlocations/:id_user', middlewareValidator.middlewareValidatorParams(schemas.location, 'params'), locationController.getBrokerLocations);
    app.post('/api/location_service/sharelocationwithowner', middlewareValidator.middlewareValidatorBody(schemas.locationwithowner,'body'), locationController.shareLocationWithOwner);
    app.delete('/api/location_service/removelocationfromowner', middlewareValidator.middlewareValidatorBody(schemas.locationwithowner,'body'), locationController.removeLocationFromOwner);
    
    /** ADMIN */
    app.post('/api/location_service/addlocationforbroker', middlewareValidator.middlewareValidatorBody(schemas.addlocationforbroker,'body'), locationController.addLocationForBroker);
    app.put('/api/location_service/updatelocationforbroker', middlewareValidator.middlewareValidatorBody(schemas.updatelocationforbroker,'body'), locationController.updateLocationForBroker);
    app.delete('/api/location_service/removelocationfrombroker', middlewareValidator.middlewareValidatorBody(schemas.locationwithbroker,'body'), locationController.removeLocationFromBroker);
    app.get('/api/location_service/getdatasetsfromlocation', middlewareValidator.middlewareValidatorBody(schemas.locationdetails,'body'), locationController.getDatasetsFromLocation);
    app.post('/api/location_service/adddatasetforlocation', middlewareValidator.middlewareValidatorBody(schemas.adddatasetforlocation,'body'), locationController.addDatasetForLocation);
    app.put('/api/location_service/updatedatasetforlocation', middlewareValidator.middlewareValidatorBody(schemas.updatedatasetforlocation,'body'), locationController.updateDatasetForLocation);
    app.delete('/api/location_service/removedatasetfromlocation', middlewareValidator.middlewareValidatorBody(schemas.removedatasetfromlocation,'body'), locationController.removeDatasetFromLocation);

    /** Admin: List all the locations from a specific Broker */
    app.post('/api/location_service/getAdminListAllLocationsFromBroker', middlewareValidator.middlewareValidatorBody(adminSchemas.GetAdminListAllLocationsFromBroker, 'body'),adminController.getAdminListAllLocationsFromBroker)

    /** Admin: share a location with users */
    app.get('/api/location_service/shareLocationWithOwners/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.ShareLocationWithOwners,'body'),adminController.shareLocationWithOwners)

    /** Admin: get schedule */
    app.post('/api/location_service/getAdminSchedule', middlewareValidator.middlewareValidatorBody(adminSchemas.GetSchedule,'body'),adminController.getAdminSchedule)

    /** Admin: set schedule */
    app.post('/api/location_service/setAdminSchedule', middlewareValidator.middlewareValidatorBody(adminSchemas.SetSchedule,'body'),adminController.setAdminSchedule)

    /** Admin: update schedule */
    app.post('/api/location_service/updateAdminSchedule', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateSchedule,'body'),adminController.updateAdminSchedule)

    /** Admin: get list customer activities */
    app.get('/api/location_service/getAdminListCustomerActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListCustomerActivities,'body'),adminController.getAdminListCustomerActivities)

    /** Admin: get list zone type */
    app.get('/api/location_service/getAdminListZoneTypes/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneTypes,'body'),adminController.getAdminListZoneTypes)


    /** Admin: get list zone category */
    app.get('/api/location_service/getAdminListZoneCategories/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneCategories,'body'),adminController.getAdminListZoneCategories)


    /** Admin: get list zones */
    app.get('/api/location_service/getAdminListZones/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZones,'body'),adminController.getAdminListZones)


    /** Admin: get list outside activities */
    app.get('/api/location_service/getAdminListOutsideActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListOutsideActivities,'body'),adminController.getAdminListOutsideActivities)

    /** Admin: get list business activities */
    app.get('/api/location_service/getAdminListBusinessActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListBusinessActivities,'body'),adminController.getAdminListBusinessActivities)

    /** Admin: get list locations */
    app.get('/api/location_service/getAdminListLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListLocations,'body'),adminController.getAdminListLocations)

    /** Admin: update locations */
    app.get('/api/location_service/updateAdminLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateLocations,'body'),adminController.updateAdminLocations)

    /** Admin: get list shared locations */
    app.post('/api/location_service/getAdminListSharedLocations', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListSharedLocations,'body'),adminController.getAdminListSharedLocations)

    /** Admin: update shared locations */
    app.post('/api/location_service/updateAdminSharedLocations', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateSharedLocations,'body'),adminController.updateAdminSharedLocations)

    /** Admin: delete shared locations */
    app.post('/api/location_service/deleteAdminSharedLocations', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteSharedLocations,'body'),adminController.deleteAdminSharedLocations)
}