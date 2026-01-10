# 배포 체크리스트

이 파일은 배포 전에 확인해야 할 사항들을 정리한 것입니다.

## 🔒 보안 체크리스트

### 배포 전 필수 확인

- [ ] `.env` 파일이 Git에 추적되지 않음
  ```bash
  git status
  # .env 파일이 나타나지 않아야 함
  ```

- [ ] `.gitignore`에 환경 변수 파일 포함 확인
  ```
  .env
  .env.local
  .env.*.local
  ```

- [ ] 코드에 하드코딩된 API 키 없음
  ```bash
  # 다음 명령어로 확인
  grep -r "KAKAO_API_KEY\|NAVER_CLIENT" --include="*.html" --include="*.js" .
  # 결과가 없어야 함 (api/kakao.js, api/naver.js의 주석은 제외)
  ```

- [ ] API 키가 `process.env`를 통해서만 접근됨
  - ✅ `process.env.KAKAO_API_KEY`
  - ✅ `process.env.NAVER_CLIENT_ID`
  - ❌ 하드코딩된 문자열 없음

## 🚀 배포 단계

### 1. GitHub 저장소 생성 및 업로드

```bash
# Git 저장소 초기화 (아직 안 했다면)
git init

# 현재 상태 확인
git status

# .env 파일이 나타나지 않는지 확인
# 만약 나타난다면:
git reset HEAD .env  # 스테이징 해제
# .gitignore 확인 후 다시 git status

# 모든 파일 추가
git add .

# 커밋
git commit -m "Initial commit: café explorer"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/cafesearch.git
git branch -M main
git push -u origin main
```

### 2. Vercel 배포

1. [Vercel](https://vercel.com) 접속 및 로그인
2. "Add New..." → "Project"
3. GitHub 저장소 선택
4. 프로젝트 설정:
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: (비워두기)
   - Output Directory: (비워두기)
5. **환경 변수 추가** (중요!):
   - `KAKAO_API_KEY` = (카카오 REST API 키)
   - `NAVER_CLIENT_ID` = (네이버 Client ID)
   - `NAVER_CLIENT_SECRET` = (네이버 Client Secret)
6. "Deploy" 클릭

### 3. 개발자 센터에 URL 등록

**네이버 개발자 센터:**
- 애플리케이션 → 서비스 환경 → Web 플랫폼
- 서비스 URL에 추가: `https://your-project.vercel.app`

**카카오 개발자 센터:**
- 내 애플리케이션 → 앱 설정 → 플랫폼 → Web 플랫폼 등록
- 사이트 도메인에 추가: `https://your-project.vercel.app`

## ✅ 배포 후 확인

- [ ] 웹사이트가 정상적으로 로드됨
- [ ] 주소 검색이 작동함
- [ ] 카페 리스팅이 표시됨
- [ ] 네이버맵 이동이 작동함
- [ ] 브라우저 콘솔에 에러 없음

## 🔄 업데이트 배포

코드를 수정한 후:

```bash
git add .
git commit -m "Update: 설명"
git push origin main
```

Vercel이 자동으로 재배포합니다.
