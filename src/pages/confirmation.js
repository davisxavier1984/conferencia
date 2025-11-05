import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Confirmation() {
  return (
    <Layout currentPageName="Confirmation">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="w-20 h-20 text-green-600" />
              <CardTitle className="text-3xl text-center text-[#00a0df]">
                Inscrição Confirmada!
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-lg">
                Sua inscrição para a <strong>VI Conferência Municipal de Saúde de São Borja</strong> foi realizada com sucesso!
              </p>

              <div className="bg-blue-50 border-l-4 border-[#00a0df] p-4 my-6">
                <p className="text-sm text-gray-700">
                  <strong>Importante:</strong> Guarde este comprovante. Você receberá mais informações sobre a conferência por e-mail.
                </p>
              </div>

              <div className="space-y-2 text-left bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">Próximos passos:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#00a0df] mr-2">•</span>
                    Verifique seu e-mail para confirmação da inscrição
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a0df] mr-2">•</span>
                    Aguarde informações sobre data, horário e local do evento
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#00a0df] mr-2">•</span>
                    Fique atento às comunicações oficiais da Secretaria Municipal de Saúde
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Link href="/">
                <Button className="bg-[#00a0df] hover:bg-[#0089bd]">
                  Voltar para a página inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
