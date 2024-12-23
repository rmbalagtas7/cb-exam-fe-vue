<template>
    <div v-if="visible" 
         class="fixed bottom-0 left-0 m-4">
        <div class="flex items-center p-4 mb-4 text-sm text-green-800 bg-green-50 rounded-lg dark:bg-gray-800 dark:text-green-400" role="alert">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zm-6 8a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 112 0v4a1 1 0 01-2 0V5zm1 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
            </svg>
            <span class="font-medium">{{ message }}</span>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
    message: {
        type: String,
        required: true
    },
    visible: {
        type: Boolean,
        default: false
    }
});
</script>
