# 빠른 시작 가이드

## 🚀 5분 안에 배포하기

### 1단계: GitHub에 업로드 (2분)

```bash
# 프로젝트 디렉토리에서
git init
git add .
git commit -m "Initial commit: café explorer"
git branch -M main

# GitHub에서 새 저장소 생성 후
git remote add origin https://github.com/YOUR_USERNAME/cafesearch.git
git push -u origin main
```

### 2단계: Vercel 배포 (3분)

1. [vercel.com](https://vercel.com) 접속 → GitHub로 로그인
2. "Add New..." → "Project" → 저장소 선택
3. **환경 변수 추가** (중요!):
   ```
   KAKAO_API_KEY = (카카오 REST API 키)
   NAVER_CLIENT_ID = (네이버 Client ID)
   NAVER_CLIENT_SECRET = (네이버 Client Secret)
   ```
4. "Deploy" 클릭
5. 배포 완료! URL 확인

### 3단계: 개발자 센터에 URL 등록 (1분)

**네이버 개발자 센터:**
- 애플리케이션 → 서비스 환경 → Web
- 서비스 URL: `https://your-project.vercel.app`

**카카오 개발자 센터:**
- 내 애플리케이션 → 플랫폼 → Web 플랫폼 등록
- 사이트 도메인: `https://your-project.vercel.app`

## ✅ 완료!

이제 웹사이트가 인터넷에서 접속 가능합니다!

## 🔒 보안 확인

배포 전에 반드시 확인:
- [ ] `.env` 파일이 Git에 커밋되지 않았는지 확인
- [ ] Vercel 환경 변수에 모든 API 키 설정 완료
