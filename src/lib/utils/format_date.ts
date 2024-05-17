import { Timestamp } from "firebase/firestore";

const formatDate = (fbDate: Timestamp | Date) => {
    if (fbDate) {
        const date = fbDate instanceof Date ? fbDate : fbDate.toDate();
        const thisYear = new Date().getFullYear();

        const hours =
            date.getHours() > 12
                ? `오후 ${date.getHours() - 12}`
                : `오전 ${date.getHours()}`;
        const minutes =
            date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        const formattedDateAndTime = `${thisYear === date.getFullYear() ? "" : `${date.getFullYear()}년`
            }${date.getMonth() + 1}월 ${date.getDate()}일 ${hours}:${minutes}`;

        const formattedDate = `${thisYear === date.getFullYear() ? "" : `${date.getFullYear()}년`
            }${date.getMonth() + 1}월 ${date.getDate()}일`;

        return formattedDate;
    } else {
        return "날짜 없음";
    }
};

export default formatDate;