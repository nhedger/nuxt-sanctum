<script setup lang="ts">
import { reactive } from 'vue';
import { useSanctum } from '#imports';

const { login } = useSanctum();

const form = reactive({
    email: '',
    password: '',
});

const signIn = async () => {
    console.log('sign in');
    await login({
        email: form.email,
        password: form.password,
    });
}
</script>

<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="signIn">
            <input data-testid="email" type="text" v-model="form.email" name="email" />
            <input data-testid="password" type="password" v-model="form.password" name="password" />
            <button data-testid="submit" type="submit">Login</button>
        </form>
    </div>
</template>