import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { API_URL } from "../app/api";

interface MongoEntity {
    _id: string;
}

export class Thunk<T extends MongoEntity> {
    private endpoint = 'entities';

    get baseUrl(){ return `${API_URL}/${this.endpoint}` };

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = createAsyncThunk<T[]>(
        `${this.endpoint}/getAll`,
        async () => {
            const response = await axios.get(this.baseUrl);
            return response.data;
        }
    );

    getById = createAsyncThunk<T | null, string>(
        `${this.endpoint}/getById`,
        async (id: string) => {
            const response = await axios.get(`${this.baseUrl}/${id}`);
            return response.data;
        }
    );

    create = createAsyncThunk<T, T>(
        `${this.endpoint}/create`,
        async (entity: T) => {
            const response = await axios.post(this.baseUrl, entity);
            return response.data;
        }
    );

    edit = createAsyncThunk<T, { id: string; entity: T }>(
        `${this.endpoint}/edit`,
        async ({ id, entity }) => {
            const response = await axios.put(`${this.baseUrl}/${id}`, entity);
            return response.data;
        }
    );

    remove = createAsyncThunk<string, string>(
        `${this.endpoint}/remove`,
        async (id) => {
            await axios.delete(`${this.baseUrl}/${id}`);
            return id;
        }
    );

}