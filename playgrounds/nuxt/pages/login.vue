<script setup lang="ts">
import { definePageMeta, useSanctum } from '#imports';

const { login, check } = useSanctum();
definePageMeta({ middleware: ['guest'] });

const signIn = () => login({
    email: 'test@example.com',
    password: 'password',
})
</script>

<template>
    <div>
        <button @click="signIn">Login</button>
        <button @click="check">Check</button>
    </div>
</template>