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
    app.get('/api/location_service/getAdminListAllLocationsFromBroker/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetAdminListAllLocationsFromBroker, 'body'),adminController.getAdminListAllLocationsFromBroker)

    /** Admin: share a location with users */
    app.get('/api/location_service/shareLocationWithOwners/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.ShareLocationWithOwners,'body'),adminController.shareLocationWithOwners)

    /** Admin: get schedule */
    app.get('/api/location_service/getAdminSchedule/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetSchedule,'body'),adminController.getAdminSchedule)

    /** Admin: set schedule */
    app.get('/api/location_service/setAdminSchedule/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetSchedule,'body'),adminController.setAdminSchedule)

    /** Admin: update schedule */
    app.get('/api/location_service/updateAdminSchedule/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateSchedule,'body'),adminController.updateAdminSchedule)

    /** Admin: get list customer activities */
    app.get('/api/location_service/getAdminListCustomerActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListCustomerActivities,'body'),adminController.getAdminListCustomerActivities)

    /** Admin: set customer activities */
    app.get('/api/location_service/setAdminCustomerActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetCustomerActivities,'body'),adminController.setAdminCustomerActivities)

    /** Admin: update customer activities */
    app.get('/api/location_service/updateAdminCustomerActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateCustomerActivities,'body'),adminController.updateAdminCustomerActivities)

    /** Admin: delete customer activities */
    app.get('/api/location_service/deleteAdminCustomerActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteCustomerActivities,'body'),adminController.deleteAdminCustomerActivities)

    /** Admin: get list zone type */
    app.get('/api/location_service/getAdminListZoneTypes/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneTypes,'body'),adminController.getAdminListZoneTypes)

    /** Admin: set zone type */
    app.get('/api/location_service/setAdminZoneTypes/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZoneTypes,'body'),adminController.setAdminZoneTypes)

    /** Admin: update zone type */
    app.get('/api/location_service/updateAdminZoneTypes/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZoneTypes,'body'),adminController.updateAdminZoneTypes)

    /** Admin: delete zone type */
    app.get('/api/location_service/deleteAdminZoneTypes/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZoneTypes,'body'),adminController.deleteAdminZoneTypes)

    /** Admin: get list zone category */
    app.get('/api/location_service/getAdminListZoneCategories/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZoneCategories,'body'),adminController.getAdminListZoneCategories)

    /** Admin: set zone category */
    app.get('/api/location_service/setAdminZoneCategories/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZoneCategories,'body'),adminController.setAdminZoneCategories)

    /** Admin: update zone category */
    app.get('/api/location_service/updateAdminZoneCategories/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZoneCategories,'body'),adminController.updateAdminZoneCategories)

    /** Admin: delete zone category */
    app.get('/api/location_service/deleteAdminZoneCategories/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZoneCategories,'body'),adminController.deleteAdminZoneCategories)

    /** Admin: get list zones */
    app.get('/api/location_service/getAdminListZones/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListZones,'body'),adminController.getAdminListZones)

    /** Admin: set zones */
    app.get('/api/location_service/setAdminZones/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetZones,'body'),adminController.setAdminZones)

    /** Admin: update zones */
    app.get('/api/location_service/updateAdminZones/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateZones,'body'),adminController.updateAdminZones)

    /** Admin: delete zones */
    app.get('/api/location_service/deleteAdminZones/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteZones,'body'),adminController.deleteAdminZones)

    /** Admin: get list outside activities */
    app.get('/api/location_service/getAdminListOutsideActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListOutsideActivities,'body'),adminController.getAdminListOutsideActivities)

    /** Admin: set outside activities */
    app.get('/api/location_service/setAdminOutsideActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetOutsideActivities,'body'),adminController.setAdminOutsideActivities)

    /** Admin: update outside activities */
    app.get('/api/location_service/updateAdminOutsideActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateOutsideActivities,'body'),adminController.updateAdminOutsideActivities)

    /** Admin: delete outside activities */
    app.get('/api/location_service/deleteAdminOutsideActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteOutsideActivities,'body'),adminController.deleteAdminOutsideActivities)

    /** Admin: get list business activities */
    app.get('/api/location_service/getAdminListBusinessActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListBusinessActivities,'body'),adminController.getAdminListBusinessActivities)

    /** Admin: set business activities */
    app.get('/api/location_service/setAdminBusinessActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.SetBusinessActivities,'body'),adminController.setAdminBusinessActivities)

    /** Admin: update business activities */
    app.get('/api/location_service/updateAdminBusinessActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateBusinessActivities,'body'),adminController.updateAdminBusinessActivities)

    /** Admin: delete business activities */
    app.get('/api/location_service/deleteAdminBusinessActivities/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteBusinessActivities,'body'),adminController.deleteAdminBusinessActivities)

    /** Admin: get list locations */
    app.get('/api/location_service/getAdminListLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListLocations,'body'),adminController.getAdminListLocations)

    /** Admin: update locations */
    app.get('/api/location_service/updateAdminLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateLocations,'body'),adminController.updateAdminLocations)

    /** Admin: get list shared locations */
    app.get('/api/location_service/getAdminListSharedLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.GetListSharedLocations,'body'),adminController.getAdminListSharedLocations)

    /** Admin: update shared locations */
    app.get('/api/location_service/updateAdminSharedLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.UpdateSharedLocations,'body'),adminController.updateAdminSharedLocations)

    /** Admin: delete shared locations */
    app.get('/api/location_service/deleteAdminSharedLocations/:id_user', middlewareValidator.middlewareValidatorBody(adminSchemas.DeleteSharedLocations,'body'),adminController.deleteAdminSharedLocations)
}