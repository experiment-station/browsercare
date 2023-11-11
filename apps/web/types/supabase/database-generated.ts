export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      beta_signups: {
        Row: {
          created_at: string
          email: string
          id: number
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          id: number
          project_id: number
          user_agent: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: number
          user_agent: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: number
          user_agent?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      members: {
        Row: {
          created_at: string | null
          team_id: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          team_id: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          team_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          created_at: string
          id: number
          is_active: boolean
          name: string
          team_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          is_active?: boolean
          name: string
          team_id: number
        }
        Update: {
          created_at?: string
          id?: number
          is_active?: boolean
          name?: string
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
