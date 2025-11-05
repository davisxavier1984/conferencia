import { CoreEntity } from '@/integrations/Core';

export interface RegistrationData {
  id?: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  institution: string;
  type?: 'delegado' | 'observador' | 'convidado';
  representation?: 'usuario' | 'gestor' | 'trabalhador';
  accessCode?: string;
  certificateAuthorized?: boolean;
  status?: 'pending' | 'confirmed';
  createdAt?: string;
}

export class Registration extends CoreEntity {
  static entityName = 'registrations';

  static async create(data: Partial<RegistrationData>): Promise<RegistrationData> {
    return super.create(data);
  }

  static async list(sort?: string): Promise<RegistrationData[]> {
    return super.list(sort);
  }

  static async filter(filters: Partial<RegistrationData>): Promise<RegistrationData[]> {
    return super.filter(filters);
  }

  static async update(id: string, data: Partial<RegistrationData>): Promise<RegistrationData> {
    return super.update(id, data);
  }

  static async delete(id: string): Promise<void> {
    return super.delete(id);
  }
}
