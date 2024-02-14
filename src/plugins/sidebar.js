import { ref } from 'vue';

const sidebar     = ref();
const statusTheme = () => localStorage.sidebarIsOpen === 'true' || !('sidebarIsOpen' in localStorage);


const sidebarOpen = (active = true) => {
    sidebar.value = (active)
    localStorage.sidebarIsOpen = sidebar.value;
}

const switchSidebar = (value = null) => {
    sidebar.value = (value)
        ? value
        : !sidebar.value;
        
    localStorage.sidebarIsOpen = sidebar.value;
}

const bootSidebar = () => sidebarOpen(statusTheme());

export {
    bootSidebar,
    sidebarOpen,
    switchSidebar,
    sidebar
}