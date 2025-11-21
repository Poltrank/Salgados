import { Product, Category } from './types';

export const WHATSAPP_NUMBER = "5547999841679";

// --- INSTRUÇÕES PARA O SR. CHEFÃO ---
// Para colocar as fotos das suas caixas:
// 1. Tenha o link da foto (pode postar no imgur.com ou pegar do seu WhatsApp Web/Instagram "copiar endereço da imagem")
// 2. Substitua o link dentro das aspas em 'image' abaixo.

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Coxinha de Frango',
    description: 'Caixa com 100 unidades. A rainha dos salgados! Massa dourada crocante e recheio suculento.',
    price: 120.00,
    category: Category.FRITOS,
    // SUBSTITUA O LINK ABAIXO PELA FOTO DA CAIXA DE COXINHAS
    image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=800&auto=format&fit=crop', 
    popular: true,
    servingSize: '100 unidades'
  },
  {
    id: '2',
    name: 'Bolinha de Queijo',
    description: 'Caixa com 100 unidades. Explosão de queijo derretido a cada mordida.',
    price: 120.00,
    category: Category.FRITOS,
    // SUBSTITUA O LINK ABAIXO PELA FOTO DA CAIXA DE BOLINHAS
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop', 
    popular: true,
    servingSize: '100 unidades'
  },
  {
    id: '3',
    name: 'Kibe Tradicional',
    description: 'Carne bovina selecionada, trigo para kibe, hortelã e especiarias. Cento delicioso.',
    price: 120.00,
    category: Category.FRITOS,
    image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=800&auto=format&fit=crop',
    servingSize: '100 unidades'
  },
  {
    id: '4',
    name: 'Risole de Presunto e Queijo',
    description: 'O clássico em formato de meia-lua. Massa leve e recheio generoso.',
    price: 120.00,
    category: Category.FRITOS,
    image: 'https://images.unsplash.com/photo-1604908177453-7462950a6a3b?q=80&w=800&auto=format&fit=crop',
    servingSize: '100 unidades'
  },
  {
    id: '5',
    name: 'Empadinha de Palmito',
    description: 'Massa podre artesanal que derrete na boca com recheio cremoso de palmito.',
    price: 140.00,
    category: Category.ASSADOS,
    image: 'https://images.unsplash.com/photo-1626128665085-4837473d1240?q=80&w=800&auto=format&fit=crop',
    servingSize: '100 unidades'
  },
  {
    id: '6',
    name: 'Mini Churros Doce de Leite',
    description: 'Aquele docinho indispensável! Caixa polvilhada com açúcar e canela.',
    price: 130.00,
    category: Category.CHURROS,
    image: 'https://images.unsplash.com/photo-1624372465664-941b5a4f9dd2?q=80&w=800&auto=format&fit=crop',
    popular: true,
    servingSize: '100 unidades'
  },
  {
    id: '7',
    name: 'Combo Festa Completa',
    description: 'A solução da sua festa! 200 salgados fritos sortidos + 50 mini churros.',
    price: 280.00,
    category: Category.COMBOS,
    image: 'https://images.unsplash.com/photo-1561150213-44739f77e237?q=80&w=800&auto=format&fit=crop',
    servingSize: '250 unidades'
  }
];