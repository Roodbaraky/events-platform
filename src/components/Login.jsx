import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "../supabaseClient";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Login() {
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
              appearance={{ theme: ThemeSupa }}
              providers={[]}
            />
          </div>
        </div>
      </dialog>
    </>
  );
}
