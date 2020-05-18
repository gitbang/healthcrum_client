export interface PerscriptionData {
  medecines: [
    {
      medecine_name: string;
      morning_dose: string;
      noon_dose: string;
      night_dose: string;
      other_dose: string;
      remark: string;
      lunch: string;
      with: string;
      days: string;
    }
  ];
  recommendations: string[];
}
export interface TestData {
  testProfile: string;
  tests: [
    {
      test_name: string;
      test_value: string;
    }
  ];
  recommendations: string[];
}
export interface Report {
  documentType: string;
  doctorName: String;
  testType: string;
  tests: string[];
  testDate: string;
  download_link: string;
  report_id: string;
}
