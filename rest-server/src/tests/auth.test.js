import { signUpController, loginController } from '../components/auth/authController';

describe('Authentication', () => {

  test('signUpController and loginController should be functions', () => {
    expect.assertions(2);
    expect(typeof signUpController).toBe('function');
    expect(typeof loginController).toBe('function');
  });

});