<script setup lang="ts">
import { definePageMeta, useSanctum } from '#imports';
const { user } = useSanctum();
definePageMeta({ middleware: 'auth' });
</script>

<template>
    <div>Account page</div>
    <RouterLink to="/">home</RouterLink>
    <div>
        user details:
        <pre>{{ user }}</pre>
    </div>
</template>