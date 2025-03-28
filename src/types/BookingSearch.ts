type BookingSearch = {
  BL_fromDate: Date;
  BL_toDate: Date;
  BL_bookingNo: string;
  BL_company: string;
  BL_vesselKey: string;
  BL_pol: string; 
  BL_pod: string;
  BL_fpod: string;
  BL_bookingStatus: number[];
}

export default BookingSearch