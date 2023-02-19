<script setup lang="ts">
import { ref } from "vue";
import QRCode from "qrcode";

const inputText = ref("");
const dataUrl = ref("")
const codeText = ref("")
const showImage = ref(false);
const showHeader = ref(true);

async function onSubmit() {
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
      return ""
    }
}

</script>
<template>
    <header><Transition><h1 v-show="showHeader">Make QR</h1></Transition></header>
  <main>
    <div  id="result-container">
      <div id="qr-column">
        <div id="qr-image-wrapper" :class="!showImage && 'dashed-yellow-border'"><img v-show="showImage" id="qr-image" :src="dataUrl" ref="imgRef" :alt="`Outputted QR-code representing ${codeText}`"/></div>
        <pre>{{codeText && `"${codeText}"`}}</pre>
      </div>
    </div>
    <form @submit.prevent="onSubmit" id="make-form">
      <input v-model.trim="inputText" placeholder="Put text here" type="text" @focus="showHeader=false"/>
      <button type="submit" :disabled="inputText.length < 1" class="make-btn" @click.prevent="onSubmit">MAKE</button>
    </form>
  </main>
  <footer>
    <p>Built with <span class="text-red">&#9829</span> by Anders Clark</p>
    <p>Source: <a href="https://github.com/Andersclark/make-qr">Github</a> </p>
  </footer>
</template>
<style scoped>

#make-form {
  margin: 16px 32px;
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
  text-align: center;
}

#qr-image-wrapper {
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1;
  margin: 16px;
  border-radius: 25px;
}

#qr-image {
  width: 50vw;
  max-width: 240px;
  aspect-ratio: 1;
  margin: 0;
  border-radius: 25px;
}

.dashed-yellow-border {
  border: 1px dashed rgba(255, 255, 2500, 0.8);
}
.v-enter-active,
.v-leave-active {
  transition: font-size 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  font-size: 0;
}
</style>
