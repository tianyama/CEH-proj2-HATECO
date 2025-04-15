export interface SelectArrType {
  value: string | number | boolean | null;
  label: string;
  var1?: string | number;
}

export const isForeignList: SelectArrType[] = [
  { value: "D", label: "Nội" },
  { value: "F", label: "Ngoại" },
];

export const extraModeList: SelectArrType[] = [
  { value: 0, label: "Không" },
  { value: 1, label: "Phụ phí nâng hàng bậc thang" },
  { value: 2, label: "Phụ phí rút hàng bậc thang" },
  { value: 3, label: "Phụ phí lưu bãi bậc thang" },
];

export const roundingList: SelectArrType[] = [
  { value: "R0", label: "Không làm tròn" },
  { value: "R1", label: "Làm tròn nửa giờ" },
  { value: "R2", label: "Làm tròn 1 giờ" },
];

export const moneyCreditList: SelectArrType[] = [
  { value: "C", label: "Thu sau" },
  { value: "M", label: "Thu ngay" },
];

export const bookingStatusList: SelectArrType[] = [
  { value: 0, label: "Chưa cấp" },
  { value: 1, label: "Đang cấp" },
  { value: 2, label: "Đã cấp hết" },
  { value: 3, label: "Hết hạn" },
  { value: 4, label: "Đã hủy" },
];

export const bookingTypeList: SelectArrType[] = [
  { value: 0, label: "Cấp rỗng" },
  { value: 1, label: "Đóng hàng" },
];

export const sign: { [key: string]: { [key: string]: string|boolean } } = {
  minop: { false: ">", true: "≥", danger: true, color: "primary" },
  maxop: { false: "<", true: "≤", danger: true, color: "primary" },
  eqop: { false: "≠", true: "=", danger: false, color: "danger" },
  aA: { false: "aa", true: "Aa", danger: true, color: "primary" },
};

export const triBoolean = [null, false, true];

export const isRange = [
  { label: "Bằng", value: 0 },
  { label: "Từ", value: 1 },
  { label: "Đến", value: -1 },
  { label: "Khoảng", value: 2 },
];

export const stringFilterOpt: SelectArrType[] = [
  { value: 1, label: "Là" },
  { value: -1, label: "Không là" },
  { value: 2, label: "Chứa" },
  { value: -2, label: "Không chứa" },
  { value: 3, label: "Bắt đầu" },
  { value: -3, label: "Không bắt đầu" },
  { value: 4, label: "Kết thúc" },
  { value: -4, label: "Không kết thúc" },
];

export const selectFilterMode: { [key: string]: SelectArrType[] } = {
  select: [
    { value: true, label: "Chứa" },
    { value: false, label: "Không chứa" },
  ],
  number: [
    { value: true, label: "Bằng" },
    { value: false, label: "Khoảng" },
  ],
};
