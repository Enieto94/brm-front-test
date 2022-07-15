
// export const myAction = ( state ) => {

// }

export const setContactos = ( state, contactos ) => {
    state.contactos = [ ...state.contactos, ...contactos ]
    state.isLoading = false
}

export const updateContacto = ( state, contacto  ) => { 

    const idx = state.contactos.map( e => e.id ).indexOf( contacto.id )
    state.contactos[idx] = contacto
    
}

export const addContacto = (state, contacto ) => {
    // state -> entries  -> la nueva entrada debe de ser la primera
    state.contactos = [ contacto, ...state.contactos  ]
}


export const deleteContacto = ( state, id ) => {
    
    state.contactos = state.contactos.filter( contacto => contacto.id !== id )
}