<script setup>
import { usePostStore } from '../../store/posts'

const advertisment = usePostStore().advertisment
</script>
<template>
        <div class="mb-5 text-center bg-hard-light">
            <div class="small" style="background-color: rgba(0,0,0,0.05)"><span
                    class="text-muted font-alegreya">ADVERTISMENT</span></div>
            <div class="py-2">
                <img src="advertisment.image.url" class="img-fluid" />
            </div>
        </div>
</template>