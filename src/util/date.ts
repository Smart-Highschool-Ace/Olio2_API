import * as dayjs from "dayjs";

export const parse_yyyy_mm_dd = (dateString: any): Date => {
  // 입력 데이터가 스트링이지만, service/portfolio에서 사용 시 Date로 타입이 뜨기에 any로 작성함
  return dayjs(dateString).toDate();
};
