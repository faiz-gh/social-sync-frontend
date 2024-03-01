import axios, { AxiosResponse } from "axios";
import { ICreatePostRequest, IGetPostRequest, IGetPostsByAccountRequest, IGetPostsByClientRequest } from "@/types";

export async function createPost(payload: ICreatePostRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/post', payload);
}

export async function getPost(payload: IGetPostRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/post/' + payload.id);
}

export async function getPostsByAccount(payload: IGetPostsByAccountRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/post/account/' + payload.accountId);
}

export async function getPostsByClient(payload: IGetPostsByClientRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/post/client/' + payload.clientId);
}