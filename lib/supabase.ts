import { createClient, type SupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./supabase.types" // <- add your generated types here or remove this line

// *** NEVER hard-code keys – rely on env variables already set in the v0 workspace
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// One singleton client for the browser
export const supabase: SupabaseClient<Database> = createClient(supabaseUrl, supabaseAnon)
