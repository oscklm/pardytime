import { api } from '@/convex/_generated/api';
import type { Id } from '@/convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { AnimatedSpinner } from '../AnimatedSpinner';
import { Icons } from '../Icons';
import { Image } from './Image';
import Text from './Text';
import TouchableBounce from './TouchableBounce';

interface Props {
  value?: Id<'_storage'> | undefined;
  onChange: (imageId: Id<'_storage'> | undefined) => void;
  disabled?: boolean;
}

export const ImageInput = ({ value, onChange, disabled }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateUploadUrl = useMutation(
    api.storage.mutations.generateUploadUrl
  );

  const deleteImage = useMutation(api.storage.mutations.deleteImage);

  const uploadImage = async (uri: string) => {
    const uploadUrl = await generateUploadUrl();
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'image/jpeg' },
      body: await (await fetch(uri)).blob(),
    });
    const { storageId } = await response.json();
    onChange(storageId);
  };

  const handlePickAndUpload = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    })
      .then(async (result) => {
        if (result.canceled) return;
        setIsLoading(true);

        // If there's an existing image, we delete it first
        if (value) {
          try {
            await deleteImage({ imageId: value });
          } catch (error: any) {
            Alert.alert('Error', 'Failed to upload image. Please try again.');
            __DEV__ && console.error('Error deleting image:', error);
            return;
          }
        }

        // Upload and update local image
        const asset = result.assets[0];
        await uploadImage(asset.uri);
      })
      .finally(() => {
        setTimeout(() => setIsLoading(false), 100);
      })
      .catch((error) => {
        console.error('Error picking image:', error);
        Alert.alert('Error', 'Failed to pick image. Please try again.');
      });
  };

  useEffect(() => {
    console.log('ImageInput value changed:', value);
  }, [value]);

  styles.useVariants({
    hasImage: value && value.length > 0,
  });

  return (
    <View style={styles.container}>
      <TouchableBounce
        sensory="light"
        onPress={handlePickAndUpload}
        disabled={disabled}
      >
        <View style={styles.imageContainer}>
          <View style={styles.innerImageContainer}>
            {value ? (
              <Image
                storageId={value}
                style={styles.image}
                width={300}
                onLoad={() => setIsLoading(false)}
              />
            ) : (
              <View>
                {isLoading ? (
                  <View style={styles.loadingOverlay}>
                    <AnimatedSpinner colored opacity={0.35} />
                  </View>
                ) : (
                  <Text variant="subtitle">No image</Text>
                )}
              </View>
            )}
          </View>
          <View style={styles.editButton}>
            <Icons name="edit" size={24} color={'white'} />
          </View>
        </View>
      </TouchableBounce>
    </View>
  );
};

const styles = StyleSheet.create((th) => ({
  container: {
    position: 'relative',
    alignItems: 'center',
    gap: th.space.md,
  },
  imageContainer: {
    width: 185,
    height: 185,
    borderRadius: th.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    gap: th.space.md,
    backgroundColor: th.colors.backgroundSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  innerImageContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      hasImage: {
        true: {
          borderRadius: th.radius.md,
        },
        false: {
          borderWidth: 2,
          borderColor: th.colors.backgroundTertiary,
          borderStyle: 'dashed',
          borderRadius: th.radius.sm,
        },
      },
    },
  },
  editButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
