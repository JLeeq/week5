/**
 * 🛠️ Week 4 메인 프로젝트: Todo REST API 서버 (25-40분)
 *
 * ⚠️ 중요: Week 4의 핵심 프로젝트입니다!
 * Week 3에서 만든 React Todo 앱을 이 서버와 연결하여 Full Stack 앱을 완성합니다.
 *
 * 🎯 목표: Week 3 React 앱 + Week 4 Express 서버 연결
 * - Week 3: localStorage (브라우저 로컬 저장) ❌
 * - Week 4: Express 서버 (중앙 저장, 모두 공유) ✅
 *
 * 💡 학습 방식:
 * 1. GET /api/todos (조회) - ✅ 이미 구현됨 (참고용)
 * 2. POST /api/todos (추가) - ✅ 이미 구현됨 (참고용)
 * 3. PUT /api/todos/:id (수정) - ❌ TODO: 여러분이 구현!
 * 4. DELETE /api/todos/:id (삭제) - ❌ TODO: 여러분이 구현!
 *
 * 🚀 사용 방법:
 * 1. node hands_on_todo_api.js 실행
 * 2. Week 3 React 앱 (index-interactive.html) 열기
 * 3. React 앱에서 fetch 코드 수정 (localStorage → API)
 * 4. React 앱에서 조회/추가 기능 테스트 (이미 작동함)
 * 5. PUT, DELETE API 구현
 * 6. React 앱에서 수정/삭제 기능 테스트
 *
 * 🔌 포트: 3002 (다른 서버와 충돌 방지)
 *
 * 💪 학습 팁:
 * - GET과 POST가 이미 구현되어 있으니 패턴을 참고하세요
 * - PUT과 DELETE는 비슷한 구조입니다
 * - Thunder Client로 먼저 테스트한 후 React 연결 권장
 * - React 앱 연동 가이드는 파일 하단 참고
 */

const express = require('express');  // Node.js에서 서버를 만드는 프레임워크
const cors = require('cors');

const app = express();
const PORT = 3002;


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./todos.db');

// 서버 시작 시 테이블 없으면 자동 생성
db.run(`CREATE TABLE IF NOT EXISTS todos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  text TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT 0
)`);

// 미들웨어
app.use(cors()); // React 앱에서 접근 허용
app.use(express.json()); // JSON 파싱 (// 들어오는 요청(request)의 내용을 JSON 형식으로 해석하도록 설정)

// 데이터 저장소 (메모리 배열 - in-memory database)
// Week 5에서는 MongoDB로 교체 예정
let todos = [
  { id: 1, text: 'Express 서버 만들기', completed: false }, // id는 고유번호, text는 할일 내용, completed는 완료여부
  { id: 2, text: 'React와 연결하기', completed: false },
  { id: 3, text: 'Full Stack 개발자 되기', completed: false }
];

let nextId = 4; // 다음에 생성할 Todo의 ID

// ============================================
// ✅ 1. 전체 조회 API (이미 구현됨 - 참고용)
// ============================================
// React 앱에서 useEffect로 첫 로딩 시 호출


// GET
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err.message });
    res.json({ success: true, data: rows });
  });
});



// ============================================
// ✅ 2. 새 항목 추가 API (이미 구현됨 - 참고용)
// ============================================
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '')
    return res.status(400).json({ success: false, error: 'text 필드는 필수입니다' });

  db.run(
    'INSERT INTO todos (text, completed) VALUES (?, ?)',
    [text.trim(), false],
    function (err) {
      if (err) return res.status(500).json({ success: false, error: err.message });
      res.status(201).json({
        success: true,
        message: 'Todo가 생성되었습니다',
        data: { id: this.lastID, text: text.trim(), completed: false },
      });
    }
  );
});
// ============================================
//  TODO 3: 항목 수정 API 구현하기
// ============================================

app.put('/api/todos/:id', (req, res) => {
  const { completed, text } = req.body;
  const id = req.params.id;

  // 1. 수정할 Todo를 DB에서 찾는다
  db.get('SELECT * FROM todos WHERE id = ?', [id], (err, row) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    if (!row)
      return res
        .status(404)
        .json({ success: false, error: 'Todo를 찾을 수 없습니다' });

    // 2. 요청값이 없을 경우 기존값 유지
    const newText = text ? text.trim() : row.text;
    const newCompleted =
      typeof completed === 'boolean' ? completed : row.completed;

    // 3. DB 업데이트
    db.run(
      'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
      [newText, newCompleted, id],
      function (err2) {
        if (err2)
          return res.status(500).json({ success: false, error: err2.message });

        // 4. 수정된 결과 다시 조회해 응답
        db.get('SELECT * FROM todos WHERE id = ?', [id], (err3, updated) => {
          if (err3)
            return res
              .status(500)
              .json({ success: false, error: err3.message });
          res.json({ success: true, data: updated });
        });
      }
    );
  });
});

  

// 🎯 여기에 코드를 작성하세요:
//
// 힌트 1: app.put('/api/todos/:id', (req, res) => { ... })
// 힌트 2: const id = parseInt(req.params.id);
// 힌트 3: const todo = todos.find(t => t.id === id);
// 힌트 4: if (!todo) return res.status(404).json({ error: ... })
// 힌트 5: req.body.completed 또는 req.body.text 업데이트
// 힌트 6: res.json({ success: true, data: todo })
//
// 💡 GET과 POST 코드를 참고하여 비슷하게 작성하세요!




// ============================================
//  TODO 4: 항목 삭제 API 구현하기
// ============================================
// DELETE /api/todos/:id
// 응답: 204 No Content (성공 시 본문 없음)

// 🎯 여기에 코드를 작성하세요:
//
// 힌트 1: app.delete('/api/todos/:id', (req, res) => { ... })
// 힌트 2: const index = todos.findIndex(t => t.id === id);
// 힌트 3: if (index === -1) return res.status(404).json({ error: ... })
// 힌트 4: todos.splice(index, 1);
// 힌트 5: res.status(204).send(); (본문 없이 성공 응답)
//
// 💡 배열에서 항목 제거는 splice() 메서드를 사용합니다!

// ✅ 4. 항목 삭제 (DELETE)
app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;

  db.run('DELETE FROM todos WHERE id = ?', [id], function (err) {
    if (err)
      return res.status(500).json({ success: false, error: err.message });

    if (this.changes === 0)
      return res
        .status(404)
        .json({ success: false, error: 'Todo를 찾을 수 없습니다' });

    // 204: 성공했지만 본문 없음
    res.status(204).send();
  });
});

// ============================================
// 서버 시작
// ============================================

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 Week 4 Todo API 서버 실행!');
  console.log('='.repeat(60));
  console.log(`\n📍 서버 주소: http://localhost:${PORT}`);
  console.log('📋 초기 Todos:', todos.length, '개');
  console.log('\n✅ 구현 완료: GET, POST');
  console.log('❌ 구현 필요: PUT, DELETE\n');
  console.log('🧪 테스트 방법:');
  console.log('   1. Thunder Client로 API 테스트');
  console.log('   2. Week 3 React 앱 열기');
  console.log('   3. React 코드 수정 (파일 하단 가이드 참고)\n');
  console.log('종료: Ctrl + C\n');
  console.log('='.repeat(60));
});

/**
 * 🔗 Week 3 React 앱 연동 가이드
 *
 * Week 3 index-interactive.html 파일을 열어서 다음과 같이 수정하세요:
 *
 * ============================================
 * 1. API URL 상수 추가 (파일 상단)
 * ============================================
 * const API_URL = 'http://localhost:3002/api/todos';
 *
 * ============================================
 * 2. useEffect 수정 (localStorage → fetch)
 * ============================================
 * // ❌ 기존 코드 (localStorage)
 * React.useEffect(() => {
 *   const saved = localStorage.getItem('todos');
 *   if (saved) setTodos(JSON.parse(saved));
 * }, []);
 *
 * // ✅ 새 코드 (서버에서 가져오기)
 * React.useEffect(() => {
 *   fetch(API_URL)
 *     .then(res => res.json())
 *     .then(data => {
 *       if (data.success) {
 *         setTodos(data.data);
 *       }
 *     })
 *     .catch(err => console.error('조회 실패:', err));
 * }, []);
 *
 * ============================================
 * 3. addTodo 함수 수정 (localStorage → fetch POST)
 * ============================================
 * // ❌ 기존 코드
 * function addTodo(text) {
 *   const newTodo = { id: Date.now(), text, completed: false };
 *   const newTodos = [newTodo, ...todos];
 *   setTodos(newTodos);
 *   localStorage.setItem('todos', JSON.stringify(newTodos));
 * }
 *
 * // ✅ 새 코드
 * async function addTodo(text) {
 *   try {
 *     const response = await fetch(API_URL, {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ text })
 *     });
 *     const data = await response.json();
 *     if (data.success) {
 *       setTodos([data.data, ...todos]);
 *     }
 *   } catch (err) {
 *     console.error('추가 실패:', err);
 *   }
 * }
 *
 * ============================================
 * 4. toggleTodo 함수 수정 (PUT API 호출)
 * ============================================
 * // ✅ PUT API를 먼저 구현한 후 작성하세요!
 * async function toggleTodo(id) {
 *   const todo = todos.find(t => t.id === id);
 *   try {
 *     const response = await fetch(`${API_URL}/${id}`, {
 *       method: 'PUT',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify({ completed: !todo.completed })
 *     });
 *     const data = await response.json();
 *     if (data.success) {
 *       setTodos(todos.map(t => t.id === id ? data.data : t));
 *     }
 *   } catch (err) {
 *     console.error('수정 실패:', err);
 *   }
 * }
 *
 * ============================================
 * 5. deleteTodo 함수 수정 (DELETE API 호출)
 * ============================================
 * // ✅ DELETE API를 먼저 구현한 후 작성하세요!
 * async function deleteTodo(id) {
 *   try {
 *     const response = await fetch(`${API_URL}/${id}`, {
 *       method: 'DELETE'
 *     });
 *     if (response.status === 204) {
 *       setTodos(todos.filter(t => t.id !== id));
 *     }
 *   } catch (err) {
 *     console.error('삭제 실패:', err);
 *   }
 * }
 *
 * ============================================
 * 6. localStorage.setItem 호출 모두 제거
 * ============================================
 * useEffect에서 localStorage.setItem 관련 코드를 모두 삭제하세요.
 * 이제 데이터는 서버에 저장됩니다!
 *
 * ============================================
 * 🎉 완성 후 체험
 * ============================================
 * 1. Chrome과 Firefox를 동시에 열기
 * 2. 양쪽에서 http://localhost:5500/week03-react-intensive/index-interactive.html 접속
 * 3. 한쪽에서 Todo 추가
 * 4. 다른 쪽 새로고침 → 데이터가 공유됨! 🎉
 *
 * 축하합니다! 여러분은 이제 Full Stack 개발자입니다!
 */

/**
 * 🎯 학습 포인트
 *
 * 1. REST API 패턴
 *    - GET    /api/todos     → 전체 조회
 *    - POST   /api/todos     → 생성
 *    - PUT    /api/todos/:id → 수정
 *    - DELETE /api/todos/:id → 삭제
 *
 * 2. HTTP 상태 코드
 *    - 200: 성공 (OK)
 *    - 201: 생성 성공 (Created)
 *    - 204: 성공, 본문 없음 (No Content)
 *    - 400: 잘못된 요청 (Bad Request)
 *    - 404: 찾을 수 없음 (Not Found)
 *
 * 3. Express 핵심 개념
 *    - req.params.id: URL 파라미터
 *    - req.body: POST/PUT 요청의 데이터
 *    - res.json(): JSON 응답
 *    - res.status(): HTTP 상태 코드 설정
 *
 * 4. Week 3 vs Week 4
 *    Week 3: localStorage (브라우저 로컬)
 *    Week 4: Express 서버 (중앙 저장)
 *    → 다른 사용자와 데이터 공유 가능!
 *    → 브라우저를 바꿔도 데이터 유지!
 *
 * 5. Next Steps (Week 5)
 *    - 메모리 배열 → MongoDB
 *    - 서버 재시작해도 데이터 유지
 *    - 사용자 인증 추가
 */
