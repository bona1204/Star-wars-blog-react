import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const SinglePlanet = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [planet, setPlanet] = useState({})

    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch(`/planets/${params.uid}`)
            if (response.ok) {
                console.log(respuestaJson)
                setPlanet(respuestaJson.result.properties)
            }
        }
        cargaDatos()
        console.log(planet.name)
    }, [params.uid])

    return (<>
     <img src="https://i.redd.it/l3fya3oustw41.jpg" className="img" alt="..." />
        <h1>Este es el planeta {planet.name ? planet.name : ""}</h1>
        <p>Mi uid {params.uid}</p>
    </>)
}

export default SinglePlanet