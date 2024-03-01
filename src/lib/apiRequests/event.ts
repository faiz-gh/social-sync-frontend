import axios, { AxiosResponse } from "axios";

import { ICreateEventRequest, IUpdateEventRequest, IDeleteEventRequest, IGetEventRequest, IGetEventsByCompanyRequest, IQueryParams } from "@/types";

export async function createEvent(payload: ICreateEventRequest): Promise<AxiosResponse> {
    return await axios.post('http://localhost:5500/event', payload);
}

export async function updateEvent(payload: IUpdateEventRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        startDate: payload.startDate.toISOString(),
        endDate: payload.endDate.toISOString(),
        location: payload.location
    }
    return await axios.put('http://localhost:5500/event?' + new URLSearchParams(queryParams));
}

export async function removeEvent(payload: IDeleteEventRequest): Promise<AxiosResponse> {
    return await axios.delete('http://localhost:5500/event/' + payload.id);
}

export async function getEvent(payload: IGetEventRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/event/' + payload.id);
}

export async function getEventsByCompany(payload: IGetEventsByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get('http://localhost:5500/event/company/' + payload.companyId);
}

