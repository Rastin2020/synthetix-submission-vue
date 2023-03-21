<script>
export default {
    props: ['showError', 'errorMessage']
}
</script>

<template>
    <div v-if="showError" class="error-container">
        {{ errorMessage }}
    </div>
</template>

<style scoped>
.error-container {
    background-color: red;
    color: white;
    padding: 10px;
}
</style>