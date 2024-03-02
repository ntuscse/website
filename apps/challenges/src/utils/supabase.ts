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

const signInWithAzure = async (redirectURL: string) => {
    const url = process.env.BASE_URL || "http://localhost:3001";
    const resposne = await supabase.auth.signInWithOAuth({
        provider: "azure",
        options: {
            scopes: 'email',
            redirectTo: url + "/api/auth/oauth/callback?next=" + redirectURL,
        },
    })
    return resposne;
}

const SupabaseService = {
    initClient,
    signInWithAzure,
}

export { SupabaseService, supabase as default } 