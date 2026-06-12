const storageKey = "report-ai-demo-state-v1";
const sidebarStateKey = "report-ai-sidebar-collapsed";

const passwordPolicy = {
  minLength: 8,
  maxLength: 72,
  maxLoginAttempts: 5,
  lockoutMinutes: 2,
};

const checkinRules = {
  defaultRadiusMeters: 100,
  maxRadiusMeters: 100,
  maxAccuracyMeters: 100,
  duplicateWindowMinutes: 2,
  geolocationTimeoutMs: 15000,
};

const demoUsers = {
  alexandre: {
    name: "Alexandre",
    email: "alexandre_cp@hotmail.com",
    password: "Ms@12345",
    role: "Super Admin",
    status: "Ativo",
  },
  admin: {
    name: "Admin Report AI",
    email: "admin@reportai.com",
    password: "Mserv@2026",
    role: "Super Admin",
    status: "Ativo",
  },
  supervisor: {
    name: "Carla Revisora",
    email: "revisor@reportai.com",
    password: "Equipe@2026",
    role: "Revisor",
    status: "Ativo",
  },
};

const appRoutePrefix = "painel";
const appRoutes = {
  dashboard: "dashboard",
  funcionarios: "reports",
  empreendimentos: "reports",
  eventos: "reports",
  frequencia: "reports",
  ponto: "reports",
  atestados: "reports",
  faltas: "reports",
  relatorios: "reports",
  leads: "leads",
  calendario: "reports",
  marcas: "brands",
  usuarios: "users",
  configuracoes: "settings",
  logs: "logs",
};
const appViewRoutes = Object.fromEntries(
  Object.entries(appRoutes).map(([route, view]) => [view, route]),
);
appViewRoutes.reports = "relatorios";

const initialUsers = Object.values(demoUsers).map((user, index) => ({
  id: index + 1,
  ...user,
  createdAt: today(),
  lastLoginAt: null,
}));

const initialState = {
  users: structuredClone(initialUsers),
  resetTokens: [],
  mailbox: [],
  leads: [],
  security: {
    loginAttempts: {},
  },
  employees: [
    {
      id: 1,
      name: "Ana Beatriz Lima",
      cpf: "529.982.247-25",
      phone: "(83) 98888-2101",
      role: "Auxiliar de limpeza",
      registration: "MS-001",
      client: "Condomínio Atlântico",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Marcos Vinícius Rocha",
      cpf: "153.509.460-56",
      phone: "(83) 98888-2102",
      role: "Encarregado de equipe",
      registration: "MS-002",
      client: "Centro Empresarial Tambiá",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Juliana Freitas Alves",
      cpf: "390.533.447-05",
      phone: "(83) 98888-2103",
      role: "Auxiliar de limpeza",
      registration: "MS-003",
      client: "Projeto Comercial Nordeste",
      status: "Atestado",
    },
    {
      id: 4,
      name: "Roberto Silva Santos",
      cpf: "875.214.630-80",
      phone: "(83) 98888-2104",
      role: "Auxiliar de limpeza",
      registration: "MS-004",
      client: "Condomínio Atlântico",
      status: "Férias",
    },
    {
      id: 5,
      name: "Patrícia Gomes Nunes",
      cpf: "704.172.890-06",
      phone: "(83) 98888-2105",
      role: "Apoio operacional",
      registration: "MS-005",
      client: "Hospital Empresarial Sul",
      status: "Ativo",
    },
  ],
  clients: [
    {
      id: 1,
      code: "EMP-001",
      name: "Condomínio Atlântico",
      type: "Condomínio",
      address: "Manaíra, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 12,
      coordinates: { lat: -7.1026, lng: -34.8333 },
      allowedRadiusMeters: 100,
    },
    {
      id: 2,
      code: "EMP-002",
      name: "Centro Empresarial Tambiá",
      type: "Empresa",
      address: "Centro, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 8,
      coordinates: { lat: -7.1195, lng: -34.8829 },
      allowedRadiusMeters: 100,
    },
    {
      id: 3,
      code: "EMP-003",
      name: "Projeto Comercial Nordeste",
      type: "Projeto",
      address: "Unidade comercial, João Pessoa - PB",
      manager: "Admin MS",
      activeEmployees: 18,
      coordinates: { lat: -7.1577, lng: -34.8056 },
      allowedRadiusMeters: 100,
    },
    {
      id: 4,
      code: "EMP-004",
      name: "Hospital Empresarial Sul",
      type: "Empresa",
      address: "Bancários, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 4,
      coordinates: { lat: -7.1518, lng: -34.8409 },
      allowedRadiusMeters: 100,
    },
  ],
  qrCodes: [
    {
      id: "QR-LOCAL-001",
      companyId: "MS-MULTSERV",
      clientCode: "EMP-001",
      client: "Condomínio Atlântico",
      token: "MS-QR-EMP-001-2026",
      description: "QR físico da recepção do Condomínio Atlântico",
      active: true,
      createdAt: today(),
    },
    {
      id: "QR-LOCAL-002",
      companyId: "MS-MULTSERV",
      clientCode: "EMP-002",
      client: "Centro Empresarial Tambiá",
      token: "MS-QR-EMP-002-2026",
      description: "QR físico da portaria do Centro Empresarial Tambiá",
      active: true,
      createdAt: today(),
    },
    {
      id: "QR-LOCAL-003",
      companyId: "MS-MULTSERV",
      clientCode: "EMP-003",
      client: "Projeto Comercial Nordeste",
      token: "MS-QR-EMP-003-2026",
      description: "QR físico de apoio do Projeto Comercial Nordeste",
      active: true,
      createdAt: today(),
    },
    {
      id: "QR-LOCAL-004",
      companyId: "MS-MULTSERV",
      clientCode: "EMP-004",
      client: "Hospital Empresarial Sul",
      token: "MS-QR-EMP-004-2026",
      description: "QR físico da entrada de serviço do Hospital Empresarial Sul",
      active: true,
      createdAt: today(),
    },
  ],
  checkinAttempts: [],
  brandSettings: {
    speed: 36,
  },
  brandLogos: [
    {
      id: 1,
      name: "Dashboard em tempo real",
      initials: "BI",
      logoUrl: "",
      website: "",
      color: "#006783",
      active: true,
      order: 1,
    },
    {
      id: 2,
      name: "PDF do painel",
      initials: "PDF",
      logoUrl: "",
      website: "",
      color: "#16a9d2",
      active: true,
      order: 2,
    },
    {
      id: 3,
      name: "Imagem do dashboard",
      initials: "IMG",
      logoUrl: "",
      website: "",
      color: "#2f8f83",
      active: true,
      order: 3,
    },
    {
      id: 4,
      name: "CSV analítico",
      initials: "CSV",
      logoUrl: "",
      website: "",
      color: "#f2b531",
      active: true,
      order: 4,
    },
    {
      id: 5,
      name: "XLSX operacional",
      initials: "XLS",
      logoUrl: "",
      website: "",
      color: "#34495e",
      active: true,
      order: 5,
    },
    {
      id: 6,
      name: "API do Acesse",
      initials: "API",
      logoUrl: "",
      website: "",
      color: "#0b7a9c",
      active: true,
      order: 6,
    },
  ],
  events: [
    {
      id: 1,
      name: "Relatório Comercial Nordeste",
      client: "Projeto Comercial Nordeste",
      date: nextDate(1),
      type: "Comercial",
      team: [1, 3, 5],
      status: "Programado",
    },
    {
      id: 2,
      name: "Mutirão áreas comuns",
      client: "Condomínio Atlântico",
      date: nextDate(3),
      type: "Condomínio",
      team: [1, 4],
      status: "Programado",
    },
  ],
  points: [
    {
      id: 1,
      employee: "Ana Beatriz Lima",
      client: "Condomínio Atlântico",
      date: today(),
      in: "07:00",
      out: "16:00",
      status: "Ponto normal",
    },
    {
      id: 2,
      employee: "Marcos Vinícius Rocha",
      client: "Centro Empresarial Tambiá",
      date: today(),
      in: "08:14",
      out: "",
      status: "Atraso",
    },
  ],
  certificates: [
    {
      id: 1,
      employee: "Juliana Freitas Alves",
      start: today(),
      end: nextDate(2),
      file: "atestado-juliana.pdf",
      note: "Lançado pelo supervisor",
      status: "Registrado",
    },
  ],
  reportAi: {
    selectedEventId: 1,
    selectedScreen: "events",
    events: [
      {
        id: 1,
        eventName: "Resumo comercial mensal",
        clientName: "Diretoria Comercial",
        companyName: "Acesse Tecnologia Operacional",
        cnpj: "00.000.000/0001-00",
        location: "João Pessoa - PB",
        startDate: "2026-05-23",
        endDate: "2026-05-24",
        days: 2,
        agendas: "Receita, vendas, atendimento",
        gates: "CRM, ERP e planilha de fechamento",
        devices: "Power BI, Excel, PDF de fechamento e sistema interno",
        mainMethod: "Comercial",
        technicalOwner: "Alexandre",
        status: "Com inconsistência",
        createdAt: today(),
      },
    ],
    attachments: [
      {
        id: 1,
        eventId: 1,
        name: "dashboard-comercial-mensal.pdf",
        fileType: "PDF",
        relation: "Dashboard principal",
        sourceType: "Upload manual",
        description: "PDF do dashboard com indicadores consolidados da operação.",
        uploadedBy: "Alexandre",
        uploadedAt: today(),
      },
      {
        id: 2,
        eventId: 1,
        name: "variacao-por-periodo.png",
        fileType: "Imagem",
        relation: "Evidência operacional",
        sourceType: "Upload manual",
        description: "Imagem do gráfico de variação por período com alerta no marco crítico.",
        uploadedBy: "Alexandre",
        uploadedAt: today(),
      },
    ],
    metrics: {
      1: {
        registeredPublic: 4307,
        expectedPublic: 4092,
        totalAccesses: 2019,
        uniqueAccesses: 2019,
        occupancyPercent: 47,
        absentPublic: 2288,
        peakTime: "18:00",
        peakEntries: 375,
        peakSpeed: "6 registros/min",
        facialAccesses: 1988,
        qrCardAccesses: 31,
        otherAccesses: 0,
        credentialedWithPhoto: 3960,
        credentialedWithoutPhoto: 347,
        notificationsDelivered: 3850,
        notificationsFailed: 201,
        notificationTotal: 4051,
        deviceNotes: "Uma leitora 5532 MF apresentou instabilidade pontual no segundo dia.",
        dayBreakdown: [
          { date: "2026-05-23", accesses: 1048, peakTime: "18:00", peakEntries: 182 },
          { date: "2026-05-24", accesses: 1262, peakTime: "18:00", peakEntries: 193 },
        ],
      },
    },
    reports: [
      {
        id: 1,
        eventId: 1,
        reportType: "Relatório Detalhado",
        currentVersion: "v1.0",
        status: "Com inconsistência",
        recommendations:
          "Confirmar a quantidade oficial de períodos analisados e solicitar exportação analítica com registros por período, fonte e categoria antes da versão final.",
        versions: [
          {
            id: 1,
            versionNumber: "v1.0",
            qualityScore: 7.9,
            status: "Com inconsistência",
            createdBy: "Alexandre",
            createdAt: today(),
            changes: "Gerado automaticamente a partir de dashboard e anexos.",
            filePdfUrl: "resumo-comercial-mensal-v1.pdf",
            fileDocxUrl: "resumo-comercial-mensal-v1.docx",
            fileSheetUrl: "resumo-comercial-mensal-v1.xlsx",
          },
        ],
      },
    ],
  },
};

const reportAiScreenLabels = {
  events: "Operações",
  event: "Cadastro",
  uploads: "Uploads",
  extraction: "Dados",
  audit: "Auditoria",
  generation: "Geração",
  versions: "Versões",
};

let state = ensureStateShape(loadState());
let activeUser = demoUsers.alexandre;
let calendarCursor = new Date();
let employeeFormMode = "create";
let editingEmployeeId = null;
let pendingDeleteEmployeeId = null;
let clientFormMode = "create";
let editingClientId = null;
let pendingDeleteClientId = null;
let leadFormMode = "create";
let editingLeadId = null;
let selectedLeadId = null;
let expandedFrequencyEmployeeId = null;
let checkinSession = {
  employee: null,
  cpf: "",
  qrPayload: null,
  qrCode: null,
  stream: null,
  scanTimer: null,
  scannerActive: false,
  registering: false,
};

const publicSite = document.querySelector("#publicSite");
const loginScreen = document.querySelector("#loginScreen");
const appShell = document.querySelector("#appShell");
const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const appMenuButton = document.querySelector("#appMenuButton");
const appMenuOverlay = document.querySelector("#appMenuOverlay");
const sidebarCollapseButton = document.querySelector("#sidebarCollapseButton");
const mobileFooterNav = document.querySelector("#mobileFooterNav");
const loginForm = document.querySelector("#loginForm");
const employeeModal = document.querySelector("#employeeModal");
const employeeDetailModal = document.querySelector("#employeeDetailModal");
const deleteEmployeeModal = document.querySelector("#deleteEmployeeModal");
const clientModal = document.querySelector("#clientModal");
const deleteClientModal = document.querySelector("#deleteClientModal");
const checkinModal = document.querySelector("#checkinModal");
const calendarDayModal = document.querySelector("#calendarDayModal");

document.addEventListener("DOMContentLoaded", () => {
  saveState();
  setupPublicSite();
  setupLogin();
  setupAppNavigation();
  setupForms();
  setupPasswordRecovery();
  setupUserManagement();
  setupBrandManagement();
  setupReportAi();
  renderAll();
});

function setupPublicSite() {
  const updateHeaderState = () => {
    document.querySelector(".lp-header")?.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateHeaderState);
  window.addEventListener("hashchange", () => setActiveSiteNavLink(window.location.hash));
  updateHeaderState();
  setupSiteNavObserver();
  setActiveSiteNavLink(window.location.hash);
  setupContactForm();
  setupHeroDashboardInteraction();

  const setPublicMenuOpen = (isOpen) => {
    siteNav.classList.toggle("open", isOpen);
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  menuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    setPublicMenuOpen(!siteNav.classList.contains("open"));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target === siteNav) {
      setPublicMenuOpen(false);
    }
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setActiveSiteNavLink(link.getAttribute("href"));
      setPublicMenuOpen(false);
    });
  });

  document.querySelectorAll("[data-open-login]").forEach((button) => {
    button.addEventListener("click", () => {
      setPublicMenuOpen(false);
      openLogin();
    });
  });

  document.querySelectorAll("[data-close-login]").forEach((button) => {
    button.addEventListener("click", () => closeLogin());
  });

  const locationModal = document.querySelector("#locationModal");
  const openLocationModal = () => {
    if (!locationModal) return;
    if (typeof locationModal.showModal === "function") {
      locationModal.showModal();
    } else {
      locationModal.setAttribute("open", "");
    }
    document.body.classList.add("modal-open");
  };
  const closeLocationModal = () => {
    if (!locationModal) return;
    if (typeof locationModal.close === "function") {
      locationModal.close();
    } else {
      locationModal.removeAttribute("open");
    }
    document.body.classList.remove("modal-open");
  };

  document.querySelectorAll("[data-open-location]").forEach((button) => {
    button.addEventListener("click", openLocationModal);
  });

  document.querySelectorAll("[data-close-location]").forEach((button) => {
    button.addEventListener("click", closeLocationModal);
  });

  locationModal?.addEventListener("click", (event) => {
    if (event.target === locationModal) {
      closeLocationModal();
    }
  });

  locationModal?.addEventListener("close", () => {
    document.body.classList.remove("modal-open");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && siteNav.classList.contains("open")) {
      setPublicMenuOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      siteNav.classList.contains("open") &&
      !siteNav.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      setPublicMenuOpen(false);
    }
  });
}

function setupHeroDashboardInteraction() {
  const scene = document.querySelector("[data-hero-dashboard]");
  if (!scene) return;

  const bars = Array.from(scene.querySelectorAll("[data-hero-bar]"));
  if (!bars.length) return;

  const fields = {
    total: scene.querySelector("[data-hero-total]"),
    totalLabel: scene.querySelector("[data-hero-total-label]"),
    score: scene.querySelector("[data-hero-score]"),
    scoreLabel: scene.querySelector("[data-hero-score-label]"),
    occupancy: scene.querySelector("[data-hero-occupancy]"),
    occupancyLabel: scene.querySelector("[data-hero-occupancy-label]"),
    decision: scene.querySelector("[data-hero-decision]"),
    impact: scene.querySelector("[data-hero-impact]"),
    impactCriteria: scene.querySelector("[data-hero-impact-criteria]"),
    dayLabel: scene.querySelector("[data-hero-day-label]"),
    syncLabel: scene.querySelector("[data-hero-sync-label]"),
    auditTitle: scene.querySelector("[data-hero-audit-title]"),
    auditText: scene.querySelector("[data-hero-audit-text]"),
    auditNote: scene.querySelector("[data-hero-audit-note]"),
    reportVersion: scene.querySelector("[data-hero-report-version]"),
    reportLabel: scene.querySelector("[data-hero-report-label]"),
  };
  const metricCards = Array.from(scene.querySelectorAll(".scene-metrics article"));
  const chart = scene.querySelector(".scene-chart");
  const chartShell = scene.querySelector(".scene-chart-shell");
  const progressBar = scene.querySelector("[data-hero-progress]");
  const sparkPoint = scene.querySelector("[data-hero-spark-point]");
  const reducedMotionQuery = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };
  let activeIndex = Math.max(0, bars.findIndex((bar) => bar.classList.contains("is-active")));
  let intervalId = null;
  let changeTimer = null;
  let interactionTimer = null;
  let changeToken = 0;
  const activeAnimations = new Map();

  const setText = (element, value) => {
    if (element && value) {
      element.textContent = value;
    }
  };

  const parseHeroNumber = (value) => {
    const normalized = String(value ?? "")
      .replace(/^v/i, "")
      .replace(/\./g, "")
      .replace(",", ".")
      .replace(/[^\d.-]/g, "");
    const number = Number.parseFloat(normalized);
    return Number.isFinite(number) ? number : null;
  };

  const formatHeroNumber = (number, template) => {
    if (String(template).includes("%")) {
      return `${Math.round(number)}%`;
    }
    if (String(template).includes(",")) {
      const decimals = String(template).split(",")[1]?.replace(/\D/g, "").length || 1;
      return number.toFixed(decimals).replace(".", ",");
    }
    return Math.round(number).toLocaleString("pt-BR");
  };

  const replayDataMotion = (element) => {
    if (!element || reducedMotionQuery.matches) return;
    element.classList.remove("is-presenting");
    void element.offsetWidth;
    element.classList.add("is-presenting");
    window.setTimeout(() => element.classList.remove("is-presenting"), 720);
  };

  const animateDataText = (element, value, { instant = false } = {}) => {
    if (!element || !value) return;

    const targetText = String(value);
    const targetNumber = parseHeroNumber(targetText);
    const currentNumber = parseHeroNumber(element.textContent);
    const shouldCount =
      !instant &&
      !reducedMotionQuery.matches &&
      !targetText.trim().toLowerCase().startsWith("v") &&
      targetNumber !== null &&
      currentNumber !== null;

    if (activeAnimations.has(element)) {
      window.cancelAnimationFrame(activeAnimations.get(element));
      activeAnimations.delete(element);
    }

    if (!shouldCount) {
      element.textContent = targetText;
      replayDataMotion(element);
      return;
    }

    const duration = 820;
    const start = currentNumber;
    const delta = targetNumber - start;
    const startTime = window.performance.now();

    const tick = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = formatHeroNumber(start + delta * eased, targetText);
      if (progress < 1) {
        activeAnimations.set(element, window.requestAnimationFrame(tick));
      } else {
        element.textContent = targetText;
        activeAnimations.delete(element);
      }
    };

    replayDataMotion(element);
    activeAnimations.set(element, window.requestAnimationFrame(tick));
  };

  const setProgress = (index) => {
    if (!progressBar) return;
    progressBar.style.setProperty("--hero-progress", `${((index + 1) / bars.length) * 100}%`);
  };

  const setFocusLine = (index) => {
    if (!chartShell) return;
    chartShell.style.setProperty("--hero-chart-focus-x", `${((index + 0.5) / bars.length) * 100}%`);
  };

  const showInteraction = () => {
    window.clearTimeout(interactionTimer);
    scene.classList.add("is-interacting");
  };

  const settleInteraction = () => {
    window.clearTimeout(interactionTimer);
    interactionTimer = window.setTimeout(() => {
      scene.classList.remove("is-interacting");
    }, 720);
  };

  const presentBarData = (bar, { instant = false } = {}) => {
    animateDataText(fields.decision, bar.dataset.decision, { instant });
    animateDataText(fields.impact, bar.dataset.impact, { instant });
    setText(fields.impactCriteria, bar.dataset.impactCriteria);
    animateDataText(fields.total, bar.dataset.total, { instant });
    setText(fields.totalLabel, `${bar.dataset.day} · variação analisada`);
    animateDataText(fields.score, bar.dataset.score, { instant });
    setText(fields.scoreLabel, Number.parseFloat((bar.dataset.score || "").replace(",", ".")) < 8
      ? "Revisão recomendada"
      : "Alta confiabilidade");
    animateDataText(fields.occupancy, bar.dataset.occupancy, { instant });
    setText(fields.occupancyLabel, "Meta ou base esperada");
    setText(fields.dayLabel, `${bar.dataset.day} · ${bar.dataset.total} registros analisados`);
    setText(fields.syncLabel, "Arraste para comparar ciclos");
    setText(fields.auditTitle, bar.dataset.auditTitle);
    setText(fields.auditText, bar.dataset.auditText);
    setText(fields.auditNote, bar.dataset.auditNote);
    animateDataText(fields.reportVersion, bar.dataset.reportVersion, { instant });
    setText(fields.reportLabel, bar.dataset.reportLabel);

    metricCards.forEach((card) => {
      card.classList.remove("is-presenting");
      if (!reducedMotionQuery.matches && !instant) {
        void card.offsetWidth;
        card.classList.add("is-presenting");
        window.setTimeout(() => card.classList.remove("is-presenting"), 420);
      }
    });

    if (sparkPoint) {
      sparkPoint.setAttribute("cx", bar.dataset.sparkX || "152");
      sparkPoint.setAttribute("cy", bar.dataset.sparkY || "18");
    }
  };

  const setActiveBar = (index, { instant = false } = {}) => {
    const bar = bars[index];
    if (!bar) return;

    activeIndex = index;
    setProgress(activeIndex);
    setFocusLine(activeIndex);
    bars.forEach((item, itemIndex) => {
      item.classList.toggle("is-active", itemIndex === activeIndex);
      item.setAttribute("aria-pressed", String(itemIndex === activeIndex));
    });

    if (instant || reducedMotionQuery.matches) {
      scene.classList.remove("is-changing");
      presentBarData(bar, { instant: true });
      return;
    }

    const token = ++changeToken;
    window.clearTimeout(changeTimer);
    scene.classList.add("is-changing");
    changeTimer = window.setTimeout(() => {
      if (token !== changeToken) return;
      presentBarData(bar);
      window.requestAnimationFrame(() => {
        window.setTimeout(() => scene.classList.remove("is-changing"), 80);
      });
    }, 180);
  };

  const stopAutoplay = () => {
    if (intervalId) {
      window.clearInterval(intervalId);
      intervalId = null;
    }
    scene.classList.remove("is-autoplaying");
  };

  const startAutoplay = () => {
    if (reducedMotionQuery.matches || intervalId || bars.length < 2) return;
    scene.classList.add("is-autoplaying");
    intervalId = window.setInterval(() => {
      setActiveBar((activeIndex + 1) % bars.length);
    }, 3200);
  };

  bars.forEach((bar, index) => {
    bar.addEventListener("pointerenter", () => {
      showInteraction();
      setActiveBar(index);
    });
    bar.addEventListener("focus", () => {
      showInteraction();
      setActiveBar(index);
    });
    bar.addEventListener("click", () => {
      showInteraction();
      setActiveBar(index);
      settleInteraction();
    });
    bar.addEventListener("touchstart", () => {
      showInteraction();
      setActiveBar(index);
      settleInteraction();
    }, { passive: true });
    bar.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      showInteraction();
      const nextIndex = event.key === "Home"
        ? 0
        : event.key === "End"
          ? bars.length - 1
          : event.key === "ArrowLeft"
            ? Math.max(0, index - 1)
            : Math.min(bars.length - 1, index + 1);
      bars[nextIndex]?.focus();
      setActiveBar(nextIndex);
    });
  });

  chart?.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse" && event.buttons > 1) return;
    const rect = chart.getBoundingClientRect();
    const ratio = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 0.999);
    const index = Math.min(bars.length - 1, Math.floor(ratio * bars.length));
    showInteraction();
    if (index !== activeIndex) {
      setActiveBar(index);
    } else {
      setFocusLine(index);
    }
  });

  scene.addEventListener("pointerenter", () => {
    showInteraction();
    stopAutoplay();
  });
  scene.addEventListener("pointerleave", () => {
    settleInteraction();
    startAutoplay();
  });
  scene.addEventListener("focusin", () => {
    showInteraction();
    stopAutoplay();
  });
  scene.addEventListener("focusout", () => {
    window.setTimeout(() => {
      if (!scene.contains(document.activeElement)) {
        settleInteraction();
        startAutoplay();
      }
    }, 0);
  });

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", (event) => {
      if (event.matches) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });
  }

  setActiveBar(activeIndex, { instant: true });
  startAutoplay();
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const phoneInput = form.querySelector("#contactPhone");
  const messageInput = form.querySelector("#contactMessage");
  const messageCounter = form.querySelector("#contactMessageCounter");
  const whatsappButton = form.querySelector("#contactWhatsappButton");
  const maxMessageLength = Number(messageInput?.maxLength) || 250;

  const updateMessageCounter = () => {
    if (!messageInput || !messageCounter) return;
    const currentLength = messageInput.value.length;
    messageCounter.textContent = `${currentLength}/${maxMessageLength} caracteres`;
    messageCounter.classList.toggle("is-limit", currentLength >= maxMessageLength);
  };

  const validateContactPhone = ({ showError = false } = {}) => {
    if (!phoneInput) return true;
    const isValid = isValidBrazilMobilePhone(phoneInput.value);
    phoneInput.setCustomValidity(
      isValid ? "" : "Informe DDD + celular com 9 dígitos. Exemplo: (83) 99999-9999.",
    );
    if (!isValid && showError) phoneInput.reportValidity();
    return isValid;
  };

  phoneInput?.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
    phoneInput.setCustomValidity("");
  });

  phoneInput?.addEventListener("blur", () => {
    if (phoneInput.value) validateContactPhone();
  });

  messageInput?.addEventListener("input", updateMessageCounter);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    whatsappButton?.click();
  });

  whatsappButton?.addEventListener("click", (event) => {
    const isPhoneValid = validateContactPhone({ showError: true });
    const isFormValid = form.reportValidity();
    if (!isPhoneValid || !isFormValid) {
      event.preventDefault();
      return;
    }

    saveContactLead(form);
    whatsappButton.href = buildContactWhatsappUrl(form);
  });

  updateMessageCounter();
}

function saveContactLead(form) {
  const data = Object.fromEntries(new FormData(form));
  const lead = {
    id: Date.now(),
    name: String(data.nome || "").trim(),
    company: String(data.empresa || "").trim() || "Não informado",
    phone: formatPhone(data.telefone),
    service: String(data.servico || "").trim(),
    message: String(data.mensagem || "").trim() || "Sem mensagem",
    status: "Novo",
    source: "Site Acesse Report AI",
    createdAt: nowIso(),
  };

  state.leads.unshift(lead);
  saveState();
  renderLeads();
  showToast("Lead salvo no painel.");
}

function buildContactWhatsappUrl(form) {
  const data = Object.fromEntries(new FormData(form));
  const message = [
    "Olá, gostaria de validar o Acesse Report AI.",
    data.nome ? `Nome: ${data.nome}` : "",
    data.empresa ? `Empresa: ${data.empresa}` : "",
    data.telefone ? `Telefone: ${formatPhone(data.telefone)}` : "",
    data.servico ? `Interesse: ${data.servico}` : "",
    data.mensagem ? `Mensagem: ${data.mensagem}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/5583998024125?text=${encodeURIComponent(message)}`;
}

function getSiteNavLinks() {
  return [...siteNav.querySelectorAll('.lp-nav-links a[href^="#"]')];
}

function setActiveSiteNavLink(hash) {
  const targetHash = String(hash || "");

  getSiteNavLinks().forEach((link) => {
    const isActive = link.getAttribute("href") === targetHash;
    link.classList.toggle("active", isActive);
    link.toggleAttribute("aria-current", isActive);
  });
}

function setupSiteNavObserver() {
  if (!("IntersectionObserver" in window)) return;

  const sections = getSiteNavLinks()
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveSiteNavLink(`#${visibleEntry.target.id}`);
      }
    },
    {
      rootMargin: "-34% 0px -48% 0px",
      threshold: [0.1, 0.24, 0.4],
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function setupLogin() {
  document.querySelectorAll("[data-demo-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const demoUser = demoUsers[button.dataset.demoUser];
      const user = findUserByEmail(demoUser.email) || demoUser;
      document.querySelector("#loginEmail").value = user.email;
      document.querySelector("#loginPassword").value = demoUser.password;
      clearFormMessage("#loginMessage");
    });
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.querySelector("#loginEmail").value);
    const password = document.querySelector("#loginPassword").value;
    const demoUser = findDemoUserByEmail(email);
    let user = findUserByEmail(email);

    if (!email || !password) {
      setFormMessage("#loginMessage", "Informe e-mail e senha para continuar.", "error");
      return;
    }

    if (password.length < passwordPolicy.minLength) {
      setFormMessage(
        "#loginMessage",
        `A senha informada é curta. Use pelo menos ${passwordPolicy.minLength} caracteres.`,
        "error",
      );
      return;
    }

    if (demoUser && password === demoUser.password) {
      user = restoreDemoUserAccess(demoUser, user);
      resetLoginAttempts(email);
    }

    const lockout = getLoginLockout(email);
    if (lockout.locked) {
      setFormMessage(
        "#loginMessage",
        `Muitas tentativas incorretas. Tente novamente em ${lockout.remainingMinutes} min.`,
        "error",
      );
      return;
    }

    if (!user || user.password !== password) {
      registerFailedLogin(email);
      setFormMessage(
        "#loginMessage",
        "E-mail ou senha incorretos. Confira os dados ou use a redefinição de senha.",
        "error",
      );
      return;
    }

    if (user.status !== "Ativo") {
      setFormMessage("#loginMessage", "Usuário inativo. Procure o Super Admin.", "error");
      return;
    }

    resetLoginAttempts(email);
    user.lastLoginAt = nowIso();
    saveState();
    clearFormMessage("#loginMessage");
    enterApp(user);
  });

  document.querySelector("#googleLogin").addEventListener("click", () => {
    const supervisor = findUserByEmail(demoUsers.supervisor.email);
    if (!supervisor || supervisor.status !== "Ativo") {
      setFormMessage("#loginMessage", "Login Google indisponível para este usuário.", "error");
      return;
    }
    supervisor.lastLoginAt = nowIso();
    saveState();
    enterApp(supervisor);
  });

  document.querySelector("#logoutButton").addEventListener("click", () => {
    appShell.hidden = true;
    publicSite.hidden = false;
    document.body.classList.remove("modal-open");
    document.body.classList.remove("is-logged-in");
    closeMobileAppMenu();
    history.pushState(null, "", "#inicio");
  });
}

function setupAppNavigation() {
  buildMobileFooterShortcuts();
  applySavedSidebarState();
  setMobileAppMenuOpen(false);

  document.querySelectorAll(".app-nav button").forEach((button) => {
    button.title = button.dataset.label || button.textContent.trim();
    button.addEventListener("click", () => {
      if (button.hidden) return;
      navigateToAppView(button.dataset.view);
      closeMobileAppMenu();
    });
  });

  mobileFooterNav.addEventListener("click", (event) => {
    const reportActionButton = event.target.closest("[data-mobile-report-action]");
    if (reportActionButton) {
      openReportEventDraft();
      closeMobileAppMenu();
      return;
    }

    const menuButton = event.target.closest("button[data-menu-trigger]");
    if (menuButton) {
      toggleMobileAppMenu();
      return;
    }

    const button = event.target.closest("button[data-view]");
    if (!button) return;
    navigateToAppView(button.dataset.view);
    closeMobileAppMenu();
  });

  document.querySelector("#latestReportGenerationList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-report-generation]");
    if (!button) return;
    openReportGeneration(Number(button.dataset.reportEventId));
  });

  sidebarCollapseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (isMobileNavigation()) {
      toggleMobileAppMenu();
      return;
    }

    const isCollapsed = !appShell.classList.contains("sidebar-collapsed");
    setSidebarCollapsed(isCollapsed);
    localStorage.setItem(sidebarStateKey, String(isCollapsed));
  });

  appMenuButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMobileAppMenu();
  });

  appMenuOverlay.addEventListener("click", () => closeMobileAppMenu());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMobileAppMenuOpen()) closeMobileAppMenu();
  });

  window.matchMedia("(min-width: 781px)").addEventListener("change", (event) => {
    if (event.matches) closeMobileAppMenu();
  });

  window.addEventListener("hashchange", handleAppRouteChange);
  window.addEventListener("popstate", handleAppRouteChange);
  handleAppRouteChange();
}

function buildMobileFooterShortcuts() {
  const shortcutOrder = ["dashboard", "reports", "leads"];
  const shortcutLabels = {
    dashboard: "Resumo",
    reports: "Central",
    leads: "Leads",
  };
  const shortcutButtons = shortcutOrder
    .map((view) => document.querySelector(`.app-nav button[data-view="${view}"]`))
    .filter(Boolean);

  const shortcutMarkup = shortcutButtons.map((button) => {
    const icon = button.querySelector(".nav-icon")?.outerHTML || "";
    const view = button.dataset.view;
    const label = shortcutLabels[view] || button.dataset.shortLabel || button.dataset.label || "";
    const adminClass = button.classList.contains("admin-only") ? " class=\"admin-only\"" : "";

    return `
      <button${adminClass} type="button" data-view="${escapeHtml(view)}" aria-label="${escapeHtml(
        button.dataset.label || label,
      )}">
        ${icon}
        <span>${escapeHtml(label)}</span>
      </button>
    `;
  });

  mobileFooterNav.innerHTML = `
    ${shortcutMarkup.slice(0, 2).join("")}
    <button
      class="mobile-report-action"
      type="button"
      data-mobile-report-action
      aria-label="Inserir novo relatório"
    >
      <svg class="nav-icon" aria-hidden="true"><use href="#icon-report-add"></use></svg>
      <span>Inserir relatório</span>
    </button>
    ${shortcutMarkup.slice(2).join("")}
    <button type="button" data-menu-trigger aria-label="Abrir menu completo" aria-controls="appSidebar" aria-expanded="false">
      <svg class="nav-icon" aria-hidden="true"><use href="#icon-menu"></use></svg>
      <span>Menu</span>
    </button>
  `;
}

function applySavedSidebarState() {
  const savedValue = localStorage.getItem(sidebarStateKey);
  setSidebarCollapsed(savedValue === "true");
}

function setSidebarCollapsed(isCollapsed) {
  appShell.classList.toggle("sidebar-collapsed", isCollapsed);
  sidebarCollapseButton.setAttribute("aria-pressed", String(isCollapsed));
  sidebarCollapseButton.setAttribute(
    "aria-label",
    isCollapsed ? "Expandir menu lateral" : "Recolher menu lateral",
  );
  sidebarCollapseButton.title = isCollapsed ? "Expandir menu" : "Recolher menu";
  const label = sidebarCollapseButton.querySelector(".nav-text");
  if (label) label.textContent = isCollapsed ? "Expandir" : "Recolher";
}

function setMobileAppMenuOpen(isOpen) {
  const shouldOpen = Boolean(isOpen);
  const footerMenuButton = mobileFooterNav.querySelector("[data-menu-trigger]");

  appShell.classList.toggle("mobile-menu-open", shouldOpen);
  appMenuOverlay.hidden = !shouldOpen;
  appMenuOverlay.setAttribute("aria-hidden", String(!shouldOpen));
  appMenuButton.setAttribute("aria-expanded", String(shouldOpen));
  appMenuButton.setAttribute(
    "aria-label",
    shouldOpen ? "Fechar menu do sistema" : "Abrir menu do sistema",
  );
  sidebarCollapseButton.setAttribute("aria-expanded", String(shouldOpen));
  footerMenuButton?.classList.toggle("active", shouldOpen);
  footerMenuButton?.setAttribute("aria-expanded", String(shouldOpen));
  footerMenuButton?.setAttribute(
    "aria-label",
    shouldOpen ? "Fechar menu completo" : "Abrir menu completo",
  );

  if (isMobileNavigation()) {
    sidebarCollapseButton.setAttribute(
      "aria-label",
      shouldOpen ? "Fechar menu lateral" : "Abrir menu lateral",
    );
    sidebarCollapseButton.title = shouldOpen ? "Fechar menu" : "Abrir menu";
    const label = sidebarCollapseButton.querySelector(".nav-text");
    if (label) label.textContent = shouldOpen ? "Fechar menu" : "Abrir menu";
  }
  document.body.classList.toggle("app-menu-open", shouldOpen);
}

function closeMobileAppMenu() {
  setMobileAppMenuOpen(false);
}

function toggleMobileAppMenu() {
  setMobileAppMenuOpen(!isMobileAppMenuOpen());
}

function isMobileAppMenuOpen() {
  return appShell.classList.contains("mobile-menu-open");
}

function isMobileNavigation() {
  return window.matchMedia("(max-width: 780px)").matches;
}

function getCurrentAppRoute() {
  const hash = decodeURIComponent(window.location.hash || "").replace(/^#/, "");
  const [prefix, route] = hash.split("/");

  if (prefix !== appRoutePrefix || !appRoutes[route]) return null;

  return {
    route,
    view: appRoutes[route],
  };
}

function navigateToAppView(view, options = {}) {
  const updateHash = options.updateHash !== false;
  const replace = Boolean(options.replace);
  const button = document.querySelector(`.app-nav button[data-view="${view}"]`);
  const panel = document.querySelector(`[data-panel="${view}"]`);

  if (!button || !panel) return false;

  if (button.hidden) {
    const fallbackView = panel.classList.contains("admin-only") ? "dashboard" : null;
    if (fallbackView) {
      showToast("Apenas Super Admin pode acessar esta área.");
      return navigateToAppView(fallbackView, { updateHash, replace: true });
    }
    return false;
  }

  document.querySelectorAll(".app-nav button, .mobile-footer-nav button").forEach((item) => {
    const isActive = item.dataset.view === view;
    item.classList.toggle("active", isActive);
    if (isActive) {
      item.setAttribute("aria-current", "page");
    } else {
      item.removeAttribute("aria-current");
    }
  });
  document.querySelectorAll(".app-view").forEach((item) => item.classList.remove("active"));
  panel.classList.add("active");
  appShell.classList.toggle("report-ai-active", view === "reports");
  document.querySelector("#viewTitle").textContent = button.dataset.label || button.textContent.trim();

  if (updateHash) {
    const route = appViewRoutes[view] || "dashboard";
    const nextHash = `#${appRoutePrefix}/${route}`;
    if (window.location.hash !== nextHash) {
      if (replace) {
        history.replaceState(null, "", nextHash);
      } else {
        history.pushState(null, "", nextHash);
      }
    }
  }

  return true;
}

function handleAppRouteChange() {
  if (isMobileAppMenuOpen()) closeMobileAppMenu();

  const route = getCurrentAppRoute();
  if (!route) return;

  if (appShell.hidden) {
    openLogin();
    setFormMessage(
      "#loginMessage",
      "Entre no sistema para acessar esta área do painel.",
      "info",
    );
    return;
  }

  navigateToAppView(route.view, { updateHash: false });
}

function setupPasswordRecovery() {
  const forgotButton = document.querySelector("#forgotPasswordButton");
  const resetRequestForm = document.querySelector("#resetRequestForm");
  const resetPasswordForm = document.querySelector("#resetPasswordForm");
  const resetNewPassword = document.querySelector("#resetNewPassword");
  const resetOwnerEmail = document.querySelector("#resetOwnerEmail");
  const resetToken = document.querySelector("#resetToken");

  forgotButton.addEventListener("click", () => {
    showResetRequest();
    const resetEmail = document.querySelector("#resetEmail");
    resetEmail.value = document.querySelector("#loginEmail").value;
    resetEmail.focus();
  });

  document.querySelectorAll("[data-back-to-login]").forEach((button) => {
    button.addEventListener("click", () => {
      showLoginForm();
    });
  });

  resetNewPassword.addEventListener("input", () => {
    renderPasswordRules("#resetPasswordRules", resetNewPassword.value, {
      email: resetOwnerEmail.value,
      name: findUserByEmail(resetOwnerEmail.value)?.name || "",
    });
  });

  resetRequestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.querySelector("#resetEmail").value);
    const user = findUserByEmail(email);

    if (!isValidEmail(email)) {
      setFormMessage("#resetRequestMessage", "Informe um e-mail válido.", "error");
      return;
    }

    if (user && user.status === "Ativo") {
      const emailRecord = sendPasswordResetEmail(user, "Solicitação de redefinição de senha");
      saveState();
      resetOwnerEmail.value = user.email;
      resetToken.value = emailRecord.token;
      resetNewPassword.value = "";
      document.querySelector("#resetConfirmPassword").value = "";
      renderPasswordRules("#resetPasswordRules", "", {
        email: user.email,
        name: user.name,
      });
      showResetPasswordForm();
      showResetEmailPreview(emailRecord);
      setFormMessage(
        "#resetPasswordMessage",
        "E-mail de redefinição gerado. Confira o código simulado e cadastre uma nova senha.",
        "success",
      );
      resetNewPassword.focus();
      return;
    }

    setFormMessage(
      "#resetRequestMessage",
      "Se este e-mail existir e estiver ativo, enviaremos as instruções de redefinição.",
      "success",
    );
  });

  resetPasswordForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(resetOwnerEmail.value);
    const token = resetToken.value.trim().toUpperCase();
    const newPassword = resetNewPassword.value;
    const confirmPassword = document.querySelector("#resetConfirmPassword").value;
    const user = findUserByEmail(email);
    const validation = validatePassword(newPassword, {
      email,
      name: user?.name || "",
      oldPassword: user?.password || "",
    });

    renderPasswordRules("#resetPasswordRules", newPassword, {
      email,
      name: user?.name || "",
      oldPassword: user?.password || "",
    });

    if (!user) {
      setFormMessage("#resetPasswordMessage", "Não foi possível validar a redefinição.", "error");
      return;
    }

    if (!isValidResetToken(email, token)) {
      setFormMessage("#resetPasswordMessage", "Código inválido, expirado ou já utilizado.", "error");
      return;
    }

    if (!validation.valid) {
      setFormMessage("#resetPasswordMessage", validation.errors[0], "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      setFormMessage("#resetPasswordMessage", "A confirmação de senha não confere.", "error");
      return;
    }

    user.password = newPassword;
    user.passwordUpdatedAt = nowIso();
    markResetTokenAsUsed(email, token);
    saveState();
    document.querySelector("#loginEmail").value = user.email;
    document.querySelector("#loginPassword").value = "";
    setFormMessage(
      "#resetPasswordMessage",
      "Senha redefinida com sucesso. Volte ao login e entre com a nova senha.",
      "success",
    );
  });

  window.addEventListener("hashchange", handleResetHash);
  handleResetHash();
}

function setupUserManagement() {
  const userForm = document.querySelector("#userForm");
  const passwordInput = document.querySelector("#newUserPassword");
  const confirmPasswordInput = document.querySelector("#confirmNewUserPassword");
  const usersTable = document.querySelector("#usersTable");

  passwordInput.addEventListener("input", () => {
    const formData = new FormData(userForm);
    renderPasswordRules("#userPasswordRules", passwordInput.value, {
      email: formData.get("email"),
      name: formData.get("name"),
    });
  });

  userForm.addEventListener("input", (event) => {
    if (["email", "name"].includes(event.target.name)) {
      const formData = new FormData(userForm);
      renderPasswordRules("#userPasswordRules", passwordInput.value, {
        email: formData.get("email"),
        name: formData.get("name"),
      });
    }
  });

  userForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isSuperAdmin()) {
      setFormMessage("#userFormMessage", "Apenas Super Admin pode criar usuários.", "error");
      return;
    }

    const data = Object.fromEntries(new FormData(userForm));
    const email = normalizeEmail(data.email);
    const validation = validatePassword(data.password, {
      email,
      name: data.name,
    });

    renderPasswordRules("#userPasswordRules", data.password, {
      email,
      name: data.name,
    });

    if (!data.name.trim()) {
      setFormMessage("#userFormMessage", "Informe o nome completo do usuário.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      setFormMessage("#userFormMessage", "Informe um e-mail válido.", "error");
      return;
    }

    if (findUserByEmail(email)) {
      setFormMessage("#userFormMessage", "Já existe um usuário com este e-mail.", "error");
      return;
    }

    if (!validation.valid) {
      setFormMessage("#userFormMessage", validation.errors[0], "error");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setFormMessage("#userFormMessage", "A confirmação de senha não confere.", "error");
      return;
    }

    const user = {
      id: Date.now(),
      name: data.name.trim(),
      email,
      password: data.password,
      role: data.role,
      status: data.status,
      createdAt: today(),
      createdBy: activeUser.email,
      lastLoginAt: null,
    };

    state.users.unshift(user);

    if (data.sendInvite) {
      sendWelcomeEmail(user, data.password);
    }

    saveState();
    userForm.reset();
    renderPasswordRules("#userPasswordRules", "", {});
    setFormMessage("#userFormMessage", "Usuário criado com sucesso.", "success");
    renderUsers();
    renderMailbox();
  });

  usersTable.addEventListener("click", (event) => {
    const button = event.target.closest("[data-user-action]");
    if (!button || !isSuperAdmin()) return;

    const user = state.users.find((item) => String(item.id) === button.dataset.userId);
    if (!user) return;

    if (button.dataset.userAction === "reset") {
      const emailRecord = sendPasswordResetEmail(user, "Redefinição enviada pelo Super Admin");
      saveState();
      renderMailbox();
      showToast(`E-mail de redefinição gerado para ${emailRecord.to}.`);
    }

    if (button.dataset.userAction === "toggle") {
      if (user.email === activeUser.email) {
        showToast("Você não pode inativar o próprio usuário logado.");
        return;
      }
      user.status = user.status === "Ativo" ? "Inativo" : "Ativo";
      saveState();
      renderUsers();
      showToast(`Usuário ${user.status.toLowerCase()}.`);
    }
  });
}

function setupBrandManagement() {
  const brandForm = document.querySelector("#brandLogoForm");
  const speedInput = document.querySelector("#brandCarouselSpeed");
  const brandTable = document.querySelector("#brandLogoTable");

  if (!brandForm || !speedInput || !brandTable) return;

  speedInput.value = String(getBrandSpeed());
  speedInput.addEventListener("input", () => {
    state.brandSettings.speed = Number(speedInput.value);
    saveState();
    renderBrandShowcase();
    renderBrandAdmin();
  });

  brandForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!isSuperAdmin()) {
      setFormMessage("#brandLogoMessage", "Apenas Super Admin pode gerenciar fontes.", "error");
      return;
    }

    const data = Object.fromEntries(new FormData(brandForm));
    const name = String(data.name || "").trim();
    const logoUrl = normalizeOptionalExternalUrl(data.logoUrl);
    const website = normalizeOptionalExternalUrl(data.website);

    if (!name) {
      setFormMessage("#brandLogoMessage", "Informe o nome da empresa.", "error");
      return;
    }

    if (logoUrl === null) {
      setFormMessage("#brandLogoMessage", "Informe uma URL válida para o ícone ou evidência.", "error");
      return;
    }

    if (website === null) {
      setFormMessage("#brandLogoMessage", "Informe uma URL válida para a referência.", "error");
      return;
    }

    const nextOrder = getOrderedBrandLogos().length + 1;
    state.brandLogos.push({
      id: Date.now(),
      name,
      initials: normalizeBrandInitials(data.initials || getInitials(name)),
      logoUrl,
      website,
      color: normalizeBrandColor(data.color),
      active: Boolean(data.active),
      order: nextOrder,
    });

    normalizeBrandOrders();
    saveState();
    brandForm.reset();
    brandForm.querySelector('[name="color"]').value = "#006783";
    brandForm.querySelector('[name="active"]').checked = true;
    setFormMessage("#brandLogoMessage", "Fonte adicionada ao carrossel.", "success");
    renderBrandShowcase();
    renderBrandAdmin();
  });

  brandTable.addEventListener("click", (event) => {
    const button = event.target.closest("[data-brand-action]");
    if (!button || !isSuperAdmin()) return;

    const brand = state.brandLogos.find((item) => String(item.id) === button.dataset.brandId);
    if (!brand) return;

    if (button.dataset.brandAction === "up") {
      moveBrandLogo(brand.id, -1);
      showToast("Fonte movida para cima.");
    }

    if (button.dataset.brandAction === "down") {
      moveBrandLogo(brand.id, 1);
      showToast("Fonte movida para baixo.");
    }

    if (button.dataset.brandAction === "toggle") {
      brand.active = !brand.active;
      showToast(brand.active ? "Fonte ativada no site." : "Fonte removida da vitrine pública.");
    }

    if (button.dataset.brandAction === "delete") {
      state.brandLogos = state.brandLogos.filter((item) => item.id !== brand.id);
      normalizeBrandOrders();
      showToast("Fonte removida do carrossel.");
    }

    saveState();
    renderBrandShowcase();
    renderBrandAdmin();
  });
}

function setupReportAi() {
  const shell = document.querySelector(".report-ai-shell");
  if (!shell) return;

  shell.querySelectorAll("[data-report-screen]").forEach((button) => {
    button.addEventListener("click", () => {
      setReportAiScreen(button.dataset.reportScreen);
    });
  });

  document.querySelector("#startNewReportEvent")?.addEventListener("click", () => {
    openReportEventDraft();
  });

  document.querySelector("#cancelReportEventEdit")?.addEventListener("click", () => {
    prepareReportEventForm(getSelectedReportEvent());
  });

  document.querySelector("#reportAiEventList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-report-event-id]");
    if (!button) return;
    state.reportAi.selectedEventId = Number(button.dataset.reportEventId);
    saveState();
    setReportAiScreen("event");
  });

  document.querySelector("#reportAiEventForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveReportEventFromForm(event.currentTarget);
  });

  document.querySelector("#reportAttachmentForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveReportAttachmentsFromForm(event.currentTarget);
  });

  document.querySelector("#reportMetricsForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveReportMetricsFromForm(event.currentTarget);
  });

  document.querySelector("#runReportAudit")?.addEventListener("click", () => {
    applyReportComputedStatus();
    saveState();
    renderReports();
    showToast("Auditoria atualizada com as regras de consistência.");
  });

  document.querySelector("#reportGeneratorForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    generateReportVersion(event.currentTarget);
  });

  ["Pdf", "Word", "Sheets"].forEach((format) => {
    document.querySelector(`#exportReport${format}`)?.addEventListener("click", () => {
      showToast(`Exportação ${format} preparada no protótipo.`);
    });
  });

  document.querySelector("#reportVersionList")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-report-version-action]");
    if (!button) return;
    updateReportVersionStatus(button.dataset.reportVersionAction);
  });
}

function setupForms() {
  document.querySelector("#openClientForm").addEventListener("click", () => {
    prepareClientForm();
    clientModal.showModal();
  });

  document.querySelector("#closeClientForm").addEventListener("click", () => {
    clientModal.close();
  });

  document.querySelector("#clientGrid").addEventListener("click", handleClientCardAction);

  document.querySelector("#clientForm").addEventListener("submit", (event) => {
    event.preventDefault();
    saveClientFromForm();
  });

  document.querySelector("#closeDeleteClient").addEventListener("click", () => {
    closeDeleteClientModal();
  });

  document.querySelector("#cancelDeleteClient").addEventListener("click", () => {
    closeDeleteClientModal();
  });

  document.querySelector("#deleteClientConfirmation").addEventListener("input", (event) => {
    document.querySelector("#confirmDeleteClient").disabled =
      normalizeDeleteConfirmation(event.target.value) !== "excluir";
    clearFormMessage("#deleteClientMessage");
  });

  document.querySelector("#deleteClientForm").addEventListener("submit", (event) => {
    event.preventDefault();
    confirmClientDeletion();
  });

  document.querySelector("#openEmployeeForm").addEventListener("click", () => {
    prepareEmployeeForm();
    employeeModal.showModal();
  });

  document.querySelector("#closeEmployeeForm").addEventListener("click", () => {
    employeeModal.close();
  });

  document.querySelector("#closeEmployeeDetail").addEventListener("click", () => {
    employeeDetailModal.close();
  });

  document.querySelector("#closeDeleteEmployee").addEventListener("click", () => {
    closeDeleteEmployeeModal();
  });

  document.querySelector("#cancelDeleteEmployee").addEventListener("click", () => {
    closeDeleteEmployeeModal();
  });

  setupEmployeeMasks();
  setupCheckinFlow();
  document.querySelector("#employeeSearch").addEventListener("input", renderEmployees);
  document.querySelector("#employeeTable").addEventListener("click", handleEmployeeTableAction);
  document.querySelector("#employeeDetailContent").addEventListener("click", handleEmployeeTableAction);
  document.querySelector("#frequencyPeriod").addEventListener("change", renderFrequency);
  document.querySelectorAll("[data-chart-period]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#frequencyPeriod").value = button.dataset.chartPeriod;
      expandedFrequencyEmployeeId = null;
      renderFrequency();
    });
  });
  document.querySelector("#frequencyEmployee").addEventListener("change", renderFrequency);
  document.querySelector("#frequencyClient").addEventListener("change", () => {
    expandedFrequencyEmployeeId = null;
    renderFrequency();
  });
  document.querySelector("#frequencyQuickFilter").addEventListener("change", () => {
    expandedFrequencyEmployeeId = null;
    renderFrequency();
  });
  document.querySelector("#frequencySearch").addEventListener("input", () => {
    expandedFrequencyEmployeeId = null;
    renderFrequency();
  });
  document.querySelector("#frequencyStartDate").addEventListener("change", renderFrequency);
  document.querySelector("#frequencyEndDate").addEventListener("change", renderFrequency);
  document.querySelector("#frequencyTable").addEventListener("click", handleFrequencyTableAction);
  document.querySelector("#leadForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveLeadFromForm(event.currentTarget);
  });
  document.querySelector('#leadForm [name="phone"]')?.addEventListener("input", (event) => {
    event.target.value = formatPhone(event.target.value);
    clearFormMessage("#leadFormMessage");
  });
  document.querySelector("#cancelLeadEdit")?.addEventListener("click", () => {
    resetLeadForm();
  });
  document.querySelector("#leadSearch")?.addEventListener("input", renderLeads);
  document.querySelector("#leadStatusFilter")?.addEventListener("change", renderLeads);
  document.querySelector("#leadsTable")?.addEventListener("click", handleLeadAction);
  document.querySelector("#exportFrequencyPdf").addEventListener("click", () => {
    showToast("Relatório em PDF preparado para exportação.");
  });
  document.querySelector("#exportFrequencyExcel").addEventListener("click", () => {
    showToast("Planilha Excel preparada para exportação.");
  });
  document.querySelector("#eventEmployeeSearch").addEventListener("input", renderTeamPicker);
  document.querySelector("#eventSelect").addEventListener("change", renderTeamPicker);
  document.querySelector("#prevMonth").addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() - 1, 1);
    renderCalendar();
  });
  document.querySelector("#nextMonth").addEventListener("click", () => {
    calendarCursor = new Date(calendarCursor.getFullYear(), calendarCursor.getMonth() + 1, 1);
    renderCalendar();
  });
  document.querySelector("#calendarGrid").addEventListener("click", handleCalendarDayClick);
  document.querySelector("#closeCalendarDayModal").addEventListener("click", () => {
    calendarDayModal.close();
  });
  calendarDayModal.addEventListener("click", (event) => {
    if (event.target === calendarDayModal) calendarDayModal.close();
  });

  document.querySelector("#employeeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const wasEditing = employeeFormMode === "edit";
    data.cpf = formatCpf(data.cpf);
    data.phone = formatPhone(data.phone);
    data.registration = data.registration || generateNextEmployeeRegistration();

    if (!isValidCpf(data.cpf)) {
      showToast("Informe um CPF válido.");
      return;
    }

    if (!isValidBrazilMobilePhone(data.phone)) {
      showToast("Informe DDD + celular com 9 dígitos. Exemplo: (83) 99999-9999.");
      return;
    }

    if (wasEditing) {
      const employee = findEmployeeById(editingEmployeeId);
      if (!employee) {
        showToast("Funcionário não encontrado para edição.");
        return;
      }

      const oldName = employee.name;
      Object.assign(employee, data);
      updateEmployeeReferences(oldName, data.name);
    } else {
      state.employees.unshift({
        id: Date.now(),
        ...data,
      });
    }

    saveState();
    form.reset();
    employeeModal.close();
    employeeFormMode = "create";
    editingEmployeeId = null;
    renderAll();
    showToast(
      wasEditing ? "Funcionário atualizado com sucesso." : "Funcionário cadastrado com sucesso.",
    );
  });

  document.querySelector("#deleteEmployeeConfirmation").addEventListener("input", (event) => {
    document.querySelector("#confirmDeleteEmployee").disabled =
      normalizeDeleteConfirmation(event.target.value) !== "excluir";
    clearFormMessage("#deleteEmployeeMessage");
  });

  document.querySelector("#deleteEmployeeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    confirmEmployeeDeletion();
  });

  document.querySelector("#eventForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    state.events.unshift({
      id: Date.now(),
      ...data,
      team: [],
      status: "Programado",
    });
    saveState();
    event.currentTarget.reset();
    renderAll();
    showToast("Relatório cadastrado.");
  });

  document.querySelector("#timeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const employee = state.employees.find((item) => String(item.id) === data.employee);
    const client = state.clients.find((item) => item.name === data.client);
    state.points.unshift({
      id: Date.now(),
      employee: employee.name,
      employeeId: employee.id,
      cpf: employee.cpf,
      client: data.client,
      clientId: client?.id || null,
      date: data.date,
      in: data.in,
      out: data.out,
      status: data.status,
      source: "Manual",
      type: data.out ? "Entrada/Saída" : "Entrada",
      createdAt: nowIso(),
    });
    saveState();
    event.currentTarget.reset();
    renderAll();
    showToast("Ponto registrado.");
  });

  document.querySelector("#certificateForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const employee = state.employees.find((item) => String(item.id) === data.employee);
    const fileInput = form.querySelector('[name="file"]');
    state.certificates.unshift({
      id: Date.now(),
      employee: employee.name,
      start: data.start,
      end: data.end,
      file: fileInput.files[0]?.name || "Sem arquivo",
      note: data.note || "Sem observação",
      status: "Registrado",
    });
    employee.status = "Atestado";
    saveState();
    form.reset();
    renderAll();
    showToast("Atestado lançado.");
  });
}

function setupCheckinFlow() {
  document.querySelectorAll("[data-open-checkin]").forEach((button) => {
    button.addEventListener("click", openCheckinModal);
  });
  document.querySelector("#closeCheckinModal").addEventListener("click", () => {
    stopCheckinScanner();
    checkinModal.close();
  });
  document.querySelector("#checkinCpf").addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
    resetCheckinAfterCpfChange();
    clearFormMessage("#checkinMessage");
  });
  document.querySelector("#simulateQrScan").addEventListener("click", () => {
    if (!checkinSession.employee) {
      setFormMessage(
        "#checkinMessage",
        "Informe e valide o CPF antes de liberar a leitura do QR Code.",
        "error",
      );
      return;
    }

    const selectedQrCode = getQrCodeById(document.querySelector("#checkinQrSelect").value);
    if (!selectedQrCode) {
      setFormMessage("#checkinMessage", "Selecione um QR Code demonstrativo válido.", "error");
      return;
    }
    setCheckinQrPayload(buildQrPayload(selectedQrCode), "QR Code demonstrativo lido.");
  });
  document.querySelector("#checkinQrSelect").addEventListener("change", () => {
    checkinSession.qrPayload = null;
    checkinSession.qrCode = null;
    if (checkinSession.employee) updateCheckinSteps("qr");
    document.querySelector("#checkinScanStatus").textContent =
      checkinSession.employee
        ? "Selecione o QR e confirme a leitura demonstrativa."
        : "Informe o CPF para liberar a leitura do QR Code.";
    document.querySelector("#checkinGeoStatus").textContent = "Aguardando leitura do QR Code.";
    clearFormMessage("#checkinMessage");
  });
  document.querySelector("#checkinForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleCheckinSubmit();
  });
  checkinModal.addEventListener("close", stopCheckinScanner);
}

function openCheckinModal() {
  const now = new Date();
  stopCheckinScanner();
  resetCheckinSession();
  document.querySelector("#checkinForm").reset();
  populateCheckinQrSelect();
  document.querySelector("#checkinQrTime").textContent = `Código ${now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  document.querySelector("#checkinQrTitle").textContent = "CPF obrigatório para iniciar";
  document.querySelector("#checkinScanStatus").textContent =
    "Câmera bloqueada até a validação do CPF.";
  document.querySelector("#checkinGeoStatus").textContent = "Aguardando validação do CPF.";
  document.querySelector("#checkinVideo").hidden = true;
  document.querySelector("#checkinQrPreview").hidden = false;
  document.querySelector("#checkinCpfStatus").textContent =
    "Informe o CPF para liberar a leitura do QR Code.";
  setCheckinQrControls(false);
  updateCheckinPrimaryButton("Validar CPF e iniciar leitura", false);
  updateCheckinSteps("cpf");
  clearFormMessage("#checkinMessage");
  checkinModal.showModal();
}

function resetCheckinSession() {
  checkinSession.employee = null;
  checkinSession.cpf = "";
  checkinSession.qrPayload = null;
  checkinSession.qrCode = null;
  checkinSession.registering = false;
}

function resetCheckinAfterCpfChange() {
  if (!checkinSession.employee && !checkinSession.qrCode && !checkinSession.registering) return;

  stopCheckinScanner();
  checkinSession.employee = null;
  checkinSession.cpf = "";
  checkinSession.qrPayload = null;
  checkinSession.qrCode = null;
  checkinSession.registering = false;
  document.querySelector("#checkinQrTitle").textContent = "CPF obrigatório para iniciar";
  document.querySelector("#checkinQrTime").textContent = "Mantenha o código centralizado na tela.";
  document.querySelector("#checkinScanStatus").textContent =
    "Câmera bloqueada até a validação do CPF.";
  document.querySelector("#checkinGeoStatus").textContent = "Aguardando validação do CPF.";
  document.querySelector("#checkinCpfStatus").textContent =
    "CPF alterado. Valide novamente para liberar o QR Code.";
  document.querySelector("#checkinVideo").hidden = true;
  document.querySelector("#checkinQrPreview").hidden = false;
  setCheckinQrControls(false);
  updateCheckinPrimaryButton("Validar CPF e iniciar leitura", false);
  updateCheckinSteps("cpf");
}

async function handleCheckinSubmit() {
  if (checkinSession.registering) return;

  if (!checkinSession.employee) {
    const validation = validateCheckinCpfForPoint(document.querySelector("#checkinCpf").value);

    if (!validation.valid) {
      recordCheckinAttempt({
        cpf: document.querySelector("#checkinCpf").value,
        status: "Bloqueado",
        reason: validation.reason,
      });
      saveState();
      renderAll();
      document.querySelector("#checkinCpfStatus").textContent = validation.message;
      setFormMessage("#checkinMessage", validation.message, "error");
      return;
    }

    checkinSession.employee = validation.employee;
    checkinSession.cpf = validation.employee.cpf;
    document.querySelector("#checkinCpf").value = formatCpf(validation.employee.cpf);
    document.querySelector("#checkinCpfStatus").textContent =
      `${validation.employee.name} validado para iniciar o registro.`;
    document.querySelector("#checkinQrTitle").textContent = "Aponte a câmera para o QR Code";
    document.querySelector("#checkinQrTime").textContent = "Mantenha o código centralizado na tela.";
    document.querySelector("#checkinScanStatus").textContent =
      "CPF validado com sucesso. Solicitando acesso à câmera...";
    document.querySelector("#checkinGeoStatus").textContent = "Aguardando leitura do QR Code.";
    setCheckinQrControls(true);
    updateCheckinPrimaryButton("Solicitar câmera novamente", false);
    updateCheckinSteps("qr");
    clearFormMessage("#checkinMessage");
    setFormMessage(
      "#checkinMessage",
      "CPF validado com sucesso. Aponte a câmera para o QR Code do local de trabalho.",
      "success",
    );
    await startCheckinScanner();
    return;
  }

  if (!checkinSession.qrCode) {
    document.querySelector("#checkinScanStatus").textContent =
      "Aguardando leitura do QR Code do local de trabalho.";
    setFormMessage(
      "#checkinMessage",
      "CPF validado. Leia o QR Code do local de trabalho para capturar a localização.",
      "info",
    );
    await startCheckinScanner();
    return;
  }

  await registerQrCheckin();
}

function validateCheckinCpfForPoint(cpf) {
  const cpfDigits = onlyDigits(cpf);

  if (!cpfDigits) {
    return {
      valid: false,
      reason: "CPF não informado",
      message: "Informe o CPF para iniciar o registro do ponto.",
    };
  }

  if (!isValidCpf(cpf)) {
    return {
      valid: false,
      reason: "CPF inválido",
      message: "CPF inválido. Confira os números informados.",
    };
  }

  const employee = findEmployeeByCpf(cpf);
  if (!employee || employee.status !== "Ativo") {
    return {
      valid: false,
      reason: employee ? `Funcionário ${employee.status}` : "CPF não encontrado",
      message: "CPF não encontrado ou funcionário não autorizado para registrar ponto.",
    };
  }

  return { valid: true, employee };
}

function setCheckinQrControls(isEnabled) {
  const qrSelect = document.querySelector("#checkinQrSelect");
  const simulateButton = document.querySelector("#simulateQrScan");
  const qrCard = document.querySelector(".qr-card");

  qrSelect.disabled = !isEnabled;
  simulateButton.disabled = !isEnabled;
  qrCard.classList.toggle("disabled", !isEnabled);
}

function updateCheckinPrimaryButton(label, isDisabled) {
  const button = document.querySelector("#checkinPrimaryButton");
  button.textContent = label;
  button.disabled = Boolean(isDisabled);
}

async function registerQrCheckin() {
  const cpf = checkinSession.cpf || document.querySelector("#checkinCpf").value;
  const cpfDigits = onlyDigits(cpf);
  const cpfValidation = validateCheckinCpfForPoint(cpf);

  if (!cpfValidation.valid) {
    recordCheckinAttempt({
      cpf,
      qrCode: checkinSession.qrCode,
      status: "Bloqueado",
      reason: cpfValidation.reason,
    });
    saveState();
    renderAll();
    setFormMessage("#checkinMessage", cpfValidation.message, "error");
    return;
  }

  const employee = checkinSession.employee || cpfValidation.employee;

  if (!checkinSession.qrCode) {
    setFormMessage(
      "#checkinMessage",
      "CPF validado. Leia o QR Code do local de trabalho antes de registrar o ponto.",
      "error",
    );
    return;
  }

  const client = getClientByQrCode(checkinSession.qrCode);
  if (!client || employee.client !== client.name) {
    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      status: "Bloqueado",
      reason: "Funcionário não vinculado ao empreendimento",
    });
    saveState();
    renderAll();
    setFormMessage(
      "#checkinMessage",
      "CPF não encontrado ou funcionário não autorizado para registrar ponto.",
      "error",
    );
    return;
  }

  const nextRegistration = getNextCheckinRegistration(employee);
  if (nextRegistration.blocked) {
    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      status: "Bloqueado",
      reason: nextRegistration.message,
    });
    saveState();
    renderAll();
    setFormMessage("#checkinMessage", nextRegistration.message, "error");
    return;
  }

  if (hasRecentSuccessfulCheckin(cpfDigits)) {
    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      type: nextRegistration.type,
      status: "Bloqueado",
      reason: "Tentativa duplicada em curto intervalo",
    });
    saveState();
    renderAll();
    setFormMessage(
      "#checkinMessage",
      "Já existe uma marcação recente para este CPF. Aguarde alguns minutos antes de tentar novamente.",
      "error",
    );
    return;
  }

  const clientCoordinates = getClientCoordinates(client);
  if (!clientCoordinates) {
    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      type: nextRegistration.type,
      status: "Bloqueado",
      reason: "Empreendimento sem coordenadas",
    });
    saveState();
    renderAll();
    setFormMessage("#checkinMessage", "Local de trabalho sem coordenadas cadastradas.", "error");
    return;
  }

  updateCheckinSteps("location");
  document.querySelector("#checkinGeoStatus").textContent =
    "Capturando localização do dispositivo...";
  checkinSession.registering = true;
  updateCheckinPrimaryButton("Validando localização...", true);

  try {
    const devicePosition = await getCheckinPosition(clientCoordinates);
    const distance = Math.round(calculateDistanceMeters(devicePosition, clientCoordinates));
    const accuracy = Math.round(devicePosition.accuracy || 0);
    const allowedRadius = getClientAllowedRadius(client);

    if (accuracy > checkinRules.maxAccuracyMeters) {
      recordCheckinAttempt({
        cpf,
        employee,
        qrCode: checkinSession.qrCode,
        client,
        type: nextRegistration.type,
        status: "Bloqueado",
        reason: "Localização imprecisa",
        distance,
        accuracy,
        devicePosition,
      });
      saveState();
      renderAll();
      checkinSession.registering = false;
      updateCheckinPrimaryButton("Tentar novamente", false);
      document.querySelector("#checkinGeoStatus").textContent =
        `Precisão insuficiente: margem de ${accuracy}m`;
      setFormMessage(
        "#checkinMessage",
        "Não foi possível confirmar sua localização com precisão suficiente. Tente novamente em uma área com melhor sinal de GPS ou Wi-Fi.",
        "error",
      );
      return;
    }

    if (distance > allowedRadius) {
      recordCheckinAttempt({
        cpf,
        employee,
        qrCode: checkinSession.qrCode,
        client,
        type: nextRegistration.type,
        status: "Bloqueado",
        reason: "Fora do raio permitido",
        distance,
        accuracy,
        devicePosition,
      });
      saveState();
      renderAll();
      checkinSession.registering = false;
      updateCheckinPrimaryButton("Tentar novamente", false);
      document.querySelector("#checkinGeoStatus").textContent = `Distância estimada: ${distance}m`;
      setFormMessage(
        "#checkinMessage",
        `Não foi possível registrar o ponto. Sua localização está fora do raio permitido de ${allowedRadius} metros do local de trabalho.`,
        "error",
      );
      return;
    }

    const registrationTime = currentTime();
    const point = persistQrPoint({
      employee,
      client,
      qrCode: checkinSession.qrCode,
      type: nextRegistration.type,
      existingPoint: nextRegistration.point,
      devicePosition,
      clientCoordinates,
      distance,
      accuracy,
      registrationTime,
    });

    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      point,
      type: nextRegistration.type,
      status: "Aprovado",
      reason: "Ponto registrado",
      distance,
      accuracy,
      devicePosition,
    });

    saveState();
    renderAll();
    checkinSession.registering = false;
    updateCheckinPrimaryButton("Ponto registrado", true);
    updateCheckinSteps("confirm");
    document.querySelector("#checkinGeoStatus").textContent =
      `${nextRegistration.type} autorizada a ${distance}m · precisão ${accuracy}m`;
    setFormMessage(
      "#checkinMessage",
      `Ponto registrado com sucesso. ${nextRegistration.type} confirmada às ${registrationTime}.`,
      "success",
    );
    setTimeout(() => {
      if (checkinModal.open) checkinModal.close();
    }, 900);
  } catch (error) {
    recordCheckinAttempt({
      cpf,
      employee,
      qrCode: checkinSession.qrCode,
      client,
      type: nextRegistration.type,
      status: "Bloqueado",
      reason: error.message || "Localização não validada",
    });
    saveState();
    renderAll();
    checkinSession.registering = false;
    updateCheckinPrimaryButton("Tentar novamente", false);
    document.querySelector("#checkinGeoStatus").textContent = "Localização não validada.";
    setFormMessage(
      "#checkinMessage",
      error.message || "Não foi possível validar a localização do dispositivo.",
      "error",
    );
  }
}

async function startCheckinScanner() {
  const status = document.querySelector("#checkinScanStatus");
  const video = document.querySelector("#checkinVideo");
  const preview = document.querySelector("#checkinQrPreview");

  if (!checkinSession.employee) {
    status.textContent = "Informe e valide o CPF antes de liberar a câmera.";
    setFormMessage(
      "#checkinMessage",
      "Informe e valide o CPF antes de liberar a leitura do QR Code.",
      "error",
    );
    return;
  }

  if (checkinSession.scannerActive) {
    status.textContent = "Câmera ativa. Mantenha o QR Code centralizado.";
    return;
  }

  if (!window.isSecureContext) {
    status.textContent =
      "A câmera só pode ser liberada em ambiente seguro. Use localhost ou HTTPS.";
    setFormMessage(
      "#checkinMessage",
      "A câmera só pode ser liberada pelo navegador em localhost ou em um site com HTTPS.",
      "error",
    );
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia) {
    status.textContent =
      "Câmera indisponível neste navegador. Use o QR demonstrativo para apresentar o fluxo.";
    return;
  }

  try {
    checkinSession.stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: "environment" } },
      audio: false,
    });
    video.srcObject = checkinSession.stream;
    video.hidden = false;
    preview.hidden = true;
    await video.play();
    checkinSession.scannerActive = true;

    if (!("BarcodeDetector" in window)) {
      status.textContent =
        "Câmera liberada. Este navegador não possui leitor nativo de QR; use o QR demonstrativo para apresentar o fluxo.";
      return;
    }

    status.textContent = "Câmera ativa. Mantenha o QR Code centralizado.";
    const detector = new BarcodeDetector({ formats: ["qr_code"] });

    checkinSession.scanTimer = window.setInterval(async () => {
      if (!checkinSession.scannerActive || video.readyState < 2) return;
      try {
        const codes = await detector.detect(video);
        if (!codes.length) return;
        setCheckinQrPayload(codes[0].rawValue, "QR Code lido pela câmera.");
      } catch {
        status.textContent = "Não foi possível concluir a leitura. Tente novamente.";
      }
    }, 800);
  } catch (error) {
    const isPermissionDenied = error?.name === "NotAllowedError";
    const message = isPermissionDenied
      ? "A câmera está bloqueada pelo navegador. Clique no ícone de permissões ao lado do endereço e autorize o uso da câmera."
      : "Não foi possível acessar a câmera. Autorize o uso da câmera para continuar o registro do ponto.";

    status.textContent = message;
    setFormMessage(
      "#checkinMessage",
      message,
      "error",
    );
  }
}

function stopCheckinScanner() {
  if (checkinSession.scanTimer) {
    window.clearInterval(checkinSession.scanTimer);
    checkinSession.scanTimer = null;
  }

  if (checkinSession.stream) {
    checkinSession.stream.getTracks().forEach((track) => track.stop());
    checkinSession.stream = null;
  }

  checkinSession.scannerActive = false;
}

function setCheckinQrPayload(rawPayload, successMessage) {
  const qrValidation = validateQrPayload(rawPayload);
  const status = document.querySelector("#checkinScanStatus");

  if (!checkinSession.employee) {
    status.textContent = "CPF obrigatório antes da leitura do QR Code.";
    setFormMessage(
      "#checkinMessage",
      "Informe e valide o CPF antes de liberar a leitura do QR Code.",
      "error",
    );
    return;
  }

  if (!qrValidation.valid) {
    checkinSession.qrPayload = null;
    checkinSession.qrCode = null;
    status.textContent = qrValidation.message;
    setFormMessage("#checkinMessage", qrValidation.message, "error");
    return;
  }

  if (checkinSession.employee.client !== qrValidation.client.name) {
    stopCheckinScanner();
    checkinSession.qrPayload = null;
    checkinSession.qrCode = null;
    recordCheckinAttempt({
      cpf: checkinSession.cpf || checkinSession.employee.cpf,
      employee: checkinSession.employee,
      qrCode: qrValidation.qrCode,
      client: qrValidation.client,
      status: "Bloqueado",
      reason: "Funcionário não vinculado ao empreendimento",
    });
    saveState();
    renderAll();
    status.textContent = "QR Code lido, mas o funcionário não está autorizado neste local.";
    setFormMessage(
      "#checkinMessage",
      "CPF não encontrado ou funcionário não autorizado para registrar ponto.",
      "error",
    );
    updateCheckinPrimaryButton("Tentar outro QR Code", false);
    updateCheckinSteps("qr");
    return;
  }

  if (!getClientCoordinates(qrValidation.client)) {
    stopCheckinScanner();
    checkinSession.qrPayload = null;
    checkinSession.qrCode = null;
    recordCheckinAttempt({
      cpf: checkinSession.cpf || checkinSession.employee.cpf,
      employee: checkinSession.employee,
      qrCode: qrValidation.qrCode,
      client: qrValidation.client,
      status: "Bloqueado",
      reason: "Empreendimento sem coordenadas",
    });
    saveState();
    renderAll();
    status.textContent = "QR Code sem latitude e longitude cadastradas.";
    setFormMessage("#checkinMessage", "Local de trabalho sem coordenadas cadastradas.", "error");
    updateCheckinPrimaryButton("Tentar outro QR Code", false);
    updateCheckinSteps("qr");
    return;
  }

  stopCheckinScanner();
  checkinSession.qrPayload = qrValidation.payload;
  checkinSession.qrCode = qrValidation.qrCode;
  document.querySelector("#checkinQrTitle").textContent = qrValidation.client.name;
  document.querySelector("#checkinQrTime").textContent =
    `${qrValidation.qrCode.id} · raio ${getClientAllowedRadius(qrValidation.client)}m`;
  document.querySelector("#checkinQrSelect").value = qrValidation.qrCode.id;
  status.textContent = successMessage;
  document.querySelector("#checkinGeoStatus").textContent =
    "QR validado. Capturando localização do dispositivo...";
  updateCheckinSteps("location");
  clearFormMessage("#checkinMessage");
  updateCheckinPrimaryButton("Validando localização...", true);
  void registerQrCheckin();
}

function validateQrPayload(rawPayload) {
  const payload = parseQrPayload(rawPayload);

  if (!payload) {
    return { valid: false, message: "QR Code inválido ou adulterado." };
  }

  const qrCode = state.qrCodes.find(
    (item) =>
      item.id === payload.qr_code_id &&
      item.clientCode === payload.empreendimento_id &&
      item.token === payload.token,
  );

  if (!qrCode) {
    return { valid: false, message: "QR Code não localizado na base do sistema." };
  }

  if (!qrCode.active) {
    return { valid: false, message: "QR Code inativo para registro de ponto." };
  }

  const client = getClientByQrCode(qrCode);
  if (!client) {
    return { valid: false, message: "QR Code sem empreendimento vinculado." };
  }

  if (client.active === false) {
    return { valid: false, message: "Empreendimento inativo para registro de ponto." };
  }

  if (!getClientCoordinates(client)) {
    return { valid: false, message: "QR Code sem latitude e longitude cadastradas." };
  }

  return { valid: true, payload, qrCode, client };
}

function parseQrPayload(rawPayload) {
  if (typeof rawPayload === "object" && rawPayload) return rawPayload;

  try {
    const parsedPayload = JSON.parse(String(rawPayload || ""));
    return parsedPayload && typeof parsedPayload === "object" ? parsedPayload : null;
  } catch {
    return null;
  }
}

function buildQrPayload(qrCode) {
  return JSON.stringify({
    empreendimento_id: qrCode.clientCode,
    qr_code_id: qrCode.id,
    token: qrCode.token,
  });
}

function populateCheckinQrSelect() {
  const select = document.querySelector("#checkinQrSelect");
  if (!select) return;

  select.innerHTML = state.qrCodes
    .filter((qrCode) => qrCode.active)
    .map((qrCode) => `<option value="${escapeHtml(qrCode.id)}">${escapeHtml(qrCode.client)}</option>`)
    .join("");
}

function updateCheckinSteps(activeStep) {
  const stepOrder = ["cpf", "qr", "location", "confirm"];
  const activeIndex = stepOrder.indexOf(activeStep);

  stepOrder.forEach((step, index) => {
    const item = document.querySelector(`#checkinStep${capitalize(step)}`);
    if (!item) return;
    item.classList.toggle("active", index === activeIndex);
    item.classList.toggle("done", activeIndex > index);
  });
}

function getCheckinPosition(clientCoordinates) {
  if (document.querySelector("#checkinDemoLocation").checked) {
    return Promise.resolve({
      lat: clientCoordinates.lat,
      lng: clientCoordinates.lng,
      accuracy: 18,
    });
  }

  if (!navigator.geolocation) {
    return Promise.reject(new Error("Geolocalização indisponível neste navegador."));
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy || 999,
        });
      },
      () => {
        reject(
          new Error(
            "Não foi possível registrar o ponto. É necessário permitir o acesso à localização do dispositivo.",
          ),
        );
      },
      {
        enableHighAccuracy: true,
        timeout: checkinRules.geolocationTimeoutMs,
        maximumAge: 0,
      },
    );
  });
}

function calculateDistanceMeters(origin, destination) {
  const earthRadius = 6371000;
  const toRadians = (value) => (value * Math.PI) / 180;
  const deltaLat = toRadians(destination.lat - origin.lat);
  const deltaLng = toRadians(destination.lng - origin.lng);
  const lat1 = toRadians(origin.lat);
  const lat2 = toRadians(destination.lat);
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function setupEmployeeMasks() {
  const employeeForm = document.querySelector("#employeeForm");
  const cpfInput = employeeForm.querySelector('[name="cpf"]');
  const phoneInput = employeeForm.querySelector('[name="phone"]');

  cpfInput.addEventListener("input", () => {
    cpfInput.value = formatCpf(cpfInput.value);
  });

  phoneInput.addEventListener("input", () => {
    phoneInput.value = formatPhone(phoneInput.value);
  });
}

function handleClientCardAction(event) {
  const button = event.target.closest("[data-client-action]");
  if (!button) return;

  const clientId = Number(button.dataset.clientId);
  const action = button.dataset.clientAction;

  if (action === "edit") {
    openClientEditor(clientId);
    return;
  }

  if (action === "delete") {
    openDeleteClientModal(clientId);
  }
}

function prepareClientForm(client = null) {
  const form = document.querySelector("#clientForm");
  form.reset();
  clientFormMode = client ? "edit" : "create";
  editingClientId = client?.id ?? null;
  document.querySelector("#clientFormTitle").textContent = client
    ? "Editar empreendimento"
    : "Novo empreendimento";
  document.querySelector("#clientFormSubmit").textContent = client
    ? "Salvar alterações"
    : "Cadastrar empreendimento";
  clearFormMessage("#clientFormMessage");

  if (!client) {
    form.elements.code.value = generateNextClientCode();
    form.elements.allowedRadiusMeters.value = checkinRules.defaultRadiusMeters;
    form.elements.activeEmployees.value = 0;
    form.elements.active.value = "true";
    return;
  }

  form.elements.name.value = client.name;
  form.elements.code.value = client.code || generateNextClientCode();
  form.elements.type.value = client.type || "Empresa";
  form.elements.manager.value = client.manager || "";
  form.elements.address.value = client.address || "";
  form.elements.latitude.value = getClientCoordinates(client)?.lat ?? "";
  form.elements.longitude.value = getClientCoordinates(client)?.lng ?? "";
  form.elements.allowedRadiusMeters.value = getClientAllowedRadius(client);
  form.elements.activeEmployees.value = Number(client.activeEmployees || 0);
  form.elements.active.value = String(client.active !== false);
}

function saveClientFromForm() {
  const form = document.querySelector("#clientForm");
  const data = Object.fromEntries(new FormData(form));
  const wasEditing = clientFormMode === "edit";
  const existingClient = wasEditing ? findClientById(editingClientId) : null;
  const oldName = existingClient?.name || "";
  const oldCode = existingClient?.code || "";
  const parsedClient = parseClientFormData(data, existingClient?.id);

  if (!parsedClient.valid) {
    setFormMessage("#clientFormMessage", parsedClient.message, "error");
    return;
  }

  if (wasEditing && !existingClient) {
    setFormMessage("#clientFormMessage", "Empreendimento não encontrado para edição.", "error");
    return;
  }

  if (wasEditing) {
    Object.assign(existingClient, parsedClient.client);
    updateClientReferences(oldName, existingClient.name, oldCode, existingClient.code);
    syncQrCodeForClient(existingClient, { oldName, oldCode });
  } else {
    const client = {
      id: Date.now(),
      ...parsedClient.client,
    };
    state.clients.unshift(client);
    syncQrCodeForClient(client);
  }

  saveState();
  clientModal.close();
  clientFormMode = "create";
  editingClientId = null;
  renderAll();
  showToast(
    wasEditing
      ? "Empreendimento atualizado com sucesso."
      : "Empreendimento cadastrado com sucesso.",
  );
}

function parseClientFormData(data, currentClientId = null) {
  const name = String(data.name || "").trim();
  const code = String(data.code || generateNextClientCode()).trim().toUpperCase();
  const type = String(data.type || "Empresa").trim();
  const address = String(data.address || "").trim();
  const manager = String(data.manager || "").trim();
  const latitude = Number(data.latitude);
  const longitude = Number(data.longitude);
  const activeEmployees = Math.max(0, Math.round(Number(data.activeEmployees || 0)));
  const allowedRadiusMeters = getSafeCheckinRadius(data.allowedRadiusMeters);
  const active = data.active === "true";

  if (!name || !address || !manager) {
    return { valid: false, message: "Preencha nome, endereço e supervisor responsável." };
  }

  if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
    return { valid: false, message: "Informe uma latitude válida entre -90 e 90." };
  }

  if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
    return { valid: false, message: "Informe uma longitude válida entre -180 e 180." };
  }

  const duplicatedName = state.clients.some(
    (client) =>
      Number(client.id) !== Number(currentClientId) &&
      normalizeText(client.name) === normalizeText(name),
  );
  if (duplicatedName) {
    return { valid: false, message: "Já existe um empreendimento com esse nome." };
  }

  const duplicatedCode = state.clients.some(
    (client) =>
      Number(client.id) !== Number(currentClientId) &&
      String(client.code || "").toUpperCase() === code,
  );
  if (duplicatedCode) {
    return { valid: false, message: "Já existe um empreendimento com esse código." };
  }

  return {
    valid: true,
    client: {
      code,
      name,
      type,
      address,
      manager,
      activeEmployees,
      coordinates: { lat: latitude, lng: longitude },
      allowedRadiusMeters,
      active,
    },
  };
}

function openClientEditor(clientId) {
  const client = findClientById(clientId);
  if (!client) {
    showToast("Empreendimento não encontrado para edição.");
    return;
  }

  prepareClientForm(client);
  clientModal.showModal();
}

function openDeleteClientModal(clientId) {
  const client = findClientById(clientId);
  if (!client) {
    showToast("Empreendimento não encontrado para exclusão.");
    return;
  }

  pendingDeleteClientId = clientId;
  document.querySelector("#deleteClientName").textContent = client.name;
  document.querySelector("#deleteClientConfirmation").value = "";
  document.querySelector("#confirmDeleteClient").disabled = true;
  clearFormMessage("#deleteClientMessage");
  deleteClientModal.showModal();
}

function closeDeleteClientModal() {
  pendingDeleteClientId = null;
  if (deleteClientModal.open) deleteClientModal.close();
}

function confirmClientDeletion() {
  const confirmation = normalizeDeleteConfirmation(
    document.querySelector("#deleteClientConfirmation").value,
  );

  if (confirmation !== "excluir") {
    setFormMessage(
      "#deleteClientMessage",
      'Digite "excluir" para confirmar a remoção do empreendimento.',
      "error",
    );
    return;
  }

  const client = findClientById(pendingDeleteClientId);
  if (!client) {
    setFormMessage("#deleteClientMessage", "Empreendimento não encontrado.", "error");
    return;
  }

  const usage = getClientUsage(client);
  if (usage.total > 0) {
    setFormMessage(
      "#deleteClientMessage",
      `Este empreendimento possui ${usage.total} vínculo(s) operacional(is). Para preservar o histórico, edite o status para Inativo antes de remover vínculos.`,
      "error",
    );
    return;
  }

  state.clients = state.clients.filter((item) => Number(item.id) !== Number(client.id));
  state.qrCodes = state.qrCodes.filter(
    (qrCode) => qrCode.clientCode !== client.code && qrCode.client !== client.name,
  );
  saveState();
  closeDeleteClientModal();
  renderAll();
  showToast("Empreendimento excluído com sucesso.");
}

function handleEmployeeTableAction(event) {
  const button = event.target.closest("[data-employee-action]");
  if (!button) return;

  const employeeId = Number(button.dataset.employeeId);
  const action = button.dataset.employeeAction;

  if (action === "view") {
    openEmployeeDetail(employeeId);
    return;
  }

  if (action === "edit") {
    openEmployeeEditor(employeeId);
    return;
  }

  if (action === "delete") {
    openDeleteEmployeeModal(employeeId);
  }
}

function prepareEmployeeForm(employee = null) {
  const form = document.querySelector("#employeeForm");
  form.reset();
  employeeFormMode = employee ? "edit" : "create";
  editingEmployeeId = employee?.id ?? null;
  document.querySelector("#employeeFormTitle").textContent = employee
    ? "Editar funcionário"
    : "Novo funcionário";
  document.querySelector("#employeeFormSubmit").textContent = employee
    ? "Salvar alterações"
    : "Cadastrar funcionário";

  if (!employee) {
    form.querySelector('[name="registration"]').value = generateNextEmployeeRegistration();
    return;
  }

  form.elements.name.value = employee.name;
  form.elements.cpf.value = formatCpf(employee.cpf);
  form.elements.phone.value = formatPhone(employee.phone);
  form.elements.role.value = employee.role;
  form.elements.registration.value = employee.registration;
  form.elements.client.value = employee.client;
  form.elements.status.value = employee.status;
}

function openEmployeeDetail(employeeId) {
  const employee = findEmployeeById(employeeId);
  if (!employee) {
    showToast("Funcionário não encontrado.");
    return;
  }

  document.querySelector("#employeeDetailContent").innerHTML = `
    <article class="employee-profile">
      <div class="employee-avatar">${escapeHtml(getInitials(employee.name))}</div>
      <div>
        <h3>${escapeHtml(employee.name)}</h3>
        <p>${escapeHtml(employee.role)} · ${escapeHtml(employee.client)}</p>
        <span class="badge ${escapeHtml(employee.status)}">${escapeHtml(employee.status)}</span>
      </div>
    </article>
    <dl class="detail-grid">
      <div><dt>CPF</dt><dd>${escapeHtml(employee.cpf)}</dd></div>
      <div><dt>Telefone</dt><dd>${escapeHtml(employee.phone)}</dd></div>
      <div><dt>Matrícula</dt><dd>${escapeHtml(employee.registration)}</dd></div>
      <div><dt>Cargo</dt><dd>${escapeHtml(employee.role)}</dd></div>
      <div><dt>Empreendimento</dt><dd>${escapeHtml(employee.client)}</dd></div>
      <div><dt>Status</dt><dd>${escapeHtml(employee.status)}</dd></div>
    </dl>
    <div class="modal-actions">
      <button class="button button-secondary" type="button" data-employee-action="edit" data-employee-id="${employee.id}">
        Editar cadastro
      </button>
      <button class="button button-danger" type="button" data-employee-action="delete" data-employee-id="${employee.id}">
        Excluir funcionário
      </button>
    </div>
  `;

  employeeDetailModal.showModal();
}

function openEmployeeEditor(employeeId) {
  const employee = findEmployeeById(employeeId);
  if (!employee) {
    showToast("Funcionário não encontrado para edição.");
    return;
  }

  if (employeeDetailModal.open) employeeDetailModal.close();
  prepareEmployeeForm(employee);
  employeeModal.showModal();
}

function openDeleteEmployeeModal(employeeId) {
  const employee = findEmployeeById(employeeId);
  if (!employee) {
    showToast("Funcionário não encontrado para exclusão.");
    return;
  }

  pendingDeleteEmployeeId = employeeId;
  document.querySelector("#deleteEmployeeName").textContent = employee.name;
  document.querySelector("#deleteEmployeeConfirmation").value = "";
  document.querySelector("#confirmDeleteEmployee").disabled = true;
  clearFormMessage("#deleteEmployeeMessage");
  if (employeeDetailModal.open) employeeDetailModal.close();
  deleteEmployeeModal.showModal();
}

function closeDeleteEmployeeModal() {
  pendingDeleteEmployeeId = null;
  if (deleteEmployeeModal.open) deleteEmployeeModal.close();
}

function confirmEmployeeDeletion() {
  const confirmation = normalizeDeleteConfirmation(
    document.querySelector("#deleteEmployeeConfirmation").value,
  );

  if (confirmation !== "excluir") {
    setFormMessage(
      "#deleteEmployeeMessage",
      'Digite "excluir" para confirmar a remoção do funcionário.',
      "error",
    );
    return;
  }

  const employee = findEmployeeById(pendingDeleteEmployeeId);
  if (!employee) {
    setFormMessage("#deleteEmployeeMessage", "Funcionário não encontrado.", "error");
    return;
  }

  removeEmployee(employee);
  saveState();
  closeDeleteEmployeeModal();
  renderAll();
  showToast("Funcionário excluído com sucesso.");
}

function findEmployeeById(employeeId) {
  return state.employees.find((employee) => Number(employee.id) === Number(employeeId));
}

function findClientById(clientId) {
  return state.clients.find((client) => Number(client.id) === Number(clientId));
}

function findEmployeeByCpf(cpf) {
  const digits = onlyDigits(cpf);
  return state.employees.find((employee) => onlyDigits(employee.cpf) === digits);
}

function getClientCoordinates(client) {
  if (client?.coordinates) return client.coordinates;

  const seededClient = initialState.clients.find((item) => item.name === client?.name);
  return seededClient?.coordinates || null;
}

function getClientAllowedRadius(client) {
  return getSafeCheckinRadius(client?.allowedRadiusMeters);
}

function getQrCodeById(qrCodeId) {
  return state.qrCodes.find((qrCode) => qrCode.id === qrCodeId) || null;
}

function getClientByQrCode(qrCode) {
  if (!qrCode) return null;
  return (
    state.clients.find((client) => client.code === qrCode.clientCode) ||
    state.clients.find((client) => client.name === qrCode.client) ||
    null
  );
}

function getNextCheckinRegistration(employee) {
  const todayPoints = state.points.filter(
    (point) => point.employee === employee.name && point.date === today(),
  );
  const openPoint = todayPoints.find((point) => point.in && !point.out);

  if (openPoint) {
    return {
      type: "Saída",
      point: openPoint,
      blocked: false,
    };
  }

  if (todayPoints.some((point) => point.in && point.out)) {
    return {
      type: null,
      point: null,
      blocked: true,
      message: "Entrada e saída já registradas hoje para este funcionário.",
    };
  }

  return {
    type: "Entrada",
    point: null,
    blocked: false,
  };
}

function hasRecentSuccessfulCheckin(cpfDigits) {
  const duplicateWindowMs = checkinRules.duplicateWindowMinutes * 60000;
  const now = Date.now();

  return state.checkinAttempts.some((attempt) => {
    if (attempt.status !== "Aprovado") return false;
    if (onlyDigits(attempt.cpf) !== cpfDigits) return false;
    const attemptTime = new Date(attempt.createdAt).getTime();
    if (!Number.isFinite(attemptTime)) return false;
    return now - attemptTime <= duplicateWindowMs;
  });
}

function persistQrPoint({
  employee,
  client,
  qrCode,
  type,
  existingPoint,
  devicePosition,
  clientCoordinates,
  distance,
  accuracy,
  registrationTime,
}) {
  const auditPayload = {
    employeeId: employee.id,
    cpf: employee.cpf,
    clientId: client.id,
    clientCode: client.code,
    qrCodeId: qrCode.id,
    type,
    serverTime: nowIso(),
    latitudeDevice: devicePosition.lat,
    longitudeDevice: devicePosition.lng,
    latitudeClient: clientCoordinates.lat,
    longitudeClient: clientCoordinates.lng,
    distanceMeters: distance,
    accuracyMeters: accuracy,
    validationStatus: "Aprovado",
    source: "QR Code",
    ip: "Disponível no backend",
    userAgent: navigator.userAgent,
  };

  if (type === "Saída" && existingPoint) {
    Object.assign(existingPoint, {
      out: registrationTime,
      lastType: "Saída",
      status: "Ponto normal",
      updatedAt: nowIso(),
      checkoutAudit: auditPayload,
    });
    return existingPoint;
  }

  const point = {
    id: Date.now(),
    employee: employee.name,
    employeeId: employee.id,
    cpf: employee.cpf,
    client: client.name,
    clientId: client.id,
    date: today(),
    in: registrationTime,
    out: "",
    status: "Ponto normal",
    source: "QR Code",
    type: "Entrada",
    createdAt: nowIso(),
    checkinAudit: auditPayload,
    distance,
    accuracy,
    location: devicePosition,
  };

  state.points.unshift(point);
  return point;
}

function recordCheckinAttempt({
  cpf = "",
  employee = null,
  client = null,
  qrCode = null,
  point = null,
  type = "",
  status,
  reason,
  distance = null,
  accuracy = null,
  devicePosition = null,
}) {
  const attempt = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    pointId: point?.id || null,
    employeeId: employee?.id || null,
    employee: employee?.name || "Não identificado",
    cpf: formatCpf(cpf || employee?.cpf || ""),
    clientId: client?.id || null,
    client: client?.name || qrCode?.client || "Não identificado",
    clientCode: client?.code || qrCode?.clientCode || "",
    qrCodeId: qrCode?.id || "",
    type: type || "-",
    date: today(),
    time: currentTime(),
    serverTime: nowIso(),
    distanceMeters: distance,
    accuracyMeters: accuracy,
    status,
    reason,
    latitudeDevice: devicePosition?.lat ?? null,
    longitudeDevice: devicePosition?.lng ?? null,
    userAgent: navigator.userAgent,
    ip: "Disponível no backend",
    createdAt: nowIso(),
  };

  state.checkinAttempts.unshift(attempt);
  state.checkinAttempts = state.checkinAttempts.slice(0, 80);
  return attempt;
}

function updateEmployeeReferences(oldName, newName) {
  if (!oldName || oldName === newName) return;

  state.points.forEach((point) => {
    if (point.employee === oldName) point.employee = newName;
  });

  state.certificates.forEach((certificate) => {
    if (certificate.employee === oldName) certificate.employee = newName;
  });
}

function updateClientReferences(oldName, newName, oldCode, newCode) {
  if (oldName && oldName !== newName) {
    state.employees.forEach((employee) => {
      if (employee.client === oldName) employee.client = newName;
    });

    state.events.forEach((event) => {
      if (event.client === oldName) event.client = newName;
    });

    state.points.forEach((point) => {
      if (point.client === oldName) point.client = newName;
    });

    state.checkinAttempts.forEach((attempt) => {
      if (attempt.client === oldName) attempt.client = newName;
    });
  }

  state.qrCodes.forEach((qrCode) => {
    if ((oldName && qrCode.client === oldName) || (oldCode && qrCode.clientCode === oldCode)) {
      qrCode.client = newName;
      qrCode.clientCode = newCode;
    }
  });
}

function syncQrCodeForClient(client, previous = {}) {
  let qrCode =
    state.qrCodes.find((item) => item.clientCode === client.code) ||
    state.qrCodes.find((item) => previous.oldCode && item.clientCode === previous.oldCode) ||
    state.qrCodes.find((item) => item.client === client.name) ||
    state.qrCodes.find((item) => previous.oldName && item.client === previous.oldName);

  if (!qrCode) {
    qrCode = {
      id: generateNextQrCodeId(),
      companyId: "MS-MULTSERV",
      createdAt: today(),
    };
    state.qrCodes.push(qrCode);
  }

  Object.assign(qrCode, {
    clientCode: client.code,
    client: client.name,
    token: qrCode.token || `MS-QR-${client.code}-2026`,
    description: qrCode.description || `QR físico de ${client.name}`,
    active: client.active !== false,
    updatedAt: nowIso(),
  });
}

function getClientUsage(client) {
  const employees = state.employees.filter((employee) => employee.client === client.name).length;
  const events = state.events.filter((event) => event.client === client.name).length;
  const points = state.points.filter((point) => point.client === client.name).length;
  const attempts = state.checkinAttempts.filter(
    (attempt) => attempt.client === client.name || attempt.clientCode === client.code,
  ).length;

  return {
    employees,
    events,
    points,
    attempts,
    total: employees + events + points + attempts,
  };
}

function removeEmployee(employee) {
  const employeeId = Number(employee.id);
  state.employees = state.employees.filter((item) => Number(item.id) !== employeeId);
  state.events.forEach((event) => {
    event.team = event.team.filter((memberId) => Number(memberId) !== employeeId);
  });
  state.points = state.points.filter((point) => point.employee !== employee.name);
  state.certificates = state.certificates.filter(
    (certificate) => certificate.employee !== employee.name,
  );
}

function normalizeDeleteConfirmation(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function isValidCpf(value) {
  const digits = onlyDigits(value);
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calculateDigit = (base) => {
    const sum = base
      .split("")
      .reduce((total, digit, index) => total + Number(digit) * (base.length + 1 - index), 0);
    const digit = (sum * 10) % 11;
    return digit === 10 ? 0 : digit;
  };

  const firstDigit = calculateDigit(digits.slice(0, 9));
  const secondDigit = calculateDigit(digits.slice(0, 10));
  return digits.endsWith(`${firstDigit}${secondDigit}`);
}

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d+)/, "($1) $2");
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  }

  return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

function isValidBrazilMobilePhone(value) {
  const digits = onlyDigits(value);
  return digits.length === 11 && digits[2] === "9";
}

function generateNextEmployeeRegistration() {
  const highestNumber = state.employees.reduce((highest, employee) => {
    const match = String(employee.registration || "").match(/^MS-(\d+)$/i);
    if (!match) return highest;
    return Math.max(highest, Number(match[1]));
  }, 0);

  return `MS-${String(highestNumber + 1).padStart(3, "0")}`;
}

function generateNextClientCode() {
  const highestNumber = state.clients.reduce((highest, client) => {
    const match = String(client.code || "").match(/^EMP-(\d+)$/i);
    if (!match) return highest;
    return Math.max(highest, Number(match[1]));
  }, 0);

  return `EMP-${String(highestNumber + 1).padStart(3, "0")}`;
}

function generateNextQrCodeId() {
  const highestNumber = state.qrCodes.reduce((highest, qrCode) => {
    const match = String(qrCode.id || "").match(/^QR-LOCAL-(\d+)$/i);
    if (!match) return highest;
    return Math.max(highest, Number(match[1]));
  }, 0);

  return `QR-LOCAL-${String(highestNumber + 1).padStart(3, "0")}`;
}

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatCoordinate(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toFixed(6) : "-";
}

function capitalize(value) {
  return String(value || "").charAt(0).toUpperCase() + String(value || "").slice(1);
}

function openLogin() {
  loginScreen.hidden = false;
  document.body.classList.add("modal-open");
  showLoginForm();
}

function closeLogin() {
  loginScreen.hidden = true;
  document.body.classList.remove("modal-open");
}

function enterApp(user) {
  activeUser = user;
  document.querySelector("#activeUserName").textContent = user.name;
  document.querySelector("#activeUserEmail").textContent = user.email;
  document.querySelector("#activeUserInitial").textContent = user.name.charAt(0);
  document.querySelector("#sidebarUserName").textContent = user.name;
  document.querySelector("#sidebarUserEmail").textContent = user.email;
  document.querySelector("#sidebarUserInitial").textContent = user.name.charAt(0);
  document.querySelector("#activeRole").textContent = user.role;
  window.scrollTo({ top: 0, left: 0 });
  publicSite.hidden = true;
  loginScreen.hidden = true;
  appShell.hidden = false;
  document.body.classList.remove("modal-open");
  document.body.classList.add("is-logged-in");
  updateAccessControl();
  const currentRoute = getCurrentAppRoute();
  navigateToAppView(currentRoute?.view || "dashboard", {
    replace: !currentRoute,
  });
  renderAll();
}

function renderAll() {
  populateSelects();
  updateAccessControl();
  renderDashboard();
  renderEmployees();
  renderClients();
  renderBrandShowcase();
  renderBrandAdmin();
  renderEvents();
  renderTimeList();
  renderTimeAudit();
  renderFrequency();
  renderCertificates();
  renderReports();
  renderCalendar();
  renderLeads();
  renderUsers();
  renderMailbox();
}

function renderDashboard() {
  const reportAi = getReportAiData();
  const reportEvents = reportAi.events;
  const reportRecords = reportAi.reports;
  const allVersions = reportRecords.flatMap((report) =>
    Array.isArray(report.versions) ? report.versions.map((version) => ({ ...version, report })) : [],
  );
  const latestVersion = allVersions
    .slice()
    .sort((a, b) => Number(b.id || 0) - Number(a.id || 0))[0];
  const uniqueClients = new Set(
    reportEvents.map((event) => sanitizeReportText(event.clientName)).filter(Boolean),
  );
  const totalVersions = reportAi.reports.reduce(
    (sum, item) => sum + (Array.isArray(item.versions) ? item.versions.length : 0),
    0,
  );
  const emittedFiles = allVersions.reduce(
    (sum, version) =>
      sum +
      Number(Boolean(version.filePdfUrl)) +
      Number(Boolean(version.fileDocxUrl)) +
      Number(Boolean(version.fileSheetUrl)),
    0,
  );
  const metricBlocks = Object.keys(reportAi.metrics || {}).length;
  const totalAttachments = reportAi.attachments.length;
  const audits = reportEvents.map((event) => {
    const report = getReportRecordForEvent(event.id);
    const metrics = getReportMetricsForEvent(event.id, event);
    return buildReportAudit(event, metrics, getReportAttachments(event.id), report);
  });
  const openIssues = audits.reduce(
    (sum, audit) => sum + audit.checks.filter((check) => check.severity !== "success").length,
    0,
  );
  const averageScore = audits.length
    ? audits.reduce((sum, audit) => sum + audit.score, 0) / audits.length
    : 0;
  const openLeads = state.leads.filter((lead) => ["Novo", "Em atendimento"].includes(lead.status)).length;
  const clientList = [...uniqueClients].slice(0, 3).join(", ") || "Nenhum contratante cadastrado";
  const reportTypeCounts = reportRecords.reduce((counts, report) => {
    const type = report.reportType || "Relatório";
    counts[type] = (counts[type] || 0) + (Array.isArray(report.versions) ? report.versions.length : 0);
    return counts;
  }, {});
  const reportTypeSummary =
    Object.entries(reportTypeCounts)
      .filter(([, count]) => count > 0)
      .map(([type, count]) => `${count} ${type.toLowerCase()}`)
      .join(" · ") || "Nenhuma emissão registrada";
  const sourceTypes = reportAi.attachments.reduce((counts, attachment) => {
    const type = attachment.fileType || "Fonte";
    counts[type] = (counts[type] || 0) + 1;
    return counts;
  }, {});
  const sourceSummary =
    Object.entries(sourceTypes)
      .map(([type, count]) => `${count} ${type}`)
      .join(" · ") || "Aguardando uploads";

  document.querySelector("#dashboardCards").innerHTML = [
    card("Clientes cadastrados", uniqueClients.size, "Clientes ou áreas com relatórios no Report AI"),
    card("Operações cadastradas", reportEvents.length, "Bases de negócio com relatório operacional"),
    card("Relatórios emitidos", totalVersions, "Versões geradas no histórico"),
    card("Arquivos emitidos", emittedFiles, "PDF, Word e Sheets simulados"),
    card("Dados estruturados", metricBlocks, "Blocos de indicadores extraídos"),
    card("Anexos importados", totalAttachments, "PDF, imagem, CSV ou XLSX"),
    card("Leads captados", state.leads.length, `${openLeads} em aberto`),
    card("Pendências abertas", openIssues, `Score médio ${formatDecimal(averageScore)}/10`),
  ].join("");

  document.querySelector("#statusBoard").innerHTML = `
    <article class="status-row">
      <div>
        <strong>Contratantes cadastrados</strong>
        <small>${escapeHtml(clientList)}</small>
      </div>
      <span class="badge active">${formatInteger(uniqueClients.size)}</span>
    </article>
    <article class="status-row">
      <div>
        <strong>Relatórios por modelo</strong>
        <small>${escapeHtml(reportTypeSummary)}</small>
      </div>
      <span class="badge manual">${formatInteger(totalVersions)}</span>
    </article>
    <article class="status-row">
      <div>
        <strong>Fontes importadas</strong>
        <small>${escapeHtml(sourceSummary)}</small>
      </div>
      <span class="badge">${formatInteger(totalAttachments)}</span>
    </article>
    <article class="status-row">
      <div>
        <strong>Qualidade média dos relatórios</strong>
        <small>Baseada nas auditorias automáticas do módulo Report AI</small>
      </div>
      <span class="badge ${averageScore >= 8 ? "active" : "warning"}">${formatDecimal(averageScore)}/10</span>
    </article>
  `;

  document.querySelector("#dashboardEvents").innerHTML = `
    <article class="list-item">
      <div>
        <strong>Última emissão</strong>
        <small>${
          latestVersion
            ? `${escapeHtml(latestVersion.versionNumber)} · score ${formatDecimal(latestVersion.qualityScore)} · ${escapeHtml(
                latestVersion.status,
              )}`
            : "Nenhum relatório emitido ainda"
        }</small>
      </div>
      <span class="badge ${latestVersion ? statusToBadgeClass(latestVersion.status) : "manual"}">
        ${latestVersion ? "Emitido" : "Rascunho"}
      </span>
    </article>
    <article class="list-item">
      <div>
        <strong>Leads em aberto</strong>
        <small>Contatos novos ou em atendimento vindos do site</small>
      </div>
      <span class="badge ${openLeads ? "warning" : "active"}">${formatInteger(openLeads)}</span>
    </article>
    <article class="list-item">
      <div>
        <strong>Pendências de auditoria</strong>
        <small>Inconsistências, campos ausentes ou fontes insuficientes</small>
      </div>
      <span class="badge ${openIssues ? "warning" : "active"}">${formatInteger(openIssues)}</span>
    </article>
    <article class="list-item">
      <div>
        <strong>Próxima ação recomendada</strong>
        <small>${
          openIssues
            ? "Revisar pendências antes de aprovar ou enviar relatórios ao cliente."
            : "Inserir novo relatório ou acompanhar leads captados."
        }</small>
      </div>
      <span class="badge manual">Resumo</span>
    </article>
  `;

  renderLatestReportGenerations();
}

function getReportGenerationHistory({ userOnly = true, limit = Infinity } = {}) {
  const reportAi = getReportAiData();
  const owners = new Set(
    [activeUser?.name, activeUser?.email]
      .filter(Boolean)
      .map((value) => normalizeReportOwner(value)),
  );

  return reportAi.reports
    .flatMap((report) => {
      const event = reportAi.events.find((item) => Number(item.id) === Number(report.eventId));
      return (Array.isArray(report.versions) ? report.versions : []).map((version) => ({
        event,
        report,
        version,
      }));
    })
    .filter(({ version }) => {
      if (!userOnly) return true;
      const owner = normalizeReportOwner(version.createdBy);
      return owner && owners.has(owner);
    })
    .sort((a, b) => getReportVersionSortValue(b.version) - getReportVersionSortValue(a.version))
    .slice(0, limit);
}

function renderLatestReportGenerations() {
  const list = document.querySelector("#latestReportGenerationList");
  const count = document.querySelector("#latestReportGenerationCount");
  if (!list || !count) return;

  const generations = getReportGenerationHistory({ userOnly: true, limit: 6 });
  count.textContent = `${generations.length} ${generations.length === 1 ? "geração" : "gerações"}`;

  if (!generations.length) {
    list.innerHTML = `
      <article class="empty-state report-generation-empty">
        Nenhum relatório gerado por ${escapeHtml(activeUser?.name || "este usuário")} ainda.
        Gere uma versão no módulo Report AI para acompanhar o histórico aqui.
      </article>
    `;
    return;
  }

  list.innerHTML = generations
    .map(({ event, report, version }) => {
      const fileCount =
        Number(Boolean(version.filePdfUrl)) +
        Number(Boolean(version.fileDocxUrl)) +
        Number(Boolean(version.fileSheetUrl));
      const eventName = event?.eventName || "Operação sem nome";
      const clientName = event?.clientName || "Cliente não informado";
      const status = version.status || report.status || "Rascunho";

      return `
        <button
          class="report-generation-card"
          type="button"
          data-open-report-generation
          data-report-event-id="${Number(report.eventId) || ""}"
          aria-label="Abrir ${escapeHtml(version.versionNumber || "versão")} de ${escapeHtml(eventName)}"
        >
          <span class="badge ${statusToBadgeClass(status)}">${escapeHtml(status)}</span>
          <strong>${escapeHtml(eventName)}</strong>
          <small>${escapeHtml(report.reportType || "Relatório")} · ${escapeHtml(
            version.versionNumber || report.currentVersion || "v0.1",
          )}</small>
          <span>
            ${formatReportDate(version.createdAt)} · score ${formatDecimal(version.qualityScore)}/10 ·
            ${formatInteger(fileCount)} arquivo${fileCount === 1 ? "" : "s"}
          </span>
          <em>${escapeHtml(clientName)} · acessar relatório</em>
        </button>
      `;
    })
    .join("");
}

function renderEmployees() {
  const search = document.querySelector("#employeeSearch")?.value.toLowerCase() || "";
  const employees = state.employees.filter((employee) => {
    return [employee.name, employee.cpf, employee.registration, employee.role, employee.client, employee.status]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  document.querySelector("#employeeTable").innerHTML = employees
    .map(
      (employee) => `
        <tr>
          <td data-label="Funcionário">
            <strong>${escapeHtml(employee.name)}</strong><br>
            <small>${escapeHtml(employee.cpf)} · ${escapeHtml(employee.registration)}</small>
          </td>
          <td data-label="Cargo">${escapeHtml(employee.role)}</td>
          <td data-label="Empreendimento">${escapeHtml(employee.client)}</td>
          <td data-label="Status"><span class="badge ${escapeHtml(employee.status)}">${escapeHtml(employee.status)}</span></td>
          <td data-label="Telefone">${escapeHtml(employee.phone)}</td>
          <td data-label="Ações">
            <div class="employee-actions" aria-label="Ações de ${escapeHtml(employee.name)}">
              <button
                class="icon-action-button"
                type="button"
                data-employee-action="view"
                data-employee-id="${employee.id}"
                aria-label="Visualizar funcionário"
                title="Visualizar"
              >
                ${renderIcon("eye")}
              </button>
              <button
                class="icon-action-button"
                type="button"
                data-employee-action="edit"
                data-employee-id="${employee.id}"
                aria-label="Editar funcionário"
                title="Editar"
              >
                ${renderIcon("edit")}
              </button>
              <button
                class="icon-action-button danger"
                type="button"
                data-employee-action="delete"
                data-employee-id="${employee.id}"
                aria-label="Excluir funcionário"
                title="Excluir"
              >
                ${renderIcon("trash")}
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderIcon(name) {
  const icons = {
    eye: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    `,
    edit: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"></path>
      </svg>
    `,
    trash: `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h18"></path>
        <path d="M8 6V4h8v2"></path>
        <path d="M19 6l-1 14H6L5 6"></path>
        <path d="M10 11v5"></path>
        <path d="M14 11v5"></path>
      </svg>
    `,
  };

  return icons[name] || "";
}

function getInitials(name) {
  return String(name || "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function renderClients() {
  document.querySelector("#clientGrid").innerHTML = state.clients
    .map(
      (client) => {
        const coordinates = getClientCoordinates(client);
        const qrCode = getQrCodeForClient(client);

        return `
        <article class="client-card ${client.active === false ? "inactive" : ""}">
          <div class="client-card-header">
            <div>
              <h3>${escapeHtml(client.name)}</h3>
              <p>${escapeHtml(client.type)} · ${escapeHtml(client.address)}</p>
            </div>
            <span class="badge ${client.active === false ? "danger" : "active"}">
              ${client.active === false ? "Inativo" : "Ativo"}
            </span>
          </div>
          <dl>
            <div><dt>Código</dt><dd>${escapeHtml(client.code || "-")}</dd></div>
            <div><dt>Supervisor</dt><dd>${escapeHtml(client.manager || "-")}</dd></div>
            <div><dt>Equipe ativa</dt><dd>${Number(client.activeEmployees || 0)}</dd></div>
            <div><dt>Raio de ponto</dt><dd>${getClientAllowedRadius(client)}m</dd></div>
            <div><dt>Latitude</dt><dd>${formatCoordinate(coordinates?.lat)}</dd></div>
            <div><dt>Longitude</dt><dd>${formatCoordinate(coordinates?.lng)}</dd></div>
            <div><dt>QR Code</dt><dd>${escapeHtml(qrCode?.id || "Pendente")}</dd></div>
          </dl>
          <div class="client-card-actions">
            <button
              class="button button-secondary"
              type="button"
              data-client-action="edit"
              data-client-id="${client.id}"
            >
              Editar
            </button>
            <button
              class="button button-danger"
              type="button"
              data-client-action="delete"
              data-client-id="${client.id}"
            >
              Excluir
            </button>
          </div>
        </article>
      `;
      },
    )
    .join("");
}

function getQrCodeForClient(client) {
  return (
    state.qrCodes.find((qrCode) => qrCode.clientCode === client.code) ||
    state.qrCodes.find((qrCode) => qrCode.client === client.name) ||
    null
  );
}

function renderBrandShowcase() {
  const carousel = document.querySelector("#publicBrandCarousel");
  if (!carousel) return;

  const activeBrands = getOrderedBrandLogos().filter((brand) => brand.active);
  carousel.style.setProperty("--brand-speed", `${getBrandSpeed()}s`);

  if (!activeBrands.length) {
    carousel.style.animation = "none";
    carousel.style.width = "auto";
    carousel.innerHTML = `
      <div class="brand-empty">
        Nenhuma fonte ativa no momento.
      </div>
    `;
    return;
  }

  carousel.style.animation = "";
  carousel.style.width = "";
  const loopBrands = repeatBrandLogos(activeBrands, 12);
  const group = loopBrands.map(renderPublicBrandLogo).join("");
  carousel.innerHTML = `
    <div class="brand-marquee-group">${group}</div>
    <div class="brand-marquee-group" aria-hidden="true">${group}</div>
  `;
}

function renderPublicBrandLogo(brand) {
  const content = `
    ${renderBrandVisual(brand)}
    <strong>${escapeHtml(brand.name)}</strong>
  `;

  if (brand.website) {
    return `
      <a class="brand-logo-item" href="${escapeHtml(brand.website)}" target="_blank" rel="noopener">
        ${content}
      </a>
    `;
  }

  return `
    <span class="brand-logo-item">
      ${content}
    </span>
  `;
}

function renderBrandVisual(brand) {
  const name = escapeHtml(brand.name);
  const color = escapeHtml(normalizeBrandColor(brand.color));
  const initials = escapeHtml(normalizeBrandInitials(brand.initials || getInitials(brand.name)));

  if (brand.logoUrl) {
    return `
      <span class="brand-logo-frame">
        <img src="${escapeHtml(brand.logoUrl)}" alt="Fonte ${name}" loading="lazy" />
      </span>
    `;
  }

  return `
    <span class="brand-logo-fallback" style="--brand-logo-color: ${color};">
      ${initials}
    </span>
  `;
}

function renderBrandAdmin() {
  const brandTable = document.querySelector("#brandLogoTable");
  if (!brandTable) return;

  const speedInput = document.querySelector("#brandCarouselSpeed");
  const speedValue = document.querySelector("#brandSpeedValue");
  const preview = document.querySelector("#brandAdminPreview");
  const orderedBrands = getOrderedBrandLogos();

  if (speedInput && Number(speedInput.value) !== getBrandSpeed()) {
    speedInput.value = String(getBrandSpeed());
  }

  if (speedValue) {
    speedValue.textContent = `${getBrandSpeed()}s por volta`;
  }

  document.querySelector("#brandLogoCount").textContent = `${orderedBrands.length} fontes`;

  if (!orderedBrands.length) {
    brandTable.innerHTML = `
      <tr>
        <td colspan="5">Nenhuma fonte cadastrada.</td>
      </tr>
    `;
  } else {
    brandTable.innerHTML = orderedBrands
      .map(
        (brand, index) => `
          <tr>
            <td data-label="Ordem"><strong>${index + 1}</strong></td>
            <td data-label="Fonte">
              <div class="brand-table-logo">
                ${renderBrandVisual(brand)}
                <div>
                  <strong>${escapeHtml(brand.name)}</strong>
                  <small>${brand.logoUrl ? "Evidência por imagem" : "Fonte textual provisória"}</small>
                </div>
              </div>
            </td>
            <td data-label="Link">
              ${
                brand.website
                  ? `<a class="inline-link" href="${escapeHtml(
                      brand.website,
                    )}" target="_blank" rel="noopener">Abrir site</a>`
                  : `<span class="muted-text">Sem link</span>`
              }
            </td>
            <td data-label="Status">
              <span class="badge ${brand.active ? "active" : "danger"}">
                ${brand.active ? "Ativa" : "Inativa"}
              </span>
            </td>
            <td data-label="Ações">
              <div class="brand-actions">
                <button type="button" data-brand-action="up" data-brand-id="${brand.id}" ${
                  index === 0 ? "disabled" : ""
                }>Subir</button>
                <button type="button" data-brand-action="down" data-brand-id="${brand.id}" ${
                  index === orderedBrands.length - 1 ? "disabled" : ""
                }>Descer</button>
                <button type="button" data-brand-action="toggle" data-brand-id="${brand.id}">
                  ${brand.active ? "Desativar" : "Ativar"}
                </button>
                <button class="danger" type="button" data-brand-action="delete" data-brand-id="${brand.id}">
                  Remover
                </button>
              </div>
            </td>
          </tr>
        `,
      )
      .join("");
  }

  if (preview) {
    const previewBrands = orderedBrands.filter((brand) => brand.active).slice(0, 4);
    preview.innerHTML = previewBrands.length
      ? previewBrands
          .map(
            (brand) => `
              <span>
                ${renderBrandVisual(brand)}
                <strong>${escapeHtml(brand.name)}</strong>
              </span>
            `,
          )
          .join("")
      : `<article class="empty-state">Ative pelo menos uma fonte para exibir no site.</article>`;
  }
}

function renderEvents() {
  const selectedEventId = document.querySelector("#eventSelect").value;

  document.querySelector("#eventList").innerHTML = state.events
    .map(
      (event) => `
        <article class="list-item">
          <div>
            <strong>${event.name}</strong>
            <small>${formatDate(event.date)} · ${event.type} · ${event.client}</small>
          </div>
          <span class="badge ${event.status === "Programado" ? "active" : ""}">
            ${event.team.length} na equipe
          </span>
        </article>
      `,
    )
    .join("");

  if (selectedEventId) {
    document.querySelector("#eventSelect").value = selectedEventId;
  }
  renderTeamPicker();
}

function renderTeamPicker() {
  const eventId = Number(document.querySelector("#eventSelect").value);
  const selectedEvent = state.events.find((event) => event.id === eventId) || state.events[0];
  if (!selectedEvent) {
    document.querySelector("#teamPicker").innerHTML = "";
    return;
  }

  document.querySelector("#selectedEventName").textContent = selectedEvent.name;
  document.querySelector("#eventSelect").value = selectedEvent.id;

  const search = document.querySelector("#eventEmployeeSearch").value.toLowerCase();
  const employees = state.employees.filter((employee) =>
    [employee.name, employee.role, employee.client, employee.status]
      .join(" ")
      .toLowerCase()
      .includes(search),
  );

  document.querySelector("#teamPicker").innerHTML = employees
    .map((employee) => {
      const isSelected = selectedEvent.team.includes(employee.id);
      return `
        <article class="team-row">
          <div>
            <strong>${employee.name}</strong>
            <small>${employee.role} · ${employee.client}</small>
          </div>
          <button class="${isSelected ? "remove" : ""}" type="button" data-team-action="${
            isSelected ? "remove" : "add"
          }" data-event-id="${selectedEvent.id}" data-employee-id="${employee.id}">
            ${isSelected ? "Remover" : "Adicionar"}
          </button>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll("[data-team-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const eventItem = state.events.find((event) => event.id === Number(button.dataset.eventId));
      const employeeId = Number(button.dataset.employeeId);
      if (button.dataset.teamAction === "add") {
        eventItem.team.push(employeeId);
      } else {
        eventItem.team = eventItem.team.filter((id) => id !== employeeId);
      }
      saveState();
      renderAll();
    });
  });
}

function renderReports() {
  const shell = document.querySelector(".report-ai-shell");
  if (!shell) return;

  const reportAi = getReportAiData();
  const selectedEvent = getSelectedReportEvent();
  const selectedScreen = reportAi.selectedScreen || "events";

  shell.querySelectorAll("[data-report-screen]").forEach((button) => {
    const isActive = button.dataset.reportScreen === selectedScreen;
    button.classList.toggle("active", isActive);
    button.toggleAttribute("aria-current", isActive);
  });

  shell.querySelectorAll("[data-report-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.reportPanel === selectedScreen);
  });

  renderReportEventList(selectedEvent);

  if (!selectedEvent) {
    renderEmptyReportState();
    return;
  }

  const attachments = getReportAttachments(selectedEvent.id);
  const metrics = getReportMetricsForEvent(selectedEvent.id, selectedEvent);
  const report = getReportRecordForEvent(selectedEvent.id);
  const audit = buildReportAudit(selectedEvent, metrics, attachments, report);

  document.querySelector("#reportAiHeroScore").textContent = formatDecimal(audit.score);
  document.querySelector("#reportAiHeroStatus").textContent = report.status;
  document.querySelector("#reportSelectedEventBadge").textContent = selectedEvent.eventName;
  document.querySelector("#reportCurrentVersion").textContent = report.currentVersion;

  document.querySelector("#reportAiCards").innerHTML = [
    card("Registros", formatInteger(metrics.totalAccesses), "Total geral informado"),
    card("Resultado", `${formatDecimal(metrics.occupancyPercent)}%`, `Calculado: ${formatDecimal(audit.calculatedOccupancy)}%`),
    card("Anexos", attachments.length, "Fontes vinculadas"),
    card("Versão atual", report.currentVersion, report.status),
  ].join("");

  prepareReportEventForm(selectedEvent);
  prepareReportMetricsForm(metrics);
  prepareReportGeneratorForm(report);
  renderReportAttachments(attachments);
  renderReportAudit(audit);
  renderReportPreview(selectedEvent, metrics, audit, report);
  renderReportVersions(report);
}

function renderEmptyReportState() {
  document.querySelector("#reportAiCards").innerHTML = [
    card("Registros", "0", "Sem operação selecionada"),
    card("Resultado", "0%", "Sem dados estruturados"),
    card("Anexos", "0", "Aguardando upload"),
    card("Versão atual", "-", "Rascunho"),
  ].join("");
  document.querySelector("#reportAiHeroScore").textContent = "0,0";
  document.querySelector("#reportAiHeroStatus").textContent = "Rascunho";
  document.querySelector("#reportAttachmentList").innerHTML = `<article class="empty-state">Cadastre uma operação para anexar arquivos.</article>`;
  document.querySelector("#reportQualityChecks").innerHTML = `<article class="empty-state">Cadastre uma operação para executar auditoria.</article>`;
  document.querySelector("#reportPreview").innerHTML = `<article class="empty-state">A prévia será montada após o cadastro da operação.</article>`;
  document.querySelector("#reportVersionList").innerHTML = `<article class="empty-state">Nenhuma versão gerada.</article>`;
}

function renderReportEventList(selectedEvent) {
  const reportAi = getReportAiData();
  document.querySelector("#reportAiEventCount").textContent = `${reportAi.events.length} operações`;

  if (!reportAi.events.length) {
    document.querySelector("#reportAiEventList").innerHTML = `
      <article class="empty-state">Nenhuma operação cadastrada para relatório.</article>
    `;
    return;
  }

  document.querySelector("#reportAiEventList").innerHTML = reportAi.events
    .map((event) => {
      const metrics = getReportMetricsForEvent(event.id, event);
      const attachments = getReportAttachments(event.id);
      const report = getReportRecordForEvent(event.id);
      const audit = buildReportAudit(event, metrics, attachments, report);
      const isSelected = selectedEvent?.id === event.id;

      return `
        <button
          class="report-event-card ${isSelected ? "active" : ""}"
          type="button"
          data-report-event-id="${event.id}"
        >
          <span class="badge ${statusToBadgeClass(report.status)}">${escapeHtml(report.status)}</span>
          <strong>${escapeHtml(event.eventName)}</strong>
          <small>${formatReportDate(event.startDate)} até ${formatReportDate(event.endDate)} · ${escapeHtml(
            event.clientName,
          )}</small>
          <span>${formatInteger(metrics.totalAccesses)} registros · score ${formatDecimal(audit.score)}</span>
        </button>
      `;
    })
    .join("");
}

function prepareReportEventForm(event) {
  const form = document.querySelector("#reportAiEventForm");
  if (!form) return;

  form.reset();

  if (!event) {
    form.elements.id.value = "";
    form.elements.startDate.value = today();
    form.elements.endDate.value = today();
    form.elements.days.value = 1;
    form.elements.companyName.value = "Acesse Tecnologia Operacional";
    form.elements.mainMethod.value = "Comercial";
    form.elements.technicalOwner.value = activeUser?.name || "Responsável técnico";
    document.querySelector("#reportSelectedEventBadge").textContent = "Novo relatório";
    return;
  }

  Object.entries(event).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value ?? "";
  });
}

function prepareReportMetricsForm(metrics) {
  const form = document.querySelector("#reportMetricsForm");
  if (!form || !metrics) return;
  const [dayOne = {}, dayTwo = {}] = metrics.dayBreakdown || [];

  const values = {
    registeredPublic: metrics.registeredPublic,
    expectedPublic: metrics.expectedPublic,
    totalAccesses: metrics.totalAccesses,
    uniqueAccesses: metrics.uniqueAccesses,
    occupancyPercent: metrics.occupancyPercent,
    absentPublic: metrics.absentPublic,
    peakTime: metrics.peakTime,
    peakEntries: metrics.peakEntries,
    peakSpeed: metrics.peakSpeed,
    facialAccesses: metrics.facialAccesses,
    qrCardAccesses: metrics.qrCardAccesses,
    otherAccesses: metrics.otherAccesses,
    dayOneDate: dayOne.date,
    dayOneAccesses: dayOne.accesses,
    dayTwoDate: dayTwo.date,
    dayTwoAccesses: dayTwo.accesses,
  };

  Object.entries(values).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value ?? "";
  });
}

function prepareReportGeneratorForm(report) {
  const form = document.querySelector("#reportGeneratorForm");
  if (!form || !report) return;
  form.elements.reportType.value = report.reportType || "Relatório Detalhado";
  form.elements.recommendations.value = report.recommendations || "";
  document.querySelector("#reportPreviewType").textContent = form.elements.reportType.value;
}

function renderReportAttachments(attachments) {
  document.querySelector("#reportAttachmentCount").textContent = `${attachments.length} anexos`;
  document.querySelector("#reportAttachmentList").innerHTML = attachments.length
    ? attachments
        .map(
          (attachment) => `
            <article class="list-item">
              <div>
                <strong>${escapeHtml(attachment.name)}</strong>
                <small>${escapeHtml(attachment.relation)} · ${escapeHtml(
                  attachment.fileType,
                )} · ${formatReportDate(attachment.uploadedAt)}</small>
                <small>${escapeHtml(attachment.description || "Sem descrição")}</small>
              </div>
              <span class="badge manual">${escapeHtml(attachment.sourceType)}</span>
            </article>
          `,
        )
        .join("")
    : `<article class="empty-state">Nenhum anexo vinculado à operação selecionada.</article>`;
}

function renderReportAudit(audit) {
  const blockingChecks = audit.checks.filter((check) => check.severity !== "success");
  document.querySelector("#reportQualityScore").textContent = `${formatDecimal(audit.score)}/10`;
  document.querySelector("#reportQualitySummary").textContent = audit.summary;
  document.querySelector("#reportQualityIssueCount").textContent = `${blockingChecks.length} itens`;
  document.querySelector("#reportQualityChecks").innerHTML = audit.checks
    .map(
      (check) => `
        <article class="list-item report-check-item ${escapeHtml(check.severity)}">
          <div>
            <strong>${escapeHtml(check.title)}</strong>
            <small>${escapeHtml(check.description)}</small>
            <small>${escapeHtml(check.suggestion)}</small>
          </div>
          <span class="badge ${severityToBadgeClass(check.severity)}">${escapeHtml(
            severityToLabel(check.severity),
          )}</span>
        </article>
      `,
    )
    .join("");
}

function renderReportPreview(event, metrics, audit, report) {
  const daySum = getDailyAccessSum(metrics);
  const recommendations = report.recommendations || "Revisar pendências de validação antes do envio ao cliente.";

  document.querySelector("#reportPreview").innerHTML = `
    <article>
      <span class="report-preview-kicker">${escapeHtml(report.reportType)}</span>
      <h3>${escapeHtml(event.eventName)}</h3>
      <p>
        No período de ${formatReportDate(event.startDate)} a ${formatReportDate(event.endDate)}, o
        negócio registrou ${formatInteger(metrics.totalAccesses)} registros, com base cadastrada de
        ${formatInteger(metrics.registeredPublic)} itens e resultado informado de
        ${formatDecimal(metrics.occupancyPercent)}%.
      </p>
      <dl class="report-preview-grid">
        <div><dt>Marco crítico</dt><dd>${escapeHtml(metrics.peakTime)} · ${formatInteger(
          metrics.peakEntries,
        )} registros</dd></div>
        <div><dt>Indicador principal</dt><dd>${escapeHtml(event.mainMethod)}</dd></div>
        <div><dt>Soma por período</dt><dd>${formatInteger(daySum)} registros</dd></div>
        <div><dt>Score</dt><dd>${formatDecimal(audit.score)}/10</dd></div>
      </dl>
      <p>${escapeHtml(recommendations)}</p>
    </article>
  `;
}

function renderReportVersions(report) {
  document.querySelector("#reportVersionList").innerHTML = report.versions.length
    ? report.versions
        .map(
          (version) => `
            <article class="list-item report-version-item">
              <div>
                <strong>${escapeHtml(version.versionNumber)} · ${escapeHtml(version.status)}</strong>
                <small>${formatReportDate(version.createdAt)} · score ${formatDecimal(
                  version.qualityScore,
                )} · ${escapeHtml(version.createdBy)}</small>
                <small>${escapeHtml(version.changes)}</small>
              </div>
              <div class="version-actions">
                <button type="button" data-report-version-action="approve">Aprovar</button>
                <button type="button" data-report-version-action="send">Enviar</button>
                <button type="button" data-report-version-action="archive">Arquivar</button>
              </div>
            </article>
          `,
        )
        .join("")
    : `<article class="empty-state">Nenhuma versão gerada para esta operação.</article>`;
}

function setReportAiScreen(screen) {
  if (!reportAiScreenLabels[screen]) return;
  state.reportAi.selectedScreen = screen;
  saveState();
  renderReports();
}

function openReportEventDraft() {
  navigateToAppView("reports");
  setReportAiScreen("event");
  prepareReportEventForm(null);
  showToast("Cadastro pronto para inserir um novo relatório.");
}

function openReportGeneration(eventId) {
  const reportAi = getReportAiData();
  const targetEvent = reportAi.events.find((event) => Number(event.id) === Number(eventId));
  if (!targetEvent) {
    showToast("Não foi possível localizar este relatório.");
    return;
  }

  reportAi.selectedEventId = targetEvent.id;
  reportAi.selectedScreen = "versions";
  saveState();
  navigateToAppView("reports");
  renderReports();
  showToast(`Relatório ${targetEvent.eventName} aberto em versões.`);
}

function getReportAiData() {
  if (!state.reportAi) {
    state.reportAi = structuredClone(initialState.reportAi);
  }
  state.reportAi.events = Array.isArray(state.reportAi.events) ? state.reportAi.events : [];
  state.reportAi.attachments = Array.isArray(state.reportAi.attachments)
    ? state.reportAi.attachments
    : [];
  state.reportAi.metrics = state.reportAi.metrics || {};
  state.reportAi.reports = Array.isArray(state.reportAi.reports) ? state.reportAi.reports : [];
  state.reportAi.selectedScreen = reportAiScreenLabels[state.reportAi.selectedScreen]
    ? state.reportAi.selectedScreen
    : "events";
  return state.reportAi;
}

function getSelectedReportEvent() {
  const reportAi = getReportAiData();
  const selectedEvent =
    reportAi.events.find((event) => Number(event.id) === Number(reportAi.selectedEventId)) ||
    reportAi.events[0] ||
    null;

  if (selectedEvent && Number(reportAi.selectedEventId) !== Number(selectedEvent.id)) {
    reportAi.selectedEventId = selectedEvent.id;
  }

  return selectedEvent;
}

function getReportAttachments(eventId) {
  return getReportAiData().attachments.filter((attachment) => Number(attachment.eventId) === Number(eventId));
}

function getReportMetricsForEvent(eventId, event = getSelectedReportEvent()) {
  const reportAi = getReportAiData();
  if (!reportAi.metrics[eventId]) {
    reportAi.metrics[eventId] = buildDefaultReportMetrics(event);
  }
  return reportAi.metrics[eventId];
}

function getReportRecordForEvent(eventId) {
  const reportAi = getReportAiData();
  let report = reportAi.reports.find((item) => Number(item.eventId) === Number(eventId));

  if (!report) {
    report = {
      id: Date.now(),
      eventId,
      reportType: "Relatório Detalhado",
      currentVersion: "v0.1",
      status: "Rascunho",
      recommendations:
        "Validar total global, indicadores por período e anexos antes de aprovar o envio ao cliente.",
      versions: [],
    };
    reportAi.reports.unshift(report);
  }

  report.versions = Array.isArray(report.versions) ? report.versions : [];
  return report;
}

function buildDefaultReportMetrics(event) {
  return {
    registeredPublic: 0,
    expectedPublic: 0,
    totalAccesses: 0,
    uniqueAccesses: 0,
    occupancyPercent: 0,
    absentPublic: 0,
    peakTime: "18:00",
    peakEntries: 0,
    peakSpeed: "",
    facialAccesses: 0,
    qrCardAccesses: 0,
    otherAccesses: 0,
    credentialedWithPhoto: 0,
    credentialedWithoutPhoto: 0,
    notificationsDelivered: 0,
    notificationsFailed: 0,
    notificationTotal: 0,
    deviceNotes: "",
    dayBreakdown: [
      { date: event?.startDate || today(), accesses: 0, peakTime: "18:00", peakEntries: 0 },
      { date: event?.endDate || event?.startDate || today(), accesses: 0, peakTime: "18:00", peakEntries: 0 },
    ],
  };
}

function saveReportEventFromForm(form) {
  const reportAi = getReportAiData();
  const data = Object.fromEntries(new FormData(form));
  const id = Number(data.id);
  const existingEvent = reportAi.events.find((event) => Number(event.id) === id);
  const eventRecord = {
    id: existingEvent?.id || Date.now(),
    eventName: sanitizeReportText(data.eventName),
    clientName: sanitizeReportText(data.clientName),
    companyName: sanitizeReportText(data.companyName),
    cnpj: sanitizeReportText(data.cnpj),
    location: sanitizeReportText(data.location),
    startDate: data.startDate,
    endDate: data.endDate,
    days: Math.max(1, Number(data.days) || 1),
    agendas: sanitizeReportText(data.agendas),
    gates: sanitizeReportText(data.gates),
    devices: sanitizeReportText(data.devices),
    mainMethod: sanitizeReportText(data.mainMethod),
    technicalOwner: sanitizeReportText(data.technicalOwner),
    status: existingEvent?.status || "Rascunho",
    createdAt: existingEvent?.createdAt || today(),
    updatedAt: today(),
  };

  if (!eventRecord.eventName || !eventRecord.clientName || !eventRecord.companyName) {
    showToast("Informe operação, cliente ou área e empresa responsável.");
    return;
  }

  if (existingEvent) {
    Object.assign(existingEvent, eventRecord);
  } else {
    reportAi.events.unshift(eventRecord);
    reportAi.metrics[eventRecord.id] = buildDefaultReportMetrics(eventRecord);
  }

  reportAi.selectedEventId = eventRecord.id;
  getReportRecordForEvent(eventRecord.id);
  applyReportComputedStatus();
  saveState();
  renderReports();
  showToast(existingEvent ? "Cadastro da operação atualizado." : "Operação criada para relatório.");
}

function saveReportAttachmentsFromForm(form) {
  const selectedEvent = getSelectedReportEvent();
  if (!selectedEvent) {
    showToast("Cadastre uma operação antes de enviar anexos.");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const files = [...document.querySelector("#reportAttachmentInput").files];
  if (!files.length) {
    showToast("Selecione pelo menos um arquivo para anexar.");
    return;
  }

  files.forEach((file, index) => {
    state.reportAi.attachments.unshift({
      id: Date.now() + index,
      eventId: selectedEvent.id,
      name: file.name,
      fileType: getReportFileType(file.name),
      relation: sanitizeReportText(data.relation),
      sourceType: sanitizeReportText(data.sourceType),
      description: sanitizeReportText(data.description) || "Anexo enviado para validação do relatório.",
      uploadedBy: activeUser?.name || "Usuário",
      uploadedAt: today(),
    });
  });

  form.reset();
  applyReportComputedStatus();
  saveState();
  renderReports();
  showToast(`${files.length} anexo${files.length > 1 ? "s" : ""} vinculado${files.length > 1 ? "s" : ""}.`);
}

function saveReportMetricsFromForm(form) {
  const selectedEvent = getSelectedReportEvent();
  if (!selectedEvent) {
    showToast("Cadastre uma operação antes de salvar indicadores.");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  state.reportAi.metrics[selectedEvent.id] = {
    ...getReportMetricsForEvent(selectedEvent.id, selectedEvent),
    registeredPublic: toReportNumber(data.registeredPublic),
    expectedPublic: toReportNumber(data.expectedPublic),
    totalAccesses: toReportNumber(data.totalAccesses),
    uniqueAccesses: toReportNumber(data.uniqueAccesses),
    occupancyPercent: toReportNumber(data.occupancyPercent),
    absentPublic: toReportNumber(data.absentPublic),
    peakTime: data.peakTime || "18:00",
    peakEntries: toReportNumber(data.peakEntries),
    peakSpeed: sanitizeReportText(data.peakSpeed),
    facialAccesses: toReportNumber(data.facialAccesses),
    qrCardAccesses: toReportNumber(data.qrCardAccesses),
    otherAccesses: toReportNumber(data.otherAccesses),
    dayBreakdown: [
      {
        date: data.dayOneDate || selectedEvent.startDate,
        accesses: toReportNumber(data.dayOneAccesses),
        peakTime: data.peakTime || "18:00",
        peakEntries: Math.round(toReportNumber(data.peakEntries) / 2),
      },
      {
        date: data.dayTwoDate || selectedEvent.endDate,
        accesses: toReportNumber(data.dayTwoAccesses),
        peakTime: data.peakTime || "18:00",
        peakEntries: Math.ceil(toReportNumber(data.peakEntries) / 2),
      },
    ],
  };

  applyReportComputedStatus();
  saveState();
  renderReports();
  showToast("Dados estruturados atualizados.");
}

function generateReportVersion(form) {
  const selectedEvent = getSelectedReportEvent();
  if (!selectedEvent) {
    showToast("Cadastre uma operação antes de gerar relatório.");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const report = getReportRecordForEvent(selectedEvent.id);
  const metrics = getReportMetricsForEvent(selectedEvent.id, selectedEvent);
  const audit = buildReportAudit(selectedEvent, metrics, getReportAttachments(selectedEvent.id), report);
  const versionNumber = getNextReportVersion(report);
  const status = audit.checks.some((check) => check.severity === "danger" || check.severity === "warning")
    ? "Com inconsistência"
    : "Em revisão";
  const slug = slugifyReportName(selectedEvent.eventName);
  const fileSuffix = versionNumber.replace(".", "-");

  report.reportType = data.reportType || "Relatório Detalhado";
  report.recommendations = sanitizeReportText(data.recommendations);
  report.currentVersion = versionNumber;
  report.status = status;
  selectedEvent.status = status;
  report.versions.unshift({
    id: Date.now(),
    versionNumber,
    qualityScore: audit.score,
    status,
    createdBy: activeUser?.name || "Usuário",
    createdAt: today(),
    changes: `${report.reportType} gerado com auditoria automática e anexos vinculados.`,
    filePdfUrl: data.pdf ? `${slug}-${fileSuffix}.pdf` : "",
    fileDocxUrl: data.word ? `${slug}-${fileSuffix}.docx` : "",
    fileSheetUrl: data.sheets ? `${slug}-${fileSuffix}.xlsx` : "",
  });

  state.reportAi.selectedScreen = "versions";
  saveState();
  renderReports();
  showToast(`${versionNumber} gerada com score ${formatDecimal(audit.score)}/10.`);
}

function updateReportVersionStatus(action) {
  const event = getSelectedReportEvent();
  if (!event) return;

  const report = getReportRecordForEvent(event.id);
  const latestVersion = report.versions[0];
  if (!latestVersion) {
    showToast("Gere uma versão antes de alterar o status.");
    return;
  }

  const statusByAction = {
    approve: "Aprovado",
    send: "Enviado ao cliente",
    archive: "Arquivado",
  };
  const nextStatus = statusByAction[action];
  if (!nextStatus) return;

  latestVersion.status = nextStatus;
  report.status = nextStatus;
  event.status = nextStatus;
  saveState();
  renderReports();
  showToast(`Relatório ${nextStatus.toLowerCase()}.`);
}

function applyReportComputedStatus() {
  const event = getSelectedReportEvent();
  if (!event) return;
  const report = getReportRecordForEvent(event.id);
  const audit = buildReportAudit(
    event,
    getReportMetricsForEvent(event.id, event),
    getReportAttachments(event.id),
    report,
  );
  const hasIssues = audit.checks.some((check) => check.severity === "danger" || check.severity === "warning");
  const nextStatus = hasIssues ? "Com inconsistência" : "Em revisão";

  if (!["Aprovado", "Enviado ao cliente", "Arquivado"].includes(report.status)) {
    report.status = nextStatus;
    event.status = nextStatus;
  }
}

function buildReportAudit(event, metrics, attachments, report = {}) {
  const checks = [];
  const requiredFields = [
    ["eventName", "nome da operação"],
    ["clientName", "cliente ou área"],
    ["companyName", "empresa responsável"],
    ["location", "local"],
    ["startDate", "data inicial"],
    ["endDate", "data final"],
    ["days", "quantidade de dias"],
    ["technicalOwner", "responsável técnico"],
  ];
  const missingFields = requiredFields.filter(([key]) => !event?.[key]).map(([, label]) => label);

  addReportCheck(checks, {
    severity: missingFields.length ? "danger" : "success",
    title: "Completude das informações obrigatórias",
    description: missingFields.length
      ? `Campos ausentes: ${missingFields.join(", ")}.`
      : "Identificação da operação, período, empresa e responsável técnico estão preenchidos.",
    suggestion: missingFields.length
      ? "Preencha os campos obrigatórios antes de gerar a versão final."
      : "Manter estes campos como capa e trilha de auditoria do relatório.",
    penalty: missingFields.length ? Math.min(2, missingFields.length * 0.3) : 0,
  });

  const dailySum = getDailyAccessSum(metrics);
  const totalAccesses = toReportNumber(metrics.totalAccesses);
  addReportCheck(checks, {
    severity: dailySum === totalAccesses ? "success" : "warning",
    title: "Total global versus registros por período",
    description:
      dailySum === totalAccesses
        ? "A soma dos registros por período confere com o total geral."
        : `Os dias somam ${formatInteger(dailySum)}, mas o total geral informado é ${formatInteger(
            totalAccesses,
          )}.`,
    suggestion:
      dailySum === totalAccesses
        ? "Registrar a fonte da soma por período no anexo analítico."
        : "Confirmar se o total geral representa registros únicos e se os períodos representam registros totais.",
    penalty: dailySum === totalAccesses ? 0 : 0.9,
  });

  const expectedPublic = toReportNumber(metrics.expectedPublic);
  const uniqueAccesses = toReportNumber(metrics.uniqueAccesses);
  const calculatedOccupancy = expectedPublic ? (uniqueAccesses / expectedPublic) * 100 : 0;
  const occupancyDelta = Math.abs(calculatedOccupancy - toReportNumber(metrics.occupancyPercent));
  addReportCheck(checks, {
    severity: occupancyDelta <= 1 ? "success" : "warning",
    title: "Cálculo do resultado",
    description:
      occupancyDelta <= 1
        ? "O resultado informado está coerente com registros únicos sobre a base esperada."
        : `O resultado informado é ${formatDecimal(
            metrics.occupancyPercent,
          )}%, mas a regra do MVP calcula ${formatDecimal(calculatedOccupancy)}%.`,
    suggestion:
      occupancyDelta <= 1
        ? "Manter a regra explícita no rodapé metodológico."
        : "Definir se o resultado usa base esperada, base cadastrada ou outra regra e exibir a base no relatório.",
    penalty: occupancyDelta <= 1 ? 0 : 0.4,
  });

  const calculatedAbsent = Math.max(0, expectedPublic - uniqueAccesses);
  const absentDelta = Math.abs(calculatedAbsent - toReportNumber(metrics.absentPublic));
  addReportCheck(checks, {
    severity: absentDelta <= 1 ? "success" : "warning",
    title: "Cálculo da diferença",
    description:
      absentDelta <= 1
        ? "A diferença informada confere com base esperada menos registros únicos."
        : `Ausentes informados: ${formatInteger(
            metrics.absentPublic,
          )}. Pela regra do MVP, a diferença seria ${formatInteger(calculatedAbsent)}.`,
    suggestion:
      absentDelta <= 1
        ? "Separar esta informação das perdas, exclusões ou bloqueios operacionais."
        : "Confirmar se a diferença usa base esperada, base cadastrada ou outra base operacional.",
    penalty: absentDelta <= 1 ? 0 : 0.4,
  });

  const methodTotal =
    toReportNumber(metrics.facialAccesses) +
    toReportNumber(metrics.qrCardAccesses) +
    toReportNumber(metrics.otherAccesses);
  addReportCheck(checks, {
    severity: methodTotal === totalAccesses ? "success" : "danger",
    title: "Fontes de dados",
    description:
      methodTotal === totalAccesses
        ? "Fonte principal, fonte secundária e outras fontes fecham com o total informado."
        : `As fontes somam ${formatInteger(methodTotal)} contra ${formatInteger(totalAccesses)} registros.`,
    suggestion:
      methodTotal === totalAccesses
        ? "Destacar a fonte predominante na metodologia do relatório."
        : "Revisar a extração das fontes antes de aprovar o relatório.",
    penalty: methodTotal === totalAccesses ? 0 : 1,
  });

  const credentialedTotal =
    toReportNumber(metrics.credentialedWithPhoto) + toReportNumber(metrics.credentialedWithoutPhoto);
  addReportCheck(checks, {
    severity: !credentialedTotal || credentialedTotal === toReportNumber(metrics.registeredPublic) ? "success" : "warning",
    title: "Credenciamento",
    description:
      !credentialedTotal
        ? "Os dados de credenciamento ainda não foram detalhados."
        : `Com foto e sem foto somam ${formatInteger(credentialedTotal)} cadastros.`,
    suggestion:
      !credentialedTotal
        ? "Adicionar campos de credenciamento com foto e sem foto quando houver exportação."
        : "Usar este fechamento como evidência de integridade cadastral.",
    penalty: !credentialedTotal || credentialedTotal === toReportNumber(metrics.registeredPublic) ? 0 : 0.3,
  });

  addReportCheck(checks, {
    severity: attachments.length ? "success" : "warning",
    title: "Qualidade dos anexos e evidências",
    description: attachments.length
      ? `${attachments.length} anexo(s) vinculados à operação selecionada.`
      : "Nenhum PDF, imagem ou planilha foi vinculado ao relatório.",
    suggestion: attachments.length
      ? "Nomear anexos por indicador para facilitar auditoria futura."
      : "Anexar ao menos o dashboard consolidado ou uma exportação analítica.",
    penalty: attachments.length ? 0 : 0.7,
  });

  addReportCheck(checks, {
    severity: attachments.some((attachment) => attachment.sourceType === "Integração futura via API") ? "success" : "info",
    title: "Rastreabilidade das fontes",
    description: "O MVP registra arquivo, tipo, usuário, data de upload e relação com o relatório.",
    suggestion: "Na versão integrada, gravar também consulta/API de origem por indicador.",
    penalty: 0.2,
  });

  addReportCheck(checks, {
    severity: metrics.deviceNotes ? "info" : "success",
    title: "Status dos dispositivos",
    description: metrics.deviceNotes || "Nenhuma observação de dispositivo registrada.",
    suggestion: metrics.deviceNotes
      ? "Levar a instabilidade para as recomendações operacionais do relatório."
      : "Manter observações de equipamentos offline quando existirem.",
    penalty: metrics.deviceNotes ? 0.2 : 0,
  });

  addReportCheck(checks, {
    severity: report.recommendations ? "success" : "warning",
    title: "Recomendações e conclusão operacional",
    description: report.recommendations
      ? "O relatório já possui recomendações finais para revisão."
      : "Ainda não há recomendação operacional preenchida.",
    suggestion: report.recommendations
      ? "Conectar recomendações diretamente às inconsistências detectadas."
      : "Adicionar próximos passos de validação antes da exportação.",
    penalty: report.recommendations ? 0 : 0.5,
  });

  const score = Math.max(
    0,
    Math.min(
      10,
      10 - checks.reduce((total, check) => total + check.penalty, 0),
    ),
  );
  const issueCount = checks.filter((check) => check.severity === "danger" || check.severity === "warning").length;

  return {
    score: Math.round(score * 10) / 10,
    checks,
    calculatedOccupancy,
    calculatedAbsent,
    summary: issueCount
      ? `${issueCount} pendência(s) antes da aprovação final`
      : "Pronto para revisão e aprovação",
  };
}

function addReportCheck(checks, check) {
  checks.push({
    penalty: 0,
    ...check,
  });
}

function getDailyAccessSum(metrics) {
  return (metrics.dayBreakdown || []).reduce(
    (total, day) => total + toReportNumber(day.accesses),
    0,
  );
}

function getNextReportVersion(report) {
  if (!report.versions.length) return "v1.0";
  const versionNumbers = report.versions
    .map((version) => String(version.versionNumber || "").match(/^v(\d+)\.(\d+)$/))
    .filter(Boolean)
    .map((match) => Number(match[2]));
  const nextMinor = versionNumbers.length ? Math.max(...versionNumbers) + 1 : report.versions.length;
  return `v1.${nextMinor}`;
}

function getReportFileType(fileName) {
  const extension = String(fileName || "").split(".").pop().toLowerCase();
  if (extension === "pdf") return "PDF";
  if (["png", "jpg", "jpeg", "webp"].includes(extension)) return "Imagem";
  if (["csv", "xlsx", "xls"].includes(extension)) return "Planilha";
  return "Arquivo";
}

function sanitizeReportText(value) {
  return String(value || "").trim();
}

function toReportNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function formatInteger(value) {
  return Math.round(toReportNumber(value)).toLocaleString("pt-BR");
}

function formatDecimal(value) {
  return toReportNumber(value).toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function formatReportDate(value) {
  return value ? formatDate(value) : "-";
}

function normalizeReportOwner(value) {
  return String(value || "").trim().toLowerCase();
}

function getReportVersionSortValue(version) {
  const idValue = Number(version?.id || 0);
  if (Number.isFinite(idValue) && idValue > 0) return idValue;
  const dateValue = Date.parse(version?.createdAt || "");
  return Number.isFinite(dateValue) ? dateValue : 0;
}

function slugifyReportName(value) {
  return String(value || "relatorio")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48) || "relatorio";
}

function statusToBadgeClass(status) {
  if (["Aprovado", "Enviado ao cliente"].includes(status)) return "active";
  if (["Com inconsistência", "Em revisão"].includes(status)) return "warning";
  if (status === "Arquivado") return "manual";
  return "";
}

function severityToBadgeClass(severity) {
  const classMap = {
    success: "active",
    warning: "warning",
    danger: "danger",
    info: "manual",
  };
  return classMap[severity] || "";
}

function severityToLabel(severity) {
  const labelMap = {
    success: "OK",
    warning: "Atenção",
    danger: "Crítico",
    info: "Nota",
  };
  return labelMap[severity] || "Item";
}

function renderTimeList() {
  document.querySelector("#timeList").innerHTML = state.points
    .map(
      (point) => `
        <article class="list-item">
          <div>
            <strong>${escapeHtml(point.employee)}</strong>
            <small>${formatDate(point.date)} · ${escapeHtml(point.in)} às ${escapeHtml(
              point.out || "em aberto",
            )} · ${escapeHtml(point.source || "Manual")}</small>
          </div>
          <span class="badge ${point.status === "Ponto normal" ? "active" : "warning"}">
            ${escapeHtml(point.status)}
          </span>
        </article>
      `,
    )
    .join("");
}

function renderTimeAudit() {
  const table = document.querySelector("#pointAuditTable");
  if (!table) return;

  table.innerHTML = state.checkinAttempts.length
    ? state.checkinAttempts
        .slice(0, 12)
        .map(
          (attempt) => `
            <tr>
              <td data-label="Funcionário">
                <strong>${escapeHtml(attempt.employee)}</strong><br>
                <small>${escapeHtml(attempt.cpf || "CPF não informado")}</small>
              </td>
              <td data-label="Empreendimento">
                ${escapeHtml(attempt.client)}<br>
                <small>${escapeHtml(attempt.qrCodeId || "Sem QR")}</small>
              </td>
              <td data-label="Tipo">${escapeHtml(attempt.type || "-")}</td>
              <td data-label="Distância">${formatMeters(attempt.distanceMeters)}</td>
              <td data-label="Precisão">${formatMeters(attempt.accuracyMeters)}</td>
              <td data-label="Status">
                <span class="badge ${attempt.status === "Aprovado" ? "active" : "danger"}">
                  ${escapeHtml(attempt.status)}
                </span><br>
                <small>${escapeHtml(attempt.reason || "-")}</small>
              </td>
            </tr>
          `,
        )
        .join("")
    : `<tr><td colspan="6">Nenhuma validação de ponto registrada ainda.</td></tr>`;
}

function formatMeters(value) {
  if (value === null || value === undefined || value === "") return "-";
  return `${Math.round(Number(value))}m`;
}

function renderFrequency() {
  const range = getFrequencyRange();
  const employeeFilter = document.querySelector("#frequencyEmployee")?.value || "all";
  const clientFilter = document.querySelector("#frequencyClient")?.value || "all";
  const quickFilter = document.querySelector("#frequencyQuickFilter")?.value || "all";
  const search = document.querySelector("#frequencySearch")?.value || "";
  const activeEmployees = state.employees.filter(
    (employee) => employee.status === "Ativo" || isJustifiedAbsenceStatus(employee.status),
  );
  const employeeRecords = state.employees.map((employee) =>
    getEmployeeFrequencyRecord(employee, range),
  );
  const filteredEmployees = employeeRecords.filter((record) =>
    employeeMatchesFrequencyFilters(record, { employeeFilter, clientFilter, quickFilter, search }),
  );
  const periodPoints = getFrequencyPoints({
    start: range.start,
    end: range.end,
    employee: employeeFilter,
    client: clientFilter,
  });
  const presentToday = employeeRecords.filter((record) =>
    ["present", "manual"].includes(record.statusKey),
  );
  const absentUnjustified = employeeRecords.filter(
    (record) => record.statusKey === "absent-unjustified",
  );
  const absentJustified = employeeRecords.filter(
    (record) => record.statusKey === "absent-justified",
  );
  const manualRecords = employeeRecords.filter((record) => record.manualCount > 0);
  const presencePercent = activeEmployees.length
    ? Math.round((presentToday.length / activeEmployees.length) * 100)
    : 0;

  document.querySelector("#frequencyCards").innerHTML = [
    card("Presentes hoje", presentToday.length, "Presença registrada"),
    card("Sem justificativa", absentUnjustified.length, "Atenção operacional"),
    card("Com justificativa", absentJustified.length, "Atestado, licença ou férias"),
    card("Registros no período", periodPoints.length, range.label),
  ].join("");

  document.querySelector("#frequencyChartCaption").textContent = `Acompanhamento ${range.label.toLowerCase()}`;
  document.querySelector("#presencePercentLabel").textContent = `${presencePercent}% de presença`;
  document.querySelector("#frequencyHistoryCount").textContent = `${filteredEmployees.length} funcionários`;

  syncChartPeriodTabs();
  renderFrequencyChart(range, employeeFilter, clientFilter);
  renderFrequencySummary({
    presentToday,
    absentUnjustified,
    absentJustified,
    manualRecords,
    periodPoints,
    presencePercent,
  });
  renderFrequencyTable(filteredEmployees, range);
}

function syncChartPeriodTabs() {
  const selectedPeriod = document.querySelector("#frequencyPeriod")?.value || "7";

  document.querySelectorAll("[data-chart-period]").forEach((button) => {
    const isActive = button.dataset.chartPeriod === selectedPeriod;
    button.classList.toggle("active", isActive);
    button.toggleAttribute("aria-pressed", isActive);
  });
}

function getFrequencyRange() {
  const periodValue = document.querySelector("#frequencyPeriod")?.value || "7";
  const customRange = document.querySelector("#frequencyCustomRange");
  const startInput = document.querySelector("#frequencyStartDate");
  const endInput = document.querySelector("#frequencyEndDate");
  const periodLabels = {
    7: "Semanal",
    15: "Quinzenal",
    30: "Mensal",
    365: "Anual",
  };

  if (customRange) customRange.hidden = periodValue !== "custom";

  if (periodValue === "custom") {
    const fallbackStart = nextDate(-6);
    const fallbackEnd = today();
    if (startInput && !startInput.value) startInput.value = fallbackStart;
    if (endInput && !endInput.value) endInput.value = fallbackEnd;

    const orderedRange = orderDateRange(
      startInput?.value || fallbackStart,
      endInput?.value || fallbackEnd,
    );

    return {
      ...orderedRange,
      days: countDateRangeDays(orderedRange.start, orderedRange.end),
      label: "personalizado",
    };
  }

  if (periodValue === "30") {
    const now = new Date();
    const start = toDateKey(new Date(now.getFullYear(), now.getMonth(), 1));
    const end = toDateKey(new Date(now.getFullYear(), now.getMonth() + 1, 0));

    return {
      start,
      end,
      days: countDateRangeDays(start, end),
      label: "Mês atual",
    };
  }

  const days = Number(periodValue) || 7;
  const start = nextDate(-(days - 1));
  return {
    start,
    end: today(),
    days,
    label: periodLabels[days] || `${days} dias`,
  };
}

function orderDateRange(start, end) {
  return start <= end ? { start, end } : { start: end, end: start };
}

function countDateRangeDays(start, end) {
  const first = new Date(`${start}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);
  return Math.max(1, Math.round((last - first) / 86400000) + 1);
}

function getFrequencyPoints({ start, end, employee = "all", client = "all" }) {
  return state.points
    .filter((point) => point.date >= start && point.date <= end)
    .filter((point) => employee === "all" || point.employee === employee)
    .filter((point) => client === "all" || point.client === client)
    .sort((a, b) => `${b.date}${b.in}`.localeCompare(`${a.date}${a.in}`));
}

function getFrequencyDates(range) {
  const dates = [];
  const current = new Date(`${range.start}T12:00:00`);
  const last = new Date(`${range.end}T12:00:00`);

  while (current <= last) {
    dates.push(toDateKey(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function getEmployeeFrequencyRecord(employee, range) {
  const todayPoints = getFrequencyPoints({
    start: today(),
    end: today(),
    employee: employee.name,
  }).filter((point) => point.status !== "Falta");
  const todayPoint = todayPoints[0];
  const periodPoints = getFrequencyPoints({
    start: range.start,
    end: range.end,
    employee: employee.name,
  });
  const latestPoint = getFrequencyPoints({
    start: "1900-01-01",
    end: today(),
    employee: employee.name,
  })[0];
  const manualCount = periodPoints.filter(isManualPoint).length;
  const justification = getEmployeeJustification(employee);
  const periodAttendanceCount = periodPoints.filter((point) => point.status !== "Falta").length;
  const lowFrequency =
    employee.status === "Ativo" &&
    range.days >= 7 &&
    periodAttendanceCount <= Math.max(1, Math.floor(range.days * 0.25));

  let statusKey = "absent-unjustified";
  let statusLabel = "Ausência sem justificativa";

  if (todayPoint) {
    statusKey = isManualPoint(todayPoint) ? "manual" : "present";
    statusLabel = isManualPoint(todayPoint)
      ? "Registro manual aprovado"
      : "Presença registrada";
  } else if (isNoScheduleStatus(employee.status)) {
    statusKey = "no-schedule";
    statusLabel = "Sem escala no dia";
  } else if (justification) {
    statusKey = "absent-justified";
    statusLabel = "Ausência justificada";
  }

  return {
    employee,
    periodPoints,
    latestPoint,
    manualCount,
    lowFrequency,
    statusKey,
    statusLabel,
    justification,
  };
}

function getEmployeeJustification(employee) {
  const certificate = state.certificates.find(
    (item) => item.employee === employee.name && item.start <= today() && item.end >= today(),
  );

  if (certificate) {
    return `Atestado até ${formatDate(certificate.end)}`;
  }

  if (isJustifiedAbsenceStatus(employee.status)) {
    return employee.status;
  }

  return "";
}

function isJustifiedAbsenceStatus(status) {
  return [
    "Atestado",
    "Afastado",
    "Férias",
    "Licença",
    "Licença maternidade",
    "Licença paternidade",
    "Suspenso",
  ].includes(status);
}

function isNoScheduleStatus(status) {
  return ["Inativo", "Desligado"].includes(status);
}

function isManualPoint(point) {
  return point.status === "Ajuste manual" || point.source === "Manual";
}

function employeeMatchesFrequencyFilters(record, filters) {
  const { employee } = record;
  const normalizedSearch = String(filters.search || "").trim().toLowerCase();
  const searchableText = [
    employee.name,
    employee.cpf,
    employee.role,
    employee.client,
    employee.status,
    record.statusLabel,
    record.justification,
  ]
    .join(" ")
    .toLowerCase();

  if (filters.employeeFilter !== "all" && employee.name !== filters.employeeFilter) return false;
  if (filters.clientFilter !== "all" && employee.client !== filters.clientFilter) return false;
  if (normalizedSearch && !searchableText.includes(normalizedSearch)) return false;

  if (filters.quickFilter === "present-today") {
    return ["present", "manual"].includes(record.statusKey);
  }

  if (filters.quickFilter === "absent-unjustified") {
    return record.statusKey === "absent-unjustified";
  }

  if (filters.quickFilter === "absent-justified") {
    return record.statusKey === "absent-justified";
  }

  if (filters.quickFilter === "manual") {
    return record.manualCount > 0;
  }

  if (filters.quickFilter === "low-frequency") {
    return record.lowFrequency;
  }

  if (filters.quickFilter === "no-schedule") {
    return record.statusKey === "no-schedule";
  }

  return true;
}

function renderFrequencyChart(range, employeeFilter, clientFilter) {
  const dates = getFrequencyDates(range);
  const counts = dates.map((date) => {
    const points = getFrequencyPoints({
      start: date,
      end: date,
      employee: employeeFilter,
      client: clientFilter,
    });
    return points.length;
  });
  const maxCount = Math.max(...counts, 1);

  document.querySelector("#frequencyChart").innerHTML = dates
    .map((date, index) => {
      const count = counts[index];
      const height = Math.max((count / maxCount) * 100, count ? 14 : 3);
      return `
        <article class="frequency-bar ${date === today() ? "today" : ""}">
          <div class="frequency-bar-track">
            <span style="height: ${height}%"></span>
          </div>
          <strong>${count}</strong>
          <small>${date === today() ? "Hoje" : dayNumber(date)}</small>
        </article>
      `;
    })
    .join("");
}

function renderFrequencySummary({
  presentToday,
  absentUnjustified,
  absentJustified,
  manualRecords,
  periodPoints,
  presencePercent,
}) {
  document.querySelector("#frequencySummary").innerHTML = [
    {
      title: "Funcionários presentes hoje",
      detail: `${presentToday.length} colaborador(es) com presença registrada`,
      badge: "active",
    },
    {
      title: "Ausências sem justificativa",
      detail: absentUnjustified.length
        ? absentUnjustified.map((record) => record.employee.name).join(", ")
        : "Nenhuma ausência crítica hoje",
      badge: absentUnjustified.length ? "danger" : "active",
    },
    {
      title: "Ausências justificadas",
      detail: `${absentJustified.length} funcionário(s) com justificativa cadastrada`,
      badge: "warning",
    },
    {
      title: "Registros manuais no período",
      detail: `${manualRecords.length} funcionário(s) com ajuste manual`,
      badge: manualRecords.length ? "manual" : "active",
    },
    {
      title: "Percentual de presença",
      detail: `${presencePercent}% de presença registrada hoje · ${periodPoints.length} check-in(s) no período`,
      badge: "active",
    },
  ]
    .map(
      (item) => `
        <article class="list-item">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <small>${escapeHtml(item.detail)}</small>
          </div>
          <span class="badge ${item.badge}">${escapeHtml(
            item.badge === "danger" ? "Atenção" : item.badge === "manual" ? "Manual" : "OK",
          )}</span>
        </article>
      `,
    )
    .join("");
}

function renderFrequencyTable(records, range) {
  document.querySelector("#frequencyTable").innerHTML = records.length
    ? records
        .map(
          (record) => `
            <tr>
              <td data-label="Funcionário">
                <strong>${escapeHtml(record.employee.name)}</strong><br>
                <small>${escapeHtml(record.employee.cpf)} · ${escapeHtml(record.employee.role)}</small>
              </td>
              <td data-label="Empreendimento">${escapeHtml(record.employee.client)}</td>
              <td data-label="Status">
                <span class="presence-status ${record.statusKey}">
                  <i></i>${escapeHtml(record.statusLabel)}
                </span>
              </td>
              <td data-label="Registros">${record.periodPoints.length}</td>
              <td data-label="Último registro">${renderLatestFrequencyPoint(record.latestPoint)}</td>
              <td data-label="Ações">
                <button
                  class="table-action-button"
                  type="button"
                  data-frequency-action="toggle-history"
                  data-employee-id="${record.employee.id}"
                >
                  ${expandedFrequencyEmployeeId === record.employee.id ? "Ocultar" : "Ver histórico"}
                </button>
              </td>
            </tr>
            ${
              expandedFrequencyEmployeeId === record.employee.id
                ? renderEmployeeFrequencyDetail(record, range)
                : ""
            }
          `,
        )
        .join("")
    : `<tr><td colspan="6">Nenhum funcionário encontrado para o filtro selecionado.</td></tr>`;
}

function renderLatestFrequencyPoint(point) {
  if (!point) return `<span class="muted-text">Sem registro</span>`;

  return `
    <strong>${formatDate(point.date)}</strong><br>
    <small>${escapeHtml(point.in || "-")} · ${escapeHtml(point.client)}</small>
  `;
}

function renderEmployeeFrequencyDetail(record, range) {
  const history = record.periodPoints;
  const detailRows = history.length
    ? history
        .map(
          (point) => `
            <article>
              <div>
                <strong>${formatDate(point.date)} · ${escapeHtml(point.in || "-")} às ${escapeHtml(
                  point.out || "em aberto",
                )}</strong>
                <small>${escapeHtml(point.client)} · ${escapeHtml(
                  point.source === "QR Code" ? "QR Code" : "Registro manual",
                )}</small>
              </div>
              <span class="badge ${isManualPoint(point) ? "manual" : point.status === "Ponto normal" ? "active" : "warning"}">
                ${escapeHtml(point.status)}
              </span>
            </article>
          `,
        )
        .join("")
    : `<article class="empty-state">Nenhum registro no período selecionado.</article>`;

  return `
    <tr class="frequency-detail-row">
      <td colspan="6">
        <div class="frequency-detail">
          <div class="frequency-detail-header">
            <div>
              <strong>Histórico individual de ${escapeHtml(record.employee.name)}</strong>
              <small>${formatDate(range.start)} até ${formatDate(range.end)}</small>
            </div>
            <span>${record.periodPoints.length} check-in(s)</span>
          </div>
          <div class="frequency-detail-metrics">
            <article>
              <span>Total de visitas</span>
              <strong>${record.periodPoints.length}</strong>
            </article>
            <article>
              <span>Registros manuais</span>
              <strong>${record.manualCount}</strong>
            </article>
            <article>
              <span>Justificativa atual</span>
              <strong>${escapeHtml(record.justification || "Sem justificativa")}</strong>
            </article>
          </div>
          <div class="frequency-detail-list">
            ${detailRows}
          </div>
        </div>
      </td>
    </tr>
  `;
}

function handleFrequencyTableAction(event) {
  const button = event.target.closest("[data-frequency-action]");
  if (!button) return;

  const employeeId = Number(button.dataset.employeeId);
  expandedFrequencyEmployeeId = expandedFrequencyEmployeeId === employeeId ? null : employeeId;
  renderFrequency();
}

function renderCertificates() {
  document.querySelector("#certificateList").innerHTML = state.certificates
    .map(
      (certificate) => `
        <article class="list-item">
          <div>
            <strong>${certificate.employee}</strong>
            <small>${formatDate(certificate.start)} até ${formatDate(certificate.end)} · ${
              certificate.file
            }</small>
          </div>
          <span class="badge warning">${certificate.status}</span>
        </article>
      `,
    )
    .join("");
}

function renderCalendar() {
  const year = calendarCursor.getFullYear();
  const month = calendarCursor.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay();
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  const todayKey = today();
  const activitiesByDate = groupCalendarActivities();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  document.querySelector("#calendarMonthTitle").textContent = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(firstDay);

  const header = weekDays.map((day) => `<div class="calendar-weekday">${day}</div>`).join("");
  const cells = Array.from({ length: totalCells }, (_, index) => {
    const dayNumberInMonth = index - startOffset + 1;
    const isCurrentMonth = dayNumberInMonth >= 1 && dayNumberInMonth <= lastDay.getDate();

    if (!isCurrentMonth) {
      return `<article class="calendar-day muted" aria-hidden="true"></article>`;
    }

    const dateKey = toDateKey(new Date(year, month, dayNumberInMonth));
    const activities = activitiesByDate[dateKey] || [];
    const visibleActivities = activities.slice(0, 3);
    const extraCount = activities.length - visibleActivities.length;
    const activityClasses = [...new Set(activities.map((activity) => activity.kind))].join(" ");
    const activityDots = visibleActivities
      .map(
        (activity) => `
          <span
            class="calendar-dot ${activity.kind}"
            title="${escapeHtml(activity.label)}: ${escapeHtml(activity.title)}"
          ></span>
        `,
      )
      .join("");
    const activityLabel = activities.length
      ? `${activities.length} atividade${activities.length > 1 ? "s" : ""}: ${activities
          .map((activity) => `${activity.label} - ${activity.title}`)
          .join(", ")}`
      : "Sem atividades";
    const dayContent = `
      <div class="calendar-day-head">
        <strong>${dayNumberInMonth}</strong>
        ${activities.length ? `<span>${activities.length}</span>` : ""}
      </div>
      ${
        activities.length
          ? `<div class="calendar-dots">${activityDots}${
              extraCount > 0 ? `<small>+${extraCount}</small>` : ""
            }</div>`
          : ""
      }
      <div class="calendar-activities">
        ${visibleActivities
          .map(
            (activity) => `
              <div class="calendar-activity ${activity.kind}">
                <b>${activity.label}</b>
                <small>${activity.title}</small>
              </div>
            `,
          )
          .join("")}
        ${extraCount > 0 ? `<em>+${extraCount} atividade(s)</em>` : ""}
      </div>
    `;
    const dayClass = `calendar-day ${activities.length ? "has-activity" : ""} ${
      dateKey === todayKey ? "today" : ""
    } ${activityClasses}`;
    const accessibleLabel = `${dayNumberInMonth} de ${escapeHtml(
      document.querySelector("#calendarMonthTitle").textContent,
    )}. ${escapeHtml(activityLabel)}${
      activities.length ? ". Toque para ver os registros do dia." : ""
    }`;

    if (activities.length) {
      return `
        <button
          class="${dayClass}"
          type="button"
          data-calendar-date="${dateKey}"
          aria-label="${accessibleLabel}"
        >
          ${dayContent}
        </button>
      `;
    }

    return `<article class="${dayClass}" aria-label="${accessibleLabel}">${dayContent}</article>`;
  }).join("");

  document.querySelector("#calendarGrid").innerHTML = header + cells;
}

function handleCalendarDayClick(event) {
  const dayButton = event.target.closest("[data-calendar-date]");
  if (!dayButton) return;
  openCalendarDayModal(dayButton.dataset.calendarDate);
}

function openCalendarDayModal(dateKey) {
  const activities = groupCalendarActivities()[dateKey] || [];
  if (!activities.length) return;

  const modalTitle = document.querySelector("#calendarDayModalTitle");
  const modalSubtitle = document.querySelector("#calendarDayModalSubtitle");
  const modalList = document.querySelector("#calendarDayModalList");
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(`${dateKey}T12:00:00`));

  modalTitle.textContent = capitalize(formattedDate);
  modalSubtitle.textContent = `${activities.length} registro${
    activities.length > 1 ? "s" : ""
  } de ocorrência`;
  modalList.innerHTML = activities
    .map(
      (activity) => `
        <article class="calendar-modal-item ${activity.kind}">
          <span>${escapeHtml(activity.label)}</span>
          <strong>${escapeHtml(activity.title)}</strong>
          <small>${escapeHtml(activity.detail || "Sem detalhes adicionais")}</small>
        </article>
      `,
    )
    .join("");
  calendarDayModal.showModal();
}

function groupCalendarActivities() {
  const groups = {};
  const add = (date, activity) => {
    if (!groups[date]) groups[date] = [];
    groups[date].push(activity);
  };

  state.events.forEach((event) => {
    add(event.date, {
      kind: "event",
      label: "Relatório",
      title: event.name,
      detail: `${event.client} · ${event.team.length} pessoas`,
    });
  });

  state.certificates.forEach((certificate) => {
    eachDateBetween(certificate.start, certificate.end).forEach((date) => {
      add(date, {
        kind: "certificate",
        label: "Atestado",
        title: certificate.employee,
        detail: certificate.file,
      });
    });
  });

  state.points.forEach((point) => {
    add(point.date, {
      kind: "point",
      label: point.status === "Ponto normal" ? "Ponto" : "Ocorrência",
      title: point.employee,
      detail: point.status,
    });
  });

  return groups;
}

function saveLeadFromForm(form) {
  if (!isSuperAdmin()) {
    setFormMessage("#leadFormMessage", "Apenas Super Admin pode gerenciar leads.", "error");
    return;
  }

  const data = Object.fromEntries(new FormData(form));
  const name = sanitizeReportText(data.name);
  const phone = formatPhone(data.phone);
  const existingLead = state.leads.find((lead) => Number(lead.id) === Number(data.id));
  const wasEditing = leadFormMode === "edit" && existingLead;

  if (!name) {
    setFormMessage("#leadFormMessage", "Informe o nome do lead.", "error");
    return;
  }

  if (!isValidBrazilMobilePhone(phone)) {
    setFormMessage(
      "#leadFormMessage",
      "Informe DDD + celular com 9 dígitos. Exemplo: (83) 99999-9999.",
      "error",
    );
    return;
  }

  const leadRecord = {
    id: existingLead?.id || Date.now(),
    name,
    company: sanitizeReportText(data.company) || "Não informado",
    phone,
    service: sanitizeReportText(data.service),
    message: sanitizeReportText(data.message) || "Sem mensagem",
    status: sanitizeReportText(data.status) || "Novo",
    source: existingLead?.source || "Cadastro manual",
    createdAt: existingLead?.createdAt || nowIso(),
    updatedAt: nowIso(),
  };

  if (wasEditing) {
    Object.assign(existingLead, leadRecord);
  } else {
    state.leads.unshift(leadRecord);
  }

  selectedLeadId = leadRecord.id;
  saveState();
  resetLeadForm();
  renderLeads();
  renderDashboard();
  setFormMessage(
    "#leadFormMessage",
    wasEditing ? "Lead atualizado com sucesso." : "Lead cadastrado com sucesso.",
    "success",
  );
}

function prepareLeadForm(lead) {
  const form = document.querySelector("#leadForm");
  if (!form || !lead) return;

  leadFormMode = "edit";
  editingLeadId = lead.id;
  selectedLeadId = lead.id;
  form.elements.id.value = lead.id;
  form.elements.name.value = lead.name || "";
  form.elements.company.value = lead.company || "";
  form.elements.phone.value = lead.phone || "";
  form.elements.status.value = lead.status || "Novo";
  form.elements.service.value = lead.service || "Demonstração do MVP";
  form.elements.message.value = lead.message || "";
  document.querySelector("#leadFormTitle").textContent = "Editar lead";
  document.querySelector("#leadFormModeBadge").textContent = "Editar";
  document.querySelector("#leadFormSubmit").textContent = "Atualizar lead";
  clearFormMessage("#leadFormMessage");
  renderLeadDetail(lead);
}

function resetLeadForm() {
  const form = document.querySelector("#leadForm");
  if (!form) return;

  leadFormMode = "create";
  editingLeadId = null;
  form.reset();
  form.elements.id.value = "";
  form.elements.status.value = "Novo";
  form.elements.service.value = "Demonstração do MVP";
  document.querySelector("#leadFormTitle").textContent = "Novo lead";
  document.querySelector("#leadFormModeBadge").textContent = "Criar";
  document.querySelector("#leadFormSubmit").textContent = "Salvar lead";
  clearFormMessage("#leadFormMessage");
}

function renderLeads() {
  const leadsTable = document.querySelector("#leadsTable");
  if (!leadsTable) return;

  const leads = getFilteredLeads();
  document.querySelector("#leadsCount").textContent = `${leads.length} lead${
    leads.length === 1 ? "" : "s"
  }`;

  if (!leads.length) {
    leadsTable.innerHTML = `
      <tr>
        <td colspan="7">
          <article class="empty-state">Nenhum lead encontrado.</article>
        </td>
      </tr>
    `;
    renderLeadDetail(null);
    return;
  }

  if (!state.leads.some((lead) => Number(lead.id) === Number(selectedLeadId))) {
    selectedLeadId = leads[0]?.id || null;
  }

  leadsTable.innerHTML = leads
    .map(
      (lead) => {
        const isSelected = Number(lead.id) === Number(selectedLeadId);

        return `
        <tr class="${isSelected ? "selected-row" : ""}">
          <td data-label="Lead">
            <strong>${escapeHtml(lead.name || "Sem nome")}</strong><br>
            <small>${escapeHtml(lead.company || "Não informado")}</small>
          </td>
          <td data-label="Telefone">${escapeHtml(lead.phone || "-")}</td>
          <td data-label="Interesse">${escapeHtml(lead.service || "-")}</td>
          <td class="lead-message-cell" data-label="Mensagem">${escapeHtml(lead.message || "Sem mensagem")}</td>
          <td data-label="Status"><span class="badge ${leadStatusClass(lead.status)}">${escapeHtml(lead.status)}</span></td>
          <td data-label="Data">${lead.createdAt ? formatDateTime(lead.createdAt) : "-"}</td>
          <td data-label="Ações">
            <div class="user-actions">
              <button type="button" data-lead-action="view" data-lead-id="${lead.id}">
                Ver
              </button>
              <button type="button" data-lead-action="edit" data-lead-id="${lead.id}">
                Editar
              </button>
              <button type="button" data-lead-action="progress" data-lead-id="${lead.id}">
                Atender
              </button>
              <button type="button" data-lead-action="convert" data-lead-id="${lead.id}">
                Converter
              </button>
              <button type="button" data-lead-action="delete" data-lead-id="${lead.id}">
                Excluir
              </button>
            </div>
          </td>
        </tr>
      `;
      },
    )
    .join("");

  renderLeadDetail(state.leads.find((lead) => Number(lead.id) === Number(selectedLeadId)) || leads[0]);
}

function getFilteredLeads() {
  const search = normalizeText(document.querySelector("#leadSearch")?.value || "");
  const status = document.querySelector("#leadStatusFilter")?.value || "all";

  return state.leads
    .filter((lead) => status === "all" || lead.status === status)
    .filter((lead) =>
      normalizeText(
        [lead.name, lead.company, lead.phone, lead.service, lead.message, lead.status].join(" "),
      ).includes(search),
    )
    .sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
}

function handleLeadAction(event) {
  const button = event.target.closest("[data-lead-action]");
  if (!button || !isSuperAdmin()) return;

  const lead = state.leads.find((item) => String(item.id) === button.dataset.leadId);
  if (!lead) return;

  if (button.dataset.leadAction === "view") {
    selectedLeadId = lead.id;
    renderLeads();
    return;
  }

  if (button.dataset.leadAction === "edit") {
    prepareLeadForm(lead);
    renderLeads();
    return;
  }

  if (button.dataset.leadAction === "progress") {
    lead.status = "Em atendimento";
    lead.updatedAt = nowIso();
    selectedLeadId = lead.id;
    showToast("Lead marcado em atendimento.");
  }

  if (button.dataset.leadAction === "convert") {
    lead.status = "Convertido";
    lead.updatedAt = nowIso();
    selectedLeadId = lead.id;
    showToast("Lead marcado como convertido.");
  }

  if (button.dataset.leadAction === "delete") {
    state.leads = state.leads.filter((item) => item.id !== lead.id);
    if (Number(selectedLeadId) === Number(lead.id)) selectedLeadId = null;
    if (Number(editingLeadId) === Number(lead.id)) resetLeadForm();
    showToast("Lead removido.");
  }

  saveState();
  renderLeads();
  renderDashboard();
}

function renderLeadDetail(lead) {
  const detail = document.querySelector("#leadDetailContent");
  const status = document.querySelector("#leadDetailStatus");
  if (!detail || !status) return;

  if (!lead) {
    status.textContent = "Sem seleção";
    status.className = "badge manual";
    detail.innerHTML = `<article class="empty-state">Selecione um lead ou cadastre um novo contato.</article>`;
    return;
  }

  status.textContent = lead.status || "Novo";
  status.className = `badge ${leadStatusClass(lead.status)}`;
  detail.innerHTML = `
    <dl class="detail-grid lead-detail-grid">
      <div><dt>Nome</dt><dd>${escapeHtml(lead.name || "-")}</dd></div>
      <div><dt>Empresa</dt><dd>${escapeHtml(lead.company || "-")}</dd></div>
      <div><dt>Telefone</dt><dd>${escapeHtml(lead.phone || "-")}</dd></div>
      <div><dt>Interesse</dt><dd>${escapeHtml(lead.service || "-")}</dd></div>
      <div><dt>Origem</dt><dd>${escapeHtml(lead.source || "Site Acesse Report AI")}</dd></div>
      <div><dt>Criado em</dt><dd>${lead.createdAt ? formatDateTime(lead.createdAt) : "-"}</dd></div>
      <div><dt>Atualizado em</dt><dd>${lead.updatedAt ? formatDateTime(lead.updatedAt) : "-"}</dd></div>
      <div><dt>Status</dt><dd>${escapeHtml(lead.status || "Novo")}</dd></div>
    </dl>
    <article class="lead-detail-message">
      <strong>Mensagem</strong>
      <p>${escapeHtml(lead.message || "Sem mensagem")}</p>
    </article>
  `;
}

function leadStatusClass(status) {
  const statusClasses = {
    Novo: "manual",
    "Em atendimento": "warning",
    Convertido: "active",
  };

  return statusClasses[status] || "manual";
}

function eachDateBetween(start, end) {
  const dates = [];
  const current = new Date(`${start}T12:00:00`);
  const last = new Date(`${end}T12:00:00`);

  while (current <= last) {
    dates.push(toDateKey(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderUsers() {
  const usersTable = document.querySelector("#usersTable");
  if (!usersTable) return;

  document.querySelector("#usersCount").textContent = `${state.users.length} usuários`;
  usersTable.innerHTML = state.users
    .map(
      (user) => `
        <tr>
          <td data-label="Usuário">
            <strong>${escapeHtml(user.name)}</strong><br>
            <small>${escapeHtml(user.email)}</small>
          </td>
          <td data-label="Perfil">${escapeHtml(user.role)}</td>
          <td data-label="Status"><span class="badge ${user.status === "Ativo" ? "active" : "danger"}">${
            user.status
          }</span></td>
          <td data-label="Último acesso">${user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "Nunca acessou"}</td>
          <td data-label="Ações">
            <div class="user-actions">
              <button type="button" data-user-action="reset" data-user-id="${user.id}">
                Redefinir
              </button>
              <button type="button" data-user-action="toggle" data-user-id="${user.id}">
                ${user.status === "Ativo" ? "Inativar" : "Ativar"}
              </button>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function renderMailbox() {
  const mailboxList = document.querySelector("#mailboxList");
  if (!mailboxList) return;

  if (!state.mailbox.length) {
    mailboxList.innerHTML = `
      <article class="empty-state">
        Nenhum e-mail simulado foi gerado ainda.
      </article>
    `;
    return;
  }

  mailboxList.innerHTML = state.mailbox
    .slice(0, 8)
    .map(
      (email) => `
        <article class="email-card">
          <span>${formatDateTime(email.createdAt)}</span>
          <strong>${escapeHtml(email.subject)}</strong>
          <small>Para: ${escapeHtml(email.to)}</small>
          <p>${escapeHtml(email.preview)}</p>
          ${
            email.token
              ? `<code>${email.token}</code>`
              : ""
          }
          ${
            email.resetLink
              ? `<a class="inline-link" href="#reset-${encodeURIComponent(email.token)}">Abrir redefinição</a>`
              : ""
          }
        </article>
      `,
    )
    .join("");
}

function updateAccessControl() {
  document.querySelectorAll(".admin-only").forEach((element) => {
    element.hidden = !isSuperAdmin();
  });

  if (!isSuperAdmin() && document.querySelector(".app-view.admin-only.active")) {
    navigateToAppView("reports", { replace: true });
  }
}

function showLoginForm() {
  document.querySelector("#loginForm").hidden = false;
  document.querySelector(".login-actions").hidden = false;
  document.querySelector("#resetRequestForm").hidden = true;
  document.querySelector("#resetPasswordForm").hidden = true;
  document.querySelector("#resetEmailPreview").hidden = true;
  clearFormMessage("#loginMessage");
  clearFormMessage("#resetRequestMessage");
  clearFormMessage("#resetPasswordMessage");
}

function showResetRequest() {
  document.querySelector("#loginForm").hidden = true;
  document.querySelector(".login-actions").hidden = true;
  document.querySelector("#resetRequestForm").hidden = false;
  document.querySelector("#resetPasswordForm").hidden = true;
  document.querySelector("#resetEmailPreview").hidden = true;
  clearFormMessage("#resetRequestMessage");
  clearFormMessage("#resetPasswordMessage");
}

function showResetPasswordForm() {
  document.querySelector("#loginForm").hidden = true;
  document.querySelector(".login-actions").hidden = true;
  document.querySelector("#resetRequestForm").hidden = true;
  document.querySelector("#resetPasswordForm").hidden = false;
}

function showResetEmailPreview(emailRecord) {
  const preview = document.querySelector("#resetEmailPreview");
  preview.hidden = false;
  preview.innerHTML = `
    <strong>E-mail simulado enviado para ${escapeHtml(emailRecord.to)}</strong>
    <p>${escapeHtml(emailRecord.preview)}</p>
    <code>${emailRecord.token}</code>
    <a class="inline-link" href="#reset-${encodeURIComponent(emailRecord.token)}">
      Abrir link de redefinição
    </a>
  `;
}

function handleResetHash() {
  if (!window.location.hash.startsWith("#reset-")) return;
  const token = decodeURIComponent(window.location.hash.replace("#reset-", "")).toUpperCase();
  if (!token) return;

  const resetToken = state.resetTokens.find((item) => item.token === token && !item.used);
  openLogin();
  showResetPasswordForm();
  document.querySelector("#resetToken").value = token;
  document.querySelector("#resetOwnerEmail").value = resetToken?.email || "";
  setFormMessage(
    "#resetPasswordMessage",
    resetToken
      ? "Link de redefinição carregado. Informe uma nova senha forte."
      : "Código não localizado ou já utilizado.",
    resetToken ? "info" : "error",
  );
}

function populateSelects() {
  const selectedFrequencyEmployee = document.querySelector("#frequencyEmployee")?.value || "all";
  const selectedFrequencyClient = document.querySelector("#frequencyClient")?.value || "all";
  const clientOptions = state.clients
    .map((client) => `<option value="${escapeHtml(client.name)}">${escapeHtml(client.name)}</option>`)
    .join("");
  const employeeOptions = state.employees
    .map((employee) => `<option value="${employee.id}">${escapeHtml(employee.name)}</option>`)
    .join("");
  const frequencyEmployeeOptions = [
    `<option value="all">Todos os funcionários</option>`,
    ...state.employees.map(
      (employee) => `<option value="${escapeHtml(employee.name)}">${escapeHtml(employee.name)}</option>`,
    ),
  ].join("");
  const frequencyClientOptions = [
    `<option value="all">Todos os clientes/locais</option>`,
    ...state.clients.map(
      (client) => `<option value="${escapeHtml(client.name)}">${escapeHtml(client.name)}</option>`,
    ),
  ].join("");
  const eventOptions = state.events
    .map((event) => `<option value="${event.id}">${event.name}</option>`)
    .join("");

  ["#eventClient", "#timeClient", "#employeeClient"].forEach((selector) => {
    document.querySelector(selector).innerHTML = clientOptions;
  });

  ["#timeEmployee", "#certificateEmployee"].forEach((selector) => {
    document.querySelector(selector).innerHTML = employeeOptions;
  });

  document.querySelector("#frequencyEmployee").innerHTML = frequencyEmployeeOptions;
  if (state.employees.some((employee) => employee.name === selectedFrequencyEmployee)) {
    document.querySelector("#frequencyEmployee").value = selectedFrequencyEmployee;
  }
  document.querySelector("#frequencyClient").innerHTML = frequencyClientOptions;
  if (state.clients.some((client) => client.name === selectedFrequencyClient)) {
    document.querySelector("#frequencyClient").value = selectedFrequencyClient;
  }
  document.querySelector("#eventSelect").innerHTML = eventOptions;
  populateCheckinQrSelect();
}

function card(title, value, subtitle) {
  return `
    <article class="dashboard-card">
      <span>${title}</span>
      <strong>${value}</strong>
      <small>${subtitle}</small>
    </article>
  `;
}

function getOrderedBrandLogos(source = state.brandLogos) {
  return [...(Array.isArray(source) ? source : [])].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order)) ? Number(a.order) : 0;
    const orderB = Number.isFinite(Number(b.order)) ? Number(b.order) : 0;
    return orderA - orderB || String(a.name).localeCompare(String(b.name), "pt-BR");
  });
}

function normalizeBrandOrders(source = state.brandLogos) {
  getOrderedBrandLogos(source).forEach((brand, index) => {
    brand.order = index + 1;
  });
}

function moveBrandLogo(brandId, direction) {
  const orderedBrands = getOrderedBrandLogos();
  const currentIndex = orderedBrands.findIndex((brand) => brand.id === brandId);
  const nextIndex = currentIndex + direction;

  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= orderedBrands.length) return;

  const currentOrder = orderedBrands[currentIndex].order;
  orderedBrands[currentIndex].order = orderedBrands[nextIndex].order;
  orderedBrands[nextIndex].order = currentOrder;
  normalizeBrandOrders();
}

function repeatBrandLogos(brands, minimumLength) {
  if (!brands.length) return [];

  const repeatedBrands = [];
  while (repeatedBrands.length < minimumLength) {
    repeatedBrands.push(...brands);
  }
  return repeatedBrands;
}

function getBrandSpeed() {
  return getSafeBrandSpeed(state.brandSettings?.speed);
}

function getSafeBrandSpeed(speed) {
  const parsedSpeed = Number(speed);
  if (!Number.isFinite(parsedSpeed)) return initialState.brandSettings.speed;
  return Math.min(80, Math.max(18, parsedSpeed));
}

function normalizeBrandInitials(value) {
  return String(value || "MS")
    .replace(/[^a-zA-ZÀ-ÿ0-9]/g, "")
    .slice(0, 4)
    .toUpperCase();
}

function normalizeBrandColor(value) {
  const color = String(value || "").trim();
  return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#006783";
}

function normalizeOptionalExternalUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    return ["http:", "https:"].includes(parsedUrl.protocol) ? parsedUrl.href : null;
  } catch {
    return null;
  }
}

function normalizeDemoEmployeeCpfs(employees) {
  const demoCpfMap = new Map(
    initialState.employees.map((employee) => [employee.registration, employee.cpf]),
  );

  employees.forEach((employee) => {
    const demoCpf = demoCpfMap.get(employee.registration);
    if (demoCpf && !isValidCpf(employee.cpf)) {
      employee.cpf = demoCpf;
    }
  });
}

function getSafeCheckinRadius(value) {
  const parsedRadius = Number(value);
  if (!Number.isFinite(parsedRadius)) return checkinRules.defaultRadiusMeters;
  return Math.min(checkinRules.maxRadiusMeters, Math.max(20, Math.round(parsedRadius)));
}

function normalizeQrCodes(nextState) {
  const savedQrCodes = Array.isArray(nextState.qrCodes) ? nextState.qrCodes : [];
  const normalizedQrCodes = nextState.clients.map((client, index) => {
    const seedQr = initialState.qrCodes.find((item) => item.client === client.name);
    const savedQr = savedQrCodes.find(
      (item) => item.client === client.name || item.clientCode === client.code,
    );
    const fallbackId = `QR-LOCAL-${String(index + 1).padStart(3, "0")}`;

    return {
      id: String(savedQr?.id || seedQr?.id || fallbackId),
      companyId: String(savedQr?.companyId || seedQr?.companyId || "MS-MULTSERV"),
      clientCode: String(savedQr?.clientCode || client.code),
      client: client.name,
      token: String(savedQr?.token || seedQr?.token || `MS-QR-${client.code}-2026`),
      description: String(
        savedQr?.description || seedQr?.description || `QR físico de ${client.name}`,
      ),
      active: savedQr?.active !== false,
      createdAt: savedQr?.createdAt || seedQr?.createdAt || today(),
      updatedAt: savedQr?.updatedAt || seedQr?.updatedAt || null,
    };
  });

  savedQrCodes
    .filter(
      (savedQr) =>
        savedQr.client &&
        !normalizedQrCodes.some((qrCode) => qrCode.id === savedQr.id || qrCode.client === savedQr.client),
    )
    .forEach((savedQr) => normalizedQrCodes.push(savedQr));

  return normalizedQrCodes;
}

function loadState() {
  const savedState = localStorage.getItem(storageKey);
  if (!savedState) return structuredClone(initialState);
  try {
    return JSON.parse(savedState);
  } catch {
    return structuredClone(initialState);
  }
}

function ensureStateShape(savedState) {
  const nextState = {
    ...structuredClone(initialState),
    ...savedState,
  };

  nextState.users = Array.isArray(savedState.users) ? savedState.users : structuredClone(initialUsers);
  nextState.resetTokens = Array.isArray(savedState.resetTokens) ? savedState.resetTokens : [];
  nextState.mailbox = Array.isArray(savedState.mailbox) ? savedState.mailbox : [];
  nextState.leads = Array.isArray(savedState.leads) ? savedState.leads : [];
  nextState.security = savedState.security || { loginAttempts: {} };
  nextState.security.loginAttempts = nextState.security.loginAttempts || {};
  nextState.checkinAttempts = Array.isArray(savedState.checkinAttempts)
    ? savedState.checkinAttempts
    : [];
  nextState.brandSettings = {
    ...structuredClone(initialState.brandSettings),
    ...(savedState.brandSettings || {}),
  };
  nextState.brandSettings.speed = getSafeBrandSpeed(nextState.brandSettings.speed);
  nextState.brandLogos = Array.isArray(savedState.brandLogos)
    ? savedState.brandLogos.map((brand, index) => {
        const logoUrl = normalizeOptionalExternalUrl(brand.logoUrl);
        const website = normalizeOptionalExternalUrl(brand.website);

        return {
          id: brand.id || Date.now() + index,
          name: String(brand.name || `Marca ${index + 1}`).trim(),
          initials: normalizeBrandInitials(brand.initials || getInitials(brand.name)),
          logoUrl: logoUrl || "",
          website: website || "",
          color: normalizeBrandColor(brand.color),
          active: brand.active !== false,
          order: Number.isFinite(Number(brand.order)) ? Number(brand.order) : index + 1,
        };
      })
    : structuredClone(initialState.brandLogos);
  normalizeBrandOrders(nextState.brandLogos);

  initialUsers.forEach((seedUser) => {
    const existingUser = nextState.users.find(
      (user) => normalizeEmail(user.email) === normalizeEmail(seedUser.email),
    );
    if (!existingUser) {
      nextState.users.push(structuredClone(seedUser));
      return;
    }
    existingUser.role = existingUser.role || seedUser.role;
    existingUser.status = existingUser.status || "Ativo";

    const passwordIsUsable = validatePassword(existingUser.password, {
      email: existingUser.email,
      name: existingUser.name,
    }).valid;

    if (!passwordIsUsable) {
      existingUser.password = seedUser.password;
      existingUser.passwordUpdatedAt = nowIso();
      delete nextState.security.loginAttempts[normalizeEmail(seedUser.email)];
    }
  });

  normalizeDemoEmployeeCpfs(nextState.employees);

  nextState.clients.forEach((client) => {
    const seededClient = initialState.clients.find((item) => item.name === client.name);
    if (seededClient?.coordinates && !client.coordinates) {
      client.coordinates = structuredClone(seededClient.coordinates);
    }
    if (client.coordinates) {
      client.coordinates = {
        lat: Number(client.coordinates.lat),
        lng: Number(client.coordinates.lng),
      };
    }
    client.code = client.code || seededClient?.code || `EMP-${String(client.id).padStart(3, "0")}`;
    client.type = client.type || seededClient?.type || "Empresa";
    client.address = client.address || seededClient?.address || "Endereço não informado";
    client.manager = client.manager || seededClient?.manager || "Supervisor não informado";
    client.activeEmployees = Number.isFinite(Number(client.activeEmployees))
      ? Math.max(0, Math.round(Number(client.activeEmployees)))
      : Number(seededClient?.activeEmployees || 0);
    client.active = client.active !== false;
    client.allowedRadiusMeters = getSafeCheckinRadius(
      client.allowedRadiusMeters || seededClient?.allowedRadiusMeters,
    );
  });
  nextState.qrCodes = normalizeQrCodes(nextState);
  nextState.reportAi = normalizeReportAiState(nextState.reportAi);

  return nextState;
}

function replaceLegacyReportDemoText(value) {
  return sanitizeReportText(value)
    .replaceAll("Produtor Pré-Junino", "Diretoria Comercial")
    .replaceAll("Pré-Junino", "Resumo comercial mensal")
    .replaceAll("pre-junino", "resumo-comercial-mensal")
    .replaceAll("dashboard-pre-junino", "dashboard-comercial-mensal")
    .replaceAll("fluxo-por-horario", "variacao-por-periodo")
    .replaceAll("indicadores consolidados do evento", "indicadores consolidados da operação")
    .replaceAll("gráfico de fluxo por horário com pico", "gráfico de variação por período com alerta")
    .replaceAll("dias do evento", "períodos analisados")
    .replaceAll("passagens por dia, horário e categoria", "registros por período, fonte e categoria");
}

function normalizeLegacyReportMethod(value) {
  const method = replaceLegacyReportDemoText(value || "Comercial");
  return method === "Reconhecimento facial" ? "Comercial" : method;
}

function migrateLegacyReportMetrics(metrics) {
  const nextMetrics = {
    ...metrics,
  };
  if (nextMetrics.peakSpeed === "6 acessos/min") {
    nextMetrics.peakSpeed = "6 registros/min";
  }
  return nextMetrics;
}

function normalizeReportAiState(reportAiState) {
  const seed = structuredClone(initialState.reportAi);
  const reportAi = {
    ...seed,
    ...(reportAiState || {}),
  };

  reportAi.events = Array.isArray(reportAiState?.events)
    ? reportAiState.events.map((event, index) => ({
        id: Number(event.id) || Date.now() + index,
        eventName: replaceLegacyReportDemoText(event.eventName || event.name || `Operação ${index + 1}`),
        clientName: replaceLegacyReportDemoText(event.clientName || event.client || "Cliente não informado"),
        companyName: replaceLegacyReportDemoText(event.companyName || "Acesse Tecnologia Operacional"),
        cnpj: sanitizeReportText(event.cnpj),
        location: replaceLegacyReportDemoText(event.location || "Local não informado"),
        startDate: event.startDate || event.date || today(),
        endDate: event.endDate || event.startDate || event.date || today(),
        days: Math.max(1, Number(event.days) || 1),
        agendas: replaceLegacyReportDemoText(event.agendas),
        gates: replaceLegacyReportDemoText(event.gates),
        devices: replaceLegacyReportDemoText(event.devices),
        mainMethod: normalizeLegacyReportMethod(event.mainMethod),
        technicalOwner: replaceLegacyReportDemoText(event.technicalOwner || "Responsável técnico"),
        status: sanitizeReportText(event.status || "Rascunho"),
        createdAt: event.createdAt || today(),
        updatedAt: event.updatedAt || null,
      }))
    : seed.events;

  reportAi.attachments = Array.isArray(reportAiState?.attachments)
    ? reportAiState.attachments.map((attachment, index) => ({
        id: Number(attachment.id) || Date.now() + index,
        eventId: Number(attachment.eventId) || reportAi.events[0]?.id || 0,
        name: replaceLegacyReportDemoText(attachment.name || `anexo-${index + 1}.pdf`),
        fileType: sanitizeReportText(attachment.fileType || getReportFileType(attachment.name)),
        relation: replaceLegacyReportDemoText(attachment.relation || "Dashboard principal"),
        sourceType: sanitizeReportText(attachment.sourceType || "Upload manual"),
        description: replaceLegacyReportDemoText(attachment.description),
        uploadedBy: replaceLegacyReportDemoText(attachment.uploadedBy || "Usuário"),
        uploadedAt: attachment.uploadedAt || today(),
      }))
    : seed.attachments;

  reportAi.metrics = reportAiState?.metrics && typeof reportAiState.metrics === "object"
    ? reportAiState.metrics
    : seed.metrics;

  reportAi.events.forEach((event) => {
    reportAi.metrics[event.id] = {
      ...buildDefaultReportMetrics(event),
      ...migrateLegacyReportMetrics(reportAi.metrics[event.id] || {}),
    };
  });

  reportAi.reports = Array.isArray(reportAiState?.reports)
    ? reportAiState.reports.map((report, index) => ({
        id: Number(report.id) || Date.now() + index,
        eventId: Number(report.eventId) || reportAi.events[0]?.id || 0,
        reportType: sanitizeReportText(report.reportType || "Relatório Detalhado"),
        currentVersion: sanitizeReportText(report.currentVersion || "v0.1"),
        status: sanitizeReportText(report.status || "Rascunho"),
        recommendations: replaceLegacyReportDemoText(report.recommendations),
        versions: Array.isArray(report.versions)
          ? report.versions.map((version) => ({
              ...version,
              createdBy: replaceLegacyReportDemoText(version.createdBy === "Sistema" ? "Alexandre" : version.createdBy),
              changes: replaceLegacyReportDemoText(version.changes),
              filePdfUrl: replaceLegacyReportDemoText(version.filePdfUrl),
              fileDocxUrl: replaceLegacyReportDemoText(version.fileDocxUrl),
              fileSheetUrl: replaceLegacyReportDemoText(version.fileSheetUrl),
            }))
          : [],
      }))
    : seed.reports;

  reportAi.events.forEach((event) => {
    if (!reportAi.reports.some((report) => Number(report.eventId) === Number(event.id))) {
      reportAi.reports.push({
        id: Date.now() + event.id,
        eventId: event.id,
        reportType: "Relatório Detalhado",
        currentVersion: "v0.1",
        status: event.status || "Rascunho",
        recommendations: "Validar anexos e indicadores antes de aprovar o envio ao cliente.",
        versions: [],
      });
    }
  });

  reportAi.selectedEventId =
    reportAi.events.find((event) => Number(event.id) === Number(reportAi.selectedEventId))?.id ||
    reportAi.events[0]?.id ||
    null;
  reportAi.selectedScreen = reportAiScreenLabels[reportAi.selectedScreen]
    ? reportAi.selectedScreen
    : "events";

  return reportAi;
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return state.users.find((user) => normalizeEmail(user.email) === normalizedEmail);
}

function findDemoUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);
  return Object.values(demoUsers).find((user) => normalizeEmail(user.email) === normalizedEmail);
}

function restoreDemoUserAccess(seedUser, existingUser = findUserByEmail(seedUser.email)) {
  let user = existingUser;

  if (!user) {
    user = {
      id: getNextId(state.users),
      ...seedUser,
      createdAt: today(),
      lastLoginAt: null,
    };
    state.users.push(user);
  }

  user.name = user.name || seedUser.name;
  user.email = seedUser.email;
  user.password = seedUser.password;
  user.role = seedUser.role;
  user.status = "Ativo";
  user.passwordUpdatedAt = user.passwordUpdatedAt || nowIso();

  return user;
}

function getNextId(items) {
  const ids = items.map((item) => Number(item.id)).filter(Number.isFinite);
  return ids.length ? Math.max(...ids) + 1 : 1;
}

function isSuperAdmin() {
  return activeUser?.role === "Super Admin";
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(email));
}

function validatePassword(password, context = {}) {
  const value = String(password || "");
  const lowerValue = value.toLowerCase();
  const personalTerms = [
    ...String(context.email || "")
      .split("@")[0]
      .split(/[._\-\s]+/),
    ...String(context.name || "").split(/\s+/),
  ]
    .map((term) => term.toLowerCase())
    .filter((term) => term.length >= 3);

  const checks = [
    {
      ok: value.length >= passwordPolicy.minLength,
      message: `Use no mínimo ${passwordPolicy.minLength} caracteres.`,
    },
    {
      ok: value.length <= passwordPolicy.maxLength,
      message: `Use no máximo ${passwordPolicy.maxLength} caracteres.`,
    },
    { ok: /[A-Z]/.test(value), message: "Inclua pelo menos uma letra maiúscula." },
    { ok: /[a-z]/.test(value), message: "Inclua pelo menos uma letra minúscula." },
    { ok: /\d/.test(value), message: "Inclua pelo menos um número." },
    { ok: /[^A-Za-z0-9]/.test(value), message: "Inclua pelo menos um caractere especial." },
    { ok: !/\s/.test(value), message: "Não use espaços em branco." },
    { ok: !/(.)\1\1/.test(value), message: "Evite três caracteres repetidos em sequência." },
    {
      ok: !/(123456|abcdef|qwerty|senha|password|admin)/i.test(value),
      message: "Evite sequências e termos comuns como admin, senha ou 123456.",
    },
    {
      ok: !personalTerms.some((term) => lowerValue.includes(term)),
      message: "A senha não pode conter partes do nome ou e-mail do usuário.",
    },
    {
      ok: !context.oldPassword || value !== context.oldPassword,
      message: "A nova senha deve ser diferente da senha atual.",
    },
  ];

  return {
    valid: checks.every((check) => check.ok),
    errors: checks.filter((check) => !check.ok).map((check) => check.message),
    checks,
  };
}

function renderPasswordRules(selector, password, context) {
  const list = document.querySelector(selector);
  if (!list) return;

  const validation = validatePassword(password, context);
  list.innerHTML = validation.checks
    .slice(0, 10)
    .map(
      (check) => `
        <li class="${check.ok ? "ok" : ""}">
          ${check.ok ? "✓" : "•"} ${check.message}
        </li>
      `,
    )
    .join("");
}

function setFormMessage(selector, message, type = "info") {
  const element = document.querySelector(selector);
  if (!element) return;
  element.hidden = false;
  element.className = `form-message ${type}`;
  element.textContent = message;
}

function clearFormMessage(selector) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.hidden = true;
  element.textContent = "";
}

function registerFailedLogin(email) {
  const normalizedEmail = normalizeEmail(email);
  const attempts = state.security.loginAttempts[normalizedEmail] || {
    count: 0,
    lockedUntil: null,
  };

  attempts.count += 1;
  if (attempts.count >= passwordPolicy.maxLoginAttempts) {
    attempts.lockedUntil = Date.now() + passwordPolicy.lockoutMinutes * 60 * 1000;
  }

  state.security.loginAttempts[normalizedEmail] = attempts;
  saveState();
}

function getLoginLockout(email) {
  const attempts = state.security.loginAttempts[normalizeEmail(email)];
  if (!attempts?.lockedUntil) return { locked: false, remainingMinutes: 0 };

  if (attempts.lockedUntil <= Date.now()) {
    resetLoginAttempts(email);
    return { locked: false, remainingMinutes: 0 };
  }

  return {
    locked: true,
    remainingMinutes: Math.ceil((attempts.lockedUntil - Date.now()) / 60000),
  };
}

function resetLoginAttempts(email) {
  delete state.security.loginAttempts[normalizeEmail(email)];
  saveState();
}

function sendPasswordResetEmail(user, subject) {
  const token = generateResetToken();
  const expiresAt = Date.now() + 30 * 60 * 1000;
  const resetLink = `${window.location.href.split("#")[0]}#reset-${token}`;

  state.resetTokens.unshift({
    email: user.email,
    token,
    expiresAt,
    used: false,
    createdAt: nowIso(),
  });

  const emailRecord = {
    id: Date.now(),
    to: user.email,
    subject,
    token,
    resetLink,
    createdAt: nowIso(),
    preview: `Use o código ${token} ou o link de redefinição. O código expira em 30 minutos.`,
  };

  state.mailbox.unshift(emailRecord);
  return emailRecord;
}

function sendWelcomeEmail(user, temporaryPassword) {
  state.mailbox.unshift({
    id: Date.now(),
    to: user.email,
    subject: "Bem-vindo ao Acesse Report AI",
    token: "",
    createdAt: nowIso(),
    preview: `Usuário criado com perfil ${user.role}. Senha temporária: ${temporaryPassword}.`,
  });
}

function generateResetToken() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0, 6);
  return `AR-${random.padStart(6, "0")}`;
}

function isValidResetToken(email, token) {
  const normalizedEmail = normalizeEmail(email);
  return state.resetTokens.some(
    (item) =>
      normalizeEmail(item.email) === normalizedEmail &&
      item.token === token &&
      !item.used &&
      item.expiresAt > Date.now(),
  );
}

function markResetTokenAsUsed(email, token) {
  const normalizedEmail = normalizeEmail(email);
  const resetToken = state.resetTokens.find(
    (item) => normalizeEmail(item.email) === normalizedEmail && item.token === token,
  );
  if (resetToken) resetToken.used = true;
}

function nowIso() {
  return new Date().toISOString();
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function currentTime() {
  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

function nextDate(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function daysFromToday(dateValue) {
  const now = new Date(today());
  const date = new Date(dateValue);
  return Math.round((date - now) / 86400000);
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateValue}T12:00:00`));
}

function formatDateTime(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateValue));
}

function dayNumber(dateValue) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit" }).format(
    new Date(`${dateValue}T12:00:00`),
  );
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.right = "18px";
  toast.style.bottom = "18px";
  toast.style.zIndex = "60";
  toast.style.maxWidth = "320px";
  toast.style.borderRadius = "8px";
  toast.style.padding = "14px 16px";
  toast.style.color = "#ffffff";
  toast.style.background = "#16232d";
  toast.style.boxShadow = "0 16px 40px rgba(22, 35, 45, 0.22)";
  toast.style.fontWeight = "800";
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 2800);
}

// ─── Mobile bottom nav: highlight active section on scroll ───
(function () {
  const navItems = document.querySelectorAll('.mobile-bottom-nav-item[data-section]');
  if (!navItems.length) return;

  const sections = Array.from(navItems).map(item => {
    const id = item.dataset.section;
    return { item, el: document.getElementById(id) };
  }).filter(s => s.el);

  function updateActive() {
    const mid = window.scrollY + window.innerHeight * 0.4;
    let active = sections[0];
    for (const s of sections) {
      if (s.el.offsetTop <= mid) active = s;
    }
    navItems.forEach(i => i.classList.remove('is-active'));
    active.item.classList.add('is-active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();

// ─── Mobile slide-in nav: close via backdrop, close-btn and links ───
(function () {
  const nav = document.getElementById('siteNav');
  const menuBtn = document.getElementById('menuButton');
  const closeBtn = document.getElementById('siteNavClose');
  const backdrop = document.getElementById('siteNavBackdrop');
  if (!nav) return;

  function closeNav() {
    nav.classList.remove('open');
    if (menuBtn) {
      menuBtn.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }

  function openNav() {
    nav.classList.add('open');
    if (menuBtn) {
      menuBtn.classList.add('is-open');
      menuBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (backdrop) backdrop.addEventListener('click', closeNav);

  // Fechar ao clicar em qualquer link com data-close-nav
  nav.querySelectorAll('[data-close-nav]').forEach(el => {
    el.addEventListener('click', closeNav);
  });

  // Fechar com ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeNav();
  });
})();
