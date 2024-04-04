import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

//....Authlogic//

// import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("syedtawseef0@gmail.com");
  const [password, setPassword] = useState("qwerty");
  const { isAuthenticated, login } = useAuth();
  // const navigate = useNavigate();
  // if (!email && password) return <Message message =/>;
  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }
  useEffect(() => {
    if (isAuthenticated === true) navigate("/app");
  }, [isAuthenticated, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type={"primary"}>login</Button>
        </div>
      </form>
    </main>
  );
}
