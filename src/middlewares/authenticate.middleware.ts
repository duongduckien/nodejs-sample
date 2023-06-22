import express from 'express';
import httpStatusCodes from 'http-status-codes';

// Services
import userService from '../services/user/user.service';

// Interfaces
import IRequest from '../interfaces/IRequest';

// Utilities
import ApiResponse from '../utilities/api-response.utility';
import Encryption from '../utilities/encryption.utility';
import ApiUtility from '../utilities/api.utility';

// Constants
import constants from '../constants';

export default async (
  req: IRequest,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (constants.APPLICATION.authorizationIgnorePath.indexOf(`${req.originalUrl}`) === -1) {
    const authorizationHeader = ApiUtility.getCookieFromRequest(req, constants.COOKIE.COOKIE_USER);

    if (authorizationHeader) {
      const decoded = await Encryption.verifyCookie(authorizationHeader);

      if (decoded) {
        const user = await userService.getById({ id: decoded.data[constants.COOKIE.KEY_USER_ID] });

        if (user) {
          // @ts-ignore
          req.user = user;
        } else {
          return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
        }
      } else {
        return ApiResponse.error(res, httpStatusCodes.UNAUTHORIZED);
      }
    } else {
      return ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    }
  }

  next();
};
