const fileSelector = document.getElementById('file-selector');

fileSelector.addEventListener('change', (event) => {
  const fileList = event.target.files;
  const file = fileList[0];
  console.log(file);
  readFile(file);

});

function readFile(file) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.addEventListener('load', (event) => {
    console.log('reading');
    let result = event.target.result;
    console.log(result);
  });
}







// reader.addEventListener('load', event => {
//   const result = event.target.result;
//   console.log(result);
//   console.log('hello');
// })