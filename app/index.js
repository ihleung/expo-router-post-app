// === GET (POST) === //
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

// === CREATE (POST) === //
async function createPost(title, image) {
  const newPost = { title, image };
  const postAsJson = JSON.stringify(newPost);

  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });

  if (response.ok) {
    // data created - update UI
  }
}

// test the function
createPost(
  "My First Post",
  "https://images.unsplash.com/photo-1641876749963-550554c7258d"
);
// test the function
getPosts();
