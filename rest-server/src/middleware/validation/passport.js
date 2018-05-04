import passport from 'passport';
import local from 'passport-local';
import { loginQuery } from '../../components/auth/authQueries';
import { comparePasswords } from '../auth/bcrypt';

const LocalStrategy = local.Strategy;

const localOptions = {
  usernameField: 'email',
};

passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
  console.log("made it into passport middleware");
  try {
    const { rows } = await loginQuery({email});
    if(!rows.length){
      return done(null, false, {message: 'Not a valid email.'});
    }
    const matchPasswords = await comparePasswords(password, rows[0].password);
    if(!matchPasswords) {
      return done(null, false, { message: 'Not a valid password.'});
    }
    return done(null, rows);
  } catch (e) {
    return done(e);
  }
}));

export default passport;