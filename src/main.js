// Declaring the existance of the url's with the data 
const urlUsers = '../data/cohorts/lim-2018-03-pre-core-pw/users.json';
const urlCohorts = '../data/cohorts.json';
const urlProgress = '../data/cohorts/lim-2018-03-pre-core-pw/progress.json';

// Bringing my Id elements from HTML
const forOrderBy = document.getElementById('order-by');
const forOrderDirection = document.getElementById('order-direction');
const searchingFor = document.getElementById('search-box');
const selectCampus = document.getElementById('campus');
const selectCohorts = document.getElementById('proms');
const containerForData = document.getElementById('box-container');

// Creating the high order function with the request to the server  
const getData = (url, callback) => { 
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.onerror = ('handleError');
  request.send();
}

// Creating the object 'options' to save all the data
const options = {
  cohort: null,
  cohortData: {
    users: null,
    progress: null
  },
  orderBy: 'name',
  orderDirection: 'ASC',
  search: ''
}

// Creating the function that bring the data of Lima Cohort
const addCohortsLima = (event) => {
  let filterLima = '';
  const limData = JSON.parse(event.target.responseText);
  for (i = 0; i < limData.length; i++) {
    if (((limData[i].id).includes('lim', 0) === true)) {
      filterLima += '<option>' + limData[i].id + '</option>' + '<br>'
    }
  }
  selectCohorts.innerHTML = filterLima
}

// We call it when window has load, this function make a change when we select the campus (Only for Lim)
window.addEventListener('load', () => { 
  selectCampus.addEventListener('change', (event) => {
     getData(urlCohorts, addCohortsLima);
     return (event.target.value);
  });
}) 

// This function link the data of campus, users and progress 
const addUserProgress = () => {
  const addCohorts = () => {
    const cohortList = JSON.parse(event.target.responseText);
    options.cohort=cohortList
  }
  const users = JSON.parse(event.target.responseText);
  options.cohortData.users = users;
  const progress = () => {
    const progressUsers = JSON.parse(event.target.responseText);
    options.cohortData.progress = progressUsers;
  }
  getData(urlProgress, progress);
  getData(urlCohorts, addCohorts);
}

getData(urlUsers, addUserProgress);

// This function print my users list with their stats 
const printAll = (usersWithStats) => {
  for (let i = 0; i < usersWithStats.length; i++) {
    containerForData.innerHTML += `<tr>` +
      `<td>${usersWithStats[i].name}</td>
       <td>${usersWithStats[i].stats.percent + '%'}</td>               
       <td>${usersWithStats[i].stats.exercises.completed + ' de ' + usersWithStats[i].stats.exercises.total}</td>
       <td>${usersWithStats[i].stats.reads.completed}</td> 
       <td>${usersWithStats[i].stats.quizzes.completed}</td> 
       <td>${usersWithStats[i].stats.quizzes.scoreAvg + '%'}</td>`
      + `</tr>`;
  }
}

// All this section call my function to print

// This bring me the prom of Lima when I click it on the select 
selectCohorts.addEventListener('change', event => {
  event.preventDefault();
  if (selectCohorts.value === 'lim-2018-03-pre-core-pw') {
    const cohort = options.cohort.find(cohort => cohort.id === event.target.value);
    options.cohort = cohort;
    const usersData = processCohortData(options);
    printAll(usersData);
  } 
});

// Creating the event for the search box 
searchingFor.addEventListener('keyup', event => {
  event.preventDefault();
  let searchValue = searchingFor.value;
  options.search=searchValue;
  let filter = processCohortData(options);
  // Here I print what I search 
 containerForData.innerHTML = '';
  printAll(filter);
});

// This event print the order that I select to see my data
forOrderDirection.addEventListener('click', (event) => {
  event.preventDefault();
  options.orderBy = forOrderBy.value;
  options.orderDirection = forOrderDirection.value;
  const userOrder = processCohortData(options);
  containerForData.innerHTML = '';
  printAll(userOrder);
});