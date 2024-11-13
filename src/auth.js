import { supabase } from '../supabaseClient'; 

export async function signUp(email, password) {
    const { user, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) {
        console.error('Sign-up error:', error.message);
    }
    return { user, error };
}


export async function signIn(email, password) {
    const { user, error } = await supabase.auth.signIn({
        email,
        password,
    });
    if (error) {
        console.error('Sign-in error:', error.message);
    }
    return { user, error };
}


export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        console.error('Sign-out error:', error.message);
    }
}
