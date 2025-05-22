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
      admins: {
        Row: {
          id: string
          email: string
          created_at: string | null
        }
        Insert: {
          id?: string
          email: string
          created_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string | null
        }
      }
      admissions: {
        Row: {
          id: string
          student_surname: string
          student_other_names: string
          date_of_birth: string
          gender: string
          nationality: string
          religion: string | null
          home_address: string
          home_town: string
          region_of_origin: string
          father_name: string
          father_occupation: string
          father_contact: string
          mother_name: string
          mother_occupation: string
          mother_contact: string
          guardian_name: string | null
          guardian_relationship: string | null
          guardian_contact: string | null
          previous_school: string
          previous_class: string
          bece_index_number: string | null
          aggregate_score: number | null
          birth_cert_attached: boolean | null
          report_card_attached: boolean | null
          bece_result_attached: boolean | null
          status: string | null
          admin_notes: string | null
          created_at: string | null
          updated_at: string | null
          reviewed_by: string | null
        }
        Insert: {
          id?: string
          student_surname: string
          student_other_names: string
          date_of_birth: string
          gender: string
          nationality?: string
          religion?: string | null
          home_address: string
          home_town: string
          region_of_origin: string
          father_name: string
          father_occupation: string
          father_contact: string
          mother_name: string
          mother_occupation: string
          mother_contact: string
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_contact?: string | null
          previous_school: string
          previous_class: string
          bece_index_number?: string | null
          aggregate_score?: number | null
          birth_cert_attached?: boolean | null
          report_card_attached?: boolean | null
          bece_result_attached?: boolean | null
          status?: string | null
          admin_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
          reviewed_by?: string | null
        }
        Update: {
          id?: string
          student_surname?: string
          student_other_names?: string
          date_of_birth?: string
          gender?: string
          nationality?: string
          religion?: string | null
          home_address?: string
          home_town?: string
          region_of_origin?: string
          father_name?: string
          father_occupation?: string
          father_contact?: string
          mother_name?: string
          mother_occupation?: string
          mother_contact?: string
          guardian_name?: string | null
          guardian_relationship?: string | null
          guardian_contact?: string | null
          previous_school?: string
          previous_class?: string
          bece_index_number?: string | null
          aggregate_score?: number | null
          birth_cert_attached?: boolean | null
          report_card_attached?: boolean | null
          bece_result_attached?: boolean | null
          status?: string | null
          admin_notes?: string | null
          created_at?: string | null
          updated_at?: string | null
          reviewed_by?: string | null
        }
      }
      content_blocks: {
        Row: {
          id: string
          section: string
          content: Json
          created_at: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          id?: string
          section: string
          content?: Json
          created_at?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          id?: string
          section?: string
          content?: Json
          created_at?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
      }
      media_library: {
        Row: {
          id: string
          type: string
          url: string
          title: string
          description: string | null
          uploaded_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          type: string
          url: string
          title: string
          description?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          type?: string
          url?: string
          title?: string
          description?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
        }
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