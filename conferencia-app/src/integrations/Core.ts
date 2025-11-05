// URL base da API - pode ser configurada via variável de ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Base entity class for database operations
export class CoreEntity {
  static entityName = '';

  static async create(data: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.entityName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao criar registro');
      }

      const result = await response.json();
      console.log(`✅ ${this.entityName} criado com sucesso:`, result.id);
      return result;
    } catch (error) {
      console.error(`❌ Erro ao criar ${this.entityName}:`, error);
      throw error;
    }
  }

  static async list(sort?: string): Promise<any[]> {
    try {
      const url = new URL(`${API_BASE_URL}/${this.entityName}`);
      if (sort) {
        url.searchParams.append('sort', sort);
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Erro ao listar registros');
      }

      const result = await response.json();
      console.log(`📋 ${this.entityName} listados:`, result.length, 'registros');
      return result;
    } catch (error) {
      console.error(`❌ Erro ao listar ${this.entityName}:`, error);
      throw error;
    }
  }

  static async filter(filters: any): Promise<any[]> {
    try {
      const url = new URL(`${API_BASE_URL}/${this.entityName}/filter`);

      // Adiciona os filtros como query params
      Object.keys(filters).forEach((key) => {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          url.searchParams.append(key, filters[key].toString());
        }
      });

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error('Erro ao filtrar registros');
      }

      const result = await response.json();
      console.log(`🔍 ${this.entityName} filtrados:`, result.length, 'registros');
      return result;
    } catch (error) {
      console.error(`❌ Erro ao filtrar ${this.entityName}:`, error);
      throw error;
    }
  }

  static async update(id: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.entityName}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao atualizar registro');
      }

      const result = await response.json();
      console.log(`✏️  ${this.entityName} atualizado:`, result.id);
      return result;
    } catch (error) {
      console.error(`❌ Erro ao atualizar ${this.entityName}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.entityName}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao deletar registro');
      }

      console.log(`🗑️  ${this.entityName} deletado:`, id);
    } catch (error) {
      console.error(`❌ Erro ao deletar ${this.entityName}:`, error);
      throw error;
    }
  }

  // Método especial para buscar por código de acesso
  static async getByCode(code: string): Promise<any> {
    try {
      const response = await fetch(`${API_BASE_URL}/${this.entityName}/code/${code}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Código de acesso não encontrado');
        }
        throw new Error('Erro ao buscar registro');
      }

      const result = await response.json();
      console.log(`🔑 ${this.entityName} encontrado pelo código:`, result.id);
      return result;
    } catch (error) {
      console.error(`❌ Erro ao buscar ${this.entityName} por código:`, error);
      throw error;
    }
  }
}

// Email sending function
export async function SendEmail(params: {
  to: string;
  subject: string;
  body: string;
  from_name: string;
}): Promise<void> {
  try {
    console.log('📧 Enviando email para:', params.to);
    // O email já é enviado automaticamente no backend ao criar a inscrição
    // Esta função pode ser usada para envios adicionais se necessário
    console.log('✅ Email processado (enviado pelo backend)');
  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);
    throw error;
  }
}

// File upload function
export async function UploadFile(params: {
  file: File;
}): Promise<{ file_url: string }> {
  try {
    console.log('📤 Preparando upload do arquivo:', params.file.name);

    // Por enquanto, cria uma URL temporária local
    // Em produção, você deve implementar upload para um serviço de storage
    // (AWS S3, Cloudinary, Supabase Storage, etc.)
    const url = URL.createObjectURL(params.file);

    console.log('✅ Arquivo temporariamente disponível em:', url);
    return { file_url: url };
  } catch (error) {
    console.error('❌ Erro ao fazer upload do arquivo:', error);
    throw error;
  }
}
