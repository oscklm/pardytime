import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { Button } from "./Button";
import Text from "./Text";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { StyleSheet } from "react-native-unistyles";
import LoadingView from "../LoadingView";
import { AnimatedSpinner } from "../AnimatedSpinner";

interface Props {
  value?: Id<"_storage"> | undefined;
  onChange: (imageId: Id<"_storage"> | undefined) => void;
  disabled?: boolean;
}

export const ImageInput = ({ value, onChange, disabled }: Props) => {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateUploadUrl = useMutation(
    api.storage.mutations.generateUploadUrl
  );
  const deleteImage = useMutation(api.storage.mutations.deleteImage);

  const pickImage = async () => {
    if (imageUri && value) {
      Alert.alert(
        "Overwrite?",
        "Are you sure you want to overwrite the current image? This will delete the existing one.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Overwrite",
            style: "destructive",
            onPress: async () => {
              await handlePickAndUpload();
            },
          },
        ]
      );
    } else {
      await handlePickAndUpload();
    }
  };

  const handlePickAndUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setIsLoading(true);
      const uri = result.assets[0].uri;
      setImageUri(uri);
      const uploadUrl = await generateUploadUrl();
      const response = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": "image/jpeg" },
        body: await (await fetch(uri)).blob(),
      });
      const { storageId } = await response.json();
      onChange(storageId);
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    if (value) {
      setIsLoading(true);
      await deleteImage({ imageId: value });
      setImageUri(null);
      onChange(undefined);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {value && imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View>
            {isLoading ? (
              <View style={styles.loadingOverlay}>
                <AnimatedSpinner />
              </View>
            ) : (
              <Text variant="subtitle">No image</Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant="outline"
          onPress={pickImage}
          disabled={isLoading || disabled}
        >
          {value ? "Change image" : "Pick image"}
        </Button>
        {value && (
          <Button
            variant="danger"
            onPress={handleRemove}
            disabled={isLoading || disabled}
          >
            Remove image
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    flexDirection: "row",
    gap: th.space.md,
  },
  imageContainer: {
    width: 185,
    height: 185,
    borderRadius: th.radius.md,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    gap: th.space.md,
    backgroundColor: th.colors.backgroundSecondary,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    gap: th.space.md,
  },
}));
