const { Router } = require("express");
const router = Router();
const countryRouter = require('./countryRouter')
const activityRouter = require('./activityRouter')

/*//ruta para países
router.get('/countries', countryController.getCountries)
router.get('/countries/:idPais', countryController.getCountryById)
router.get('/countries/name', countryController.getCountriesByName)

//ruta para actividades
router.post('/activities', activityController.postActivity)
router.get('/activities', activityController.getActivities)*/

router.use('/countries', countryRouter);
router.use('/activities', activityRouter)

module.exports = router;
