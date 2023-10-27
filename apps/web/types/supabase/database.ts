export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          created_at: string;
          id: number;
          project_id: number;
          user_agent: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          project_id: number;
          user_agent: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          project_id?: number;
          user_agent?: string;
        };
        Relationships: [
          {
            foreignKeyName: "events_project_id_fkey";
            columns: ["project_id"];
            referencedRelation: "projects";
            referencedColumns: ["id"];
          }
        ];
      };
      organizations: {
        Row: {
          created_at: string;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          created_at: string;
          id: number;
          name: string;
          organization_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          organization_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          organization_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "projects_organization_id_fkey";
            columns: ["organization_id"];
            referencedRelation: "organizations";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
