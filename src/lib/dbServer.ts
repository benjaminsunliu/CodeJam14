import PocketBase from "pocketbase";
import { APP_DATABASE } from "@/lib/dbNames";
import { ISignUpPayload, UserAuthModel } from "@/types/UserAuth";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const POCKET_BASE_URL = "https://codejam14-smart-kids.pockethost.io";

export class DatabaseServer {
  client: PocketBase;

  constructor() {
    this.client = new PocketBase(POCKET_BASE_URL);
    this.client.autoCancellation(false);
  }

  async authenticateAdmin(email: string, password: string) {
    try {
      const result = await this.client.admins.authWithPassword(email, password);

      console.log("authenticate result:", result);

      if (!result?.token) {
        throw new Error("Invalid email or password");
      }

      console.log("OK");

      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Invalid email or password");
    }
  }

  async authenticate(email: string, password: string) {
    try {
      const result = await this.client
        .collection(APP_DATABASE.USERS)
        .authWithPassword(email, password);

      console.log("authenticate result:", result);

      if (!result?.token) {
        throw new Error("Invalid email or password");
      }

      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Invalid email or password");
    }
  }

  async register(payload: ISignUpPayload) {
    const { email, password, name } = payload;
    try {
      const result = await this.client
        .collection(APP_DATABASE.USERS)
        .create<any>({
          email,
          password,
          passwordConfirm: password,
          name,
          emailVisibility: true,
        });

      console.log("SUCCESS", result);

      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return false;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.isValid || false;
  }

  async getUser(cookieStore: ReadonlyRequestCookies) {
    const cookie = cookieStore.get("pb_auth");
    if (!cookie) {
      return undefined;
    }

    this.client.authStore.loadFromCookie(cookie?.value || "");
    return this.client.authStore.model as UserAuthModel;
  }
}

export const db = new DatabaseServer();

export default db;
