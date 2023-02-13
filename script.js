
const fileSelector = document.querySelector('#file-selector');
const button = document.querySelector('#buttonHamilton');
const repNumberInput = document.querySelector('#noOfReps');
let repNumber;
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



function convertToArray(str) {
  let statePopulation = str.split('\n').filter(item => item.length !== 0);
  statePopulation.shift();
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


function calculate(array, num) {
  let totalPopulation = 0;
  console.log(array);
  array.forEach(item => totalPopulation = totalPopulation + item[1]);
  // console.log(totalPopulation);
  let avg = Math.round((totalPopulation / num));
  
  let finalList =[]; //if not initiated would error 'not defined'
  let repSum = 0;
  let secondList = [];
  array.forEach(item => {
    let newItem = [item[0]];
    let anotherItem = [item[1] % avg];
    anotherItem.push(item[0]);
    let repNumber = Math.floor((item[1] / avg));
    repSum += repNumber;
    newItem.push(repNumber);
    finalList.push(newItem);
    secondList.push(anotherItem);
  })

  if (repSum < num) {
    console.log(`${repSum}, ${num}`);
    let testArray = secondList.sort((a, b) => b[0] - a[0]);//!!!

    for (let i = 0; i < (num - repSum); i++) {
      let theItem = finalList.find(item => item[0] === secondList[i][1]);
      theItem[1]++;
    }
  }
  return finalList;
}



buttonHamilton.addEventListener('click', event => {
  console.error('hiiiii');//why not displaying???
  if (!fileReadingFinished) console.log("unfinished, try later!");//same!
  else {
    console.log('ready');
    // console.log(fileContent);
    statePopulation = convertToArray(fileContent);
    // console.log(statePopulation);
    repNumber = Number(repNumberInput.value) || 435;
    // console.log(repNumber);
    let finalList = calculate(statePopulation, repNumber);
    displayResult(finalList);
    saveAsCsv(finalList);
  
  }
})


//FIXME: flashes quickly on screen then disappears!!!
function displayResult(array) {
  const resultContainer = document.querySelector('#resultList');
  // resultContainer.textContent = 'testing';
  array.forEach(item => {
    let list = document.createElement('li');
    list.textContent = `${item[0]}, ${item[1]}`;
    resultContainer.appendChild(list);
  })
}

function saveAsCsv(array) {
  let csvContent = "data:text/csv;charset=utf-8," 
  + array.map(e => e.join(",")).join("\n");
  
  var encodedUri = encodeURI(csvContent);
  window.open(encodedUri);
}

