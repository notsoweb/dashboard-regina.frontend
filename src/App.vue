<script setup>
import axios from 'axios';
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { reset } from '@/services/page.js';
import { reloadApp } from '@/services/page.js';
import { api, hasToken, resetApiToken } from '@/services/api.js';

const isLoading = ref(false)
const router    = useRouter();

const logout = () => {
  api.post('logout', {
    onSuccess: (e) => {
      reset()
      resetApiToken()
      Notify.success(e.message);
      router.push({name:'auth.login'})
    }
  });
}

const setLoading = (status) => {
  isLoading.value = status;
}

onMounted(() => {
  if(hasToken()) {
    reloadApp();
  }

  axios.interceptors.request.use((config) => {
      setLoading(true);
      return config;
    }, (error) => {
      setLoading(false);
      return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
      setLoading(false);
      return response;
    }, (error) => {
      setLoading(false);
      return Promise.reject(error);
    });
});
</script>

<template>
  <div v-show="isLoading" class="relative w-full">
    <div class="absolute top-3 left-14 md:left-1/2 md:right-1/2 lds-ellipsis">
      <div class="bg-white"></div>
      <div class="bg-white"></div>
      <div class="bg-white"></div>
      <div class="bg-white"></div>
    </div>
  </div>
  <RouterView @logout="logout" />
</template>

<style scoped>
.lds-ellipsis div {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  transition-delay: 500ms;
}
.lds-ellipsis div:nth-child(1) {
  left: 6px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 6px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 26px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 45px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(19px, 0);
  }
}
</style>

