import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return (
    <>
      <dialog id="login" className="modal">
        <div className="modal-box p-2">
          <div className="modal-action flex flex-col">
            <form method="dialog">
              <div className="flex justify-end">
                <button className="btn">x</button>
              </div>
            </form>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  input: {
                    color: isDarkMode ? "#ffffff" : "#000000",
                    border: "1px solid #64748b",
                  },
                },
              }}
              providers={[]}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
