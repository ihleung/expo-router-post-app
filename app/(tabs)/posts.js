import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook
import {
  Button,
  FlatList,
  Platform,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import PostListItem from "../components/PostListItem";

export default function Posts() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State to manage refreshing

  useEffect(() => {
    getPosts(); // Call the getPosts function here
  }, []);

  // Use the useFocusEffect hook to fetch posts when the screen is focused
  useFocusEffect(
    React.useCallback(() => {
      getPosts(); // Call the getPosts function here as well
    }, [])
  );

  // Define getPosts function outside of the component
  async function getPosts() {
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/posts.json"
    );
    const dataObj = await response.json();
    const postsArray = Object.keys(dataObj).map((key) => ({
      id: key,
      ...dataObj[key],
    })); // from object to array
    postsArray.sort((postA, postB) => postB.createdAt - postA.createdAt); // sort by timestamp/ createdBy
    setPosts(postsArray);
  }

  // Define handleRefresh function
  async function handleRefresh() {
    setRefreshing(true);
    await getPosts();
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  function showCreateModal() {
    router.push("/post-modal");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Button
              title="Add New"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={showCreateModal}
            />
          ),
        }}
      />
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostListItem post={item} reload={getPosts} />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#264c59"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
