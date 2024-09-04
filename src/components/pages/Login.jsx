import { useState } from "react"
import styled from "styled-components"
import { onLogin } from "../../app/auth";
import { useNavigate } from "react-router-dom";
import { pages } from "../../app/pages";

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
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = ev => {
        ev.preventDefault();
        onLogin({username, password});
        navigate(pages.home.path);
    }

    return (
        <Container>
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </Container>
    )
}