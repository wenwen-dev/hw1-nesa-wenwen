
const fileSelector = document.querySelector('#file-selector');
const buttonHuntington = document.querySelector('#buttonHuntington');
const button = document.querySelector('#buttonHamilton');
const repNumberInput = document.querySelector('#noOfReps');
let totalPopulation = 0;
let repNumber;
let fileContent;
let fileReadingFinished = false;

async function handleFileAsync(event) {
  //TODO, Seems this also works with csv, but why?
  const file = event.target.files[0];
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data);
  
  let sheetName = workbook.SheetNames[0];
  let sheetContent = workbook.Sheets[sheetName];

  // fileContent = XLSX.utils.sheet_to_csv(sheetContent);
  fileContent = XLSX.utils.sheet_to_json(sheetContent, {header: 1});
  console.log(fileContent);
  fileReadingFinished = true;
}
fileSelector.addEventListener("change", handleFileAsync, false);

function removeHeader(array) {
  let result = array.slice(1);
  return result;
}

function reduceToTwoColumns(array) {
  let newArray = [];
  if (array.length > 2) {
    newArray = array.map(item => (item = item.slice(0,2)));
  }
  return newArray;
}

function deleteInvalidRows(array) {
  let result = [];
  array.forEach(item => {
    if ((!isNaN(item[1])) && (item[1] >= 0) && (Number.isInteger(item[1]))) {
      result.push(item);
    }
  })
  return result;
}

function checkFinalArray(array) {
  return (array.length > 0) ? true : false;
}

function validateArray(array) {
  console.error('hiiiii');
  if (!fileReadingFinished) console.log("unfinished, try later!");
  else {
    console.log('ready');
    let arrayWithoutHeader = removeHeader(fileContent);
    let arrayReducedToTwoColumns = reduceToTwoColumns(arrayWithoutHeader);
    let validArray = deleteInvalidRows(arrayReducedToTwoColumns);
    let arrayIsValid = checkFinalArray(validArray);
    if (!arrayIsValid) console.error("No valid state, aborting");
    //TODO: change log to writing into html
    else {
      return validArray;
    }
  }
}

//FIXME: hamilton calculation is wrong
function calculateHamilton(array, num) {
  console.log(array);
  array.forEach(item => (totalPopulation = totalPopulation + item[1]));
  console.log(totalPopulation);
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

//TODO: #2, TBC and committed: huntington 
function calculateHuntington(array) {
  repNumber = Number(repNumberInput.value) || 435;
  if (repNumber < array.length) console.log('terminate program');//TODO: write in html
  else {
    array.forEach(item => {
      item.push(1);
      let priorityScore = (item[1]) / (Math.sqrt(item[2] * (item[2] + 1)));
      item.push(priorityScore);
    });

    while (repNumber > 0) {
      array = array.sort((a, b) => (b[3] - a[3]));
      let highestState = array[0];
      highestState[2]++;
      repNumber--;
      array.forEach(item => {
        let priorityScore = (item[1]) / (Math.sqrt(item[2] * (item[2] + 1)));
        item[3] = priorityScore;
      })
    }
  }
  return array;
}

buttonHuntington.addEventListener('click', event => {
  let validatedArray = validateArray(fileContent);
  let calculatedResult = calculateHuntington(validatedArray);
  calculatedResult.sort();
  calculatedResult.forEach(item => {
    item.splice(1,1);
    item.pop();
  })
  console.log(calculatedResult);
  displayResult(calculatedResult);
  saveAsCsv(calculatedResult);
})

buttonHamilton.addEventListener('click', event => {
  let validatedArray = validateArray(fileContent);
  console.log(validatedArray);
  repNumber = Number(repNumberInput.value) || 435;
  let finalList = calculateHamilton(validatedArray, repNumber);
  displayResult(finalList);
  saveAsCsv(finalList);
  

      // console.log(repNumber);
      //TODO: #3, if button is huntington; if button is hamilton

    })

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



// fileSelector.addEventListener('change', event => {
//   const fileList = event.target.files;
//   const file = fileList[0];
//   const reader = new FileReader();
//   reader.readAsText(file);

//   reader.addEventListener('load', event => {
//     fileReadingFinished = true;
//     fileContent = reader.result;
//     console.log(fileContent);
//   })
// })
