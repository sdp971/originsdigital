import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import useAPI from "../../api/useAPI";

export default function EditUserPassword() {
  // const api = useAPI();
  // const { state } = useLocation();

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setModal(false);
      }
    };

    if (modal) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("modal-open");
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [modal]);

  const [newPassword, setNewPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [actualPassword, setActualPassword] = useState("");

  const addNewValues = console.log(newPassword, verifyPassword, actualPassword);

  return (
    <div>
      <button className="valide-mdp-button" type="button" onClick={toggleModal}>
        Modifier le mot de passe
      </button>
      <div>
        {modal && (
          <div className="overlay-abo-div" role="dialog" aria-modal="true">
            {modal && (
              <div className="pop-up-abo">
                <p>Tape ton nouveau mot de passe</p>
                <form action="editPassword">
                  <input
                    type="password"
                    name=""
                    id="edit-password1"
                    value={newPassword}
                    onChange={(e) => {
                      e.preventDefault();
                      setNewPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <br />
                  <input
                    type="password"
                    name=""
                    id="edit-password2"
                    value={verifyPassword}
                    onChange={(e) => {
                      e.preventDefault();
                      setVerifyPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                  <p>Tape ton mot de passe actuel pour confirmer</p>
                  <input
                    type="password"
                    name=""
                    id="edit-password2"
                    value={actualPassword}
                    onChange={(e) => {
                      e.preventDefault();
                      setActualPassword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
                  />
                </form>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={() => {
                    console.log("appui");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                    }
                  }}
                >
                  Valider
                </button>
                <button
                  className="valide-mdp-button"
                  type="button"
                  onClick={toggleModal}
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
