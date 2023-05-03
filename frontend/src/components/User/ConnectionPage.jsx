import "../../styles/index.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "../../api/useAPI";
import Registration from "./Registration";
import { useAuth } from "../../context/AuthContext";

export default function ConnectionPage() {
  const navigate = useNavigate();
  const api = useAPI();
  const [mail, setMail] = useState("");
  const [mdp, setMdp] = useState("");
  const [registrationMail, setRegistrationMail] = useState("");
  const [account, setAccount] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const { success, setSuccess, setIsAdmin } = useAuth();

  const refPass = useRef();
  const refMail = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      mdp: refPass.current.value,
      email: refMail.current.value,
    };

    api
      .post("users/login/", user)
      .then((res) => {
        const { token } = res.data;
        api.defaults.headers.authorization = `Bearer ${token}`;
        setSuccess(false);
        navigate("/");
        if (res.data.user.role === "admin") setIsAdmin(true);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(true);
      });
  };

  return account ? (
    <div id="connection">
      <img
        src="https://cdn.pixabay.com/photo/2021/07/28/00/57/pyramids-6498038_960_720.jpg"
        alt=""
        className="connection-bg"
      />
      {success && (
        <div id="connection">
          <img
            src="https://cdn.pixabay.com/photo/2021/07/28/00/57/pyramids-6498038_960_720.jpg"
            alt=""
            className="connection-bg"
          />
          <h2>SE CONNECTER</h2>
          <input
            id="username"
            type="text"
            name="username"
            className="user-input"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            ref={refMail}
          />
          <input
            type="password"
            name="motdepasse"
            className="user-input"
            placeholder="Mot de Passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
            ref={refPass}
          />
          {errorMessage && <p id="password-error">Sorry, Wrong Password</p>}
          <button type="button" className="user-button" onClick={handleSubmit}>
            Connexion
          </button>
          <h2>S'INSCRIRE</h2>
          <input
            type="text"
            name="Email"
            className="user-input"
            placeholder="Email"
            value={registrationMail}
            onChange={(e) => setRegistrationMail(e.target.value)}
          />
          <button
            type="button"
            className="user-button"
            onClick={() => {
              setAccount(false);
            }}
          >
            Inscription
          </button>
        </div>
      )}
    </div>
  ) : (
    <Registration
      registrationMail={registrationMail}
      setRegistrationMail={setRegistrationMail}
      mail={mail}
      setMail={setMail}
      mdp={mdp}
      setMdp={setMdp}
      handleSubmit={handleSubmit}
      refPass={refPass}
      refMail={refMail}
    />
  );
}
