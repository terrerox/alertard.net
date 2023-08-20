<script setup>
import { usePostStore } from '../../store/posts'

const advertisement = usePostStore().advertisement
</script>
<template>
        <div class="mb-5 text-center bg-hard-light">
            <div class="small" style="background-color: rgba(0,0,0,0.05)"><span
                    class="text-muted font-alegreya">ADVERTISEMENT</span></div>
            <div class="py-2">
                <img :src="advertisement.sourceUrl" class="img-fluid" />
            </div>
        </div>
</template>