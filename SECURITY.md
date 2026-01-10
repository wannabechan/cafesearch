# 보안 정책

이 프로젝트는 API 키를 안전하게 관리하기 위해 다음 보안 정책을 따릅니다.

## 🔐 API 키 관리

### ✅ 안전한 방법

1. **환경 변수 사용**
   - 모든 API 키는 환경 변수로만 관리됩니다
   - 로컬 개발: `.env` 또는 `.env.local` 파일
   - 배포 환경: Vercel 환경 변수

2. **서버리스 함수 사용**
   - 모든 API 호출은 서버 사이드에서 처리됩니다
   - 프론트엔드 코드에 API 키가 노출되지 않습니다
   - `api/kakao.js`와 `api/naver.js`에서만 API 키에 접근합니다

3. **Git 제외**
   - `.env` 파일은 `.gitignore`에 포함되어 있습니다
   - 환경 변수 파일은 절대 Git에 커밋되지 않습니다

### ❌ 절대 하지 말아야 할 것

1. **코드에 API 키 하드코딩 금지**
   ```javascript
   // ❌ 절대 하지 마세요
   const API_KEY = "65829ef50d4bb6abcd508c3738b2091b";
   ```

2. **Git에 환경 변수 파일 커밋 금지**
   ```bash
   # ❌ 절대 하지 마세요
   git add .env
   git commit -m "Add API keys"
   ```

3. **공개 채널에 API 키 공유 금지**
   - GitHub Issues
   - Pull Requests
   - 커밋 메시지
   - 공개 문서

## 🛡️ 보안 체크리스트

배포 전에 반드시 확인하세요:

- [ ] `.env` 파일이 Git에 추적되지 않음
- [ ] 코드에 하드코딩된 API 키 없음
- [ ] Vercel 환경 변수에 모든 API 키 설정 완료
- [ ] 네이버/카카오 개발자 센터에 배포 URL 등록 완료

## 🔄 API 키 유출 시 대응

만약 API 키가 유출되었다면:

1. **즉시 키 재발급**
   - 카카오 개발자 센터에서 REST API 키 재발급
   - 네이버 개발자 센터에서 Client ID/Secret 재발급

2. **환경 변수 업데이트**
   - Vercel 환경 변수에 새 키로 업데이트
   - 로컬 `.env` 파일도 업데이트

3. **Git 히스토리 확인**
   - 유출된 키가 커밋에 포함되어 있다면 히스토리 정리 고려
   - GitHub 저장소가 공개라면 즉시 비공개로 전환

## 📝 환경 변수 목록

다음 환경 변수들이 필요합니다:

| 변수명 | 설명 | 발급처 |
|--------|------|--------|
| `KAKAO_API_KEY` | 카카오 REST API 키 | [카카오 개발자 센터](https://developers.kakao.com/) |
| `NAVER_CLIENT_ID` | 네이버 Client ID | [네이버 개발자 센터](https://developers.naver.com/) |
| `NAVER_CLIENT_SECRET` | 네이버 Client Secret | [네이버 개발자 센터](https://developers.naver.com/) |

## 🔍 보안 검증 방법

### 로컬에서 확인

```bash
# .env 파일이 Git에 추적되지 않는지 확인
git status | grep .env
# 결과가 없어야 함

# 코드에 하드코딩된 키가 없는지 확인
grep -r "65829ef50d4bb6abcd508c3738b2091b" --exclude-dir=node_modules .
# 결과가 없어야 함
```

### 배포 후 확인

1. 브라우저 개발자 도구 → Network 탭
2. API 호출 확인
3. 요청 헤더에 API 키가 노출되지 않는지 확인
4. 서버리스 함수를 통해서만 API 호출되는지 확인
