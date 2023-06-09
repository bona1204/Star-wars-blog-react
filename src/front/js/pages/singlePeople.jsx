import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SinglePeople = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [people, setPeople] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/people/${params.uid}`)
            if (response.ok) {
                console.log(respuestaJson)
                setPeople(respuestaJson.result.properties)
            }
        }
        cargaDatos()

    }, [params.uid])

    return (<>
     <img src="https://i.redd.it/l3fya3oustw41.jpg" className="img" alt="..." />
        <h1>Soy {people.name ? people.name : ""}</h1>
        <h2>Mi uid {params.uid} y mi género es {people?.gender}</h2>
        <h2>Fecha de nacimiento: {people.birth_year}</h2>
        <h3>Altura: {people.height}</h3>
    </>)
}

export default SinglePeople