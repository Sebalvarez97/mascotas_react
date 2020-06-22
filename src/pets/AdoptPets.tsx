import React, { useState, useEffect } from "react"
import "../styles.css"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import { AdoptionPet, loadAdoptionPets, adoptPet } from "./adoptService"


export default function LostPets(props: RouteComponentProps) {
    const [pets, setPets] = useState<AdoptionPet[]>([])

    const errorHandler = useErrorHandler()

    const loadCurrentAdoptablePets = async () => {
        try {
            const result = await loadAdoptionPets()
            setPets(result)
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    const newAdoptionOnClick = () => {
        props.history.push("/registerAdoption")
    }

    useEffect(() => {
        void loadCurrentAdoptablePets()
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Mascotas Que Necesitan un Hogar</FormTitle>
            <table id="adopciones" className="table">
                <thead>
                    <tr>
                        <th> Nombre </th>
                        <th> Descripción </th>
                        <th> Fue encontrada en: </th>
                        <th> Encontrada el dia: </th>
                        <th> Telefono de Contacto </th>
                        <th> !Adoptar! </th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet, i) => {
                        return (
                            <tr key={i}>
                                <td>{pet.name}</td>
                                <td>{pet.description}</td>
                                <td>{pet.foundPlace}</td>
                                <td>{pet.foundDate}</td>
                                <td>{pet.phoneContact}</td>
                                <td className="text">
                                    <img
                                        src="/assets/favicon.png"
                                        alt=""
                                        onClick={() => adoptPet(pet.id)} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <FormButtonBar>
                <FormAcceptButton label="Registrar Posible Adopción" onClick={newAdoptionOnClick} />
                <FormButton label="Cancelar" onClick={() => goHome(props)} />
            </FormButtonBar>
        </GlobalContent>
    )
}
