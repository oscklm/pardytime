import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import storage from "@/lib/storage";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
	throw new Error("Supabase URL is not defined in environment variables.");
}

const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseAnonKey) {
	throw new Error("Supabase Anon Key is not defined in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		storage,
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: false,
	},
});
