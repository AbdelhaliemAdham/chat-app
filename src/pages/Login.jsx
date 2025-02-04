import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomModel from "../components/Modal";
import LoadingIndicator from "../components/LoadingIndicator";

function Login() {
  const { loginUser, error, loading } = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [error]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;

    const data = new FormData(form);

    const email = data.get("email");
    const password = data.get("password");

    const response = await loginUser({ email, password });
    if (!error) {
      form.reset();
      navigate("/");
    } else {
      setShowModal(true);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <section className="loginSection">
      <h1 className="text-center">Login</h1>
      <p className="text-center">Please fill the form to login to chatApp</p>

      {showModal && error && (
        <CustomModel
          title={"Authentication Error"}
          body={error ? error : "Something went wrong"}
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="loginBox">
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="mb-2" htmlFor="email">
              Email
            </label>
            <input className="input" type="text" name="email" id="email" />
          </div>
          <div className="mb-3">
            <label className="mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <button className="submitButton" type="submit">
            Login
          </button>
        </form>
        <p className="mt-3 text-center">
          Don't you have an account?{" "}
          <Link to={"/register"} className="text-decoration-none">
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
