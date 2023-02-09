
const fileSelector = document.querySelector('#file-selector');
const button = document.querySelector('#button');
let fileContent;
let fileReadingFinished = false;

fileSelector.addEventListener('change', event => {
  const fileList = event.target.files;
  const file = fileList[0];
  const reader = new FileReader();
  reader.readAsText(file);

  reader.addEventListener('load', event => {
    fileReadingFinished = true;
    fileContent = reader.result;
    console.log(fileContent);
  })
  // console.log(fileContent);
})

const repNumberInput = document.querySelector('#noOfReps');
const repNumber = Number(repNumberInput.value);
let result = [];

function convertToArray(str) {
  let statePopulation = str.split('\n').filter(item => item.length !== 0);
  statePopulation = statePopulation.sort();
  let result = [];//why using statePopulation would not work?
  statePopulation.forEach(item => {
    let newString = item.substring(0, item.length - 1);
    item = newString.split(',');
    item[1] = +item[1];
    result.push(item);
  })
  console.log(result);
  return result;
}

button.addEventListener('click', event => {
  console.error('hiiiii');//why not displaying???
  if (!fileReadingFinished) console.log("unfinished, try later!");//same!
  else {
    // console.log('ready');
    // console.log(fileContent);
    statePopulation = convertToArray(fileContent);
    console.log(statePopulation);
    let csvContent = "data:text/csv;charset=utf-8," 
    + statePopulation.map(e => e.join(",")).join("\n");

    let encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

  
  
  //   reader.addEventListener('load', (event) => {
  //     // console.log(reader.readyState);
  //     let result = event.target.result;
      // statePopulation = result.split(/(?:\n)+/);
    
  //     // console.log(statePopulation);
  
  //     let updatedArray = [];
  //     statePopulation.forEach(item => {
  //       item = newString;
  //       item = item.split(',');
  //       item[1] = +item[1];
  //       updatedArray.push(item);
  
  //       // if (item[0].length !== 0) updatedArray.push(item);
  //     })
  //     // console.log(statePopulation);
  //     statePopulation = updatedArray;
  //     console.log(statePopulation);
  //     //what I just learnt: functionName(num = 435) - default value
  //     let noOfReps = repNumber || 435;
  // console.log(noOfReps);
  // let totalPopulation = 0;
  // console.log(totalPopulation);
  // console.log(statePopulation);
  // statePopulation.forEach(item => {
  //   totalPopulation += item[1];
  //   console.log(totalPopulation);
  // })
  // console.log(totalPopulation);
  // let averagePopPerRep = Math.round((totalPopulation / noOfReps));
  // console.log(averagePopPerRep);
  
  // statePopulation.forEach(item => {
  //   result.push(`${item[0]},${Math.floor((item[1]/averagePopPerRep))}`);
  //   item.push(Math.floor((item[1]/averagePopPerRep)));
  //   console.log(`${item[1]/averagePopPerRep}`);
  //   item.push(Math.floor((item[1]/averagePopPerRep)));
  //   item.push(item[1]%averagePopPerRep);
  // })
  // console.log(statePopulation[0]);
  // displayResult(statePopulation);

  // let csvContent = "data:text/csv;charset=utf-8," 
  //   + statePopulation.map(e => e.join(",")).join("\n");

  // var encodedUri = encodeURI(csvContent);
  // window.open(encodedUri);
    // }
    // )
  // });
})


function displayResult(array) {
  const resultContainer = document.querySelector('#resultList');
  array.forEach(item => {
    let list = document.createElement('li');
    list.textContent = `${item[0]}, ${item[1]}`;
    resultContainer.appendChild(list);
  })
}
