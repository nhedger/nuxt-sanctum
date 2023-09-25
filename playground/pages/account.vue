<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({ middleware: 'auth' });
</script>

<template>
    <div>Account page</div>
    <RouterLink to="/">home</RouterLink>
</template>