import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseAnonKey || !supabaseUrl) {
    throw new Error ("Dumbkoff");
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function requireAuth(req, res, next){
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json ({
                error: "Authorization did not work"
            })
        }

        const token = authHeader.split(" ")[1];
        if (!token){
            // Do something
        }

        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user){
            // Do error
        }

        req.userId = user.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({error: "authentication did not work :("});
    }
}