const storageKey = "ms-demo-state-v1";
const sidebarStateKey = "ms-sidebar-collapsed";

const passwordPolicy = {
  minLength: 8,
  maxLength: 72,
  maxLoginAttempts: 5,
  lockoutMinutes: 2,
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
    name: "Admin MS",
    email: "admin@ms.com",
    password: "Mserv@2026",
    role: "Super Admin",
    status: "Ativo",
  },
  supervisor: {
    name: "Carla Supervisor",
    email: "supervisor@ms.com",
    password: "Equipe@2026",
    role: "Supervisor",
    status: "Ativo",
  },
};

const appRoutePrefix = "painel";
const appRoutes = {
  dashboard: "dashboard",
  funcionarios: "employees",
  empreendimentos: "clients",
  eventos: "events",
  frequencia: "frequency",
  ponto: "timeclock",
  atestados: "certificates",
  calendario: "calendar",
  marcas: "brands",
  usuarios: "users",
};
const appViewRoutes = Object.fromEntries(
  Object.entries(appRoutes).map(([route, view]) => [view, route]),
);

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
  security: {
    loginAttempts: {},
  },
  employees: [
    {
      id: 1,
      name: "Ana Beatriz Lima",
      cpf: "123.456.789-10",
      phone: "(83) 98888-2101",
      role: "Auxiliar de limpeza",
      registration: "MS-001",
      client: "Condomínio Atlântico",
      status: "Ativo",
    },
    {
      id: 2,
      name: "Marcos Vinícius Rocha",
      cpf: "234.567.891-20",
      phone: "(83) 98888-2102",
      role: "Encarregado de equipe",
      registration: "MS-002",
      client: "Centro Empresarial Tambiá",
      status: "Ativo",
    },
    {
      id: 3,
      name: "Juliana Freitas Alves",
      cpf: "345.678.912-30",
      phone: "(83) 98888-2103",
      role: "Auxiliar de limpeza",
      registration: "MS-003",
      client: "Evento Expo Nordeste",
      status: "Atestado",
    },
    {
      id: 4,
      name: "Roberto Silva Santos",
      cpf: "456.789.123-40",
      phone: "(83) 98888-2104",
      role: "Auxiliar de limpeza",
      registration: "MS-004",
      client: "Condomínio Atlântico",
      status: "Férias",
    },
    {
      id: 5,
      name: "Patrícia Gomes Nunes",
      cpf: "567.891.234-50",
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
      name: "Condomínio Atlântico",
      type: "Condomínio",
      address: "Manaíra, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 12,
      coordinates: { lat: -7.1026, lng: -34.8333 },
    },
    {
      id: 2,
      name: "Centro Empresarial Tambiá",
      type: "Empresa",
      address: "Centro, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 8,
      coordinates: { lat: -7.1195, lng: -34.8829 },
    },
    {
      id: 3,
      name: "Evento Expo Nordeste",
      type: "Evento",
      address: "Centro de Convenções, João Pessoa - PB",
      manager: "Admin MS",
      activeEmployees: 18,
      coordinates: { lat: -7.1577, lng: -34.8056 },
    },
    {
      id: 4,
      name: "Hospital Empresarial Sul",
      type: "Empresa",
      address: "Bancários, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 4,
      coordinates: { lat: -7.1518, lng: -34.8409 },
    },
  ],
  brandSettings: {
    speed: 36,
  },
  brandLogos: [
    {
      id: 1,
      name: "Condomínio Atlântico",
      initials: "CA",
      logoUrl: "",
      website: "",
      color: "#006783",
      active: true,
      order: 1,
    },
    {
      id: 2,
      name: "Centro Empresarial Tambiá",
      initials: "CT",
      logoUrl: "",
      website: "",
      color: "#16a9d2",
      active: true,
      order: 2,
    },
    {
      id: 3,
      name: "Hospital Empresarial Sul",
      initials: "HS",
      logoUrl: "",
      website: "",
      color: "#2f8f83",
      active: true,
      order: 3,
    },
    {
      id: 4,
      name: "Expo Nordeste",
      initials: "EN",
      logoUrl: "",
      website: "",
      color: "#f2b531",
      active: true,
      order: 4,
    },
    {
      id: 5,
      name: "Residencial Cabo Branco",
      initials: "RC",
      logoUrl: "",
      website: "",
      color: "#34495e",
      active: true,
      order: 5,
    },
    {
      id: 6,
      name: "João Pessoa Business Center",
      initials: "JP",
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
      name: "Cobertura Expo Nordeste",
      client: "Evento Expo Nordeste",
      date: nextDate(1),
      type: "Seminário",
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
};

let state = ensureStateShape(loadState());
let activeUser = demoUsers.alexandre;
let calendarCursor = new Date();
let employeeFormMode = "create";
let editingEmployeeId = null;
let pendingDeleteEmployeeId = null;
let expandedFrequencyEmployeeId = null;

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
const checkinModal = document.querySelector("#checkinModal");

document.addEventListener("DOMContentLoaded", () => {
  saveState();
  setupPublicSite();
  setupLogin();
  setupAppNavigation();
  setupForms();
  setupPasswordRecovery();
  setupUserManagement();
  setupBrandManagement();
  renderAll();
});

function setupPublicSite() {
  const updateHeaderState = () => {
    document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateHeaderState);
  window.addEventListener("hashchange", () => setActiveSiteNavLink(window.location.hash));
  updateHeaderState();
  setupSiteNavObserver();
  setActiveSiteNavLink(window.location.hash);

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setActiveSiteNavLink(link.getAttribute("href"));
      siteNav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  document.querySelectorAll("[data-open-login]").forEach((button) => {
    button.addEventListener("click", () => openLogin());
  });

  document.querySelectorAll("[data-close-login]").forEach((button) => {
    button.addEventListener("click", () => closeLogin());
  });
}

function getSiteNavLinks() {
  return [...siteNav.querySelectorAll('.site-nav-links a[href^="#"]')];
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

  document.querySelectorAll(".app-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.hidden) return;
      navigateToAppView(button.dataset.view);
      closeMobileAppMenu();
    });
  });

  mobileFooterNav.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-view]");
    if (!button) return;
    navigateToAppView(button.dataset.view);
    closeMobileAppMenu();
  });

  sidebarCollapseButton.addEventListener("click", () => {
    const isCollapsed = !appShell.classList.contains("sidebar-collapsed");
    setSidebarCollapsed(isCollapsed);
    localStorage.setItem(sidebarStateKey, String(isCollapsed));
  });

  appMenuButton.addEventListener("click", () => {
    const isOpen = appShell.classList.contains("mobile-menu-open");
    setMobileAppMenuOpen(!isOpen);
  });

  appMenuOverlay.addEventListener("click", () => closeMobileAppMenu());

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileAppMenu();
  });

  window.matchMedia("(min-width: 781px)").addEventListener("change", (event) => {
    if (event.matches) closeMobileAppMenu();
  });

  window.addEventListener("hashchange", handleAppRouteChange);
  window.addEventListener("popstate", handleAppRouteChange);
  handleAppRouteChange();
}

function buildMobileFooterShortcuts() {
  const shortcutButtons = [...document.querySelectorAll(".app-nav button")]
    .filter((button) => !button.classList.contains("admin-only"))
    .slice(0, 4);

  mobileFooterNav.innerHTML = shortcutButtons
    .map((button) => {
      const icon = button.querySelector(".nav-icon")?.outerHTML || "";
      const label = button.dataset.shortLabel || button.dataset.label || button.textContent.trim();
      const view = button.dataset.view;

      return `
        <button type="button" data-view="${escapeHtml(view)}" aria-label="${escapeHtml(
          button.dataset.label || label,
        )}">
          ${icon}
          <span>${escapeHtml(label)}</span>
        </button>
      `;
    })
    .join("");
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
}

function setMobileAppMenuOpen(isOpen) {
  appShell.classList.toggle("mobile-menu-open", isOpen);
  appMenuOverlay.hidden = !isOpen;
  appMenuOverlay.setAttribute("aria-hidden", String(!isOpen));
  appMenuButton.setAttribute("aria-expanded", String(isOpen));
  appMenuButton.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu do sistema" : "Abrir menu do sistema",
  );
  document.body.classList.toggle("app-menu-open", isOpen);
}

function closeMobileAppMenu() {
  setMobileAppMenuOpen(false);
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
      setFormMessage("#brandLogoMessage", "Apenas Super Admin pode gerenciar marcas.", "error");
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
      setFormMessage("#brandLogoMessage", "Informe uma URL válida para a logomarca.", "error");
      return;
    }

    if (website === null) {
      setFormMessage("#brandLogoMessage", "Informe uma URL válida para o site do cliente.", "error");
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
    setFormMessage("#brandLogoMessage", "Marca adicionada ao carrossel.", "success");
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
      showToast("Marca movida para cima.");
    }

    if (button.dataset.brandAction === "down") {
      moveBrandLogo(brand.id, 1);
      showToast("Marca movida para baixo.");
    }

    if (button.dataset.brandAction === "toggle") {
      brand.active = !brand.active;
      showToast(brand.active ? "Marca ativada no site." : "Marca removida da vitrine pública.");
    }

    if (button.dataset.brandAction === "delete") {
      state.brandLogos = state.brandLogos.filter((item) => item.id !== brand.id);
      normalizeBrandOrders();
      showToast("Marca removida do carrossel.");
    }

    saveState();
    renderBrandShowcase();
    renderBrandAdmin();
  });
}

function setupForms() {
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

  document.querySelector("#employeeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const wasEditing = employeeFormMode === "edit";
    data.cpf = formatCpf(data.cpf);
    data.phone = formatPhone(data.phone);
    data.registration = data.registration || generateNextEmployeeRegistration();

    if (onlyDigits(data.cpf).length !== 11) {
      showToast("Informe um CPF com 11 dígitos.");
      return;
    }

    if (onlyDigits(data.phone).length < 10) {
      showToast("Informe um telefone com DDD.");
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
    showToast("Evento cadastrado.");
  });

  document.querySelector("#timeForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const employee = state.employees.find((item) => String(item.id) === data.employee);
    state.points.unshift({
      id: Date.now(),
      employee: employee.name,
      client: data.client,
      date: data.date,
      in: data.in,
      out: data.out,
      status: data.status,
      source: "Manual",
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
    checkinModal.close();
  });
  document.querySelector("#checkinCpf").addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
    clearFormMessage("#checkinMessage");
  });
  document.querySelector("#checkinForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    await registerQrCheckin();
  });
}

function openCheckinModal() {
  const now = new Date();
  document.querySelector("#checkinForm").reset();
  document.querySelector("#checkinQrTime").textContent = `Código ${now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  document.querySelector("#checkinGeoStatus").textContent =
    "Aguardando validação de CPF e localização.";
  clearFormMessage("#checkinMessage");
  checkinModal.showModal();
}

async function registerQrCheckin() {
  const cpf = document.querySelector("#checkinCpf").value;
  const employee = findEmployeeByCpf(cpf);

  if (!employee) {
    setFormMessage("#checkinMessage", "CPF não localizado no cadastro de funcionários.", "error");
    return;
  }

  if (employee.status !== "Ativo") {
    setFormMessage(
      "#checkinMessage",
      `Check-in bloqueado. Funcionário com status ${employee.status}.`,
      "error",
    );
    return;
  }

  const existingOpenPoint = state.points.find(
    (point) => point.employee === employee.name && point.date === today() && !point.out,
  );

  if (existingOpenPoint) {
    setFormMessage("#checkinMessage", "Já existe um check-in em aberto para hoje.", "error");
    return;
  }

  const client = state.clients.find((item) => item.name === employee.client);
  const clientCoordinates = getClientCoordinates(client);
  if (!clientCoordinates) {
    setFormMessage("#checkinMessage", "Local de trabalho sem coordenadas cadastradas.", "error");
    return;
  }

  document.querySelector("#checkinGeoStatus").textContent = "Capturando localização...";

  try {
    const devicePosition = await getCheckinPosition(clientCoordinates);
    const distance = Math.round(calculateDistanceMeters(devicePosition, clientCoordinates));

    if (distance > 100) {
      document.querySelector("#checkinGeoStatus").textContent = `Distância estimada: ${distance}m`;
      setFormMessage(
        "#checkinMessage",
        "Check-in não autorizado. Você está fora da área permitida para registro de ponto.",
        "error",
      );
      return;
    }

    state.points.unshift({
      id: Date.now(),
      employee: employee.name,
      client: employee.client,
      date: today(),
      in: currentTime(),
      out: "",
      status: "Ponto normal",
      source: "QR Code",
      distance,
      location: devicePosition,
      createdAt: nowIso(),
    });

    saveState();
    renderAll();
    document.querySelector("#checkinGeoStatus").textContent = `Check-in autorizado a ${distance}m`;
    setFormMessage("#checkinMessage", "Check-in registrado com sucesso.", "success");
    setTimeout(() => {
      if (checkinModal.open) checkinModal.close();
    }, 900);
  } catch (error) {
    document.querySelector("#checkinGeoStatus").textContent = "Localização não validada.";
    setFormMessage(
      "#checkinMessage",
      error.message || "Não foi possível validar a localização do dispositivo.",
      "error",
    );
  }
}

function getCheckinPosition(clientCoordinates) {
  if (document.querySelector("#checkinDemoLocation").checked) {
    return Promise.resolve({
      lat: clientCoordinates.lat,
      lng: clientCoordinates.lng,
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
        });
      },
      () => {
        reject(new Error("Permita o acesso à localização para registrar o check-in."));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
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

function findEmployeeByCpf(cpf) {
  const digits = onlyDigits(cpf);
  return state.employees.find((employee) => onlyDigits(employee.cpf) === digits);
}

function getClientCoordinates(client) {
  if (client?.coordinates) return client.coordinates;

  const seededClient = initialState.clients.find((item) => item.name === client?.name);
  return seededClient?.coordinates || null;
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

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);

  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return digits.replace(/^(\d{2})(\d+)/, "($1) $2");
  if (digits.length <= 10) {
    return digits.replace(/^(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  }

  return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
}

function generateNextEmployeeRegistration() {
  const highestNumber = state.employees.reduce((highest, employee) => {
    const match = String(employee.registration || "").match(/^MS-(\d+)$/i);
    if (!match) return highest;
    return Math.max(highest, Number(match[1]));
  }, 0);

  return `MS-${String(highestNumber + 1).padStart(3, "0")}`;
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
  renderFrequency();
  renderCertificates();
  renderCalendar();
  renderUsers();
  renderMailbox();
}

function renderDashboard() {
  const activeCount = state.employees.filter((employee) => employee.status === "Ativo").length;
  const unavailableEmployees = state.employees.filter((employee) => employee.status !== "Ativo");
  const absentCount = unavailableEmployees.length;
  const weekEvents = state.events.filter((event) => daysFromToday(event.date) <= 7).length;

  document.querySelector("#dashboardCards").innerHTML = [
    card("Funcionários ativos", activeCount, "Equipe disponível"),
    card("Indisponíveis", absentCount, "Status diferente de ativo"),
    card("Atestados", state.certificates.length, "Registros no sistema"),
    card("Eventos da semana", weekEvents, "Demandas programadas"),
  ].join("");

  document.querySelector("#statusBoard").innerHTML = unavailableEmployees.length
    ? unavailableEmployees
        .map(
          (employee) => `
            <article class="status-row">
              <div>
                <strong>${escapeHtml(employee.name)}</strong>
                <small>${escapeHtml(employee.role)} · ${escapeHtml(employee.client)}</small>
              </div>
              <span class="badge ${escapeHtml(employee.status)}">${escapeHtml(employee.status)}</span>
            </article>
          `,
        )
        .join("")
    : `<article class="empty-state">Todos os funcionários estão ativos.</article>`;

  document.querySelector("#dashboardEvents").innerHTML = state.events
    .slice(0, 4)
    .map(
      (event) => `
        <article class="list-item">
          <div>
            <strong>${event.name}</strong>
            <small>${formatDate(event.date)} · ${event.client}</small>
          </div>
          <span class="badge">${event.team.length} pessoas</span>
        </article>
      `,
    )
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
          <td>
            <strong>${escapeHtml(employee.name)}</strong><br>
            <small>${escapeHtml(employee.cpf)} · ${escapeHtml(employee.registration)}</small>
          </td>
          <td>${escapeHtml(employee.role)}</td>
          <td>${escapeHtml(employee.client)}</td>
          <td><span class="badge ${escapeHtml(employee.status)}">${escapeHtml(employee.status)}</span></td>
          <td>${escapeHtml(employee.phone)}</td>
          <td>
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
      (client) => `
        <article class="client-card">
          <h3>${client.name}</h3>
          <p>${client.type} · ${client.address}</p>
          <dl>
            <div><dt>Supervisor</dt><dd>${client.manager}</dd></div>
            <div><dt>Equipe ativa</dt><dd>${client.activeEmployees}</dd></div>
          </dl>
        </article>
      `,
    )
    .join("");
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
        Nenhuma marca ativa no momento.
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
        <img src="${escapeHtml(brand.logoUrl)}" alt="Logo ${name}" loading="lazy" />
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

  document.querySelector("#brandLogoCount").textContent = `${orderedBrands.length} marcas`;

  if (!orderedBrands.length) {
    brandTable.innerHTML = `
      <tr>
        <td colspan="5">Nenhuma marca cadastrada.</td>
      </tr>
    `;
  } else {
    brandTable.innerHTML = orderedBrands
      .map(
        (brand, index) => `
          <tr>
            <td><strong>${index + 1}</strong></td>
            <td>
              <div class="brand-table-logo">
                ${renderBrandVisual(brand)}
                <div>
                  <strong>${escapeHtml(brand.name)}</strong>
                  <small>${brand.logoUrl ? "Logomarca por imagem" : "Marca textual provisória"}</small>
                </div>
              </div>
            </td>
            <td>
              ${
                brand.website
                  ? `<a class="inline-link" href="${escapeHtml(
                      brand.website,
                    )}" target="_blank" rel="noopener">Abrir site</a>`
                  : `<span class="muted-text">Sem link</span>`
              }
            </td>
            <td>
              <span class="badge ${brand.active ? "active" : "danger"}">
                ${brand.active ? "Ativa" : "Inativa"}
              </span>
            </td>
            <td>
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
      : `<article class="empty-state">Ative pelo menos uma marca para exibir no site.</article>`;
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

function renderTimeList() {
  document.querySelector("#timeList").innerHTML = state.points
    .map(
      (point) => `
        <article class="list-item">
          <div>
            <strong>${escapeHtml(point.employee)}</strong>
            <small>${formatDate(point.date)} · ${escapeHtml(point.in)} às ${escapeHtml(
              point.out || "em aberto",
            )}</small>
          </div>
          <span class="badge ${point.status === "Ponto normal" ? "active" : "warning"}">
            ${escapeHtml(point.status)}
          </span>
        </article>
      `,
    )
    .join("");
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
              <td>
                <strong>${escapeHtml(record.employee.name)}</strong><br>
                <small>${escapeHtml(record.employee.cpf)} · ${escapeHtml(record.employee.role)}</small>
              </td>
              <td>${escapeHtml(record.employee.client)}</td>
              <td>
                <span class="presence-status ${record.statusKey}">
                  <i></i>${escapeHtml(record.statusLabel)}
                </span>
              </td>
              <td>${record.periodPoints.length}</td>
              <td>${renderLatestFrequencyPoint(record.latestPoint)}</td>
              <td>
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

    return `
      <article class="calendar-day ${activities.length ? "has-activity" : ""} ${
        dateKey === todayKey ? "today" : ""
      } ${activityClasses}">
        <div class="calendar-day-head">
          <strong>${dayNumberInMonth}</strong>
          ${activities.length ? `<span>${activities.length}</span>` : ""}
        </div>
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
      </article>
    `;
  }).join("");

  document.querySelector("#calendarGrid").innerHTML = header + cells;
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
      label: "Evento",
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
          <td>
            <strong>${escapeHtml(user.name)}</strong><br>
            <small>${escapeHtml(user.email)}</small>
          </td>
          <td>${escapeHtml(user.role)}</td>
          <td><span class="badge ${user.status === "Ativo" ? "active" : "danger"}">${
            user.status
          }</span></td>
          <td>${user.lastLoginAt ? formatDateTime(user.lastLoginAt) : "Nunca acessou"}</td>
          <td>
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
    navigateToAppView("dashboard", { replace: true });
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
    .map((client) => `<option value="${client.name}">${client.name}</option>`)
    .join("");
  const employeeOptions = state.employees
    .map((employee) => `<option value="${employee.id}">${employee.name}</option>`)
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
  nextState.security = savedState.security || { loginAttempts: {} };
  nextState.security.loginAttempts = nextState.security.loginAttempts || {};
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

  nextState.clients.forEach((client) => {
    const seededClient = initialState.clients.find((item) => item.name === client.name);
    if (seededClient?.coordinates && !client.coordinates) {
      client.coordinates = structuredClone(seededClient.coordinates);
    }
  });

  return nextState;
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
    subject: "Bem-vindo ao painel Multi Serv",
    token: "",
    createdAt: nowIso(),
    preview: `Usuário criado com perfil ${user.role}. Senha temporária: ${temporaryPassword}.`,
  });
}

function generateResetToken() {
  const random = crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(0, 6);
  return `MS-${random.padStart(6, "0")}`;
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
