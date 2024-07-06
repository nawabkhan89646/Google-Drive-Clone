import { useState, useEffect } from "react";
import Header from "./Component/Header";
import Sidebar from "./Component/Sidebar/Sidebar";
import FilesView from "./Component/FileView/Fileview";
import loginPhoto from "./assets/download.png";
import { auth, provider } from "../firebase";

function App() {
  const [user, setUser] = useState(null); // State to hold the authenticated user

  useEffect(() => {
    // Set up an auth state listener
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Set the user state if logged in
      } else {
        setUser(null); // Set the user state to null if logged out
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const handleLogin = () => {
    if (!user) {
      auth
        .signInWithPopup(provider) // Open Google login popup
        .then((result) => {
          setUser(result.user); // Set the user state on successful login
          console.log(result.user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      auth
        .signOut() // Log out the user
        .then(() => {
          setUser(null); // Set the user state to null on logout
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <div className="App">
      {user ? ( // If user is logged in
        <>
          <Header userPhoto={user.photoURL} onLogout={handleLogin} />
          <div>
            <Sidebar />
            <FilesView />
          </div>
        </>
      ) : ( // If user is not logged in
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center max-w-sm w-full">
            <img
              src={loginPhoto}
              alt="Google Drive"
              className=" h-24 mb-6 mx-auto"
            />
            <h2 className="text-3xl font-bold mb-4 text-gray-700">Sign in</h2>
            <p className="text-gray-500 mb-8">to continue to Google Drive</p>
            <button
              onClick={handleLogin}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Log in with Google
            </button>
          </div>
          <footer className="mt-8 text-gray-500 text-sm">
            <p>© 2024 Google</p>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="hover:underline">
                Privacy
              </a>
              <a href="#" className="hover:underline">
                Terms
              </a>
              <a href="#" className="hover:underline">
                Help
              </a>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
