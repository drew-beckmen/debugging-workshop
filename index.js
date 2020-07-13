document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('joke-form')
  const jokeList = document.getElementById('joke-list')
  const username = document.getElementById('name-input') 
  let joke; 

  function fetchJoke(){
    return fetch('https://icanhazdadjoke.com/', {
      headers: {
        "Accept": "application/json"
      }
    })
    .then(resp => resp.json())
    //All the adding to the DOM needs to happen in the asynchronous function 
    // Otherwise, event listener callback will continue executing with a pending Promise
    .then(data => {
      joke = data.joke
      const newJokeLi = document.createElement('li')
      newJokeLi.innerHTML = `<span class="username">${username.value} says:</span> ${joke}`
      jokeList.appendChild(newJokeLi)
      form.reset()
    })
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    if(username.value === "") return;
    fetchJoke() 

    //You CANNOT reset the form here --> it will run before fetchJoke() runs
    // as a result, username field would be completely wiped out. 
  })
})
