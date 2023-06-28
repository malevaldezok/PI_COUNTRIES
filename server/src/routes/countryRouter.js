const countryRouter = require('express').Router()

const { getAllCountries, getCountryByName, getCountryById } = require('../controllers/countryController')

//

//obtener país por nombre, si no lo encuentra retorna todos los países
countryRouter.get('/', async (req, res) => {
    const { name } = req.query;
    if(name) {
        try {
           const countries = await getCountryByName(name);
           return res.status(200).json(countries);
        } catch (error) {
            return res.status(404).json({ error: error.message })
        }
    } else {
        const allCountries = await getAllCountries();
        return res.status(200).json(allCountries)
    }   
});

//obtener país por id
countryRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const countryId = await getCountryById(id);
        if(countryId.error) {
            return res.status(404).json(countryId)
        } else {
            return res.status(200).json(countryId)
        }
    } catch (error) {
        return res.status(404).json(error.message)
    }
})

module.exports = countryRouter;