import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, Star, Plus, Minus, Trash2, Menu as MenuIcon, Sparkles, ChefHat, Flame, Clock, Package, Lock, Pencil, LogOut, RefreshCw, CheckCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from './constants';
import { Product, CartItem, Category } from './types';
import { PartyPlanner } from './components/PartyPlanner';
import { storageService } from './services/storage';
import { AdminLogin } from './components/AdminLogin';
import { ProductEditor } from './components/ProductEditor';

const App = () => {
  // Application State
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // UI State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // URL DA LOGO
  const LOGO_URL = "https://placehold.co/400x400/white/DC2626?text=Sr.+Chef%C3%A3o+Logo"; 

  // Initial Load
  useEffect(() => {
    const loadedProducts = storageService.getProducts();
    setProducts(loadedProducts);

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 50 } : item
        );
      }
      return [...prev, { ...product, quantity: 100 }]; 
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity / 100)), 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    const message = `*Olá Sr. Chefão!* 👨‍🍳\n\nGostaria de fazer um pedido:\n\n${cart.map(item => `- ${item.quantity}x ${item.name}`).join('\n')}\n\n*Total Estimado: R$ ${cartTotal.toFixed(2)}*\n\nAguardo confirmação!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Admin Logic
  const handleSaveProduct = (updatedProduct: Product) => {
    const newProducts = products.map(p => p.id === updatedProduct.id ? updatedProduct : p);
    setProducts(newProducts);
    storageService.saveProducts(newProducts);
    setEditingProduct(null);
    
    // Show Success Toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleResetProducts = () => {
    if(confirm('Tem certeza? Isso vai restaurar os produtos originais e apagar suas edições.')) {
      const defaults = storageService.resetToDefault();
      setProducts(defaults);
      alert('Produtos restaurados para o padrão!');
    }
  }

  const filteredProducts = activeCategory === 'Todos' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFFBEB] text-brand-dark pb-24">
      
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl z-[100] flex items-center gap-2 animate-bounce">
          <CheckCircle size={20} />
          <span className="font-bold">Produto Atualizado com Sucesso!</span>
        </div>
      )}

      {/* Modals */}
      <PartyPlanner isOpen={isPlannerOpen} onClose={() => setIsPlannerOpen(false)} />
      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLogin={() => setIsAdmin(true)} />
      <ProductEditor 
        isOpen={!!editingProduct} 
        product={editingProduct} 
        onClose={() => setEditingProduct(null)} 
        onSave={handleSaveProduct} 
      />

      {/* Admin Bar (Visible only when logged in) */}
      {isAdmin && (
        <div className="bg-brand-dark text-white text-xs py-2 px-4 fixed top-0 w-full z-50 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-2">
             <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></span>
             <span className="font-bold">MODO ADMINISTRADOR (Edite os produtos clicando neles)</span>
          </div>
          <div className="flex gap-4">
             <button onClick={handleResetProducts} className="hover:text-red-400 flex items-center gap-1">
                <RefreshCw size={12} /> Restaurar Padrão
             </button>
             <button onClick={() => setIsAdmin(false)} className="hover:text-gray-300 flex items-center gap-1">
                <LogOut size={12} /> Sair
             </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className={`fixed ${isAdmin ? 'top-8' : 'top-0'} w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-2 border-brand-red shadow-md">
               <img src={LOGO_URL} alt="Sr. Chefão Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-xl leading-none ${isScrolled ? 'text-brand-red' : 'text-white drop-shadow-md'}`}>
                Sr. Chefão
              </span>
              <span className={`text-xs font-bold tracking-widest ${isScrolled ? 'text-brand-orange' : 'text-brand-yellow drop-shadow-md'}`}>
                SALGADOS
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
             <button 
              onClick={() => setIsPlannerOpen(true)}
              className="bg-brand-yellow hover:bg-yellow-300 text-brand-red font-bold px-4 py-2 rounded-full shadow-md transition flex items-center gap-2 text-sm"
            >
              <Sparkles size={16} />
              <span className="hidden md:inline">Calculadora de Festa</span>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white text-brand-red p-2 rounded-full shadow-md hover:scale-105 transition"
            >
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className={`relative h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden ${isAdmin ? 'mt-8' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#EA580C] to-[#DC2626] z-0"></div>
        
        <div className="absolute top-1/4 left-10 text-brand-yellow opacity-20 transform -rotate-12">
           <ChefHat size={120} />
        </div>
        <div className="absolute bottom-1/4 right-10 text-brand-yellow opacity-20 transform rotate-12">
           <Flame size={120} />
        </div>
        
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>

        <div className="container mx-auto px-4 relative z-10 text-center mt-16">
          
          <div className="animate-bounce mb-4">
            <span className="bg-white text-brand-red px-6 py-2 rounded-full font-bold shadow-lg transform rotate-2 inline-block border-2 border-brand-yellow">
              🔥 O melhor de Jaraguá!
            </span>
          </div>

          <h1 className="font-heading font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] leading-none mb-6">
            <span className="block text-5xl md:text-7xl mb-2">PEDIU, FRITOU,</span>
            <span className="block text-6xl md:text-9xl text-brand-yellow drop-shadow-[0_4px_0_#C2410C]">CHEGOU!</span>
          </h1>
          
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium bg-brand-red/30 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            Salgados sequinhos, crocantes e recheados. <br/>
            Ideal para sua festa, reunião ou aquele lanche da tarde.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={() => {
                const menuElement = document.getElementById('menu');
                menuElement?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white text-brand-red font-bold px-8 py-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-gray-100 transition transform hover:-translate-y-1 text-lg uppercase tracking-wide"
            >
              Ver Cardápio
            </button>
            <button 
               onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
               className="bg-[#25D366] text-white font-bold px-8 py-4 rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] hover:bg-green-600 transition transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Phone size={24} />
              Pedir no Whats
            </button>
          </div>
        </div>

        <div className="absolute -bottom-1 left-0 right-0 z-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#FFFBEB" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </header>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-10 relative z-30 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Flame size={32} />, title: "Sempre Quentinho", text: "Frito na hora do pedido" },
            { icon: <Clock size={32} />, title: "Entrega Rápida", text: "Chega voando na sua casa" },
            { icon: <Package size={32} />, title: "Embalagem Prática", text: "Caixas perfeitas para servir" }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border-b-4 border-brand-yellow transform transition hover:scale-105 hover:-rotate-1">
              <div className="text-brand-orange bg-orange-100 p-3 rounded-full">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-gray-800">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4 mb-12">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-heading font-bold text-brand-red mb-4 flex items-center justify-center gap-2">
            <ChefHat className="text-brand-yellow" size={40}/>
            Nosso Cardápio
          </h2>
          <p className="text-gray-600 mb-8">Selecione os produtos e adicione ao carrinho</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Todos', ...Object.values(Category)].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2 rounded-full font-bold transition-all border-2 ${
                  activeCategory === cat 
                    ? 'bg-brand-red text-white border-brand-red shadow-md scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-orange hover:text-brand-orange'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-300 group border-2 border-transparent hover:border-brand-yellow">
              <div className="relative h-56 overflow-hidden bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
                  onError={(e) => (e.currentTarget.src = 'https://placehold.co/600x400?text=Imagem+Indisponivel')}
                />
                
                {/* Admin Edit Button Overlay */}
                {isAdmin ? (
                   <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingProduct(product);
                    }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity"
                   >
                      <div className="bg-white text-brand-dark px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition">
                          <Pencil size={16} /> Editar Produto
                      </div>
                   </button>
                ) : (
                    // Default Hover State
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 pointer-events-none">
                      <span className="text-white font-bold text-sm bg-brand-red px-3 py-1 rounded-full">Ver Detalhes</span>
                    </div>
                )}

                {product.popular && (
                  <div className="absolute top-3 right-3 bg-brand-yellow text-brand-red text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 z-10 border border-white">
                    <Star size={12} fill="currentColor" /> Campeão
                  </div>
                )}
              </div>
              
              <div className="p-5 flex-1 flex flex-col relative">
                <div className="absolute -top-4 left-4 bg-brand-orange text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                  {product.category}
                </div>

                <div className="mt-2 mb-2">
                  <h3 className="font-heading font-bold text-xl text-gray-800 leading-tight">{product.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-dashed border-gray-200">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                      {product.servingSize || 'Unidade'}
                    </span>
                    <div className="text-2xl font-bold text-brand-red">R$ {product.price.toFixed(2)}</div>
                  </div>
                  
                  {isAdmin ? (
                      <button 
                      onClick={() => setEditingProduct(product)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition"
                      title="Editar"
                    >
                      <Pencil size={20} />
                    </button>
                  ) : (
                    <button 
                        onClick={() => addToCart(product)}
                        className="bg-brand-yellow hover:bg-yellow-400 text-brand-red w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition active:scale-95"
                    >
                        <Plus size={28} strokeWidth={3} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer with Admin Trigger */}
      <section className="bg-brand-dark text-white py-16 mt-12 rounded-t-[3rem] relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-red via-brand-orange to-brand-yellow"></div>
         
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-yellow mb-6">
            Tá esperando o quê?
          </h2>
          <p className="mb-8 text-gray-300 max-w-lg mx-auto text-lg">
            Salgadinho fresco, crocante e delicioso. <br/>Do Sr. Chefão direto para sua mesa!
          </p>
          <button 
            onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')}
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-green-500 text-white font-bold py-4 px-8 rounded-full shadow-lg transition transform hover:-translate-y-1 text-lg"
          >
            <Phone size={24} />
            Chamar no WhatsApp Agora
          </button>
          <div className="mt-12 text-sm text-gray-500 flex flex-col items-center gap-2">
            <span>© {new Date().getFullYear()} Sr. Chefão Salgados. Todos os direitos reservados.</span>
            
            {/* Secret Admin Button */}
            {!isAdmin && (
                <button 
                onClick={() => setIsLoginOpen(true)}
                className="text-gray-700 hover:text-gray-500 mt-2 p-2 transition"
                title="Acesso Restrito"
                >
                <Lock size={14} />
                </button>
            )}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l-4 border-brand-yellow">
            <div className="bg-brand-red p-6 text-white flex justify-between items-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-brand-orange opacity-50 transform rotate-3 scale-110"></div>
              <div className="relative z-10 flex items-center gap-2">
                <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
                  <ShoppingCart /> Seu Pedido
                </h2>
              </div>
              <button onClick={() => setIsCartOpen(false)} className="relative z-10 hover:bg-white/20 p-2 rounded-full transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center text-gray-400 mt-20 flex flex-col items-center">
                  <div className="bg-yellow-100 w-32 h-32 rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <ShoppingCart size={48} className="text-brand-orange" />
                  </div>
                  <p className="text-lg font-bold text-gray-600">Seu carrinho está vazio.</p>
                  <p className="text-sm max-w-[200px]">Que tal encher ele com as delícias do Sr. Chefão?</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-6 text-brand-red font-bold hover:underline"
                  >
                    Voltar ao Cardápio
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 leading-tight text-sm md:text-base">{item.name}</h4>
                      <div className="text-brand-orange font-bold text-sm mt-1">R$ {(item.price * (item.quantity/100)).toFixed(2)}</div>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, -25)} 
                          className="p-2 text-gray-400 hover:text-red-500 transition"
                        >
                          {item.quantity <= 25 ? <Trash2 size={16} /> : <Minus size={16} />}
                        </button>
                        <span className="w-10 text-center text-sm font-bold text-gray-800">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 25)}
                          className="p-2 text-gray-400 hover:text-green-500 transition"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-gray-500 text-sm">Subtotal</span>
                   <span className="text-gray-800 font-bold">R$ {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-6 pt-2 border-t border-gray-200">
                  <span className="text-gray-800 font-bold text-lg">Total Estimado</span>
                  <span className="text-3xl font-heading font-bold text-brand-red">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition flex items-center justify-center gap-2 transform active:scale-95"
                >
                  <Phone size={24} />
                  Finalizar no WhatsApp
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  O pedido será enviado para o Sr. Chefão confirmar.
                </p>
              </div>
            )}
          </div>
        </>
      )}

    </div>
  );
};

export default App;