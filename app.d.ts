/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import("./auth/lucia.server.ts").Auth;
  type DatabaseUserAttributes = {
    username: string;
  };
  type DatabaseSessionAttributes = {};
}
