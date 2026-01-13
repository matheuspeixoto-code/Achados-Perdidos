import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "@data";
import { v4 as uuidV4 } from "uuid";

async function seedExemplos() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    // Verificar se já existem itens
    const existingItems = await AppDataSource.query(
      'SELECT COUNT(*) FROM objetos'
    );

    if (parseInt(existingItems[0].count) > 0) {
      console.log("✅ Banco de dados já contém itens de exemplo");
      await AppDataSource.destroy();
      return;
    }

    console.log("Inserindo itens de exemplo...");

    const items = [
      {
        nome: "Garrafa Térmica Preta - Experiências",
        descricao: "Garrafa térmica preta com logo 'Experiências'. Mantém bebidas quentes ou frias por longas horas. Perfeita para viagens e atividades ao ar livre.",
        local: "Campus da UFC - Benfica",
        dataEncontrada: "2026-01-10",
        hora: "14:30:00",
      },
      {
        nome: "Caneca Esmaltada Preta - Independent",
        descricao: "Caneca esmaltada de camping com design 'Independent'. Ideal para acampamentos, piqueniques e café quente. Material resistente.",
        local: "Biblioteca Central - UFC",
        dataEncontrada: "2026-01-09",
        hora: "16:45:00",
      },
      {
        nome: "Smartwatch Preto com Pulseira",
        descricao: "Relógio inteligente preto com pulseira de silicone. Aparenta estar em bom estado de funcionamento.",
        local: "Refeitório - Bloco de Aulas",
        dataEncontrada: "2026-01-08",
        hora: "12:15:00",
      },
      {
        nome: "Chave de Carro Honda",
        descricao: "Chave de carro preta com logo Honda em prata. Telecomando com 4 botões (destrancar, trancar, abrir porta-malas, alarme).",
        local: "Estacionamento - Setor A",
        dataEncontrada: "2026-01-07",
        hora: "18:20:00",
      },
      {
        nome: "Garrafa Térmica Inox Chevrolet",
        descricao: "Garrafa térmica de aço inox com logo Genuine da Chevrolet. Excelente isolamento térmico e design robusto. Produto premium.",
        local: "Café da UFC - Próximo à Reitoria",
        dataEncontrada: "2026-01-06",
        hora: "10:00:00",
      },
      {
        nome: "Cartão de Identificação UFC",
        descricao: "Cartão de acesso/credencial da Universidade Federal do Ceará. Número de série visível. Aparenta ser recente.",
        local: "Portaria Principal - UFC",
        dataEncontrada: "2026-01-05",
        hora: "09:30:00",
      },
    ];

    for (const item of items) {
      const itemId = uuidV4();

      await AppDataSource.query(
        `INSERT INTO objetos (id, nome, descricao, local, "dataEncontrada", hora, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, now())`,
        [
          itemId,
          item.nome,
          item.descricao,
          item.local,
          item.dataEncontrada,
          item.hora,
          "ENCONTRADO",
        ]
      );

      console.log(`✅ Item inserido: ${item.nome}`);
    }

    console.log("\n🎉 Todos os itens de exemplo foram inseridos com sucesso!");

  } catch (error) {
    console.error("❌ Erro ao inserir itens:", error);
  }

  await AppDataSource.destroy();
}

seedExemplos();
