<script setup lang="ts">
import { ref } from 'vue';
import { definePageMeta, useSanctum, useSanctumFetch } from '#imports';
const { logout, check, user } = useSanctum();
definePageMeta({ middleware: 'auth' });
const signOut = () => logout();

const ssrDummyData = ref<any | null>(null);
ssrDummyData.value =  (await useSanctumFetch('/api/user')).data;

const csrDummyData = ref<any | null>(null);
const getCSRDummyData = async () => {
    csrDummyData.value = (await useSanctumFetch('/api/user')).data;
}
</script>

<template>
    <div>
        <h1>Home</h1>
        <div class="flex">
            <RouterLink to="/account">Go to account</RouterLink>
            <button @click="signOut">logout</button>
        </div>
        
        <h2>User</h2>
        <div>
            <pre>{{ user }}</pre>
        </div>
        
        <h2>Server-rendered dummy data</h2>
        <div>
            <pre>{{ ssrDummyData }}</pre>
        </div>

        <h2>Client-rendered dummy data</h2>
        <button @click="getCSRDummyData">Get dummy data</button>
        <pre>{{ csrDummyData }}</pre>
        
    </div>
</template>