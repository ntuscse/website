import { SupabaseClient, createClient } from '@supabase/supabase-js'
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });


let supabase: SupabaseClient;

const initClient = () => {
    supabase = createClient(
        process.env.SUPABASE_URL || "",
        process.env.SUPABASE_ANON_KEY || "",
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
                detectSessionInUrl: false,
                flowType: "pkce"
            },
        }
    )
    console.log("Supabase client initialized");
}

const SupabaseService = {
    initClient,
}

export { SupabaseService, supabase as default } 