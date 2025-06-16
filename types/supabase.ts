export type Database = {
    public: {
      Tables: {
        gallery: {
          Row: {
            id: string
            title: string
            type: "image" | "video"
            media_url: string
            thumbnail_url: string | null
            created_at: string
            updated_at: string
          }
          Insert: {
            title: string
            type: "image" | "video"
            media_url: string
            thumbnail_url?: string | null
            created_at?: string
            updated_at?: string
          }
          Update: {
            title?: string
            type?: "image" | "video"
            media_url?: string
            thumbnail_url?: string | null
            created_at?: string
            updated_at?: string
          }
        }
        news: {
          Row: {
            id: string
            title: string
            slug: string
            content: string
            excerpt: string | null
            category: string
            image_url: string
            published: boolean
            created_at: string
            updated_at: string
            published_at: string | null
          }
          Insert: {
            title: string
            slug: string
            content: string
            excerpt?: string | null
            category: string
            image_url: string
            published?: boolean
            created_at?: string
            updated_at?: string
            published_at?: string | null
          }
          Update: {
            title?: string
            slug?: string
            content?: string
            excerpt?: string | null
            category?: string
            image_url?: string
            published?: boolean
            created_at?: string
            updated_at?: string
            published_at?: string | null
          }
        }
      }
      Views: {
        [_ in never]: never
      }
      Functions: {
        get_table_info: {
          Args: {
            table_name: string
          }
          Returns: any
        }
      }
      Enums: {
        media_type: "image" | "video"
      }
    }
  }
