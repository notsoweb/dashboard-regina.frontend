<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { defineApiToken, hasToken, useForm } from '@/services/api.js'
import { reloadApp, defineUser } from '@/services/page'

import ButtonPrimary from '@Components/Regina/Button/Primary.vue'
import Input         from '@Components/Regina/Form/Input.vue'
import Layout        from '@Layouts/AuthLayout.vue'

const router = useRouter();

const form = useForm({
    email:'',
    password:''
});

const login = () => {
    form.post('login', {
        onSuccess: (response) => {
            defineApiToken(response.token);
            defineUser(response.user);

            reloadApp();

            Notify.success(`Bienvenido ${response.user.name}`);

            router.push({name:'home'});
        }
    })
}
 
onMounted(() => {
    if(!hasToken()) {
        router.push({name:'auth.login'});
    } else {
        reloadApp();
        router.push({name:'home'});
    }
});
</script>

<template>
    <Layout>
        <form @submit.prevent="login" class="space-y-4">
            <div class="space-y-2">
                <Input
                    id="email"
                    placeholder="name@example.com"
                    v-model="form.email"
                    :onError="form.errors.email"
                    required
                />
                <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    v-model="form.password"
                    required
                />
            </div>
            <div>
                <ButtonPrimary class="w-full">
                    Iniciar sesión
                </ButtonPrimary>
            </div>
        </form>
    </Layout>
</template>