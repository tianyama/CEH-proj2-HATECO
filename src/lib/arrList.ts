export interface SelectArrType {
  value: string | number, 
  label: string,
}

export const companyList: SelectArrType[] = [
  { value: 'HLC', label: 'Hapag-Lloyd' },
  { value: 'MMA', label: 'Mediterranean Shipping Company' },
  { value: 'CMA', label: 'CMA CGM' },
];

export const extraModeList: SelectArrType[] = [
  { value: 0, label: 'Không' },
  { value: 1, label: 'Phụ phí nâng hàng bậc thang' },
  { value: 2, label: 'Phụ phí rút hàng bậc thang' },
  { value: 3, label: 'Phụ phí lưu bãi bậc thang' },
];

export const roundingList: SelectArrType[] = [
  { value: 'R0', label: 'Không làm tròn'},
  { value: 'R1', label: 'Làm tròn nửa giờ'},
  { value: 'R2', label: 'Làm tròn 1 giờ'},
];

export const moneyCreditList: SelectArrType[] = [
  { value: 'C', label: 'Thu sau' },
  { value: 'M', label: 'Thu ngay' },
]