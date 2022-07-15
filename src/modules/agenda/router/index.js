

export default {

    name: 'agenda',
    component: () => import(/* webpackChunkName: "agenda" */ '@/modules/agenda/layouts/ContactLayout.vue'),
    children: [
        {
            path: '',
            name: 'no-entry',
            component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/agenda/views/NoEntrySelected.vue'),
        },
        {
            path: ':id',
            name: 'contacto',
            component: () => import(/* webpackChunkName: "daybook-no-entry" */ '@/modules/agenda/views/ContactView.vue'),
            props: ( route ) => {
                return {
                    id: route.params.id
                }
            }
        }
    ]

}