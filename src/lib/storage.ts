import type { SupabaseAuthClientOptions } from "@supabase/supabase-js/dist/module/lib/types";
import * as SecureStore from "expo-secure-store";

const ENABLE_DEBUG = false;

const storage: SupabaseAuthClientOptions["storage"] = {
	getItem: (key: string) => {
		if (ENABLE_DEBUG) {
			console.debug(`Getting item from storage: ${key}`);
		}
		return SecureStore.getItemAsync(key);
	},
	setItem: (key: string, value: string) => {
		if (ENABLE_DEBUG) {
			console.debug(`Setting item in storage: ${key} = ${value}`);
		}
		SecureStore.setItemAsync(key, value);
	},
	removeItem: (key: string) => {
		if (ENABLE_DEBUG) {
			console.debug(`Removing item from storage: ${key}`);
		}
		SecureStore.deleteItemAsync(key);
	},
};

export default storage;
