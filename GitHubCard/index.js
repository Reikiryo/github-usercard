/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const newObj = {}

function newCard(obj) {
  const card = document.createElement('div'),
        //append to card
        cardImg = document.createElement('img'),
        info = document.createElement('div'),
        //append to info
        name = document.createElement('h3'),
        username = document.createElement('p'),
        location = document.createElement('p'),
        profile = document.createElement('p'),
        followers = document.createElement('p'),
        bio = document.createElement('p'),
        //append to profile
        link = document.createElement('a')

        //append card
        card.append(cardImg)
        card.append(info)
        //append info
        info.append(name)
        info.append(username)
        info.append(location)
        info.append(profile)
        info.append(followers)
        info.append(bio)
        //append profile
        profile.append(link)

        //classes
        card.classList.add('card')
        info.classList.add('card-info')
        name.classList.add('name')
        username.classList.add('username')

        //img src
        cardImg.src = obj.avatar_url
        //text content 
        name.textContent = obj.name
        username.textContent = obj.login
        location.textContent = obj.location
        link.textContent = obj.html_url
        followers.textContent = `Followers: ${obj.followers}`
        bio.textContent = obj.bio
        
  return card
}

//where cards append to
const cards = document.querySelector('.cards')

//all names in this array will have a card made of their github
const followersArray = ['Reikiryo', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

//getting all my followers and creating a card for each + account already in followers array
axios.get('https://api.github.com/users/Reikiryo/followers')
.then(res => {
  res.data.forEach(data => {
    followersArray.push(data.login)
  })
  for (let i = 0;i < followersArray.length; i++){
    const current = followersArray[i]
    axios.get(`https://api.github.com/users/${current}`)
    .then(data => {
      cards.append(newCard(data.data))
    })
  }
})



