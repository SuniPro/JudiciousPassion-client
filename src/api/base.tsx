import axios, { AxiosResponse } from "axios";
import { User } from "../model/User";

export class HttpError extends Error {
  constructor(
    public status: number,
    public message: string,
    public response: any,
    public url: string,
  ) {
    super(message);
  }
}

export interface SignResponse {
  status: number;
  response: any;
}

interface InitOptions {
  skipError?: boolean;
}

export async function signThroughServer(
  url: string,
  param: User,
): Promise<SignResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .post(serverUrl, param, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => ({
      status: response.status,
      response: response.data,
    }));
}

export async function getFormTravelServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_TRAVEL_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler);
}

export async function postToTravelServer(
  url: string,
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_TRAVEL_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .post(serverUrl, param, {
      headers: { "Content-Type": "application/json" },
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function postToTravelServerMultiPleFile(
  url: string,
  id: string,
  type: string,
  param: Blob,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_TRAVEL_SERVER_PREFIX;
  const serverUrl = server + url;
  let formData = new FormData();

  formData.append("id", id);
  formData.append("file", param);
  formData.append("type", type);

  return axios
    .post(serverUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function getFormPrivateServer(
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .get(serverUrl, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, serverUrl, init))
    .catch(errorHandler);
}

export async function postToPrivateServer(
  url: string,
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  return axios
    .post(serverUrl, param, {
      headers: { "Content-Type": "application/json" },
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function postToPrivateServerMultiPleFile(
  url: string,
  id: string,
  param: Blob,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  // @ts-ignore
  const server = import.meta.env.VITE_PRIVATE_SERVER_PREFIX;
  const serverUrl = server + url;
  let formData = new FormData();

  formData.append("file", param);

  return axios
    .post(serverUrl, formData, {
      headers: { "content-type": "multipart/form-data" },
      withCredentials: true,
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, serverUrl, init));
}

export async function getFileToPost(
  url: string,
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<void> {
  const response = await axios.post(url, param, {
    headers: { "Content-Type": "application/json" },
    responseType: "arraybuffer",
  });

  const blob = new Blob([response.data], { type: "application/pdf" });

  const downloadUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = param.file.split("/")[1];
  document.body.appendChild(link);
  link.click();

  URL.revokeObjectURL(downloadUrl);
  document.body.removeChild(link);
}

async function responseHandler(
  response: AxiosResponse,
  url: string,
  init: InitOptions = { skipError: false },
): Promise<AxiosResponse> {
  if (response.status !== 200 && !init.skipError) {
    const text = JSON.stringify(response.data);
    let jsonResponse: any;

    try {
      jsonResponse = JSON.parse(text);
    } catch {
      throw new HttpError(response.status, text, text, url);
    }

    let message = "";
    if (jsonResponse.errors) {
      message = jsonResponse.errors
        .map((error: { detail: string }) => error.detail)
        .join("\n");
    }

    throw new HttpError(response.status, message, jsonResponse, url);
  }

  return response;
}

function errorHandler(error: any): never {
  if (error.response) {
    const { status, data, config } = error.response;
    const message = data?.message || "An error occurred.";
    throw new HttpError(status, message, data, config.url);
  } else {
    throw new Error("Network error or server is unreachable");
  }
}
