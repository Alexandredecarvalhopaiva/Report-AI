const storageKey = "ms-demo-state-v1";

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
    },
    {
      id: 2,
      name: "Centro Empresarial Tambiá",
      type: "Empresa",
      address: "Centro, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 8,
    },
    {
      id: 3,
      name: "Evento Expo Nordeste",
      type: "Evento",
      address: "Centro de Convenções, João Pessoa - PB",
      manager: "Admin MS",
      activeEmployees: 18,
    },
    {
      id: 4,
      name: "Hospital Empresarial Sul",
      type: "Empresa",
      address: "Bancários, João Pessoa - PB",
      manager: "Carla Supervisor",
      activeEmployees: 4,
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

const publicSite = document.querySelector("#publicSite");
const loginScreen = document.querySelector("#loginScreen");
const appShell = document.querySelector("#appShell");
const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");
const loginForm = document.querySelector("#loginForm");
const employeeModal = document.querySelector("#employeeModal");

document.addEventListener("DOMContentLoaded", () => {
  saveState();
  setupPublicSite();
  setupLogin();
  setupAppNavigation();
  setupForms();
  setupPasswordRecovery();
  setupUserManagement();
  renderAll();
});

function setupPublicSite() {
  window.addEventListener("scroll", () => {
    document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 30);
  });

  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
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

function setupLogin() {
  document.querySelectorAll("[data-demo-user]").forEach((button) => {
    button.addEventListener("click", () => {
      const demoUser = demoUsers[button.dataset.demoUser];
      const user = findUserByEmail(demoUser.email) || demoUser;
      document.querySelector("#loginEmail").value = user.email;
      document.querySelector("#loginPassword").value = user.password;
      clearFormMessage("#loginMessage");
    });
  });

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = normalizeEmail(document.querySelector("#loginEmail").value);
    const password = document.querySelector("#loginPassword").value;
    const user = findUserByEmail(email);

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
  });
}

function setupAppNavigation() {
  document.querySelectorAll(".app-nav button").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.hidden) return;
      const view = button.dataset.view;
      document.querySelectorAll(".app-nav button").forEach((item) => item.classList.remove("active"));
      document.querySelectorAll(".app-view").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.querySelector(`[data-panel="${view}"]`).classList.add("active");
      document.querySelector("#viewTitle").textContent = button.textContent;
    });
  });
}

function setupPasswordRecovery() {
  const forgotButton = document.querySelector("#forgotPasswordButton");
  const backButton = document.querySelector("#backToLoginButton");
  const resetRequestForm = document.querySelector("#resetRequestForm");
  const resetPasswordForm = document.querySelector("#resetPasswordForm");
  const resetNewPassword = document.querySelector("#resetNewPassword");
  const resetOwnerEmail = document.querySelector("#resetOwnerEmail");
  const resetToken = document.querySelector("#resetToken");

  forgotButton.addEventListener("click", () => {
    showResetRequest();
    document.querySelector("#resetEmail").value = document.querySelector("#loginEmail").value;
  });

  backButton.addEventListener("click", () => {
    showLoginForm();
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
      showResetEmailPreview(emailRecord);
      resetOwnerEmail.value = user.email;
      resetToken.value = emailRecord.token;
      showResetPasswordForm();
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

function setupForms() {
  document.querySelector("#openEmployeeForm").addEventListener("click", () => {
    employeeModal.showModal();
  });

  document.querySelector("#closeEmployeeForm").addEventListener("click", () => {
    employeeModal.close();
  });

  document.querySelector("#employeeSearch").addEventListener("input", renderEmployees);
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
    const data = Object.fromEntries(new FormData(event.currentTarget));
    state.employees.unshift({
      id: Date.now(),
      ...data,
    });
    saveState();
    event.currentTarget.reset();
    employeeModal.close();
    renderAll();
    showToast("Funcionário cadastrado com sucesso.");
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
  updateAccessControl();
  renderAll();
}

function renderAll() {
  populateSelects();
  updateAccessControl();
  renderDashboard();
  renderEmployees();
  renderClients();
  renderEvents();
  renderTimeList();
  renderCertificates();
  renderCalendar();
  renderUsers();
  renderMailbox();
}

function renderDashboard() {
  const activeCount = state.employees.filter((employee) => employee.status === "Ativo").length;
  const absentCount = state.employees.filter((employee) =>
    ["Atestado", "Férias", "Afastado"].includes(employee.status),
  ).length;
  const weekEvents = state.events.filter((event) => daysFromToday(event.date) <= 7).length;

  document.querySelector("#dashboardCards").innerHTML = [
    card("Funcionários ativos", activeCount, "Equipe disponível"),
    card("Ausentes hoje", absentCount, "Atestado, férias ou afastamento"),
    card("Atestados", state.certificates.length, "Registros no sistema"),
    card("Eventos da semana", weekEvents, "Demandas programadas"),
  ].join("");

  document.querySelector("#statusBoard").innerHTML = state.employees
    .slice(0, 5)
    .map(
      (employee) => `
        <article class="status-row">
          <div>
            <strong>${employee.name}</strong>
            <small>${employee.role} · ${employee.client}</small>
          </div>
          <span class="badge ${employee.status}">${employee.status}</span>
        </article>
      `,
    )
    .join("");

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
    return [employee.name, employee.cpf, employee.role, employee.client, employee.status]
      .join(" ")
      .toLowerCase()
      .includes(search);
  });

  document.querySelector("#employeeTable").innerHTML = employees
    .map(
      (employee) => `
        <tr>
          <td><strong>${employee.name}</strong><br><small>${employee.cpf}</small></td>
          <td>${employee.role}</td>
          <td>${employee.client}</td>
          <td><span class="badge ${employee.status}">${employee.status}</span></td>
          <td>${employee.phone}</td>
        </tr>
      `,
    )
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
            <strong>${point.employee}</strong>
            <small>${formatDate(point.date)} · ${point.in} às ${point.out || "em aberto"}</small>
          </div>
          <span class="badge ${point.status === "Ponto normal" ? "active" : "warning"}">
            ${point.status}
          </span>
        </article>
      `,
    )
    .join("");
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

  if (!isSuperAdmin() && document.querySelector('[data-panel="users"]')?.classList.contains("active")) {
    document.querySelector('[data-view="dashboard"]').click();
  }
}

function showLoginForm() {
  document.querySelector("#loginForm").hidden = false;
  document.querySelector(".demo-users").hidden = false;
  document.querySelector(".login-actions").hidden = false;
  document.querySelector("#resetRequestForm").hidden = true;
  document.querySelector("#resetPasswordForm").hidden = true;
  document.querySelector("#resetEmailPreview").hidden = true;
  clearFormMessage("#loginMessage");
}

function showResetRequest() {
  document.querySelector("#loginForm").hidden = true;
  document.querySelector(".demo-users").hidden = true;
  document.querySelector(".login-actions").hidden = true;
  document.querySelector("#resetRequestForm").hidden = false;
  document.querySelector("#resetPasswordForm").hidden = true;
  document.querySelector("#resetEmailPreview").hidden = true;
  clearFormMessage("#resetRequestMessage");
}

function showResetPasswordForm() {
  document.querySelector("#loginForm").hidden = true;
  document.querySelector(".demo-users").hidden = true;
  document.querySelector(".login-actions").hidden = true;
  document.querySelector("#resetRequestForm").hidden = false;
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
  const token = decodeURIComponent(window.location.hash.replace("#reset-", "")).toUpperCase();
  if (!token || token === window.location.hash.toUpperCase()) return;

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
  const clientOptions = state.clients
    .map((client) => `<option value="${client.name}">${client.name}</option>`)
    .join("");
  const employeeOptions = state.employees
    .map((employee) => `<option value="${employee.id}">${employee.name}</option>`)
    .join("");
  const eventOptions = state.events
    .map((event) => `<option value="${event.id}">${event.name}</option>`)
    .join("");

  ["#eventClient", "#timeClient", "#employeeClient"].forEach((selector) => {
    document.querySelector(selector).innerHTML = clientOptions;
  });

  ["#timeEmployee", "#certificateEmployee"].forEach((selector) => {
    document.querySelector(selector).innerHTML = employeeOptions;
  });

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

  initialUsers.forEach((seedUser) => {
    const existingUser = nextState.users.find((user) => user.email === seedUser.email);
    if (!existingUser) {
      nextState.users.push(structuredClone(seedUser));
      return;
    }
    existingUser.role = existingUser.role || seedUser.role;
    existingUser.status = existingUser.status || "Ativo";
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
