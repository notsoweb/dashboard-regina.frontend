import config from '../package.json'

const APP_COPYRIGHT = config.copyright
const APP_NAME      = import.meta.env.VITE_APP_NAME
const APP_VERSION   = config.version

export {
    APP_NAME,
    APP_VERSION,
    APP_COPYRIGHT
}