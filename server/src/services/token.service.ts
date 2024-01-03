// import jwt from 'jsonwebtoken';

// import { jwt_obj } from '../config/env';

// interface Payload {
//   id: string;
//   email: string;
// }

// const createJWT = (payload: Payload) => {
//   const token = jwt.sign(payload, jwt_obj.secret!, {
//     expiresIn: parseInt(jwt_obj.accessExpirationMinutes!, 10) * 60,
//   });
//   return token;
// };

// const verifyJWT = (token: string) => {
//   const decoded = jwt.verify(token, jwt_obj.secret!);
//   return decoded;
// };

// export { createJWT, verifyJWT };

import jwt from 'jsonwebtoken';

import { node_env, jwt_obj } from '../config/env';
import { tokenTypes } from '../config/token';
import { GenerateTokenParams } from '../types/types';

const generateToken = (params: GenerateTokenParams) => {
  const { userId, tokenExpires, tokenType } = params;

  const payload = {
    id: userId,
    type: tokenType,
    iat: Math.floor(Date.now() / 1000),
  };

  return jwt.sign(payload, jwt_obj.secret!, { expiresIn: tokenExpires });
};

const generateAuthToken = async (params: GenerateTokenParams) => {
  const { userId } = params;

  // expiration timestamp (in seconds) is 1 minutes after it is generated
  const tokenExpires = parseInt(jwt_obj.accessExpirationMinutes!, 10) * 60;

  const jwtToken = generateToken({
    userId,
    tokenExpires,
    tokenType: tokenTypes.ACCESS,
  });

  const cookieOptions = {
    issuedAt: new Date(Date.now()),
    expires: new Date(
      Date.now() + parseInt(jwt_obj.accessExpirationMinutes!, 10) * 60 * 1000
    ), // browser or client will delete cookie once it expires
    secure: node_env === 'production', // cookie will only be sent on an encrypted connection
    httpOnly: true, // cookie cannot be modified by browser (prevent Cross Site Scripting Attack)
  };

  //   if (config.node_env === 'production') cookieOptions.secure = true;

  return {
    access: {
      token: {
        value: jwtToken,
        issuedAt: new Date(Date.now()),
        expires: new Date(
          Date.now() +
            parseInt(jwt_obj.accessExpirationMinutes!, 10) * 60 * 1000
        ),
      },
      cookieOptions,
    },
  };
};

export { generateAuthToken };
