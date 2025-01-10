export interface User {
  userId: string;          
  name: string;        
  email: string;           
  role: string;            
}

  
export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
  }
  
export  interface LoginFormData {
    email: string;  
    password: string; 
  }
  
  
export  interface ApiError {
    response?: {
      data?: {
        message?: string;
        shouldReLogin?: boolean;
      };
    };
  }
  
export interface AuthContextType {
    user: User | null;
    error: string;
    loading: boolean;
    signUp: (data: RegisterFormData) => Promise<void>;
    login: (data: LoginFormData) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
  }