export interface typesCategory {
  type: string;
  title: string;
}

export interface typesCategoryJson {
  [id: string]: typesCategory;
}

export interface responseTypesCategory {
  data: typesCategoryJson;
}

export interface category extends typesCategory {
  id: string;
}

export interface typeOfReport {
  category: string;
  amount: number;
  createdAt: string;
  type: string;
}

export interface typeOfReportJson {
  [id: string]: typeOfReport;
}

export interface responseTypeOfReport {
  data: typesCategoryJson;
}

export interface report extends typeOfReport {
  id: string;
}