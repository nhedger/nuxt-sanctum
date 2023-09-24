<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports';

const { login, check } = useAuth();
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