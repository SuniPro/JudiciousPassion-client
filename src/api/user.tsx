import {
  getFormPrivateServer,
  postToPrivateServer,
  SignResponse,
  signThroughServer,
} from "./base";
import { User } from "../model/User";
import { ErrorNotify } from "../components/Alert/Alert";

export async function getUserList(
  password: string,
  roleType: "admin" | "writer" | "guest",
): Promise<User[]> {
  const response = await postToPrivateServer("user/list/", {
    password,
    roleType,
  });

  return await response.data;
}

export async function checkMe(): Promise<User> {
  const response = await getFormPrivateServer("/user/check");
  return response.data;
}

export async function signIn(param: User): Promise<SignResponse> {
  try {
    const response: SignResponse = await signThroughServer(
      "/user/login",
      param,
    );
    if (response.status !== 200) {
      ErrorNotify("이메일과 비밀번호를 확인하시기 바랍니다.");
    }
    return response;
  } catch (err) {
    ErrorNotify("이메일과 비밀번호를 확인하시기 바랍니다.");
    throw err; // 호출 측에서 처리하도록 에러를 다시 던짐
  }
}

export async function signUp(param: User): Promise<User> {
  const response = await postToPrivateServer("/user/create", param);

  return await response.data;
}

export async function signOut(): Promise<User> {
  const response = await getFormPrivateServer("/user/logout");

  return await response.data;
}

export async function profileImageChange(param: Blob): Promise<string> {
  const response = await postToPrivateServer(
    "/user/profile/image/upload",
    param,
  );

  return await response.data;
}

export async function profilePersonalColorChange(user: User): Promise<string> {
  const response = await postToPrivateServer(
    "/user/profile/color/upload",
    user,
  );

  return await response.data;
}

export async function profileMessageChange(user: User): Promise<string> {
  const response = await postToPrivateServer(
    "/user/profile/message/upload",
    user,
  );

  return await response.data;
}
