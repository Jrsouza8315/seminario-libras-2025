// Configurações globais
const CONFIG = {
  eventName: "II Seminário Acadêmico de LIBRAS",
  eventDate: "05 de Setembro de 2025 às 13h00",
  eventLocation: "IFBA - Campus Simões Filho",
  eventRoom: "Sala Audio 02 do pavilhão acadêmico",
  maxCapacity: 200,
  emailService: {
    // Configuração para EmailJS (você precisará criar uma conta em emailjs.com)
    serviceId: "YOUR_SERVICE_ID",
    templateId: "YOUR_TEMPLATE_ID",
    userId: "YOUR_USER_ID",
  },
  supabase: {
    url: "https://rgwykudhnkvxkbwuggot.supabase.co",
    key: "YOUR_SUPABASE_ANON_KEY", // Substitua pela sua chave anônima do Supabase
  },
};

// Classe principal da aplicação
class SeminarioLibras {
  constructor() {
    this.form = document.getElementById("inscricao-form");
    this.modal = document.getElementById("confirmacao-modal");
    this.inscriptions = [];
    this.supabase = null;
    this.init();
  }

  async init() {
    await this.initSupabase();
    await this.loadInscriptions();
    this.setupNavigation();
    this.setupForm();
    this.setupModal();
    this.setupAnimations();
    this.setupMap();
    this.updateInscriptionCount();
  }

  // Inicializar Supabase
  async initSupabase() {
    try {
      // Carregar Supabase JS
      if (typeof createClient === "undefined") {
        await this.loadSupabaseScript();
      }

      this.supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.key);
      console.log("Supabase inicializado com sucesso");
    } catch (error) {
      console.error("Erro ao inicializar Supabase:", error);
      this.showNotification(
        "Erro de conexão com o banco de dados. Usando armazenamento local.",
        "error"
      );
    }
  }

  // Carregar script do Supabase
  loadSupabaseScript() {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Carregar inscrições do banco
  async loadInscriptions() {
    try {
      if (this.supabase) {
        const { data, error } = await this.supabase
          .from("inscriptions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Erro ao carregar inscrições:", error);
          this.inscriptions = JSON.parse(
            localStorage.getItem("inscriptions") || "[]"
          );
        } else {
          this.inscriptions = data || [];
          // Sincronizar com localStorage como backup
          localStorage.setItem(
            "inscriptions",
            JSON.stringify(this.inscriptions)
          );
        }
      } else {
        // Fallback para localStorage
        this.inscriptions = JSON.parse(
          localStorage.getItem("inscriptions") || "[]"
        );
      }
    } catch (error) {
      console.error("Erro ao carregar inscrições:", error);
      this.inscriptions = JSON.parse(
        localStorage.getItem("inscriptions") || "[]"
      );
    }
  }

  // Configuração da navegação
  setupNavigation() {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Toggle do menu mobile
    if (navToggle) {
      navToggle.addEventListener("click", () => {
        const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !isExpanded);
        navMenu.classList.toggle("active");
      });
    }

    // Smooth scroll para links de navegação
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Fecha o menu mobile se estiver aberto
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            navToggle.setAttribute("aria-expanded", "false");
          }
        }
      });
    });

    // Header scroll effect
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 100) {
        header.style.background = "rgba(26, 77, 46, 0.98)";
      } else {
        header.style.background = "rgba(26, 77, 46, 0.95)";
      }
    });
  }

  // Configuração do formulário
  setupForm() {
    if (!this.form) return;

    // Máscara para telefone
    const telefoneInput = document.getElementById("telefone");
    if (telefoneInput) {
      telefoneInput.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
          value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
          e.target.value = value;
        }
      });
    }

    // Lógica para campo de estudante
    const areaSelect = document.getElementById("area");
    const estudanteGroup = document.getElementById("estudante-group");
    const cursoInput = document.getElementById("curso");

    if (areaSelect && estudanteGroup && cursoInput) {
      areaSelect.addEventListener("change", () => {
        if (areaSelect.value === "educacao") {
          estudanteGroup.style.display = "block";
          cursoInput.setAttribute("required", "required");
        } else {
          estudanteGroup.style.display = "none";
          cursoInput.removeAttribute("required");
          cursoInput.value = "";
        }
      });
    }

    // Lógica para acessibilidade
    const acessibilidadeRadios = document.querySelectorAll(
      'input[name="acessibilidade_tipo"]'
    );
    const acessibilidadeDetalhes = document.getElementById(
      "acessibilidade-detalhes"
    );
    const acessibilidadeEspecifica = document.getElementById(
      "acessibilidade_especifica"
    );

    acessibilidadeRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        if (radio.value === "sim") {
          acessibilidadeDetalhes.style.display = "block";
          acessibilidadeEspecifica.setAttribute("required", "required");
        } else {
          acessibilidadeDetalhes.style.display = "none";
          acessibilidadeEspecifica.removeAttribute("required");
          acessibilidadeEspecifica.value = "";
        }
      });
    });

    // Validação em tempo real
    const inputs = this.form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });

    // Submit do formulário
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleFormSubmit();
    });
  }

  // Validação de campos
  validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = "";

    // Validação específica por tipo de campo
    switch (field.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          errorMessage = "Por favor, insira um e-mail válido.";
        }
        break;
      case "text":
        if (field.value.trim().length < 2) {
          isValid = false;
          errorMessage = "Este campo deve ter pelo menos 2 caracteres.";
        }
        break;
      case "textarea":
        if (field.value.trim().length < 10) {
          isValid = false;
          errorMessage =
            "Por favor, forneça mais detalhes (mínimo 10 caracteres).";
        }
        break;
    }

    // Validação específica para campos especiais
    if (field.id === "curso" && field.hasAttribute("required")) {
      if (field.value.trim().length < 3) {
        isValid = false;
        errorMessage = "Por favor, informe o nome do curso.";
      }
    }

    // Validação geral de campo obrigatório
    if (field.hasAttribute("required") && !field.value.trim()) {
      isValid = false;
      errorMessage = "Este campo é obrigatório.";
    }

    // Exibir ou limpar erro
    if (errorElement) {
      if (!isValid) {
        errorElement.textContent = errorMessage;
        field.classList.add("error");
      } else {
        errorElement.textContent = "";
        field.classList.remove("error");
      }
    }

    return isValid;
  }

  // Limpar erro do campo
  clearFieldError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (errorElement) {
      errorElement.textContent = "";
      field.classList.remove("error");
    }
  }

  // Validação completa do formulário
  validateForm() {
    const requiredFields = this.form.querySelectorAll(
      "input[required], select[required]"
    );
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  // Manipulação do envio do formulário
  async handleFormSubmit() {
    if (!this.validateForm()) {
      this.showNotification(
        "Por favor, corrija os erros no formulário.",
        "error"
      );
      return;
    }

    // Verificar capacidade
    if (this.inscriptions.length >= CONFIG.maxCapacity) {
      this.showNotification(
        "Desculpe, as inscrições estão esgotadas.",
        "error"
      );
      return;
    }

    // Verificar se email já está inscrito
    const email = document.getElementById("email").value;
    if (this.inscriptions.some((inscription) => inscription.email === email)) {
      this.showNotification("Este e-mail já está inscrito no evento.", "error");
      return;
    }

    // Mostrar loading
    const submitButton = this.form.querySelector(".submit-button");
    const buttonText = submitButton.querySelector(".button-text");
    const buttonLoading = submitButton.querySelector(".button-loading");

    buttonText.style.display = "none";
    buttonLoading.style.display = "flex";
    submitButton.disabled = true;

    try {
      // Coletar dados do formulário
      const formData = new FormData(this.form);
      const inscriptionData = {
        id: this.generateId(),
        nome: formData.get("nome"),
        email: formData.get("email"),
        telefone: formData.get("telefone") || "",
        instituicao: formData.get("instituicao") || "",
        area: formData.get("area") || "",
        experiencia: formData.get("experiencia") || "",
        curso: formData.get("curso") || "",
        sexo: formData.get("sexo") || "",
        acessibilidade_tipo: formData.get("acessibilidade_tipo") || "nenhuma",
        acessibilidade_especifica:
          formData.get("acessibilidade_especifica") || "",
        autoriza_imagem: formData.get("autoriza_imagem") === "on",
        newsletter: formData.get("newsletter") === "on",
        codigo: this.generateCode(),
        created_at: new Date().toISOString(),
      };

      // Salvar no Supabase
      if (this.supabase) {
        const { data, error } = await this.supabase
          .from("inscriptions")
          .insert([inscriptionData])
          .select();

        if (error) {
          console.error("Erro ao salvar no Supabase:", error);
          throw new Error("Erro ao salvar inscrição no banco de dados");
        }

        // Adicionar à lista local
        this.inscriptions.unshift(data[0]);
      } else {
        // Fallback para localStorage
        this.inscriptions.unshift(inscriptionData);
        localStorage.setItem("inscriptions", JSON.stringify(this.inscriptions));
      }

      // Enviar e-mail de confirmação
      await this.sendConfirmationEmail(inscriptionData);

      // Mostrar modal de confirmação
      this.showConfirmationModal(inscriptionData);

      // Limpar formulário
      this.form.reset();

      // Atualizar contador
      this.updateInscriptionCount();

      this.showNotification("Inscrição realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao processar inscrição:", error);
      this.showNotification(
        "Erro ao processar inscrição. Tente novamente.",
        "error"
      );
    } finally {
      // Restaurar botão
      buttonText.style.display = "flex";
      buttonLoading.style.display = "none";
      submitButton.disabled = false;
    }
  }

  // Gerar ID único
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Gerar código do ingresso
  generateCode() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Enviar e-mail de confirmação
  async sendConfirmationEmail(inscriptionData) {
    try {
      // Se você tiver EmailJS configurado, descomente o código abaixo
      /*
            if (typeof emailjs !== 'undefined') {
                const templateParams = {
                    to_email: inscriptionData.email,
                    to_name: inscriptionData.nome,
                    event_name: CONFIG.eventName,
                    event_date: CONFIG.eventDate,
                    event_location: CONFIG.eventLocation,
                    inscription_code: inscriptionData.codigo
                };

                await emailjs.send(
                    CONFIG.emailService.serviceId,
                    CONFIG.emailService.templateId,
                    templateParams,
                    CONFIG.emailService.userId
                );
            }
            */

      // Simulação de envio de e-mail (para demonstração)
      console.log("E-mail de confirmação enviado para:", inscriptionData.email);
      console.log("Dados da inscrição:", {
        nome: inscriptionData.nome,
        email: inscriptionData.email,
        area: inscriptionData.area,
        curso: inscriptionData.curso,
        acessibilidade: inscriptionData.acessibilidade_tipo,
        autoriza_imagem: inscriptionData.autoriza_imagem,
        newsletter: inscriptionData.newsletter,
      });

      // Em produção, você pode usar serviços como:
      // - EmailJS
      // - SendGrid
      // - AWS SES
      // - Nodemailer (backend)
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      // Não falhar a inscrição se o e-mail falhar
    }
  }

  // Configuração do modal
  setupModal() {
    const modalClose = this.modal.querySelector(".modal-close");
    const modalOverlay = this.modal;

    // Fechar modal
    if (modalClose) {
      modalClose.addEventListener("click", () => this.closeModal());
    }

    // Fechar ao clicar fora
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        this.closeModal();
      }
    });

    // Fechar com ESC
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("active")) {
        this.closeModal();
      }
    });
  }

  // Mostrar modal de confirmação
  showConfirmationModal(inscriptionData) {
    // Preencher dados no modal
    document.getElementById("ingresso-nome").textContent = inscriptionData.nome;
    document.getElementById("ingresso-codigo").textContent =
      inscriptionData.codigo;

    // Gerar QR Code
    this.generateQRCode(inscriptionData);

    // Mostrar modal
    this.modal.classList.add("active");
    this.modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    // Focus no modal para acessibilidade
    setTimeout(() => {
      this.modal.querySelector(".modal-content").focus();
    }, 100);
  }

  // Fechar modal
  closeModal() {
    this.modal.classList.remove("active");
    this.modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Gerar QR Code
  generateQRCode(inscriptionData) {
    const qrContainer = document.getElementById("qr-code");
    qrContainer.innerHTML = "";

    const qrData = JSON.stringify({
      id: inscriptionData.id,
      nome: inscriptionData.nome,
      codigo: inscriptionData.codigo,
      evento: CONFIG.eventName,
      data: CONFIG.eventDate,
    });

    if (typeof QRCode !== "undefined") {
      new QRCode(qrContainer, {
        text: qrData,
        width: 128,
        height: 128,
        colorDark: "#1a4d2e",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    } else {
      // Fallback se QRCode não estiver disponível
      qrContainer.innerHTML = `
                <div style="width: 128px; height: 128px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; border: 2px dashed #ccc;">
                    <span style="color: #666; font-size: 12px; text-align: center;">QR Code<br>Gerado</span>
                </div>
            `;
    }
  }

  // Download do ingresso
  downloadIngresso() {
    const nome = document.getElementById("ingresso-nome").textContent;
    const codigo = document.getElementById("ingresso-codigo").textContent;

    // Criar conteúdo do ingresso
    const ingressoContent = `
            II SEMINÁRIO ACADÊMICO DE LIBRAS
            =================================
            
            Nome: ${nome}
            Código: ${codigo}
            Data: ${CONFIG.eventDate}
            Local: ${CONFIG.eventLocation}
            Sala: ${CONFIG.eventRoom}
            
            =================================
            Apresente este ingresso no credenciamento
        `;

    // Criar blob e download
    const blob = new Blob([ingressoContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ingresso-${codigo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification("Ingresso baixado com sucesso!", "success");
  }

  // Configuração de animações
  setupAnimations() {
    // Intersection Observer para animações de entrada
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in-up");
        }
      });
    }, observerOptions);

    // Observar elementos para animação
    const animateElements = document.querySelectorAll(
      ".section, .timeline-item, .stat-item"
    );
    animateElements.forEach((el) => observer.observe(el));

    // Animação das mãos
    this.setupHandsAnimation();
  }

  // Animação das mãos
  setupHandsAnimation() {
    const hands = document.querySelectorAll(".hand");
    hands.forEach((hand, index) => {
      hand.style.animationDelay = `${index * 0.2}s`;
    });
  }

  // Configuração do mapa
  setupMap() {
    // Aqui você pode integrar com Google Maps, OpenStreetMap, etc.
    // Por enquanto, vamos usar um placeholder
    const map = document.getElementById("map");
    if (map) {
      map.addEventListener("click", () => this.openDirections());
    }
  }

  // Abrir direções
  openDirections() {
    const address = encodeURIComponent(
      `${CONFIG.eventLocation}, Simões Filho, BA`
    );
    const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
    window.open(url, "_blank");
  }

  // Atualizar contador de inscrições
  updateInscriptionCount() {
    const statElement = document.querySelector(
      ".stat-item:last-child .stat-number"
    );
    if (statElement) {
      const remaining = CONFIG.maxCapacity - this.inscriptions.length;
      statElement.textContent = remaining;
    }
  }

  // Mostrar notificação
  showNotification(message, type = "info") {
    // Criar elemento de notificação
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${
                  type === "success"
                    ? "check-circle"
                    : type === "error"
                    ? "exclamation-circle"
                    : "info-circle"
                }"></i>
                <span>${message}</span>
                <button class="notification-close" aria-label="Fechar notificação">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

    // Adicionar estilos
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${
              type === "success"
                ? "#10b981"
                : type === "error"
                ? "#ef4444"
                : "#3b82f6"
            };
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

    // Adicionar ao DOM
    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Configurar fechamento
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });

    // Auto-remover após 5 segundos
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
}

// Funções globais para uso no HTML
window.openDirections = function () {
  if (window.seminarioApp) {
    window.seminarioApp.openDirections();
  }
};

window.downloadIngresso = function () {
  if (window.seminarioApp) {
    window.seminarioApp.downloadIngresso();
  }
};

window.closeModal = function () {
  if (window.seminarioApp) {
    window.seminarioApp.closeModal();
  }
};

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  window.seminarioApp = new SeminarioLibras();
});

// Service Worker para funcionalidades offline (opcional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Adicionar estilos CSS para notificações
const notificationStyles = document.createElement("style");
notificationStyles.textContent = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    .form-group.error input,
    .form-group.error select {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(26, 77, 46, 0.98);
        padding: 1rem;
        gap: 1rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;
document.head.appendChild(notificationStyles);
