import { useContext, useState } from "react"
import styled from "styled-components"
import { onLogin, onLoginWithEmail } from "../../app/auth";
import { useNavigate } from "react-router-dom";
import { pages } from "../../app/pages";
import { authActions } from "../../app/actions";
import { AuthContext } from "../auth/AuthProvider";

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
`

export const Login = () => {
    const navigate = useNavigate();
    const {dispatch} = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const LOGIN_TYPE = 'email';

    const handleSubmit = async (ev) => {
        ev.preventDefault();
    
        let success = false;
        if (LOGIN_TYPE === 'username') {
          success = await onLogin({ username, password });
        } else {
          success = await onLoginWithEmail({ email, password });
        }
    
        if (success) {
            dispatch({type: authActions.LOGIN, payload:{email, username, password}})
            navigate(pages.home.path);
        } else {
          alert("Invalid credentials.");
        }
      };

    return (
        <Container>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                {
                LOGIN_TYPE === 'username' ? <input type="text" placeholder="username" name="username" value={username} onChange={e => setUsername(e.target.value)} /> 
                : <input type="email" data-cy="email" placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
                }
                <input type="password" data-cy="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button data-cy="submit">Login</button>
            </form>
        </Container>
    )
}