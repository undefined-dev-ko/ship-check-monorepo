import { JsonWebTokenError } from "jsonwebtoken";
import { AuthUtil } from "./authUtil";

describe("AuthUtil", () => {
  describe("createToken", () => {
    it("토큰이 잘 생성되어야한다", () => {
      const authUtil = new AuthUtil();
      const token = authUtil.createToken({
        email: "email",
        name: "name",
        picture: "picture",
      });
      expect(token?.accessToken && token.accessToken.length > 10).toBeTruthy();
    });
  });

  describe("validateAccessToken", () => {
    it("토큰 검증이 잘 되어야한다", () => {
      const authUtil = new AuthUtil();
      const token = authUtil.createToken({
        email: "email",
        name: "name",
        picture: "picture",
      });

      const result = authUtil.validateAccessToken(token.accessToken);

      expect(result.email).toEqual("email");
      expect(result.name).toEqual("name");
      expect(result.picture).toEqual("picture");
    });
    it("토큰이 이상할 경우 검증이 실패해야한다", () => {
      const authUtil = new AuthUtil();
      expect(() => authUtil.validateAccessToken("wrongtoken")).toThrow(
        JsonWebTokenError
      );
    });
  });

  describe("refreshToken", () => {
    it("토큰 리프레시가 잘 되어야한다", () => {
      const authUtil = new AuthUtil();
      const oldToken = authUtil.createToken({
        email: "email",
        name: "name",
        picture: "picture",
      });

      const oldPayload = authUtil.validateAccessToken(oldToken.accessToken);
      const newToken = authUtil.refreshToken(oldToken);
      const newPayload = authUtil.validateAccessToken(newToken.accessToken);

      expect(oldPayload.email === newPayload.email).toBeTruthy();
      expect(oldPayload.name === newPayload.name).toBeTruthy();
      expect(oldPayload.picture === newPayload.picture).toBeTruthy();
    });
  });
});
