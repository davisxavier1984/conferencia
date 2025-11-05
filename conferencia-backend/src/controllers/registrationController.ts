import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendConfirmationEmail } from '../services/emailService';

const prisma = new PrismaClient();

// Criar nova inscrição
export async function createRegistration(req: Request, res: Response) {
  try {
    const registrationData = req.body;

    // Validações básicas
    if (!registrationData.name || !registrationData.cpf || !registrationData.email) {
      return res.status(400).json({
        error: 'Campos obrigatórios faltando: name, cpf, email',
      });
    }

    // Verifica se CPF já está cadastrado
    const existingByCpf = await prisma.registration.findUnique({
      where: { cpf: registrationData.cpf },
    });

    if (existingByCpf) {
      return res.status(409).json({
        error: 'CPF já cadastrado',
      });
    }

    // Verifica se o código de acesso já existe (improvável, mas possível)
    if (registrationData.accessCode) {
      const existingByCode = await prisma.registration.findUnique({
        where: { accessCode: registrationData.accessCode },
      });

      if (existingByCode) {
        return res.status(409).json({
          error: 'Código de acesso já existe. Por favor, gere outro.',
        });
      }
    }

    // Cria a inscrição no banco
    const registration = await prisma.registration.create({
      data: {
        name: registrationData.name,
        cpf: registrationData.cpf,
        email: registrationData.email,
        phone: registrationData.phone || '',
        birthdate: registrationData.birthdate || '',
        rg: registrationData.rg,
        gender: registrationData.gender,
        race: registrationData.race,
        address: registrationData.address,
        city: registrationData.city,
        state: registrationData.state,
        zip_code: registrationData.zip_code,
        delegate_type: registrationData.delegate_type,
        organization: registrationData.organization,
        position: registrationData.position,
        accessCode: registrationData.accessCode,
        emailSent: false,
        certificateIssued: false,
      },
    });

    // Envia email de confirmação (não-bloqueante)
    sendConfirmationEmail({
      to: registration.email,
      name: registration.name,
      accessCode: registration.accessCode,
    })
      .then((result) => {
        if (result.success) {
          // Atualiza o registro para indicar que o email foi enviado
          prisma.registration
            .update({
              where: { id: registration.id },
              data: { emailSent: true },
            })
            .catch(console.error);
        }
      })
      .catch(console.error);

    console.log('✅ Nova inscrição criada:', registration.id, '-', registration.name);

    return res.status(201).json(registration);
  } catch (error) {
    console.error('❌ Erro ao criar inscrição:', error);
    return res.status(500).json({
      error: 'Erro ao criar inscrição',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Listar todas as inscrições
export async function listRegistrations(req: Request, res: Response) {
  try {
    const registrations = await prisma.registration.findMany({
      orderBy: {
        created_date: 'desc',
      },
    });

    return res.json(registrations);
  } catch (error) {
    console.error('❌ Erro ao listar inscrições:', error);
    return res.status(500).json({
      error: 'Erro ao listar inscrições',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Buscar inscrição por ID
export async function getRegistrationById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const registration = await prisma.registration.findUnique({
      where: { id },
    });

    if (!registration) {
      return res.status(404).json({
        error: 'Inscrição não encontrada',
      });
    }

    return res.json(registration);
  } catch (error) {
    console.error('❌ Erro ao buscar inscrição:', error);
    return res.status(500).json({
      error: 'Erro ao buscar inscrição',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Buscar inscrição por código de acesso
export async function getRegistrationByCode(req: Request, res: Response) {
  try {
    const { code } = req.params;

    const registration = await prisma.registration.findUnique({
      where: { accessCode: code },
    });

    if (!registration) {
      return res.status(404).json({
        error: 'Inscrição não encontrada',
      });
    }

    return res.json(registration);
  } catch (error) {
    console.error('❌ Erro ao buscar inscrição por código:', error);
    return res.status(500).json({
      error: 'Erro ao buscar inscrição',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Filtrar inscrições
export async function filterRegistrations(req: Request, res: Response) {
  try {
    const { search, delegate_type, certificateIssued } = req.query;

    const where: any = {};

    // Busca por nome, email ou CPF
    if (search && typeof search === 'string') {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { cpf: { contains: search } },
      ];
    }

    // Filtro por tipo de delegado
    if (delegate_type && typeof delegate_type === 'string') {
      where.delegate_type = delegate_type;
    }

    // Filtro por certificado emitido
    if (certificateIssued !== undefined) {
      where.certificateIssued = certificateIssued === 'true';
    }

    const registrations = await prisma.registration.findMany({
      where,
      orderBy: {
        created_date: 'desc',
      },
    });

    return res.json(registrations);
  } catch (error) {
    console.error('❌ Erro ao filtrar inscrições:', error);
    return res.status(500).json({
      error: 'Erro ao filtrar inscrições',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Atualizar inscrição
export async function updateRegistration(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove campos que não devem ser atualizados diretamente
    delete updateData.id;
    delete updateData.created_date;
    delete updateData.updated_date;

    const registration = await prisma.registration.update({
      where: { id },
      data: updateData,
    });

    console.log('✏️  Inscrição atualizada:', registration.id, '-', registration.name);

    return res.json(registration);
  } catch (error) {
    console.error('❌ Erro ao atualizar inscrição:', error);

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return res.status(404).json({
        error: 'Inscrição não encontrada',
      });
    }

    return res.status(500).json({
      error: 'Erro ao atualizar inscrição',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Deletar inscrição
export async function deleteRegistration(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await prisma.registration.delete({
      where: { id },
    });

    console.log('🗑️  Inscrição deletada:', id);

    return res.status(204).send();
  } catch (error) {
    console.error('❌ Erro ao deletar inscrição:', error);

    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return res.status(404).json({
        error: 'Inscrição não encontrada',
      });
    }

    return res.status(500).json({
      error: 'Erro ao deletar inscrição',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}

// Autorizar certificado (marcar como emitido)
export async function authorizeCertificate(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const registration = await prisma.registration.update({
      where: { id },
      data: { certificateIssued: true },
    });

    console.log('✅ Certificado autorizado para:', registration.name);

    return res.json(registration);
  } catch (error) {
    console.error('❌ Erro ao autorizar certificado:', error);

    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return res.status(404).json({
        error: 'Inscrição não encontrada',
      });
    }

    return res.status(500).json({
      error: 'Erro ao autorizar certificado',
      details: error instanceof Error ? error.message : 'Erro desconhecido',
    });
  }
}
