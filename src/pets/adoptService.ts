import axios from "axios"
import { environment } from "../app/environment/environment"
import Swal from 'sweetalert2'

export interface AdoptionPet {
    id: string;
    name: string;
    foundDate: string;
    description: string;
    phoneContact: string;
    foundPlace: string;
}

export async function loadAdoptionPets(): Promise<AdoptionPet[]> {
    try {
        const res = (await axios.get(environment.backendUrl + "/v1/adoptpet")).data as AdoptionPet[]
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}


export async function newAdoptionPet(payload: AdoptionPet): Promise<AdoptionPet> {
    try {
        console.log(payload)
        const res = (await axios.post(environment.backendUrl + "/v1/adoptpet", payload)).data as AdoptionPet
        return Promise.resolve(res)
    } catch (err) {
        return Promise.reject(err)
    }
}

export async function adoptPet(id: string): Promise<void> {
    Swal.fire({
        title: 'Si adoptas esta mascota te comprometes a darle amor y cuidarla',
        text: '¿Estas de acuerdo?',
        showCancelButton: true
    }).then (async (result) => {
        try {
            await axios.delete(environment.backendUrl + "/v1/adoptpet/" + id)
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        } 
    })
}


