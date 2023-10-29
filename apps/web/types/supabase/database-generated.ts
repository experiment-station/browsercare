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
      beta_signups: {
        Insert: {
          created_at?: string;
          email: string;
          id?: number;
        };
        Relationships: [];
        Row: {
          created_at: string;
          email: string;
          id: number;
        };
        Update: {
          created_at?: string;
          email?: string;
          id?: number;
        };
      };
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
      members: {
        Insert: {
          created_at?: null | string;
          team_id: number;
          user_id: string;
        };
        Relationships: [
          {
            columns: ["team_id"];
            foreignKeyName: "members_team_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "teams";
          },
          {
            columns: ["user_id"];
            foreignKeyName: "members_user_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "users";
          }
        ];
        Row: {
          created_at: null | string;
          team_id: number;
          user_id: string;
        };
        Update: {
          created_at?: null | string;
          team_id?: number;
          user_id?: string;
        };
      };
      projects: {
        Insert: {
          created_at?: string;
          id?: number;
          name: string;
          team_id: number;
        };
        Relationships: [
          {
            columns: ["team_id"];
            foreignKeyName: "projects_team_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "teams";
          }
        ];
        Row: {
          created_at: string;
          id: number;
          name: string;
          team_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string;
          team_id?: number;
        };
      };
      teams: {
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
    };
    Views: {
      [_ in never]: never;
    };
  };
}
