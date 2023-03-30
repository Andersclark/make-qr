<script lang="ts" setup>
import {ref} from "vue";
import makeQrCode from "../makeQrCode";

defineEmits(["focus"])

const inputText = ref("");
const dataUrl = ref()
const codeText = ref("")
const showImage = ref(false);

async function handleSubmit() {
  dataUrl.value = await makeQrCode(inputText.value)
  showImage.value = true;
  codeText.value = inputText.value;
  inputText.value = "";
}
async function downloadFile(url: string, filename:string) {
  const link = document.createElement('a');
  link.href=url;
  link.download=filename;
  link.click();
}
</script>

<template>
  <div  id="result-container">
    <div id="qr-column">
      <div id="qr-image-wrapper" :class="!showImage && 'border-dash'">
        <img v-show="!!dataUrl" id="qr-image" :src="dataUrl" ref="imgRef" :alt="`Outputted QR-code representing ${codeText}`" @click="() => downloadFile(dataUrl, 'qr.webp')"/>
      </div>
    </div>
  </div>
  <form @submit.prevent="handleSubmit" id="make-form" class="row">
    <input v-model.trim="inputText" placeholder="Put text here" type="text" @focus="()=> $emit('focus')"/>
    <button type="submit" :disabled="inputText.length < 1" class="make-btn" @click.prevent="handleSubmit">Make</button>
  </form>
</template>
<style scoped>

#make-form {
  margin: calc(var(--base-unit)*2) calc(var(--base-unit)*5);
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

#result-container {
  width: 100%;
  height: 40vh;
  display: flex;
  justify-content: center;
}

#qr-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

#qr-image-wrapper {
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1;
  border-radius: calc(var(--base-unit)*2);
}

#qr-image {
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1;
  border-radius: calc(var(--base-unit)*2);
}
#qr-image:hover {
  cursor: pointer;
  border: var(--base-unit) solid var(--color-primary);
}
</style>
