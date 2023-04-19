import AuthService from '@src/services/auth';
import { AuthMiddleware } from '../auth';

describe('AuthMiddleware', () => {
  it('should verify a JWT token and call the next middleware', () => {
    const jwtToken = AuthService.generateToken({ data: 'fake' });
    const reqFake = {
      headers: {
        'x-access-token': jwtToken,
      },
    };
    const resFake = {};
    const nextFake = jest.fn();

    AuthMiddleware(reqFake, resFake, nextFake);
    expect(nextFake).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there is a problem in the token verification', () => {
    const reqFake = {
      headers: {
        'x-access-token': 'invalid-token',
      },
    };
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const resFake = { status: statusMock };
    const nextFake = jest.fn();

    AuthMiddleware(reqFake, resFake, nextFake);

    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalled();
  });

  it('should return UNAUTHORIZED if there no token', () => {
    const reqFake = {
      headers: {},
    };
    const sendMock = jest.fn();
    const statusMock = jest.fn().mockReturnValue({ send: sendMock });
    const resFake = { status: statusMock };
    const nextFake = jest.fn();

    AuthMiddleware(reqFake, resFake, nextFake);

    expect(resFake.status).toHaveBeenCalledWith(401);
    expect(sendMock).toHaveBeenCalledWith({
        code: 401,
        error: 'jwt must be provided',
    });
  });
});
