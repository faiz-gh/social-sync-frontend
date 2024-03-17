import { AxiosResponse } from "axios";
import axios from "@/lib/axios";

import { ICreateEventRequest, IUpdateEventRequest, IDeleteEventRequest, IGetEventRequest, IGetEventsByCompanyRequest, IQueryParams } from "@/types";

export async function createEvent(payload: ICreateEventRequest): Promise<AxiosResponse> {
    return await axios.post('/event', payload, {
        validateStatus: () => true
    });
}

export async function updateEvent(payload: IUpdateEventRequest): Promise<AxiosResponse> {
    const queryParams: IQueryParams = {
        id: payload.id,
        title: payload.title,
        description: payload.description,
        startDate: payload.startDate.toISOString(),
        endDate: payload.endDate.toISOString()
    }
    return await axios.put('/event?' + new URLSearchParams(queryParams), {}, {
        validateStatus: () => true
    });
}

export async function removeEvent(payload: IDeleteEventRequest): Promise<AxiosResponse> {
    return await axios.delete('/event/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getEvent(payload: IGetEventRequest): Promise<AxiosResponse> {
    return await axios.get('/event/' + payload.id, {
        validateStatus: () => true
    });
}

export async function getEventsByCompany(payload: IGetEventsByCompanyRequest): Promise<AxiosResponse> {
    return await axios.get('/event/company/' + payload.companyId, {
        validateStatus: () => true
    });
}

