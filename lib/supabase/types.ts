export interface RangeRow {
  id: string
  slug: string
  name_fr: string
  name_en: string
  summary_fr: string
  summary_en: string
  body_fr: string
  body_en: string
  image_url: string | null
  order_index: number
  active: boolean
}

export interface ProductRow {
  id: string
  range_id: string
  name: string
  brand: string | null
  description_fr: string
  description_en: string
  image_url: string | null
  datasheet_url: string | null
  slug: string | null
  highlights_fr: string
  highlights_en: string
  specs_fr: string
  specs_en: string
  order_index: number
  active: boolean
}

export interface BrandRow {
  id: string
  name: string
  note_fr: string | null
  note_en: string | null
  logo_url: string | null
  order_index: number
  active: boolean
}

export interface PostRow {
  id: string
  slug: string
  title_fr: string
  title_en: string
  excerpt_fr: string
  excerpt_en: string
  body_fr: string
  body_en: string
  image_url: string | null
  published_at: string
  active: boolean
}
