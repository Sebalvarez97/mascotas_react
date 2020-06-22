import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import { goHome } from "../common/utils/Tools"
import "../styles.css"
import DangerLabel from "../common/components/DangerLabel"
import FormInput from "../common/components/FormInput"
import FormButtonBar from "../common/components/FormButtonBar"
import FormAcceptButton from "../common/components/FormAcceptButton"
import FormButton from "../common/components/FormButton"
import FormTitle from "../common/components/FormTitle"
import Form from "../common/components/Form"
import GlobalContent from "../common/components/GlobalContent"
import { RouteComponentProps } from "react-router-dom"
import { newAdoptionPet } from "./adoptService"

export default function NewAdoption(props: RouteComponentProps<{ id: string }>) {
    const [foundDate, setFoundDate] = useState("")
    const [description, setDescription] = useState("")
    const [petId, setPetId] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [foundPlace, setFoundPlace] = useState("")

    const errorHandler = useErrorHandler()


    const saveClick = async () => {
        errorHandler.cleanRestValidations()
        if (!name) {
            errorHandler.addError("name", "No puede estar vacío")
        }

        if (errorHandler.hasErrors()) {
            return
        }

        try {
            await newAdoptionPet({ id: petId, name, foundDate: foundDate, description, phoneContact: phoneNumber, foundPlace: foundPlace })
            props.history.push("/adoptpet")
        } catch (error) {
            errorHandler.processRestValidations(error)
        }
    }

    useEffect(() => {
        const id = props.match.params.id
    }, [])

    return (
        <GlobalContent>
            <FormTitle>Registro de Adopciones</FormTitle>

            <Form>
                <FormInput
                    label="Nombre"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Descripción"
                    name="description"
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Fue encontrada en:"
                    name="foundPlace"
                    value={foundPlace}
                    onChange={event => setFoundPlace(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Encontrada el dia:"
                    name="foundDate"
                    value={foundDate}
                    onChange={event => setFoundDate(event.target.value)}
                    errorHandler={errorHandler} />

                <FormInput
                    label="Telefono de Contacto"
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={event => setPhoneNumber(event.target.value)}
                    errorHandler={errorHandler} />
                    

                <DangerLabel message={errorHandler.errorMessage} />

                <FormButtonBar>
                    <FormAcceptButton label="Guardar" onClick={saveClick} />

                    <FormButton label="Cancelar" onClick={() => goHome(props)} />

                </FormButtonBar>
            </Form >
        </GlobalContent>
    )
}
