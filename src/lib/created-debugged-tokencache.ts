import * as SecureStore from "expo-secure-store";

export const createTokenCache = () => {
	const secureStoreOpts = {
		/**
		 * The data in the keychain item cannot be accessed after a restart until the
		 * device has been unlocked once by the user.
		 *
		 * This may be useful if you need to access the item when the phone is locked.
		 */
		keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
	};
	return {
		getToken: async (key: string): Promise<string | null> => {
			try {
				const item = await SecureStore.getItemAsync(key, secureStoreOpts);
				alert(`[TokenCache] getToken result for key ${key}: ${item}`);
				return item;
			} catch (error) {
				await SecureStore.deleteItemAsync(key, secureStoreOpts);
				return null;
			}
		},
		saveToken: (key: string, token: string): Promise<void> => {
			return SecureStore.setItemAsync(key, token, secureStoreOpts);
		},
	};
};
