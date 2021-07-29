import React, { useState, useEffect } from 'react'
import axios from 'axios'
//import useSWR, { mutate } from 'swr'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR, { mutate } from 'swr'

const URL = `http://localhost:3001/api/pets/`
const URL2 = `http://localhost:3001/api/purchase/`

const fetcher = url => axios.get(url).then(res => res.data)

const SWR2 = () => {
  const [pets, setPets] = useState({ list: [{ id: 1, type: 'cat', age: 1, weight: 5, price: 2000 },] })
  const [pet, setPet] = useState({})
  const [id, setId] = useState(0)
  const [type, setType] = useState('')
  const [age, setAge] = useState(0)
  const [weight, setWeight] = useState(0)
  const [price, setPrice] = useState(0)
  const { data } = useSWR(URL, fetcher)
  //const { data } = useSWR(URL2, fetcher)


  useEffect(() => { getPets() }, [])

  const getPets = async () => {
    let pets = await axios.get(URL)
    setPets(pets.data)
    //console.log('Pet:', pets.data)
  }
  const buyPet = async (id) => {
    const result = await axios.delete(`${URL2}${id}`)
    console.log(result.data)
    getPets()
  }


  const printPets = () => {
    if (pets && pets.length)
      return pets.map((pet, index) =>
        <li className={styles.listItem} key={index}>
          <h6>Type:{(pet) ? pet.type : '-'}</h6>
          <h6>Age:{(pet) ? pet.age : 0}</h6>
          <h6>Weight:{(pet) ? pet.weight : 0}</h6>
          <h6>Price:{(pet) ? pet.price : 0}</h6>

          <button onClick={() => buyPet(pet.id)} className={styles.byttonupdate} >Buy</button>
        </li>
      )
    else
      return <li> No Pet</li>
  }
  return (<div className={styles.container}>
    <h1>Pets shop</h1>
    <ul className={styles.list} >{printPets()}</ul>
  </div>
  )

}

export default SWR2