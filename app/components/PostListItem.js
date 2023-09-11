import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import Avatar from "./Avatar";

export default function PostListItem({ post, reload }) {
  const { showActionSheetWithOptions } = useActionSheet();
  const createdAt = new Date(post.createdAt);
  var year = createdAt.toLocaleString("default", { year: "numeric" });
  var month = createdAt.toLocaleString("default", { month: "2-digit" });
  var day = createdAt.toLocaleString("default", { day: "2-digit" });
  var fulldate = year + "-" + month + "-" + day;

  function showEditMenu() {
    const options = ["Update Post", "Delete Post", "Cancel"];
    const destructiveButtonIndex = 1;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
        title: "Edit Post",
      },
      (selectedIndex) => {
        switch (selectedIndex) {
          case 0:
            // Update Post
            showUpdateModal();
            break;

          case destructiveButtonIndex:
            // Delete Post
            showDeleteDialog();
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  }

  function showUpdateModal() {}

  function showDeleteDialog() {
    Alert.alert(
      "Delete Post",
      `Do you want to delete post '${post.caption}'?`,
      [
        {
          text: "No",
          style: "destructive",
        },
        { text: "Yes", onPress: deletePost },
      ]
    );
  }

  async function deletePost() {
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/posts/" +
        post.id +
        ".json",
      { method: "DELETE" }
    );
    if (response.ok) {
      console.log("Post deleted!");
      reload();
    }
  }

  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Avatar userId={post.uid} />
        <TouchableOpacity style={styles.moreBtn} onPress={showEditMenu}>
          <Ionicons name="ellipsis-horizontal" size={28} color="#264c59" />
        </TouchableOpacity>
      </View>
      <Image style={styles.postImage} source={{ uri: post.image }} />
      <Text style={styles.postCaption}>{post.caption}</Text>
      <Text style={styles.postCaption}>{fulldate}</Text>
    </View>
  );
}
//createdAt.toLocaleDateString will give you this 8/9/2023
//createdAt.toDateString will give you this Mon Aug 09 2023
const styles = StyleSheet.create({
  postContainer: {
    flex: 1,
    minHeight: 320,
    paddingBottom: 30,
    borderBottomColor: "#acc6c9",
    borderBottomWidth: 0.5,
  },
  postImage: {
    aspectRatio: 1,
    flex: 1,
  },
  postCaption: {
    fontSize: 22,
    padding: 15,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  moreBtn: {
    position: "absolute",
    right: 10,
  },
});
