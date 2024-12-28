const enum ErrorMessage {
  USER_NOT_FOUND = '해당 유저를 찾을 수 없습니다.',
  USER_EXIST = '이미 존재하는 이메일입니다.',
  USER_UNAUTHORIZED_ID = '존재하지 않는 email 입니다.',
  USER_UNAUTHORIZED_PW = '비밀번호가 일치하지 않습니다.',
  USER_UNAUTHORIZED_TOKEN = '로그인이 필요합니다',

  TOKEN_UNAUTHORIZED_NOTFOUND = '로그인이 필요합니다',
  TOKEN_UNAUTHORIZED_VALIDATION = '유효하지 않은 토큰입니다',

  PRODUCT_NOT_FOUND = '해당 상품을 찾을 수 없습니다.',
  PRODUCT_FORBIDDEN = '해당 게시글을 삭제할 권리가 없습니다.',

  INTERNAL_SERVER_ERROR = '내부 서버 오류',
}
export default ErrorMessage;
