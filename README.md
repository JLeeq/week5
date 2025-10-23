# ✅ Week5 Supabase Todo App

Supabase Authentication + Database를 활용한 Todo 웹앱입니다.  
회원가입 / 로그인 / 로그아웃 / 할 일 추가 / 삭제 / 체크 토글 기능을 지원합니다.

---

## 🛠️ 기술 스택

| 구분 | 사용 기술 |
|------|------------|
| Frontend | HTML, CSS, JavaScript (Vanilla) |
| Backend (Optional) | Supabase (Auth + DB), SQLite (로컬 테스트용) |
| Hosting | GitHub Pages (선택) |

---

## 🚀 주요 기능

- ✉️ **회원가입 / 로그인 / 로그아웃**
- 📝 **할 일 추가 및 삭제**
- ☑️ **체크박스 토글로 완료 상태 변경**
- 🕒 **Supabase RLS(행 수준 보안) 적용으로 사용자별 데이터 분리**
- 🎨 **노란색 배경 + 검정색 카드 UI 디자인**

---

## 📂 폴더 구조

week5 assignment/
│ index.html
│ README.md
│ screenshot_main.png
│ screenshot_todos.png
│
├─frontend/
│ hands_on_todo_api.js
│ index.html
│
└─backend/ (Git 업로드 제외)
server.js
└─database/
todos.db



---

## 🎨 실행 화면

| 메인 화면 | 할 일 추가 후 |
|------------|----------------|
| <img src="week5%20assignment/screenshot_main.png" width="400"/> | <img src="week5%20assignment/screenshot_todos.png" width="400"/> |


---

## ⚙️ 실행 방법

### 1️⃣ 로컬에서 HTML 실행
```bash
cd week5 assignment
npx serve

serve가 없다면 설치:

npm install -g serve


### 2️⃣ 브라우저에서 실행

http://localhost:3000
 또는
10.228.xxx.xxx:3000 형태의 로컬 서버 주소로 접속합니다.

🔒 보안 주의

index.html 안의 Supabase URL과 ANON KEY는 절대 GitHub에 공개하지 마세요.
로컬에서 실행 시에는 아래처럼 브라우저 콘솔에 직접 입력하세요:

localStorage.setItem("SUPABASE_URL", "https://nzyxxfpgjcufiwoqjwln.supabase.co");
localStorage.setItem("SUPABASE_ANON_KEY", "YOUR_KEY_HERE");


```


---

## 🧠 사용 방법

1. 이메일과 비밀번호로 회원가입
2. 로그인 후 할 일을 입력 → 추가 버튼 클릭
3. 체크박스로 완료 상태 변경
4. 더블 클릭으로 텍스트 수정
5. × 버튼으로 삭제
6. 로그아웃 시 목록 초기화

---

👨‍💻 Author: Jian Lee
📧 Email: example@email.com

🌐 GitHub: https://github.com/JLeeq

---