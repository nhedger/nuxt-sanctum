<script setup lang="ts">
import { definePageMeta, useSanctum } from '#imports';
const { logout, check, user } = useSanctum();
definePageMeta({ middleware: 'auth' });
const signOut = () => logout();
</script>

<template>
    <div>
        home
        <button @click="signOut">logout</button>
        <RouterLink to="/account">account</RouterLink>
        <button @click="check">Check</button>
        <pre>{{ user }}</pre>
    </div>
</template>