let express = require('express');
let bodyParser = require('body-parser');
let router = express.Router();
let cors = require('cors');
let app = express();
app.use(cors());

let PORT = 3001


app.use('/api', bodyParser.json(), router);   //[use json]
app.use('/api', bodyParser.urlencoded({ extended: false }), router);

let pets = {
    list: [
        { id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },
        { id: 2, type: 'dog', age: 1, weight: 10, price: 3000 }
    ]
}
let income = 0


router.route('/pets')
    .get((req, res) => res.json(pets.list))
    .post((req, res) => {
        console.log(req.body)
        let newPet = {}
        newPet.id = (pets.list.length) ? pets.list[pets.list.length - 1].id + 1 : 1
        newPet.type = req.body.type
        newPet.age = req.body.age
        newPet.weight = req.body.weight
        newPet.price = req.body.price
        pets = { "list": [...pets.list, newPet] }
        res.json(pets.list)
    })

router.route('/pets/:pet_id')
    .get((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        res.json(pets.list[id])
    })
    .put((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        pets.list[id].id = req.body.id
        pets.list[id].type = req.body.type
        pets.list[id].age = req.body.age
        pets.list[id].weight = req.body.weight
        pets.list[id].price = req.body.price
        res.json(pets.list)
    })
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        pets.list = pets.list.filter(item => +item.id !== +pet_id)
        res.json(pets.list)
    })



router.route('/income')
    .get((req, res) => res.json(income))



router.route('/purchase/:pet_id')
    .delete((req, res) => {
        const pet_id = req.params.pet_id
        const id = pets.list.findIndex(item => +item.id === +pet_id)
        console.log('PetID: ', pet_id, 'ID: ', id)
        if (id !== -1) {
            income += pets.list[id].price
            pets.list = pets.list.filter(item => +item.id !== +pet_id)
            res.json(pets.list)
        }
        else {
            res.send('Not found')

        }
    })




app.use("*", (req, res) => res.status(404).send('404 Not found'));
app.listen(PORT, () => console.log(`listen at ${PORT}`))