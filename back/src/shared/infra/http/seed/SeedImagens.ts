import "reflect-metadata";
import "dotenv/config";
import { AppDataSource } from "@data";
import { v4 as uuidV4 } from "uuid";

async function seedImagens() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  try {
    console.log("Adicionando imagens aos itens...");

    // Mapeamento de itens para suas imagens
    const itemsComImagens = [
      {
        nome: "Garrafa Térmica Preta - Experiências",
        imagens: ["garrafa-termica-preta-experiencias.jpg"],
      },
      {
        nome: "Caneca Esmaltada Preta - Independent",
        imagens: ["caneca-esmaltada-independent.jpg"],
      },
      {
        nome: "Smartwatch Preto com Pulseira",
        imagens: ["smartwatch-preto.jpg"],
      },
      {
        nome: "Chave de Carro Honda",
        imagens: ["chave-carro-honda.jpg"],
      },
      {
        nome: "Garrafa Térmica Inox Chevrolet",
        imagens: ["garrafa-termica-chevrolet.jpg"],
      },
      {
        nome: "Cartão de Identificação UFC",
        imagens: ["cartao-ufc.jpg"],
      },
    ];

    for (const item of itemsComImagens) {
      // Buscar o objeto pelo nome
      const objeto = await AppDataSource.query(
        'SELECT id FROM objetos WHERE nome = $1 LIMIT 1',
        [item.nome]
      );

      if (objeto.length > 0) {
        const objetoId = objeto[0].id;

        // Verificar se já tem imagens
        const existingImages = await AppDataSource.query(
          'SELECT COUNT(*) FROM objetos_image WHERE objeto_id = $1',
          [objetoId]
        );

        if (parseInt(existingImages[0].count) === 0) {
          // Adicionar as imagens
          for (const imagemNome of item.imagens) {
            const imagemId = uuidV4();
            await AppDataSource.query(
              `INSERT INTO objetos_image (id, objeto_id, objeto_image, created_at)
               VALUES ($1, $2, $3, now())`,
              [imagemId, objetoId, imagemNome]
            );
          }
          console.log(`✅ Imagens adicionadas para: ${item.nome}`);
        } else {
          console.log(`⏭️  ${item.nome} já possui imagens`);
        }
      } else {
        console.log(`❌ Item não encontrado: ${item.nome}`);
      }
    }

    console.log("\n🎉 Processo de adição de imagens concluído!");

  } catch (error) {
    console.error("❌ Erro ao adicionar imagens:", error);
  }

  await AppDataSource.destroy();
}

seedImagens();
