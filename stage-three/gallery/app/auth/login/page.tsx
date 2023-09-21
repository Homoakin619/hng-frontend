'use client'
import { FormEvent, FormEventHandler } from "react";
import { ToastContainer,toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

type AuthType = {
    username: string,
    password: string
}

const LoginPage = () => {
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl") ?? "/";
  
  
    const handleLogin: FormEventHandler<HTMLFormElement> = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const loginData = {email,password}
        
        
      const res = await signIn("credentials", {
        callbackUrl: callbackUrl,
        ...loginData,
        redirect: false,
      });
  
      if (res?.ok) {
        console.log("good req");
        console.log(res);
        
        if (res.url){
          console.log("good req");
          toast("Login Succesful", {
            theme: "colored",
            type: "success",
          });
                    
          setTimeout(() => {window.location.href = callbackUrl} ,3000)
         
        }else {
          
          toast("Invalid credentials", {
            type: "error",
            theme: "colored",
            
          });
        }   
      } else {
        toast("Error Occured", {
          type: "error",
          theme: "colored",
        });
      
      }
    };
  
    return (
      <>
        <ToastContainer />
        <div className="container-fluid mt-4 ms-3">
        <h2 className="brand">IMAGE GALLERY</h2>
        </div>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <div className="col-md-3">
            <div className="col">
              <h3>Login</h3>
            </div>
            <form method="post" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                //   {...register("username")}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
    
                />
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary-custom d-grid">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
}

export default LoginPage