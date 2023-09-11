import { Image, StyleSheet, Text, View } from "react-native";
import Avatar from "./Avatar";

export default function PostListItem({ post }) {
  const createdAt = new Date(post.createdAt);
  var year = createdAt.toLocaleString("default", { year: "numeric" });
  var month = createdAt.toLocaleString("default", { month: "2-digit" });
  var day = createdAt.toLocaleString("default", { day: "2-digit" });
  var fulldate = year + "-" + month + "-" + day;
  return (
    <View style={styles.postContainer}>
      <View style={styles.headerContainer}>
        <Avatar userId={post.uid} />
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
});
