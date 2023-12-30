export interface typesCategory {
  type: string;
  title: string
}

export interface typesCategoryJson {
  [id: string]: typesCategory
}

export interface responseTypesCategory {
  data: typesCategoryJson
}

export interface category extends typesCategory{
  id: string
}