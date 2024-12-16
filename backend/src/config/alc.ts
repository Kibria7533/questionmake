import { AsyncLocalStorage } from "async_hooks";
import { UserEntity } from "../database/entities/user.entity";

export const AuthUser = {
  storage: new AsyncLocalStorage<UserEntity>(),
  get(): UserEntity {
    return this.storage.getStore();
  },

  set(req: UserEntity): void {
    return this.storage.enterWith(req);
  },
};
