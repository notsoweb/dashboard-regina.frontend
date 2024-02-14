import { reactive } from "vue";

/**
 * Cache
 * 
 * Permite cargar los datos una vez para la sesión actual. Se mantienen mientras
 * no se recargue la página.
 */
const page = reactive({
    lang: 'es',
    user: {
        name: 'public'
    }
})

/**
 * Recarga datos en cache
 */
const reloadApp = () => {
    page.user  = JSON.parse(localStorage.user);
}

/**
 * Limpiar sesión de usuario
 */
const reset = () => {
    localStorage.removeItem('user');
}

/**
 * Almacenar datos usuario
 */
const defineUser = (user) => {
    localStorage.user = JSON.stringify({
        name: user.name,
        lastname: `${user.paternal} ${user?.maternal ?? ''}`,
        email: user.email
    });
}

/**
 * Instalar el componente de forma nativa
 */
const pagePlugin = {
    install: (app, options) => {
        app.config.globalProperties.$page = page;
    }
}

export {
    pagePlugin,
    page,
    reloadApp,
    reset,
    defineUser,
}
