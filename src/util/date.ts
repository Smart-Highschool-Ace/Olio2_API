export const parse_yyyy_mm_dd = (dateString: any) => {
  // 입력 데이터가 스트링이지만, service/portfolio에서 사용 시 Date로 타입이 뜨기에 any로 작성함
  const y = Number(dateString.substring(0, 4));
  const m = Number(dateString.substring(5, 7));
  const d = Number(dateString.substring(8, 10));

  return new Date(y, m - 1, d);
};
