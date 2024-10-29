// if (!element.className.includes("delete-button")) return;

// const { dateid, itemid } = element.dataset;

// const isSuccess = removeHistory(dateid, itemid);
// if (!isSuccess) {
//     alert("삭제에 실패했습니다.");
//     return;
// }

// reRender();

function reRender() {
    renderCurrentAsset();
    renderHistoryList();
}

export function renderHistoryList() {
    // TODO: 데이터 연동 필요
    // TODO: 변경된 시간 포맷 설정: HH:mm
    // TODO: 금액의 콤마 찍기

    $sectionHistory.innerHTML = store.dateList
        .map(({ date, id: dateId }) => {
            const detail = store.detailList[dateId];
            if (!detail?.length) return "";

            return `<article class="history-per-day">
            <p class="history-date">2021년 12월 1일</p>
            <section class="history-item">
            <section class="history-item-column">
                <div class="create-at">10:30</div>
                <div class="history-detail">
                    <div class="history-detail-row history-detail-title">
                        <p>아이스 아메리카노</p>
                    </div>
                    <div class="history-detail-row history-detail-subtitle">
                        <p>카페</p>
                    </div>
                    <p>
                        1000000
                        <span>원</span>
                    </p>
                </div>
                <div class="delete-section">
                    <button class="delete-button"></button>
                </div>
            </section>
            <section class="history-item-caption">
                <p><span>남은 자산</span><span>300000</span><span>원</span></p>
            </section>
        </section>
        </article>`;
        })
        .join("");
}
