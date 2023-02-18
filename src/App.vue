
<script setup lang="ts">
import {ref, watch} from "vue";
import QRCode from "qrcode";

const inputText = ref("");
const dataUrl = ref("")
const codeText = ref("")
const showImage = ref(false);
const error = ref("");
async function onSubmit(){
    dataUrl.value = await makeQrCode(inputText.value)
    showImage.value = true;
    codeText.value = inputText.value;
    inputText.value = "";
}
async function makeQrCode(text: string){
    try {
     return QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
}

</script>
<template>
  <header><h1>MakeQR</h1></header>
  <main>
    <form @submit.prevent="onSubmit" class="justify-center">
      <input v-model.trim="inputText" placeholder="Put text here" type="text"/>
      <button type="submit" :disabled="inputText.length < 1" @click.prevent="onSubmit">MAKE</button>
    </form>
    <div  id="qr-container">
      <div v-show="showImage">
      <img id="qr-image" :src="dataUrl" ref="imgRef" alt="Outputted QR-code"/>
      <pre>"{{codeText}}"</pre>
      </div>
    </div>
  </main>
  <footer>
    <p>Built with <span class="text-red">&#9829</span> by Anders Clark</p>
  </footer>
</template>
<style scoped>
#qr-container {
  width: 100%;
  min-height: 320px;
}
#qr-image {
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1;
  margin: 16px;
  border-radius: 25px;
}
</style>
