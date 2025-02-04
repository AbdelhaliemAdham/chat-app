import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CustomModel from "../components/Modal";

function Register() {
  const { registerUser, error } = React.useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    await registerUser({ name, email, password });
    setLoading(false);
    if (error) {
      setShowModal(true);
    } else {
      form.reset();
      setShowSuccessModal(true);
    }
  };

  return (
    <section className="loginSection">
      {showModal && (
        <CustomModel
          title={"Authentication Error"}
          body={
            error ? error.toString() : "An error occurred, please try again."
          }
          onClose={() => setShowModal(false)}
        />
      )}
      {showSuccessModal && (
        <CustomModel
          title={"Success"}
          body={"Your account has been created successfully."}
          onClose={() => {
            setShowSuccessModal(false);
            navigate("/login");
          }}
          onLogin={() => navigate("/login")}
        />
      )}
      <h1 className="text-center m-2">Register</h1>
      <div className="loginBox">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="input"
              id="name"
              name="name"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="input"
              id="email"
              name="email"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="input"
              id="password"
              name="password"
              required
            />
          </div>
          <button type="submit" className="submitButton">
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
        <p className="mt-3 text-center">
          You have an account ?{" "}
          <Link to={"/login"} className="text-decoration-none">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
