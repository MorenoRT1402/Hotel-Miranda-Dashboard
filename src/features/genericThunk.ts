import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../app/api";
import { GuestInterface } from "../dto/guest";

const BASE_URL = (endpoint: string) => `${API_URL}/${endpoint}`;

const createGenericThunk = <TResponse, TArg>(
  type: string,
  method: 'get' | 'post' | 'put' | 'delete',
  endpoint: string,
  data: TArg | null = null
) => {
  return createAsyncThunk<TResponse, TArg>(
    type,
    async (arg: TArg) => {
      let response;
      switch (method) {
        case 'get':
          response = await axios.get(`${BASE_URL(endpoint)}${arg ? `/${arg}` : ''}`);
          break;
        case 'post':
          response = await axios.post(BASE_URL(endpoint), data);
          break;
        case 'put':
          response = await axios.put(`${BASE_URL(endpoint)}/${(arg as any)?.id}`, data);
          break;
        case 'delete':
          response = await axios.delete(`${BASE_URL(endpoint)}/${arg}`);
          break;
        default:
          throw new Error("Invalid HTTP method");
      }
      return response.data;
    }
  );
};

// Use examples

export const getAllThunk = createGenericThunk<GuestInterface[], null>(
  'booking/getAll',
  'get',
  'bookings'
);

export const getByIdThunk = createGenericThunk<GuestInterface | null, string>(
  'booking/getById',
  'get',
  'bookings'
);

export const createThunk = createGenericThunk<GuestInterface, GuestInterface>(
  'booking/create',
  'post',
  'bookings',
  null
);

export const editThunk = createGenericThunk<GuestInterface, { id: string; booking: GuestInterface }>(
  'booking/edit',
  'put',
  'bookings',
  null
);

export const removeThunk = createGenericThunk<string, string>(
  'booking/remove',
  'delete',
  'bookings'
);
