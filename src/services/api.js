import axios from 'axios';
import { reactive, ref } from 'vue';

/**
 * Servidor a utilizar
 */
const server = ref('');
const token  = ref(localStorage.token);

/**
 * Define el servidor de la api
 */
const defineApiServer = (x) => {
    server.value = x;
}

/**
 * Define el token de la api
 */
const defineApiToken = (x) => {
    token.value = x;
    localStorage.token = x;
}

/**
 * Define el token de la api
 */
const resetApiToken = (x) => {
    token.value = undefined;
    localStorage.removeItem('token');
}

/**
 * Determina si el token tiene algo o no
 */
const hasToken = () => {
    return token.value !== undefined;
}

/**
 * Controla la forma en la que se comunica con una API
 */
const api = {
    processing: false,
    hasErrors: false,
    wasSuccessful: false,
    async load(method, url, options = {data:{}}) {
        try {
            if (options.hasOwnProperty('onBefore')) options.onBefore();
            if (options.hasOwnProperty('onStart')) options.onStart();

            let response = await axios({
                method: method,
                url: `${server.value}/${url}`,
                data: options.data,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.value}`
                }
            });

            this.processing = false;

            if(response.data.status == 'success') {
                this.wasSuccessful = true;
                if(options.hasOwnProperty('onSuccess')) {
                    options.onSuccess(response.data.data);
                }
            } else if(response.data.status == 'fail') {
                if(options.hasOwnProperty('onFail')) {
                    options.onFail(response.data.data);
                }
            }

            if(options.hasOwnProperty('onFinish')) {
                options.onFinish(response.data.data);
            }
        } catch (error) {
            console.log('error', error);

            // Código de sesión invalida
            if(error.response.status === 401) {
                Notify.error(error.response.data.message);

                return
            }

            if(options.hasOwnProperty('onError')) {
                options.onError(error);
            }

            if(error.response.data != null) {
                this.hasErrors = true;
                this.errors = error.response.data.data;
            }
        }
    },
    get(url, options) {
        this.load('get', url, options)
    },
    post(url, options) {
        this.load('post', url, options)
    },
    put(url, options) {
        this.load('put', url, options)
    },
    patch(url, options) {
        this.load('patch', url, options)
    },
    delete(url, options) {
        this.load('delete', url, options)
    }
}

const useForm = (form = {}) =>  {
    let transform = (data) => data

    return reactive({
        ...form,
        errors: {},
        hasErrors: false,
        processing: false,
        progress: null,
        wasSuccessful: false,
        _inputs: Object.keys(form),
        data() {
            let data = {};

            for (let i in this) {
                if(typeof this[i] !== 'function' && this._inputs.includes(i)){
                    data[i] = this[i]
                }
            }

            return data;
        },
        transform(callback) {
            transform = callback

            return this
        },
        async submit(method, url, options = {}) {
            this.errors = {};
            this.wasSuccessful = false;
            this.processing = true;
            this.hasErrors = false;

            try {
                if(options.hasOwnProperty('onBefore')) options.onBefore();
                if(options.hasOwnProperty('onStart')) options.onStart();

                let data = transform(this.data())

                let response = await axios({
                    method: method,
                    url: `${server.value}/${url}`,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token.value}`
                    }
                });

                this.processing = false;

                if(response.data.status == 'success') {
                    this.wasSuccessful = true;

                    if(options.hasOwnProperty('onSuccess')) {
                        options.onSuccess(response.data.data);
                    }
                } else if(response.data.status == 'fail') {
                    if(options.hasOwnProperty('onFail')) {
                        options.onFail(response.data.data);
                    }
                }

                if(options.hasOwnProperty('onFinish')) {
                    options.onFinish(response.data.data);
                }
            } catch (error) {
                console.log('error', error);
                if(options.hasOwnProperty('onError')) {
                    options.onError(error);
                }

                if(error.response.data != null) {
                    this.hasErrors = true;
                    this.errors = error.response.data.data;
                }
            }

            this.processing = false;

        },
        get(url, options) {
          this.submit('get', url, options)
        },
        post(url, options) {
          this.submit('post', url, options)
        },
        put(url, options) {
          this.submit('put', url, options)
        },
        patch(url, options) {
          this.submit('patch', url, options)
        },
        delete(url, options) {
          this.submit('delete', url, options)
        },
    })
}

export {
    api,
    hasToken,
    useForm,
    defineApiServer,
    defineApiToken,
    resetApiToken
}