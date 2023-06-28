const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require('./src/db.js');
//const {Op} = require('sequelize')
const PORT = 3001;
const bodyParser = require('body-parser')

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }))


conn.sync({ force: true }).then(() => {
axios.get('http://localhost:5000/countries')
.then(response => {
  const countries = response.data;
  countries.forEach(c => {
    Country.findOrCreate({
      where: { id: c.cca3},
      defaults: {
        name: c.name.common,
        flag: c.flags.png,
        continent: c.continents[0],
        capital: c.capital ? c.capital[0] : 'No tiene capital',
        subregion: c.subregion ? c.subregion : 'No tiene subregión',
        area: c.area ? c.area : 'No tiene área',
        population: c.population,
        }
    })
  });
}) 
.then(()=> {
  server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  }); 
})
.catch(error => {
  console.error('Error al obtener datos', error);
})
})
.catch(error => console.error(error))

/*   Country.findAll({
    attributes: ['cca3'],
    group: ['cca3'],
    having: sequelize.literal('COUNT(*) > 1')
  })
  .then((duplicates) => {
    const cca3Values = duplicates.map(duplicate => duplicate.cca3)
    Country.destroy({
      where: {
        cca3: cca3Values,
        uuid: {
          [Op.not]: null
        }
      }
    })
    .then(result => {
      console.log(`${result} registros eliminados`);
    })
    .catch(error => {
      console.error('Error al eliminar los duplicados: ', error)
    })
  }) */