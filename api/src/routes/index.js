const { Router } = require('express');
const axios = require('axios');
const { Character, Occupation, Character_Occupation } = require('../db');
const router = Router();

/*

Traemos toda la informacion de la API, la moldeamos en el back segun lo requerido 
y la laburamos luego desde el Front.

- Creamos funciones controladoras que traen toda la informacion 
y en las rutas solo las vamos a invocar.

- Revisar la API y fijarnos que nos devuelve el endpoint para no pifiarla con la forma de acceder.

*/

// Me traigo la informacion que necesito de la Api:
const getApiInfo = async () => {
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters');
    const apiInfo = await apiUrl.data.map(e => {
        return {
            name: e.name,
            img: e.img,
            nickname: e.nickname,
            status: e.status,
            id: e.char_id,
            occupation: e.occupation.map(e => e), // Mapeamos para que me devuelva el arreglo de ocupaciones.
            birthday: e.birthday,
            appearance: e.appearance.map(e => e),
        };
    });
    return apiInfo;
};

/*     Me traigo la informacion de la Base de datos:
- Del modelo Character, le aplico un findAll para acceder a la informacion dentro
- Incluyo el modelo de Occupation para que haga la relacion entre ambos, ya que 
  por ejemplo, cuando cree un personaje traiga tambien, su ocupacion.
  - Le paso los atributos que quiero que traiga (en éste caso solo tengo el nombre).
- Through: Mediante los atributos []. 
Es una comprobacion que hacemos cuando queremos traer el atributo del modelo. 
En este caso, queremos traer el atributo NAME del modelo de Occupation.  

*/

const getDbInfo = async () => {
    return await Character.findAll({
        include: {
            model: Occupation,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
};

// Concateno ambas funciones y la devuelvo:
const getAllCharacters = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

router.get('/characters', async (req, res) => {
    const { name } = req.query
    let charactersTotal = await getAllCharacters();
    if (name) {
        let characterName = await charactersTotal
            .filter(
                e => e.name.toLowerCase()
                    .includes(name.toLowerCase())
            );

        characterName.length ?
            res.status(200).send(characterName) :
            res.status(404).send('Character not found');
    } else {
        res.status(200).send(charactersTotal);
    };
});

router.get('/characters/:id', async (req, res) => {
    const { id } = req.params;
    const charactersTotal = await getAllCharacters();
    if (id) {
        let characterId = await charactersTotal.filter(e => e.id == id);
        characterId.length ?
            res.status(200).send(characterId) :
            res.status(404).send('Character not found');
    };
});

/*
- Entro a la Api y me traigo toda la informacion de ahi.
- El primer map, me devuelve muchos arreglos de ocupaciones.
- Para ingresar a cada uno de esos arreglos, vuelvo a ejecutar un segundo map, lo recorremos con un foorLoop donde le pedimos que nos retorne cada elemento dentro de esos arreglos en los que se va a ir posicionando.
- Hago un forEach donde solicito que para cada uno de esos elementos, entre al modelo de Occupation y compare si está la ocupacion. De estar, avanza, y de no estar crea la ocupacion (Metodo findOrCreate) 
donde el nombre sea el elemento que estamos mapeando y la guardamos dentro de nuestro modelo Occupation.
*/

router.get('/occupations', async (req, res) => {
    const { data } = await axios.get('https://breakingbadapi.com/api/characters')
    const occupations = data.map(e => e.occupation)
    const dbOccupation = occupations.flat()
    dbOccupation.forEach(e => {
        Occupation.findOrCreate({
            where: {
                name: e
            }
        });
    });
    const allOccupations = await Occupation.findAll();
    return res.status(200).send(allOccupations);
});

router.post('/character', async (req, res) => {
    let {
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
        occupation
    } = req.body;

    let characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb
    });

    let occupationDb = await Occupation.findAll({
        where: {
            name: occupation
        }
    });
    characterCreated.addOccupation(occupationDb);
    res.send('Character created successfully');
});

module.exports = router;