import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import PostDetail from "./components/PostDetail";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import CreateBlog from "./components/CreateBlog";
import EditBlog from "./components/EditBlog";
import { AuthProvider } from "./components/AuthContext";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/edit/:id" element={<EditBlog />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
