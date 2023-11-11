<script setup lang="ts">
import { definePageMeta } from '#imports';

definePageMeta({
    middleware: ['auth'],
});
</script>

<template>
    Home page
</template>