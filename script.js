// =====================================================
// 설정
// =====================================================

// 디스코드 초대 링크
const DISCORD_INVITE_URL =
    "https://discord.gg/wdGXYjYZX";


// 유튜브 영상 ID
const YOUTUBE_VIDEO_ID =
    "yyDMMFxImrA";


// =====================================================
// 전역 변수
// =====================================================

let player = null;

let selectedBook = null;

let displayedBooks = [];


// =====================================================
// DOM
// =====================================================

const entranceScreen =
    document.getElementById("entranceScreen");

const invitation =
    document.getElementById("invitation");

const openInvitationButton =
    document.getElementById("openInvitationButton");

const bookContainer =
    document.getElementById("bookContainer");

const recipientInput =
    document.getElementById("recipientInput");

const inviteButton =
    document.getElementById("inviteButton");

const selectionText =
    document.getElementById("selectionText");


// =====================================================
// 랜덤 책 3권
// =====================================================

function getRandomBooks() {

    const shuffled =
        [...BOOK_DATABASE].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(0, 3);
}


// =====================================================
// 책 표시
// =====================================================

function renderBooks() {

    displayedBooks = getRandomBooks();

    bookContainer.innerHTML = "";

    displayedBooks.forEach((book, index) => {

        const card =
            document.createElement("button");

        card.className = "book-card";

        card.type = "button";

        card.innerHTML = `

            <div class="book-number">
                0${index + 1}
            </div>

            <div class="book-category">
                ${book.category}
            </div>

            <h3>
                ${book.title}
            </h3>

            <p>
                ${book.description}
            </p>

            <div class="book-select">
                SELECT
            </div>

        `;


        card.addEventListener(
            "click",
            () => {

                selectBook(
                    book,
                    card
                );

            }
        );


        bookContainer.appendChild(card);

    });

}


// =====================================================
// 책 선택
// =====================================================

function selectBook(book, card) {

    selectedBook = book;


    // 기존 선택 제거

    const cards =
        document.querySelectorAll(
            ".book-card"
        );

    cards.forEach(
        currentCard => {

            currentCard.classList.remove(
                "selected"
            );

        }
    );


    // 현재 카드 선택

    card.classList.add(
        "selected"
    );


    selectionText.textContent =
        `"${book.title}"을(를) 선택하셨습니다.`;


    updateInviteButton();

}


// =====================================================
// 서명 확인
// =====================================================

recipientInput.addEventListener(
    "input",
    () => {

        updateInviteButton();

    }
);


// =====================================================
// 초대장 버튼 활성화 조건
// =====================================================

function updateInviteButton() {

    const hasBook =
        selectedBook !== null;

    const hasSignature =
        recipientInput.value.trim().length > 0;


    inviteButton.disabled =
        !(hasBook && hasSignature);


}


// =====================================================
// 초대장 열기
// =====================================================

openInvitationButton.addEventListener(
    "click",
    () => {

        // 입장 화면 숨기기

        entranceScreen.classList.add(
            "fade-out"
        );


        setTimeout(
            () => {

                entranceScreen.style.display =
                    "none";

                invitation.classList.remove(
                    "hidden"
                );

                invitation.classList.add(
                    "show"
                );

            },
            700
        );


        // 음악 시작

        if (player) {

            player.playVideo();

        }

    }
);


// =====================================================
// 디스코드 초대
// =====================================================

inviteButton.addEventListener(
    "click",
    () => {

        if (!selectedBook) {
            return;
        }


        const recipient =
            recipientInput.value.trim();


        if (!recipient) {
            return;
        }


        // 선택한 책과 수신인 정보 저장

        localStorage.setItem(
            "selectedBook",
            JSON.stringify(selectedBook)
        );


        localStorage.setItem(
            "recipient",
            recipient
        );


        // 디스코드 이동

        window.open(
            DISCORD_INVITE_URL,
            "_blank"
        );

    }
);


// =====================================================
// YouTube API
// =====================================================

function onYouTubeIframeAPIReady() {

    player = new YT.Player(
        "youtube-player",
        {

            height: "0",

            width: "0",

            videoId:
                YOUTUBE_VIDEO_ID,


            playerVars: {

                // 자동재생은 입장 버튼을 누르기 전에는 하지 않음
                autoplay: 0,

                controls: 0,

                // 반복
                loop: 1,

                // loop를 위해 동일한 영상을 playlist에도 지정
                playlist:
                    YOUTUBE_VIDEO_ID,

                // 모바일 대응
                playsinline: 1

            },


            events: {

                onReady: function () {

                    // 음악 볼륨: 0 ~ 100
                    player.setVolume(27);

                    console.log(
                        "YouTube 음악 준비 완료"
                    );

                },

                onStateChange: function (event) {

                        // 영상이 끝났을 때
                        // 혹시 브라우저/플레이어에 의해
                        // loop가 제대로 작동하지 않을 경우 다시 재생

                        if (
                            event.data ===
                            YT.PlayerState.ENDED
                        ) {

                            player.playVideo();

                        }

                    }

            }

        }
    );

}


// =====================================================
// 시작
// =====================================================

renderBooks();
updateInviteButton();