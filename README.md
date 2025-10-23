# 📝 Supabase Todo App (Week 5 Assignment)

> Supabase Authentication & Database 연동을 통해 구현한 간단한 Todo 웹 애플리케이션  
> 회원가입, 로그인, 할 일 추가/삭제/수정, 완료 체크가 모두 가능한 완성형 과제입니다.

---

## 🚀 프로젝트 개요

이 프로젝트는 **Supabase**를 이용해 인증(Auth)과 데이터베이스 기능을 연결한 **Todo List 웹 앱**입니다.  
HTML과 JavaScript만으로 구현되었으며, Supabase의 **Row Level Security (RLS)** 정책을 적용하여  
각 사용자가 **자신의 데이터만 접근할 수 있도록** 보호되어 있습니다.

---

## 📦 기술 스택

| 구분 | 사용 기술 |
|------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript (Vanilla) |
| **Backend (DB)** | [Supabase](https://supabase.com/) (PostgreSQL 기반) |
| **Auth** | Supabase Authentication |
| **Deployment / Local Run** | 로컬 브라우저 (예: `http://localhost:3000`) |

---

## 🛠️ 주요 기능

| 기능 | 설명 |
|------|------|
| ✉️ **회원가입 / 로그인 / 로그아웃** | Supabase Auth API를 사용한 인증 기능 |
| ➕ **할 일 추가** | 로그인 후 입력한 텍스트를 Supabase DB에 추가 |
| ✅ **할 일 완료 표시 (체크박스)** | 체크 상태를 변경하면 DB의 `completed` 값이 업데이트 |
| ✏️ **할 일 수정 (더블 클릭)** | 할 일 텍스트를 수정할 수 있으며 DB에 즉시 반영 |
| ❌ **할 일 삭제** | 항목 오른쪽의 `×` 버튼으로 삭제 가능 |
| 🧱 **Row Level Security 적용** | 로그인한 사용자만 자신의 데이터 접근 가능 |
| 🎨 **디자인 커스터마이징** | 배경 노란색, Todo 영역 검정색, 텍스트 흰색 |

---

## 🧩 테이블 구조 (Supabase SQL)

```sql
drop table if exists todos;

create table public.todos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id),
  text text not null,
  completed boolean default false,
  created_at timestamptz default now()
);

alter table public.todos enable row level security;

create policy "Select own todos"
on public.todos for select
using (auth.uid() = user_id);

create policy "Insert todos for logged in user"
on public.todos for insert
with check (auth.uid() = user_id);

create policy "Update own todos"
on public.todos for update
using (auth.uid() = user_id);

create policy "Delete own todos"
on public.todos for delete
using (auth.uid() = user_id);

## 🧩 폴더 구조 

week5 assignment
    │  index.html
    │  README.md
    │  screenshot_main.png
    │  screenshot_todos.png
    │
    └─frontend
            hands_on_todo_api.js
            index.html


## 🎨 실행 화면

| 메인 화면 | 할 일 추가 후 |
|------------|----------------|
| ![Main UI](./screenshot_main.png) | ![Todo Added](./screenshot_todos.png) |


## 💻 실행 방법
1️⃣ Supabase 프로젝트 설정

https://supabase.com/
 에서 새 프로젝트 생성

Database → todos 테이블을 SQL Editor에 위 코드로 생성

Project Settings > API에서 Project URL과 anon public key 복사

index.html의 SUPABASE_URL, SUPABASE_ANON_KEY 값 교체

2️⃣ 로컬 실행

1. 프로젝트 폴더로 이동

2. VSCode에서 Live Server로 실행하거나 아래 명령어 실행:

npx serve .


3. 브라우저에서 아래 주소 열기:

http://localhost:3000



## 🧠 사용 방법

1. 이메일과 비밀번호로 회원가입
2. 로그인 후 할 일을 입력 → 추가 버튼 클릭
3. 체크박스로 완료 상태 변경
4. 더블 클릭으로 텍스트 수정
5. × 버튼으로 삭제
6. 로그아웃 시 목록 초기화

![alt text](image.png)


👨‍💻 Author: Jian Lee
📧 Email: example@email.com

🌐 GitHub: https://github.com/JLeeq