const outputContainer = document.getElementById('aside-section__container');
const img = outputContainer.querySelector('img');
const outputTextareaContainer = document.getElementById(
  'output-textarea-container'
);
const inputTextarea = document.getElementById('input-textarea');
const outputTextarea = document.getElementById('output-textarea');
const key = 'my secret key';
const encryptBtn = document.getElementById('encrypt-button');
const decryptBtn = document.getElementById('decrypt-button');
const copyBtn = document.getElementById('copy-button');

inputTextarea.value = 'ingrese el texto aquí';
outputTextarea.value = 'Ingresa el texto que desees encriptar o desencriptar.';

encryptBtn.addEventListener('click', encryptMessage);
decryptBtn.addEventListener('click', decryptMessage);
copyBtn.addEventListener('click', copyToClipboard);

function encryptMessage() {
  const message = inputTextarea.value;
  const encryptedMessage = CryptoJS.AES.encrypt(message, key).toString();

  removeImgAndPElements();

  outputTextarea.value = encryptedMessage;
  inputTextarea.value = '';
}

function decryptMessage() {
  const encrypted = outputTextarea.value;
  const decryptedMessage = CryptoJS.AES.decrypt(encrypted, key).toString(
    CryptoJS.enc.Utf8
  );
  inputTextarea.value = decryptedMessage;
  outputTextarea.value = '';
}

function copyToClipboard() {
  navigator.clipboard.writeText(outputTextarea.value).then(
    function () {
      console.log('Text copied to clipboard');
    },
    function (err) {
      console.error('Could not copy text: ', err);
    }
  );
}

function removeImgAndPElements() {
  if (outputContainer.children.length >= 2) {
    outputContainer.removeChild(img);
  }

  if (
    outputTextareaContainer.querySelector('.aside-section__notice') !== null
  ) {
    outputTextareaContainer.removeChild(outputTextareaContainer.children[0]);
  }

  document.getElementById('output-textarea').style.height = '630px';
}
