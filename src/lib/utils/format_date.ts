const formatDate = (fbDate: any) => {
    if (fbDate) {
        const milliseconds = fbDate.seconds * 1000 + fbDate.nanoseconds / 1000000;
        const date = new Date(milliseconds);
        const formattedDate = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;

        return formattedDate;
    } else {
        return "날짜 없음";
    }
};

export default formatDate;