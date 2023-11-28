import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// create a context
const AuthContext = createContext();

// create a provider component
export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  
  const login = (/*email, cookie*/email, password) => {
    //setUser({email, cookie});
    //console.log(email,password)
    const response = doLogIn(email, password);
      //console.log("response: ", response);

      //const { access_token, userId, userName, userEmailAddress } = response.data;
      const { data } = response;
      //const cookie = response.headers['set-cookie'];
      //console.log("cookie: ", cookie);
      //console.log("access_token: ", access_token, "userId: ", userId, "userName: ", userName, "userEmailAddress: ", userEmailAddress);
    //   setUser({
    //     access_token,
    //     userId,
    //     userName,
    //     userEmailAddress,
    // });
  }
  async function doLogIn(){
    try{
      const response = await axios.post('http://localhost:3000/seller/sellerLoginJWT',{
        sellerEmailAddress: email,
        sellerPassword: password
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }
      );
      if(response){
        console.log("response: ", response.data);
        
      }
      

    }catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error
    }
  }

  const checkUser = () => {
    console.log("user:  "+user.email)
    console.log("user:  "+user.cookie)
    if(user.email!=null && user.cookie!=null) {
      return true;
    }
    else
    {
      return false;
    }
  }

  const logout = () => {
    doSignOut();
  }

  async function doSignOut(){
    try{
      const response = await axios.get(process.env.API_ENDPOINT+'/logout');
      console.log("response: ", response);
      setUser(null);
      document.cookie = null;
      ////////////////////////////////////////////localStorage.clear();
      router.push("/"); // 🔰⚫🔗 Router.push()
    }catch(error){
      console.log("error:", error);
    }
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, checkUser }}>
      {children}
    </AuthContext.Provider>
  );


};

export const useAuth = () => useContext(AuthContext);
