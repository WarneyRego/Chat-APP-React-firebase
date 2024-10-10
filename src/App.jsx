import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth, databaseApp } from './Services/firebase';
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { collection, orderBy, serverTimestamp, addDoc, query, limit } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import "./App.css";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div>
      <header>
        <img className='ImgLogo' src="https://img.utdstc.com/icon/b17/d15/b17d15b3a0087ce1843c0bd3718b0a2763a312054f7d9189908185ed6a6644e1:200" alt="Logo"/>
        <SignOut />
      </header>
      <section>
        {user ? <Chatroom /> : <SignIn />}
      </section>
    </div>
  );

  function Chatroom() {
    const messageRef = collection(databaseApp, "messages");
    const QueryMessages = query(messageRef, orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(QueryMessages, { idField: "id" });
    const [formValue, setFormValue] = useState("");

    const sendMessage = async (e) => {
      e.preventDefault();
      const { photoURL, uid } = auth.currentUser;
      await addDoc(messageRef, {
        text: formValue,
        uid,
        photoURL,
        createdAt: serverTimestamp(),
      });
      setFormValue(''); 
    };

    return (
      <>
        <main>
          {messages && messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
        </main>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button className='button_send' type="submit" disabled={!formValue}>
            Enviar
          </button>
        </form>
      </>
    );
  }

  function ChatMessage({ message }) {
    const { text, photoURL, uid } = message;
    const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
    return (
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt="User Avatar" />
        <p>{text}</p>
      </div>
    );
  }

  function SignIn() {
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    return (
      <> <h1 className='bem-vindo'>SEJA BEM VINDO&#128075;</h1>
      <h2 className='prosseguir'>ENTRE NA CONVERSA AGORA!</h2>
      <button className="sign-in" onClick={() => signInWithGoogle()}>
        Logar com Google
      </button>
      </>
    );
  }

  function SignOut() {
    return (
      auth.currentUser && (
        <button className="sign-out" onClick={() => auth.signOut()}>
          Sair
        </button>
      )
    );
  }
}

export default App;
