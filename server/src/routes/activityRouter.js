const {Router} = require('express');
const router = Router()
const { addActivity, getActivities } = require('../controllers/activityController')

router.post('/', addActivity)
router.get('/', getActivities)

module.exports = router;

{/*const activityRouter = require('express').Router();
const {postActivity, getActivities} = require('../controllers/activityController')

//postear nueva actividad
activityRouter.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countryId } = req.body;
    try {
        const newActivity = await postActivity(req, res)
        res.status(200).json(newActivity)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al crear nueva actividad.'})
    }
})

//obtener actividades
activityRouter.get('/', async (req, res) => {
    try {
        const activities = await getActivities(req,res);
        if(activities.length === 0) {
            res.status(404).json({ error:'No se encontraron actividades'})
        } else {
            res.status(200).json(activities)
        }
    } catch (error) {
        throw new Error('No se encontraron actividades.')
    }
})

//CREAR UNO PARA ELIMINAR ACTIVIDAD

module.exports = activityRouter*/}
