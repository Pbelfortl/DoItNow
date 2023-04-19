import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

    const divisao = await prisma.divisao.findFirst({})
    const musculatura = await prisma.musculatura.findFirst({})
    const exercicios = await prisma.exercicio.findFirst({})
    if (!divisao) {
        await prisma.divisao.createMany({
            data: [
                {
                    name: "AB",
                    descricao: 
                    `Indicado para pessoas com qualquer nível de experiência, essa rotina de treino é ajustada para que
                    se possa treinar vários grupos musculares no mesmo dia e acelerar ganhos através de uma frequência
                    de treino maior.`,
                    days: 2
                },
                {
                    name: "ABC",
                    descricao: `Indicado para pessoas com experiência intermediária ou avançada. Através desta rotina é possível 
                    separar os grupos musculares de forma mais eficiente para gerar hipertrofia.`,
                    days: 3
                },
                {
                    name: "ABCDE",
                    descricao: `Indicado para pessoas com experiência avançada, esta rotina consiste em treinar apenas um grupo muscular 
                    por semana, portanto, o músculo necessita de um estimulo maior e consequentemente um descanso maior.`,
                    days: 5
                }
            ]
        })
    }

    if(!musculatura) {
        await prisma.musculatura.createMany({
            data: [
                {
                    name: "Peitoral",
                    image: "https://www.clinicalegerportoalegre.com.br/wp-content/uploads/2019/04/preenchimento-peitoral-masculino-porto-alegre-clinica-leger.jpg"
                },
                {
                    name: "Biceps",
                    image: "https://www.shoulder-pain-explained.com/images/biceps-stretch-exercises.jpg"
                },
                {
                    name: "Triceps",
                    image: "https://i.shgcdn.com/c39f9e9e-8e0a-4fa9-9ead-7ab7c3415c9d/-/format/auto/-/preview/3000x3000/-/quality/lighter/"
                },
                {
                    name: "Quadriceps",
                    image: "https://glebephysiotherapy.com.au/wp-content/uploads/2019/07/Basic-thigh-anatomy.jpg"
                },
                {
                    name: "Costas",
                    image: "https://www.sportsinjuryclinic.net/wp-content/uploads/2019/07/back-muscles800.jpg"
                },
                {
                    name:"Abdomen",
                    image: "https://cdn-cecli.nitrocdn.com/FnHnZnvlMOSpnUbMlTYGMPEcDUiBeAzR/assets/images/optimized/rev-d24fcd1/wp-content/uploads/2019/12/coreset.jpg"
                },  
                {
                    name: "Isquiotibiais",
                    image: "https://www.drluiztintori.com.br/wp-content/uploads/2016/12/IMG_20161216_183314.jpg"
                },
                {
                    name: "Panturrilha",
                    image: "https://cdn.shopify.com/s/files/1/1283/2557/files/Calf_Muscle_Anatomy_1024x1024.jpg?v=1659403354"
                }
            ]
        })

        
    }

    if (!exercicios) {
        await prisma.exercicio.createMany({
            data:[
                {
                    name: "supino reto",
                    musculaturaId: 1,
                    video: "https://www.youtube.com/embed/Kr2erpSyu3M"
                },
                {
                    name: "supino inclinado",
                    musculaturaId: 1,
                    video: "https://www.youtube.com/embed/oZjIQN0YMX0"
                },
                {
                    name: "crussifixo",
                    musculaturaId: 1,
                    video: "https://www.youtube.com/embed/o90Pm6qTeNI"
                },
                {
                    name: "rosca direta",
                    musculaturaId: 2,
                    video: "https://www.youtube.com/embed/s4B8UW3BMqk"
                },
                {
                    name: "rosca concentrada",
                    musculaturaId: 2,
                    video: "https://www.youtube.com/embed/PcwdHVhWY3s"
                },
                {
                    name: "tríceps na roldana (corda)",
                    musculaturaId: 3,
                    video: "https://www.youtube.com/embed/oqob5MHbzBc"
                },
                {
                    name: "agachamento livre",
                    musculaturaId: 4,
                    video: "https://www.youtube.com/embed/GXlJYdZImU4"
                },
                {
                    name: "leg press",
                    musculaturaId: 4,
                    video: "https://www.youtube.com/embed/eg2R_x8uMxQ"
                },
                {
                    name: "barra fixa",
                    musculaturaId: 5,
                    video: "https://www.youtube.com/embed/CKvMi8Shz9g"
                },
                {
                    name: "remada sentado com triângulo",
                    musculaturaId: 5,
                    video: "https://www.youtube.com/embed/8N17XZVngdc"
                },
                {
                    name: "abdominal supra declinado",
                    musculaturaId: 6,
                    video: "https://www.youtube.com/embed/HI-rCGd4fqU"
                },
                {
                    name: "abdominal nas barras paralelas",
                    musculaturaId: 6,
                    video: "https://www.youtube.com/embed/OcjLM6Weh-0"
                },
                {
                    name: "levantamento stiff",
                    musculaturaId: 7,
                    video: "https://www.youtube.com/embed/7wOKuiq9tnc"
                },
                {
                    name: "mesa flexora", 
                    musculaturaId: 7,
                    video: "https://www.youtube.com/embed/yiPqK5WMcNw"
                },
                {
                    name: "panturrilha no smith",
                    musculaturaId: 8,
                    video: "https://www.youtube.com/embed/r7OC-a9dCd4"
                },
                {
                    name: "panturrilha na máquina",
                    musculaturaId: 8,
                    video: "https://www.youtube.com/embed/Nap62yku2ks"
                }
            ]
        })
    }
}

main()
    .then(() => {
        console.log("Registro criado com sucesso!")
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async() => (
        await prisma.$disconnect()
    ))