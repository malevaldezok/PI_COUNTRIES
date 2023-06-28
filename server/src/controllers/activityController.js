const {Country, Activity} = require('../db')

const addActivity = async (req, res) => {
    try {
        const { name, difficulty, duration, season, countryIds } = req.body;
            console.log(countryIds)
        if(!name || !difficulty || !duration || !season || !countryIds) {
            return res.status(400).json('please provide all fields')
        }
        const countryIdsArray = Array.isArray(countryIds) ? countryIds : [countryIds]
        const countries = await Country.findAll({
            where: {
                id: countryIdsArray,
            }
        })
        if(countries.length !== countryIdsArray.length) {
            return res.status(404).json('One or more selected countries do not exist.')
        }

        const newActivity = await Activity.create({
            name, 
            difficulty,
            duration,
            season,
        });
        await newActivity.addCountries(countryIdsArray)
        return res.status(200).json(newActivity)
    } catch (error) {
        console.log(error);
        return res.status(500).send('internal server error')
    }
}

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: Country 
        });
        return res.status(200).json(activities)
    } catch (error) {
        return res.status(500).send('Internal serveer errorr')
    }
}

module.exports = {
    addActivity, getActivities
}

{/*
const express = require('express');
const app = express();

app.use(express.json());
const { Activity, Country } = require('../db')
//postear actividad


const postActivity = async (req, res) => {
    console.log(req.body)

    const { name, difficulty, duration, season, countryId } = req.body;

    const newActivity = await Activity.create({
        name, 
        difficulty,
        duration: +duration,
        season
    })

    if(countryId && countryId.length > 0) {
        for(const id of countryId) {
            const country = await Country.findByPk(id);
            if(country) {
                await country.addActivity(newActivity)
            }
        }
        res.json(newActivity)
    }
    return newActivity;
}


//obtener actividad
const getActivities = async (req, res) => {
    const activities = await Activity.findAll();
    if(!activities) throw Error('No se encontraron actividades')
    return activities;
}
module.exports = {
    postActivity,
getActivities};

*/}