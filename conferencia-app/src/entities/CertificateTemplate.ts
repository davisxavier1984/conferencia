import { CoreEntity } from '@/integrations/Core';

export interface PositionData {
  x: number;
  y: number;
  fontSize: number;
}

export interface CertificateTemplateData {
  id?: string;
  background_url?: string;
  name_position?: PositionData;
  type_position?: PositionData;
  is_active?: boolean;
  created_date?: string;
}

export class CertificateTemplate extends CoreEntity {
  static entityName = 'CertificateTemplate';

  static async create(data: Partial<CertificateTemplateData>): Promise<CertificateTemplateData> {
    return super.create(data);
  }

  static async list(sort?: string): Promise<CertificateTemplateData[]> {
    return super.list(sort);
  }

  static async filter(filters: Partial<CertificateTemplateData>): Promise<CertificateTemplateData[]> {
    return super.filter(filters);
  }

  static async update(id: string, data: Partial<CertificateTemplateData>): Promise<CertificateTemplateData> {
    return super.update(id, data);
  }

  static async delete(id: string): Promise<void> {
    return super.delete(id);
  }
}
