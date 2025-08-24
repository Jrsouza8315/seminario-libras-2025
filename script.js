// Configuração global
const CONFIG = {
  event: {
    name: "II Seminário Acadêmico de LIBRAS",
    date: "15 de Março de 2025",
    location: "IFBA Campus Simões Filho",
    time: "08:00 às 18:00",
  },
  supabase: {
    url: "https://rgwykudhnkvxkbwuggot.supabase.co",
    key: "YOUR_SUPABASE_ANON_KEY", // Substitua pela sua chave anônima do Supabase
  },
  emailjs: {
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
    userId: "YOUR_EMAILJS_USER_ID",
  },
};

// Classe principal do seminário
class SeminarioLibras {
  constructor() {
    this.supabase = null;
    this.inscriptions = [];
    this.init();
  }

  async init() {
    this.setupNavigation();
    this.setupForm();
    this.setupModal();
    this.setupTabs();
    this.setupScrollEffects();
    await this.initSupabase();
    await this.loadInscriptions();
  }

  // ===== NAVEGAÇÃO =====
  setupNavigation() {
    const navToggle = document.getElementById("nav-toggle");
    const navMenu = document.getElementById("nav-menu");
    const header = document.querySelector(".header");

    // Menu mobile
    if (navToggle && navMenu) {
      navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("active");
        navMenu.classList.toggle("active");
      });
    }

    // Scroll header
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });

    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const headerHeight = document.querySelector(".header").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });

          // Fechar menu mobile se estiver aberto
          if (navMenu.classList.contains("active")) {
            navToggle.classList.remove("active");
            navMenu.classList.remove("active");
          }
        }
      });
    });

    // Ativar link ativo no menu
    this.setupActiveMenuLink();
  }

  setupActiveMenuLink() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
      let current = "";
      const headerHeight = document.querySelector(".header").offsetHeight;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.clientHeight;

        if (
          window.scrollY >= sectionTop &&
          window.scrollY < sectionTop + sectionHeight
        ) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  }

  // ===== EFEITOS DE SCROLL =====
  setupScrollEffects() {
    // Animação de entrada para elementos
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, observerOptions);

    // Observar elementos para animação
    document
      .querySelectorAll(".sobre-stats, .timeline-item, .local-card, .info-card")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
      });
  }

  // ===== ABAS DA PROGRAMAÇÃO =====
  setupTabs() {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");

        // Remover classes ativas
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        // Adicionar classes ativas
        btn.classList.add("active");
        document.getElementById(targetTab).classList.add("active");
      });
    });
  }

  // ===== SUPABASE =====
  async initSupabase() {
    try {
      await this.loadSupabaseScript();
      this.supabase = window.supabase.createClient(
        CONFIG.supabase.url,
        CONFIG.supabase.key
      );
      console.log("Supabase inicializado com sucesso");
    } catch (error) {
      console.warn("Erro ao inicializar Supabase:", error);
      this.supabase = null;
    }
  }

  async loadSupabaseScript() {
    if (window.supabase) return;

    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async loadInscriptions() {
    try {
      if (this.supabase) {
        const { data, error } = await this.supabase
          .from("inscriptions")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        this.inscriptions = data || [];
      } else {
        // Fallback para localStorage
        const stored = localStorage.getItem("seminario_inscriptions");
        this.inscriptions = stored ? JSON.parse(stored) : [];
      }
    } catch (error) {
      console.warn("Erro ao carregar inscrições:", error);
      const stored = localStorage.getItem("seminario_inscriptions");
      this.inscriptions = stored ? JSON.parse(stored) : [];
    }
  }

  // ===== FORMULÁRIO =====
  setupForm() {
    const form = document.getElementById("inscricaoForm");
    if (!form) return;

    // Campos condicionais
    this.setupConditionalFields();

    // Validação em tempo real
    this.setupRealTimeValidation();

    // Máscara de telefone
    this.setupPhoneMask();

    // Submit do formulário
    form.addEventListener("submit", (e) => this.handleFormSubmit(e));
  }

  setupConditionalFields() {
    const areaSelect = document.getElementById("area");
    const estudanteGroup = document.querySelector(".estudante-group");
    const cursoInput = document.getElementById("curso");

    const acessibilidadeRadios = document.querySelectorAll(
      'input[name="acessibilidade_tipo"]'
    );
    const acessibilidadeDetalhes = document.querySelector(
      ".acessibilidade-detalhes"
    );
    const acessibilidadeEspecifica = document.getElementById(
      "acessibilidade_especifica"
    );

    // Campo curso para estudantes
    if (areaSelect && estudanteGroup && cursoInput) {
      areaSelect.addEventListener("change", () => {
        const isEstudante = areaSelect.value === "Estudante";
        estudanteGroup.style.display = isEstudante ? "flex" : "none";
        cursoInput.required = isEstudante;

        if (!isEstudante) {
          cursoInput.value = "";
        }
      });
    }

    // Campo especificação de acessibilidade
    if (
      acessibilidadeRadios.length > 0 &&
      acessibilidadeDetalhes &&
      acessibilidadeEspecifica
    ) {
      acessibilidadeRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
          const needsAccessibility = radio.value === "sim";
          acessibilidadeDetalhes.style.display = needsAccessibility
            ? "flex"
            : "none";
          acessibilidadeEspecifica.required = needsAccessibility;

          if (!needsAccessibility) {
            acessibilidadeEspecifica.value = "";
          }
        });
      });
    }
  }

  setupRealTimeValidation() {
    const inputs = document.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );

    inputs.forEach((input) => {
      input.addEventListener("blur", () => this.validateField(input));
      input.addEventListener("input", () => this.clearFieldError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = "";

    // Remover erro anterior
    this.clearFieldError(field);

    // Validações específicas
    switch (field.type) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Digite um e-mail válido";
        }
        break;

      case "tel":
        const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMessage = "Digite um telefone válido (XX) XXXXX-XXXX";
        }
        break;

      case "text":
        if (field.id === "curso" && field.required) {
          if (value.length < 3) {
            isValid = false;
            errorMessage = "Digite pelo menos 3 caracteres";
          }
        }
        break;

      default:
        if (field.tagName === "TEXTAREA" && field.required) {
          if (value.length < 10) {
            isValid = false;
            errorMessage = "Digite pelo menos 10 caracteres";
          }
        }
        break;
    }

    // Validação geral de campo obrigatório
    if (field.required && !value) {
      isValid = false;
      errorMessage = "Este campo é obrigatório";
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("error");

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.textContent = message;

    field.parentNode.appendChild(errorDiv);
  }

  clearFieldError(field) {
    field.classList.remove("error");

    const errorDiv = field.parentNode.querySelector(".error-message");
    if (errorDiv) {
      errorDiv.remove();
    }
  }

  setupPhoneMask() {
    const phoneInput = document.getElementById("telefone");
    if (!phoneInput) return;

    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "");

      if (value.length <= 11) {
        value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
        value = value.replace(/(\d)(\d{4})$/, "$1-$2");
        e.target.value = value;
      }
    });
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validar todos os campos
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    if (!isValid) {
      this.showNotification(
        "Por favor, corrija os erros no formulário",
        "error"
      );
      return;
    }

    // Coletar dados do formulário
    const inscriptionData = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      instituicao: formData.get("instituicao"),
      area: formData.get("area"),
      curso: formData.get("curso") || null,
      sexo: formData.get("sexo"),
      experiencia: formData.get("experiencia"),
      acessibilidade_tipo: formData.get("acessibilidade_tipo"),
      acessibilidade_especifica:
        formData.get("acessibilidade_especifica") || null,
      autoriza_imagem: formData.get("autoriza_imagem") === "on",
      newsletter: formData.get("newsletter") === "on",
      codigo: this.generateCode(),
      created_at: new Date().toISOString(),
    };

    try {
      // Salvar no Supabase
      if (this.supabase) {
        const { data, error } = await this.supabase
          .from("inscriptions")
          .insert([inscriptionData])
          .select();

        if (error) throw error;

        this.inscriptions.unshift(data[0]);
        console.log("Inscrição salva no Supabase:", data[0]);
      }

      // Salvar no localStorage como backup
      localStorage.setItem(
        "seminario_inscriptions",
        JSON.stringify(this.inscriptions)
      );

      // Limpar formulário
      form.reset();

      // Mostrar modal de confirmação
      this.showConfirmationModal(inscriptionData);

      // Enviar e-mail de confirmação
      await this.sendConfirmationEmail(inscriptionData);

      this.showNotification("Inscrição realizada com sucesso!", "success");
    } catch (error) {
      console.error("Erro ao salvar inscrição:", error);
      this.showNotification(
        "Erro ao processar inscrição. Tente novamente.",
        "error"
      );
    }
  }

  generateCode() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `LIBRAS-${timestamp}-${random}`.toUpperCase();
  }

  // ===== MODAL =====
  setupModal() {
    const modal = document.getElementById("confirmModal");
    const closeBtn = document.getElementById("closeModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const downloadBtn = document.getElementById("downloadTicket");

    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.hideModal());
    }

    if (closeModalBtn) {
      closeModalBtn.addEventListener("click", () => this.hideModal());
    }

    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => this.downloadTicket());
    }

    // Fechar modal ao clicar fora
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.hideModal();
        }
      });
    }
  }

  showConfirmationModal(data) {
    const modal = document.getElementById("confirmModal");
    const ticketNome = document.getElementById("ticketNome");
    const ticketCodigo = document.getElementById("ticketCodigo");
    const ticketData = document.getElementById("ticketData");
    const qrCodeContainer = document.getElementById("qrCode");

    if (ticketNome) ticketNome.textContent = data.nome;
    if (ticketCodigo) ticketCodigo.textContent = data.codigo;
    if (ticketData) ticketData.textContent = CONFIG.event.date;

    // Gerar QR Code
    if (qrCodeContainer && window.QRCode) {
      qrCodeContainer.innerHTML = "";
      new QRCode(qrCodeContainer, {
        text: JSON.stringify({
          nome: data.nome,
          codigo: data.codigo,
          evento: CONFIG.event.name,
          data: CONFIG.event.date,
        }),
        width: 128,
        height: 128,
        colorDark: "#00674D",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H,
      });
    }

    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  hideModal() {
    const modal = document.getElementById("confirmModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  downloadTicket() {
    const ticketData = {
      nome: document.getElementById("ticketNome")?.textContent,
      codigo: document.getElementById("ticketCodigo")?.textContent,
      data: document.getElementById("ticketData")?.textContent,
      evento: CONFIG.event.name,
      local: CONFIG.event.location,
    };

    const ticketContent = `
            INGRESSO - ${CONFIG.event.name}
            
            Nome: ${ticketData.nome}
            Código: ${ticketData.codigo}
            Data: ${ticketData.data}
            Local: ${ticketData.local}
            
            Apresente este ingresso no credenciamento.
        `;

    const blob = new Blob([ticketContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ingresso-${ticketData.codigo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ===== E-MAIL =====
  async sendConfirmationEmail(data) {
    try {
      // Log dos dados para debug
      console.log("Dados para envio de e-mail:", {
        nome: data.nome,
        email: data.email,
        codigo: data.codigo,
        evento: CONFIG.event.name,
        data: CONFIG.event.date,
        local: CONFIG.event.location,
      });

      // Aqui você pode implementar o envio real de e-mail
      // Por exemplo, usando EmailJS ou uma API de e-mail

      console.log("E-mail de confirmação preparado para envio");
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
    }
  }

  // ===== NOTIFICAÇÕES =====
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Mostrar notificação
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Remover notificação
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  new SeminarioLibras();
});

// ===== FUNÇÕES UTILITÁRIAS =====
function formatDate(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

function formatTime(time) {
  return time.replace(":", "h") + "min";
}
