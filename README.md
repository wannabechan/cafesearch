# café explorer

가까운 카페를 찾는 미니멀한 웹사이트입니다.

## 주요 기능

- 📍 주소 입력 또는 현재 위치로 500m 이내 카페 검색
- 📏 거리순 정렬
- 🚫 대형 프랜차이즈 제외 (스타벅스, 이디야, 컴포즈, 메가, MGC, 카페베네, 투썸, 매머드커피, 커피앳웍스, 백억커피, 할리스, 커피빈)
- 🗺️ 카페 이름 클릭 시 네이버맵으로 이동
- 🏷️ 실제 블로그 리뷰에서 추출한 메뉴 특징 키워드 표시
- 🏢 층 정보 표시
- ✅ 네이버맵에서 검색 가능한 카페만 표시

## 🚀 배포 가이드 (Vercel + GitHub)

### 1단계: GitHub 저장소 생성 및 코드 업로드

#### 방법 A: GitHub 웹사이트에서 직접 업로드 (권장 - 명령어 불필요)

1. **GitHub 저장소 생성**
   - [github.com](https://github.com) 접속 및 로그인
   - 우측 상단 **"+"** 아이콘 → **"New repository"** 클릭
   - Repository name: `cafesearch`
   - Description: `café explorer - 가까운 카페 검색 웹사이트` (선택사항)
   - Public 또는 Private 선택
   - ⚠️ **"Add a README file"** 옵션: **체크하지 않기** (이미 README.md가 있음)
   - ⚠️ **"Add .gitignore"** 옵션: **"No" 선택** 또는 **체크하지 않기** (이미 .gitignore 파일이 있음)
   - **"Create repository"** 클릭

2. **파일 업로드**
   - 저장소 페이지에서 **"uploading an existing file"** 링크 클릭
   - 또는 페이지 중앙의 **"upload files"** 버튼 클릭
   - 다음 파일들을 드래그 앤 드롭:
     - `index.html`
     - `api/` 폴더 전체 (kakao.js, naver.js 포함)
     - `vercel.json`
     - `package.json`
     - `.gitignore`
     - `README.md`
     - `DEPLOY.md`, `SECURITY.md`, `QUICK_START.md` (있다면)
   - ⚠️ **중요**: `.env` 파일은 절대 업로드하지 마세요!
   - 커밋 메시지: `Initial commit: café explorer`
   - **"Commit changes"** 클릭

3. **업로드 확인**
   - 저장소 페이지에서 파일들이 올바르게 업로드되었는지 확인
   - `.env` 파일이 없는지 확인

**⚠️ 중요 보안 체크리스트:**
- [ ] `.env` 파일이 저장소에 업로드되지 않았는지 확인
- [ ] `.gitignore` 파일이 업로드되었는지 확인
- [ ] 모든 소스 파일이 올바르게 업로드되었는지 확인

#### 방법 B: Git 명령어 사용 (고급 사용자용)

```bash
# Git 저장소 초기화
git init

# 모든 파일 추가 (단, .env 파일은 자동으로 제외됨)
git add .

# 첫 커밋
git commit -m "Initial commit: café explorer"

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/cafesearch.git
git branch -M main
git push -u origin main
```

자세한 내용은 `GITHUB_UPLOAD.md` 파일을 참고하세요.

### 2단계: Vercel 배포

1. **Vercel 가입**
   - [Vercel](https://vercel.com) 접속
   - "Sign Up" 클릭
   - GitHub 계정으로 로그인 (권장)

2. **프로젝트 Import**
   - Vercel 대시보드에서 "Add New..." → "Project" 클릭
   - "Import Git Repository" 선택
   - GitHub 저장소(`cafesearch`) 선택
   - "Import" 클릭

3. **프로젝트 설정**
   - Framework Preset: "Other" 선택
   - Root Directory: `./` (기본값)
   - Build Command: 비워두기 (필요 없음)
   - Output Directory: 비워두기 (필요 없음)
   - Install Command: 비워두기 (필요 없음)

4. **환경 변수 설정 (⚠️ 매우 중요!)**
   
   "Environment Variables" 섹션에서 다음 변수들을 추가:
   
   | Key | Value | 설명 |
   |-----|-------|------|
   | `KAKAO_API_KEY` | `your_kakao_api_key` | 카카오 개발자 센터에서 발급받은 REST API 키 |
   | `NAVER_CLIENT_ID` | `your_naver_client_id` | 네이버 개발자 센터에서 발급받은 Client ID |
   | `NAVER_CLIENT_SECRET` | `your_naver_client_secret` | 네이버 개발자 센터에서 발급받은 Client Secret |
   
   **각 환경 변수 추가 방법:**
   - Key 입력란에 변수명 입력
   - Value 입력란에 실제 API 키 값 입력
   - "Add" 버튼 클릭
   - Production, Preview, Development 모두에 적용되도록 체크 (또는 Production만 체크)

5. **배포 실행**
   - "Deploy" 버튼 클릭
   - 배포 완료까지 대기 (약 1-2분)
   - 배포 완료 후 자동 생성된 URL 확인 (예: `https://cafesearch-xxx.vercel.app`)

6. **네이버/카카오 개발자 센터에 배포 URL 등록**
   
   **네이버 개발자 센터:**
   - [네이버 개발자 센터](https://developers.naver.com/apps/#/list) 접속
   - 등록한 애플리케이션 선택
   - "서비스 환경" → "Web 플랫폼" 설정
   - 서비스 URL에 Vercel 배포 URL 추가:
     - `https://your-project.vercel.app`
     - `https://*.vercel.app` (와일드카드 사용 가능)
   
   **카카오 개발자 센터:**
   - [카카오 개발자 센터](https://developers.kakao.com/) 접속
   - 내 애플리케이션 선택
   - "앱 설정" → "플랫폼" → "Web 플랫폼 등록"
   - 사이트 도메인에 Vercel 배포 URL 추가:
     - `https://your-project.vercel.app`

### 3단계: 자동 배포 확인

- GitHub에 코드를 푸시하면 Vercel이 자동으로 재배포합니다
- 각 커밋마다 Preview 배포가 생성됩니다
- `main` 브랜치에 푸시하면 Production 배포가 업데이트됩니다

## 🔐 보안 가이드

### ✅ 올바른 보안 설정

1. **API 키는 환경 변수로만 관리**
   - ✅ Vercel 환경 변수에 설정
   - ✅ 로컬 개발 시 `.env` 또는 `.env.local` 파일 사용
   - ✅ `.env` 파일은 `.gitignore`에 포함되어 Git에 커밋되지 않음

2. **코드 검토**
   - ✅ API 키가 코드에 하드코딩되어 있지 않음
   - ✅ 모든 API 호출은 서버리스 함수를 통해 처리
   - ✅ 프론트엔드 코드에 API 키 노출 없음

### ❌ 절대 하지 말아야 할 것

1. **API 키를 코드에 직접 작성하지 마세요**
   ```javascript
   // ❌ 나쁜 예
   const API_KEY = "your_api_key_here";
   
   // ✅ 좋은 예
   const API_KEY = process.env.API_KEY;
   ```

2. **`.env` 파일을 Git에 커밋하지 마세요**
   ```bash
   # ❌ 절대 하지 마세요
   git add .env
   git commit -m "Add API keys"  # 위험!
   
   # ✅ 확인 방법
   git status  # .env가 나타나지 않아야 함
   ```

3. **공개 저장소에 API 키를 공유하지 마세요**
   - GitHub Issues, Pull Requests, 커밋 메시지에 API 키 포함 금지

### 배포 전 최종 보안 체크리스트

- [ ] `.env` 파일이 Git에 추적되지 않음 (`git status`로 확인)
- [ ] `.gitignore`에 `.env`와 `.env.local` 포함 확인
- [ ] 코드에 하드코딩된 API 키 없음
- [ ] Vercel 환경 변수에 모든 API 키 설정 완료
- [ ] 네이버/카카오 개발자 센터에 배포 URL 등록 완료

## 📝 API 키 발급 방법

### 카카오 API 키

1. [카카오 개발자 센터](https://developers.kakao.com/) 접속
2. "내 애플리케이션" → "애플리케이션 추가하기"
3. 앱 이름, 사업자명 입력 후 저장
4. "앱 키" 탭에서 **REST API 키** 복사
5. "플랫폼" → "Web 플랫폼 등록" → 도메인 추가
   - 로컬: `http://localhost:3000`
   - 배포: `https://your-project.vercel.app`

### 네이버 API 키

1. [네이버 개발자 센터](https://developers.naver.com) 접속
2. "Application" → "애플리케이션 등록"
3. 애플리케이션 이름 입력
4. 사용 API 선택:
   - ✅ 검색 API (필수)
5. "서비스 환경" → "Web" 설정
   - 서비스 URL: `http://localhost:3000` (개발용)
   - 배포 후: `https://your-project.vercel.app`
6. 저장 후 **Client ID**와 **Client Secret** 복사

## 🛠️ 로컬 개발 방법

### Vercel CLI 사용 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
cd /Users/wannabechan/Desktop/cafesearch
vercel dev
```

실행 후:
- 브라우저에서 `http://localhost:3000` 접속
- 환경 변수 설정 프롬프트가 나오면 API 키 입력
- 또는 `.env` 또는 `.env.local` 파일 생성:
  ```
  KAKAO_API_KEY=your_kakao_api_key_here
  NAVER_CLIENT_ID=your_naver_client_id_here
  NAVER_CLIENT_SECRET=your_naver_client_secret_here
  ```

## 📁 프로젝트 구조

```
cafesearch/
├── index.html          # 메인 페이지
├── api/
│   ├── kakao.js        # 카카오 API 서버리스 함수
│   └── naver.js        # 네이버 API 서버리스 함수
├── vercel.json         # Vercel 배포 설정
├── package.json        # 프로젝트 설정
├── .gitignore          # Git 제외 파일 (API 키 보호)
├── .env                # 환경 변수 (로컬 개발용, Git에 커밋하지 않음)
└── README.md           # 이 파일
```

## 🔧 문제 해결

### "Failed to fetch" 오류

**로컬 개발 시:**
1. Vercel CLI를 사용하여 서버리스 함수 실행: `vercel dev`
2. 환경 변수가 올바르게 설정되었는지 확인
3. `.env` 또는 `.env.local` 파일이 프로젝트 루트에 있는지 확인

**배포 후:**
1. Vercel 대시보드에서 환경 변수 설정 확인
2. 네이버/카카오 개발자 센터에서 배포 URL이 등록되었는지 확인
3. Vercel 배포 로그 확인 (Deployments → 해당 배포 → Logs)

### "KAKAO_API_KEY not configured" 오류

- Vercel 환경 변수에 `KAKAO_API_KEY`가 설정되었는지 확인
- 환경 변수 이름이 정확한지 확인 (대소문자 구분)
- 배포를 다시 실행해보기

### "NAVER API keys not configured" 오류

- Vercel 환경 변수에 `NAVER_CLIENT_ID`와 `NAVER_CLIENT_SECRET`이 설정되었는지 확인
- 환경 변수 이름이 정확한지 확인
- 배포를 다시 실행해보기

## 📄 라이선스

MIT License
