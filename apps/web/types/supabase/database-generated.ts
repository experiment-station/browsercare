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
      get_event_summary: {
        Args: {
          days: number;
          event_project_id: number;
          group_type: string;
        };
        Returns: {
          event_count: number;
          grouped_column1: string;
          grouped_column2: string;
        }[];
      };
      get_event_summary_by_browser_name_and_major: {
        Args: {
          days: number;
          event_project_id: number;
        };
        Returns: {
          browser_major: string;
          browser_name: string;
          event_count: number;
        }[];
      };
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
          browser_major: string;
          browser_name: string;
          browser_version: string;
          created_at?: string;
          device_model?: null | string;
          device_type?: null | string;
          device_vendor?: null | string;
          engine_name?: null | string;
          engine_version?: null | string;
          id?: number;
          os_name?: null | string;
          os_version?: null | string;
          project_id: number;
          user_agent: string;
        };
        Relationships: [
          {
            columns: ['project_id'];
            foreignKeyName: 'events_project_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'projects';
          },
        ];
        Row: {
          browser_major: string;
          browser_name: string;
          browser_version: string;
          created_at: string;
          device_model: null | string;
          device_type: null | string;
          device_vendor: null | string;
          engine_name: null | string;
          engine_version: null | string;
          id: number;
          os_name: null | string;
          os_version: null | string;
          project_id: number;
          user_agent: string;
        };
        Update: {
          browser_major?: string;
          browser_name?: string;
          browser_version?: string;
          created_at?: string;
          device_model?: null | string;
          device_type?: null | string;
          device_vendor?: null | string;
          engine_name?: null | string;
          engine_version?: null | string;
          id?: number;
          os_name?: null | string;
          os_version?: null | string;
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
            columns: ['team_id'];
            foreignKeyName: 'members_team_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'teams';
          },
          {
            columns: ['user_id'];
            foreignKeyName: 'members_user_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'users';
          },
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
          is_active?: boolean;
          name: string;
          team_id: number;
        };
        Relationships: [
          {
            columns: ['team_id'];
            foreignKeyName: 'projects_team_id_fkey';
            isOneToOne: false;
            referencedColumns: ['id'];
            referencedRelation: 'teams';
          },
        ];
        Row: {
          created_at: string;
          id: number;
          is_active: boolean;
          name: string;
          team_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_active?: boolean;
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

export type Tables<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof (Database['public']['Tables'] & Database['public']['Views']),
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof Database['public']['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | { schema: keyof Database }
    | keyof Database['public']['Tables'],
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | { schema: keyof Database }
    | keyof Database['public']['Enums'],
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
