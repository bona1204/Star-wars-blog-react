import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import CardPeople from "../component/cardPeople.jsx";
import CardPlanet from "../component/cardPlanet.jsx";
import { todoActions } from "../store/todos";
//React parallax

const StarWars = () => {
    const { store, actions } = useContext(Context)
    const [listPeople, setListPeople] = useState({})
    const [listVehicles, setListVehicles] = useState({})
    const [listPlanets, setListPlanets] = useState({})

    //se ejecuta la primera vez que se reenderiza el componente
    useEffect(() => {
        const cargaDatos = async () => {
            let { respuestaJson, response } = await actions.useFetch("/people")
            if (response.ok) {
                console.log(respuestaJson)
                setListPeople(respuestaJson.results)
            }

            ({ respuestaJson, response } = await actions.useFetch("/planets"))
            if (response.ok) {
                console.log(respuestaJson)
                setListPlanets(respuestaJson.results)
            }
            ({ respuestaJson, response } = await actions.useFetch("/vehicles"))
            if (response.ok) {
                console.log(respuestaJson)
                setListVehicles(respuestaJson.results)
            }


        }
        //cargaDatos() //login, //consultar saldo 

        const cargaParalelo = async () => {
            let promesaPlanetas = actions.useFetchParalelo("/planets")
            let promesaPeople = actions.useFetchParalelo("/people")
            let promesaVehicles = actions.useFetchParalelo("/vehicles")

            //resuelvo las tres promesas al mismo tiempo
            let [a, b, c] = await Promise.all([promesaPlanetas, promesaPeople, promesaVehicles])

            a = await a.json()
            setListPlanets(a.results)

            b = await b.json()
            setListPeople(b.results)

            c = await c.json()
            setListVehicles(c.results)
        }
        cargaParalelo() //paralelo //saldo en la cuenta, transferencia efectiva, etc

    }, [])

    useEffect(() => { }, [listPeople])
    useEffect(() => { }, [listPlanets])
    useEffect(() => { }, [listVehicles])

    return (<>

        <div className="container">
            <div className="row flex-row flex-nowrap overflow-auto">
                {listPeople && listPeople.length > 0 ?
                    <>
                        {listPeople.map((item, index) => {
                            return <div className="col-3" key={item.uid}>
                                <CardPeople name={item.name} uid={item.uid} />
                            </div>
                        })}
                    </> : <></>}
            </div>
        </div>
        <br />
        <div className="container">
            <div className="row flex-row flex-nowrap overflow-auto">
                {listPlanets && listPlanets.length > 0 ?
                    <>
                        {listPlanets.map((item, index) => {
                            return <div className="col-3" key={item.uid}>
                                <CardPlanet name={item.name} uid={item.uid} />
                            </div>
                        })}
                    </> : <></>}
            </div>
        </div>

    </>)
}

export default StarWars