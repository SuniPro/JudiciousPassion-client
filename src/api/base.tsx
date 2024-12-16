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
  return axios
    .post(url, param, {
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
  return axios
    .get(url, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => responseHandler(response, url, init))
    .catch(errorHandler);
}

export async function postToTravelServer(
  url: string,
  param: any,
  init: RequestInit & { skipError?: boolean } = {},
): Promise<AxiosResponse> {
  return axios
    .post(url, param, {
      headers: { "Content-Type": "application/json" },
    })
    .catch(errorHandler)
    .then((response) => responseHandler(response, url, init));
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
