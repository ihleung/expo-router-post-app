import * as ImagePicker from "expo-image-picker";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

export default function PostModal() {
  const { id } = useSearchParams();
  const router = useRouter();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    async function getPost() {
      const response = await fetch(
        "https://expo-post-app-default-rtdb.firebaseio.com/posts/" +
          id +
          ".json"
      );
      const data = await response.json();
      setImage(data.image);
      setCaption(data.caption);
    }
    if (id) {
      getPost();
    }
  }, [id]);

  function handleSave() {
    if (id) {
      updatePost();
    } else {
      createPost();
    }
  }

  async function createPost() {
    const createdAt = new Date().getTime();
    const post = {
      caption: caption,
      image: image,
      createdAt: createdAt,
      uid: "fTs84KRoYw5pRZEWCq2Z",
    };
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/posts.json",
      {
        method: "POST",
        body: JSON.stringify(post),
      }
    );
    if (response.ok) {
      router.back();
    }
  }

  async function updatePost() {
    const post = { caption: caption, image: image };
    const response = await fetch(
      "https://expo-post-app-8d5ed-default-rtdb.firebaseio.com/posts/" +
        id +
        ".json",
      {
        method: "PATCH",
        body: JSON.stringify(post),
      }
    );
    if (response.ok) {
      router.back();
    }
  }

  async function chooseImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64: true,
      allowsEditing: true,
      quality: 0.3,
    });

    if (!result.canceled) {
      const base64 = "data:image/jpeg;base64," + result.assets[0].base64;
      setImage(base64);
    }
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: id ? "Update Post" : "Create New Post",
          headerLeft: () => (
            <Button
              title="Close"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={() => router.back()}
            />
          ),
          headerRight: () => (
            <Button
              title="Create"
              color={Platform.OS === "ios" ? "#fff" : "#264c59"}
              onPress={handleSave}
            />
          ),
        }}
      />
      {/* Add Image Component */}

      <Text style={styles.imgText}>Image</Text>
      <TouchableOpacity onPress={chooseImage}>
        <Image
          style={styles.image}
          source={{
            uri:
              image ||
              "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg",
          }}
        />
      </TouchableOpacity>

      {/* Add TextInput Component */}
      <Text style={styles.imgText}>Caption</Text>
      <TextInput
        placeholder="Enter Caption"
        style={styles.input}
        value={caption}
        onChangeText={(text) => setCaption(text)}
      />
    </View>
  );
}

/*
<View style={styles.main}>
        <Text style={styles.title}>Create</Text>
        <Text style={styles.subtitle}>Create a new post.</Text>
      </View>
      */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "left",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  imgText: {
    fontSize: 25,
  },
  image: {
    width: 350, // Adjust the width as needed
    height: 350, // Adjust the height as needed
    resizeMode: "cover", // You can change the resizeMode as needed
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#264c59",
    padding: 10,
    fontSize: 18,
    marginVertical: 10,
    width: "100%",
  },
});
