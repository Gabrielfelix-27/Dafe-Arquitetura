export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      briefings: {
        Row: {
          additional_notes: string | null
          address: string | null
          budget: string | null
          city: string | null
          created_at: string
          deadline: string | null
          design_references: string | null
          disliked_colors: string | null
          email: string
          environments: string | null
          existing_furniture: string | null
          favorite_colors: string | null
          full_name: string
          furniture_preference: string | null
          has_accessibility_needs: boolean | null
          has_kids_or_elderly: boolean | null
          has_pets: boolean | null
          home_office_needs: string | null
          id: string
          ideal_timeframe: string | null
          investment_level: string | null
          other_style: string | null
          phone: string
          preferred_brands: string | null
          project_reason: string | null
          residents_count: string | null
          styles: string[] | null
          transformation_goals: string | null
        }
        Insert: {
          additional_notes?: string | null
          address?: string | null
          budget?: string | null
          city?: string | null
          created_at?: string
          deadline?: string | null
          design_references?: string | null
          disliked_colors?: string | null
          email: string
          environments?: string | null
          existing_furniture?: string | null
          favorite_colors?: string | null
          full_name: string
          furniture_preference?: string | null
          has_accessibility_needs?: boolean | null
          has_kids_or_elderly?: boolean | null
          has_pets?: boolean | null
          home_office_needs?: string | null
          id?: string
          ideal_timeframe?: string | null
          investment_level?: string | null
          other_style?: string | null
          phone: string
          preferred_brands?: string | null
          project_reason?: string | null
          residents_count?: string | null
          styles?: string[] | null
          transformation_goals?: string | null
        }
        Update: {
          additional_notes?: string | null
          address?: string | null
          budget?: string | null
          city?: string | null
          created_at?: string
          deadline?: string | null
          design_references?: string | null
          disliked_colors?: string | null
          email?: string
          environments?: string | null
          existing_furniture?: string | null
          favorite_colors?: string | null
          full_name?: string
          furniture_preference?: string | null
          has_accessibility_needs?: boolean | null
          has_kids_or_elderly?: boolean | null
          has_pets?: boolean | null
          home_office_needs?: string | null
          id?: string
          ideal_timeframe?: string | null
          investment_level?: string | null
          other_style?: string | null
          phone?: string
          preferred_brands?: string | null
          project_reason?: string | null
          residents_count?: string | null
          styles?: string[] | null
          transformation_goals?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
