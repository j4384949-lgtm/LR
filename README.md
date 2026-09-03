# 도서관 초대장 — 랜덤 책 버전

## 파일 구조

```text
library_invitation_random/
├─ index.html
├─ style.css
├─ script.js
├─ books.js
└─ README.md
```

## 1. Discord 초대 링크 설정

`script.js` 위쪽의 값을 실제 Discord 초대 링크로 변경합니다.

```js
const DISCORD_INVITE_URL = "https://discord.gg/YOUR_INVITE_CODE";
```

## 2. 책 추가

`books.js`에 경우의 수를 추가하면 됩니다.

```js
{ category: "시선 사무소", title: "새로운 책" }
```

페이지를 새로고침할 때마다 `books.js`에 들어 있는 전체 목록에서 **중복 없이 3개가 무작위 선택**됩니다.

## 3. 초대 조건

아래 두 조건을 모두 만족해야 `초대장 보내기` 버튼이 활성화됩니다.

- 오늘의 책 1개 선택
- 수신인 칸에 서명 입력

## 4. IntelliJ 실행

IntelliJ에서 폴더를 열고 `index.html`을 브라우저로 실행하면 됩니다.

GitHub Pages에 배포할 때도 다섯 파일을 같은 폴더에 올리면 됩니다.
