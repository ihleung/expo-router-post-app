import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Post from "../../components/PostListItem";

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const API_URL = "https://expo-post-app-default-rtdb.firebaseio.com";

  useEffect(() => {
    getUser();
    getPosts();
  }, [id]);

  async function getUser() {
    const response = await fetch(`${API_URL}/users/${id}.json`);
    const data = await response.json();
    console.log(data);
    setUser(data);
  }

  async function getPosts() {
    // fetch posts where uid is equal to userId prop
    const response = await fetch(
      `${API_URL}/posts.json?orderBy="uid"&equalTo="${id}"`
    );
    const dataObj = await response.json();
    const postsArray = Object.keys(dataObj).map((key) => ({
      id: key,
      ...dataObj[key],
    })); // from object to array
    postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(postsArray);
  }

  return (
    <ScrollView>
      <Stack.Screen
        options={{
          title: user?.name,
        }}
      />
      <View style={styles.userNameContainer}>
        <Text style={styles.userTitle}>{user?.title}</Text>
        <Text style={styles.userTitle}>{user?.mail}</Text>
      </View>
      <Image style={styles.userImage} source={{ uri: user?.image }} />
      <Text style={styles.postHeader}>Posts by {user?.name}</Text>
      {posts.map((post) => (
        <Post post={post} key={post.id} reload={getPosts} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userImage: {
    height: 275,
  },
  userNameContainer: {
    paddingVertical: 16,
    alignItems: "center",
    backgroundColor: "#264c59",
  },
  userTitle: {
    fontSize: 16,
    color: "#ffffff",
    paddingVertical: 4,
  },
  postHeader: {
    fontSize: 22,
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 12,
    backgroundColor: "#acc6c9",
    color: "#264c59",
    fontWeight: "bold",
  },
});
