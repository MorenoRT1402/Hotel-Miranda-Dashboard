import { getDisplayName } from "../../app/table";
import styled from "styled-components";
import React from "react";
import { PageDetail } from "./PageDetail";
import userThunk from "../../features/users/userThunk";
import { formatDateTime } from "../../utils/dates";

const Container = styled.section`
    padding: 2rem;

    & > section {
        margin-bottom: 1.5rem;

        & > img {
            max-height: 15rem;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        & > div {
            margin-top: 1rem;
        }
    }

    hr {
        margin: 1.5rem 0;
    }
`;

export const UserDetail = () => {
    return (
        <PageDetail
            selector={(state, id) => state.user.users.find(user => user._id === id)}
            thunkAction={userThunk.getAll}
            render={(user) => {
                const name = getDisplayName(user);
                return (
                    <Container>
                        <section>
                            <img src={user.picture} alt={`${name}'s profile`} />
                            <div>
                                <h3>{name}</h3>
                                <small>{`ID: ${user._id}`}</small>
                            </div>
                        </section>

                        <section>
                            <div>
                                <small>Email</small>
                                <strong>{user.email}</strong>
                            </div>
                            <div>
                                <small>Position</small>
                                <strong>{user.position}</strong>
                            </div>
                            <div>
                                <small>Contact</small>
                                <strong>{user.contact}</strong>
                            </div>
                            <div>
                                <small>Joined</small>
                                <strong>{formatDateTime(user.joined)}</strong>
                            </div>
                        </section>

                        <hr />

                        <section>
                            <div>
                                <small>Status</small>
                                <strong>{user.status}</strong>
                            </div>
                            <div>
                                <small>Job Desk</small>
                                <strong>{user.jobDesk}</strong>
                            </div>
                        </section>

                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas commodi dolorum accusamus aperiam quod earum facilis facere at odit eveniet! Veritatis maiores quo aspernatur enim esse similique aut quos porro.</p>
                    </Container>
                );
            }}
        />
    );
};
