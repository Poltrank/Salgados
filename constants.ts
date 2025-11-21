import { Product, Category } from './types';

export const WHATSAPP_NUMBER = "5547999841679";

// --- LISTA DE PRODUTOS OFICIAL DO SR. CHEFÃO ---
// Atualizada com as fotos do Postimages

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Coxinha de Frango",
    description: "Caixa com 100 unidades. A rainha dos salgados! Massa dourada crocante e recheio suculento.",
    price: 120,
    category: Category.FRITOS,
    image: "https://i.postimg.cc/FHNd6fSC/Gemini-Generated-Image-v4wae1v4wae1v4wa.png",
    popular: true,
    servingSize: "100 unidades"
  },
  {
    id: "2",
    name: "Bolinha de Queijo",
    description: "Caixa com 100 unidades. Explosão de queijo derretido a cada mordida.",
    price: 120,
    category: Category.FRITOS,
    image: "https://i.postimg.cc/C54YnKKg/Gemini-Generated-Image-pt0dtmpt0dtmpt0d.png",
    popular: true,
    servingSize: "100 unidades"
  },
  {
    id: "3",
    name: "Kibe Tradicional",
    description: "Carne bovina selecionada, trigo para kibe, hortelã e especiarias. Cento delicioso.",
    price: 120,
    category: Category.FRITOS,
    image: "https://i.postimg.cc/Y2gYvBfX/Gemini-Generated-Image-h376fph376fph376.png",
    servingSize: "100 unidades"
  },
  {
    id: "4",
    name: "Risole de Presunto e Queijo",
    description: "O clássico em formato de meia-lua. Massa leve e recheio generoso.",
    price: 120,
    category: Category.FRITOS,
    image: "https://i.postimg.cc/j5Hmjk87/Gemini-Generated-Image-1iq55p1iq55p1iq5.png",
    servingSize: "100 unidades"
  },
  {
    id: "5",
    name: "Empadinha de Palmito",
    description: "Massa podre artesanal que derrete na boca com recheio cremoso de palmito.",
    price: 140,
    category: Category.ASSADOS,
    image: "https://i.postimg.cc/kXp17mJr/Gemini-Generated-Image-4syoy34syoy34syo.png",
    servingSize: "100 unidades"
  },
  {
    id: "6",
    name: "Mini Churros Doce de Leite",
    description: "Aquele docinho indispensável! Caixa polvilhada com açúcar e canela.",
    price: 130,
    category: Category.CHURROS,
    image: "https://i.postimg.cc/RFSQcsSb/Gemini-Generated-Image-i9jrkgi9jrkgi9jr.png",
    popular: true,
    servingSize: "100 unidades"
  },
  {
    id: "7",
    name: "Combo Festa Completa",
    description: "A solução da sua festa! 200 salgados fritos sortidos + 50 mini churros.",
    price: 280,
    category: Category.COMBOS,
    image: "https://i.postimg.cc/D0tXYBTd/Gemini-Generated-Image-swz8ibswz8ibswz8.png",
    servingSize: "250 unidades"
  }
];