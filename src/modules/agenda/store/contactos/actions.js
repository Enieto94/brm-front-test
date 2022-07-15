import journalApi from '@/api/journalApi'
// export const myAction = async ({ commit }) => {

// }

export const loadContactos = async ({ commit }) => {

    const { data } = await journalApi.get('/contactos.json')

    if ( !data ){
        commit('setContactos', [] )
        return
    }

    const contactos = []
    for( let id of Object.keys( data ) ) {
        contactos.push({
            id,
            ...data[id]
        })
    }

    commit('setContactos', contactos )
}

export const updateContacto = async ({ commit }, contacto) => {  // entry debe de ser un parámetro

    const { date, picture, nombre, telefono,direccion,correo } = contacto
    const dataToSave = { date, picture, nombre, telefono,direccion,correo }

    const resp = await journalApi.put( `/contactos/${ contacto.id }.json`, dataToSave )
    console.log(resp)

    // Commit de una mutation -> updateEntry
    commit('updateContacto', { ...contacto })
}


export const createContacto = async ({ commit }, contacto ) => {

    // dataToSave
    const { date, picture, nombre, telefono,direccion,correo } = contacto
    const dataToSave = { date, picture, nombre, telefono,direccion,correo }

    const { data } = await journalApi.post( `contactos.json`, dataToSave )

    dataToSave.id = data.name

    commit('addContacto', dataToSave )

    return data.name
}


export const deleteContacto = async ({ commit }, id ) => {

    await journalApi.delete(`/contactos/${ id }.json`)
    commit('deleteContacto', id)

    return id
}