const endpoint = "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/";

async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`); //posts.json is the data ressource
  const data = await response.json();
  const postsArray = Object.keys(data).map((key) => ({
    id: key,
    ...data[key],
  })); // from object to array
  // do something with postsArray
  console.log(postsArray);
}

// test the function
getPosts();
