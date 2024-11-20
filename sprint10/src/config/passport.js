import passport from 'passport';
// import localStrategy from '../middlewares/passport/localStrategy.js';
// import userRepository from '../repositories/userRepository.js';
import { accessTokenStrategy, refreshTokenStrategy } from '../middlewares/passport/jwtStrategy.js';
import googleStrategy from '../middlewares/passport/googleStrategy.js';

passport.use(googleStrategy);

passport.use('access-token', accessTokenStrategy);
passport.use('refresh-token', refreshTokenStrategy);

// passport.use(localStrategy);

// 직렬화: JS 객체 -> 파일 저장이나 네트웍 전송용으로 변환 바이트 배열로 줄을 서야한다.
// 세션 기반: 서버에 (파일로) 저장할 데이터가 뭐다? user.id
// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// 반직렬화(직렬화해제): 파일의 내용이나 네트웍으로 받은 데이터 -> JS 객체로 변환
// 세션 기반: 실제 (비즈니스) 로직에서 user.id에 대응하는 JS 객체를 뭐라고 생각해야 하나. user
// passport.deserializeUser(async (id, done) => {
//   try {
//     // id를 이용해 사용자 정보를 조회
//     const user = await userRepository.findById(id);
//     done(null, user);
//   } catch (error) {
//     done(error);
//   }
// });

export default passport;
