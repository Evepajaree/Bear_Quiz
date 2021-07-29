import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '../styles/admin.module.css'
import useSWR, { mutate } from 'swr'

const URL = `http://localhost:3001/api/pets/`
const URL2 = `http://localhost:3001/api/income`


const fetcher = url => axios.get(url).then(res => res.data)
const SWR1 = () => {
    const [pets, setPets] = useState({ list: [{ id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },] })
    const [pet, setPet] = useState({})
    const [id, setId] = useState(0)
    const [type, setType] = useState('')
    const [age, setAge] = useState(0)
    const [weight, setWeight] = useState(0)
    const [price, setPrice] = useState(0)
    const [income, setIncome] = useState(0)
    const { data } = useSWR(URL, URL2, fetcher)


    useEffect(() => { getPets() }, [])
    useEffect(() => { getIncome() }, [])

    const getPets = async () => {
        let pets = await axios.get(URL)
        setPets(pets.data)
        //console.log('Pet:', pets.data)
    }
    const getIncome = async () => {
        let income = await axios.get(URL2)
        setIncome(income.data)
        //console.log('income:', income.data)
    }

    const getPet = async (id) => {
        let pet = await axios.get(`${URL}${id}`)
        console.log('bear id: ', pet.data)
        setPet({id:pet.data.id , type:pet.data.type , weight:pet.data.weight ,  age:pet.data.age ,  price:pet.data.price})
      }



    const printPets = () => {
        if (pets && pets.length)
            return pets.map((pet, index) =>
                <li className={styles.listItem} key={index}>
                    <h6>Id:{(pet) ? pet.id : 0}</h6>
                    <h6>Type:{(pet) ? pet.type : '-'}</h6>
                    <h6>Age:{(pet) ? pet.age : 0}</h6>
                    <h6>Weight:{(pet) ? pet.weight : 0}</h6>
                    Price:{(pet) ? pet.price : 0}
                    <button className={styles.byttondelet} onClick={() => deletePet(pet.id)} >Delete</button>
                    <button className={styles.byttonget} onClick={() => getPet(pet.id)}>Get</button>
                    <button className={styles.byttonupdate} onClick={() => updatePet(pet.id)}>Update</button>
                </li>
            )
        else
            return <li> No Pet</li>
    }

    const printIncome = () => {
        return income
    }


    const addPet = async (type, age, weight, price) => {
        let pets = await axios.post(URL, { type, age, weight, price })
        setPets(pets.data)
    }


    const deletePet = async (id) => {
        const result = await axios.delete(`${URL}${id}`)
        console.log(result.data)
        getPets()
    }

    const updatePet = async (id) => {
        const result = await axios.put(`${URL}${id}`, { id, type, age, weight, price })
        //console.log('student id update: ', result.data)
        getPets()
    }



    return (<div className={styles.container} >
        <h1>Admin</h1>
        <h2>Income:{printIncome()}</h2>
        <h2>Pets</h2>
        <ul className={styles.list}  >{printPets()}</ul>
        selected pet: {pet.type} {pet.age} {pet.weight} {pet.price}
        <h2>Add pet</h2>
        <ul className={styles.formadd} >
            Type:<input type="text" onChange={(e) => setType(e.target.value)} /> <br />
        Age:<input type="number" onChange={(e) => setAge(e.target.value)} /> <br />
        Weight:<input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
        Price:<input type="number" onChange={(e) => setPrice(e.target.value)} /> <br />
            <button className={styles.byttonadd} onClick={() => addPet(type, age, weight, price)}>Add new pet</button>
        </ul>
    </div>
    )
}

export default SWR1