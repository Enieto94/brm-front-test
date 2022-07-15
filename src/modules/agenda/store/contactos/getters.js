
// export const myGetter = ( state ) => {
//  return state
// }

export const getEntriesByContacto = ( state ) => ( contact = '' ) => {//getEntriesByTerm

    if ( contact.length === 0 ) return state.contactos

    return state.contactos.filter( entry => entry.nombre.toLowerCase().includes( contact.toLocaleLowerCase() ) )
    
}

// id
export const getContactoById = ( state ) => ( id = '' ) => {//getEntryById

    const contacto = state.contactos.find( contacto => contacto.id === id )

    if ( !contacto ) return

    return { ...contacto } // TODO: prueben
}



