export type Json =
  | { [key: string]: Json | undefined }
  | Json[]
  | boolean
  | null
  | number
  | string;

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      events: {
        Insert: {
          created_at?: string;
          id?: number;
          project_id: number;
          user_agent: string;
        };
        Relationships: [
          {
            columns: ["project_id"];
            foreignKeyName: "events_project_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "projects";
          }
        ];
        Row: {
          created_at: string;
          id: number;
          project_id: number;
          user_agent: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          project_id?: number;
          user_agent?: string;
        };
      };
      organizations: {
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Relationships: [];
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
      };
      projects: {
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          organization_id: number;
        };
        Relationships: [
          {
            columns: ["organization_id"];
            foreignKeyName: "projects_organization_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "organizations";
          }
        ];
        Row: {
          created_at: string;
          id: number;
          name: string;
          organization_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          organization_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
