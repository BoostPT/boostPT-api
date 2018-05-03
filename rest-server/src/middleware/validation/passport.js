import passport from 'passport';
import local from 'passport-local';

// var cookieExtractor = function(req) {
//   var token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   return token;
// };

passport.use(new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const {loginQueryData} = await loginQueryData({email});
    if(!loginQueryData.length){
      return done(null, false, {message: 'Not a valid email.'});
    }
    const matchPasswords = await compPasswords(password, loginQueryData[0].password);
    if(!matchPasswords) {
      return done(null, false, { message: 'Not a valid password.'});
    }
    return done(null, loginQueryData);
  } catch (e) {
    return done(e);
  }
}));

export default passport;