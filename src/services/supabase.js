import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qmxtyilwoyxxyxskokcw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFteHR5aWx3b3l4eHl4c2tva2N3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI4NzIyMzAsImV4cCI6MjAxODQ0ODIzMH0.EkUs3QJhqQOrbetdKxdkzIbFAituMvJpWtRRIy0ZtC0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
