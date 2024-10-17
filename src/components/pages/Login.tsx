import React, { useContext, useState } from "react"
import styled from "styled-components"
import { onLogin } from "../../app/auth";
import { useNavigate } from "react-router-dom";
import { pages } from "../../app/pages";
import { authActions } from "../../app/actions";
import { AuthContext } from "../auth/AuthProvider";
import { testingUser, validPass } from "../../app/auth.credentials";
import { showToast, ToastType } from "../../utils/alerts";

const Container = styled.section`
    margin: 0 auto;
    width: 50%;

    &>form{
        border: 1px solid;
        padding: 1rem;
        width: 12rem;
        margin: 0 auto;

        &>*{
            display: block;
            margin: 0 auto;
        }

        &>input{
            margin-block: 1rem;
            padding: .5rem;
        }

        &>button{
            background-color: ${({theme}) => theme.colors.secondaryDimmed};
            color: ${({theme}) => theme.colors.main};
        }
    }
`;

const CredentialsBox = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.secondaryDimmed};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  width: 90%;
  max-width: 300px;
  margin: 1.5rem auto;
  text-align: left;

  p {
    margin: 0.5rem 0;
  }

  code {
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0.25rem;
    border-radius: 4px;
  }
`;

export enum LoginType { username = "username", email = "email" }
export const Login = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginType] = useState(LoginType.email);

    const handleSubmit = async (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
    
        const firstCredential = loginType === LoginType.username ? {name:username} : {email};
        const user = await onLogin({...firstCredential, password});
        
        if (user) {
            const payload = {email:user.email, username:user.username};
            dispatch({type: authActions.LOGIN, payload})
            navigate(pages.home.path);
        } else {
          showToast("Invalid credentials.", ToastType.Error);
        }
      };

    return (
        <Container>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                {
                loginType === LoginType.username ? <input type="text" placeholder="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /> 
                : <input type="email" data-cy="email" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                }
                <input type="password" data-cy="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button data-cy="submit">Login</button>
            </form>

            <CredentialsBox>
                <p>
                <strong>Puedes usar las siguientes credenciales para ingresar:</strong>
                </p>
                <p>
                Usuario: <code>{testingUser.email}</code>
                </p>
                <p>
                Contraseña: <code>{validPass}</code>
                </p>
            </CredentialsBox>
        </Container>
    )
}