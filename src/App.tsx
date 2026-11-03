import { useMemo, useState } from "react"

type Page = "login" | "matrix" | "calendar" | "stats" | "projects" | "done" | "settings"
type IconName = "grid" | "calendar" | "chart" | "folder" | "check" | "settings" | "search" | "sun" | "moon" | "plus" | "bell" | "clock" | "paperclip" | "chevron" | "arrow" | "tag" | "trash" | "close" | "menu" | "user" | "filter" | "more" | "repeat" | "file" | "eye" | "lock" | "mail" | "undo" | "list"

const paths: Record<IconName, React.ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <rect x="14" y="14" width="7" height="7" rx="2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" />
    </>
  ),
  folder: (
    <>
      <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h4l2 2H19a2 2 0 0 1 2 2v9.5A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4 4L19 6" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.09A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3V9.6h.09A1.7 1.7 0 0 0 4.6 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.09A1.7 1.7 0 0 0 15.5 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.13.37.35.7.65.96.3.25.68.4 1.07.43H21v4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" />
    </>
  ),
  moon: <path d="M20.7 15.1A8.5 8.5 0 0 1 8.9 3.3 8.5 8.5 0 1 0 20.7 15.1Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  paperclip: (
    <path d="m20.5 11.5-8.4 8.4a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5" />
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  arrow: <path d="m15 18-6-6 6-6" />,
  tag: (
    <>
      <path d="M20 13 13 20 4 11V4h7z" />
      <circle cx="8.5" cy="8.5" r="1" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V3h8v3M6 6l1 15h10l1-15" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  filter: <path d="M4 5h16l-6 7v6l-4 2v-8z" />,
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  repeat: (
    <>
      <path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3" />
    </>
  ),
  file: (
    <>
      <path d="M6 2h8l4 4v16H6z" />
      <path d="M14 2v5h5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  undo: (
    <>
      <path d="m9 14-4-4 4-4" />
      <path d="M5 10h9a5 5 0 0 1 5 5v2" />
    </>
  ),
  list: (
    <>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <circle cx="4" cy="6" r="1" />
      <circle cx="4" cy="12" r="1" />
      <circle cx="4" cy="18" r="1" />
    </>
  ),
}

function Icon({ name, size = 18 }: { name: IconName, size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="logo">
      <span className="choco-icon">
        {[0, 1, 2, 3].map((i) => (
          <i key={i} />
        ))}
      </span>
      {!compact && <strong>Шоколадка</strong>}
    </div>
  )
}

const nav: { id: Page, label: string, icon: IconName }[] = [
  { id: "matrix", label: "Матрица", icon: "grid" },
  { id: "calendar", label: "Календарь", icon: "calendar" },
  { id: "stats", label: "Статистика", icon: "chart" },
  { id: "projects", label: "Проекты", icon: "folder" },
  { id: "done", label: "Выполненные", icon: "check" },
  { id: "settings", label: "Настройки", icon: "settings" },
]

function Button({
  children,
  kind = "primary",
  icon,
  onClick,
  disabled,
  className = "",
}: {
  children?: React.ReactNode
  kind?: "primary" | "secondary" | "ghost" | "danger"
  icon?: IconName
  onClick?: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      className={`btn ${kind} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <Icon name={icon} />} {children}
    </button>
  )
}

const allTasks = [
  {
    title: "Подготовить презентацию",
    tag: "#работа",
    due: "Сегодня",
    attach: 2,
    q: "a",
  },
  { title: "Оплатить интернет", tag: "#личное", due: "18:00", q: "a" },
  { title: "Записаться к врачу", tag: "#здоровье", due: "Завтра", q: "a" },
  { title: "Курс по типографике", tag: "#учёба", due: "25 мая", q: "b" },
  {
    title: "Продумать отпуск",
    tag: "#личное",
    due: "1 июня",
    attach: 1,
    q: "b",
  },
  { title: "Обновить портфолио", tag: "#развитие", due: "30 мая", q: "b" },
  { title: "Ответить на письма", tag: "#работа", due: "Сегодня", q: "c" },
  { title: "Заказать продукты", tag: "#дом", due: "19:00", q: "c" },
  {
    title: "Разобрать фотографии",
    tag: "#личное",
    due: "Когда-нибудь",
    q: "d",
  },
  { title: "Посмотреть лекцию", tag: "#учёба", due: "Без срока", q: "d" },
]

function TaskCard({
  task,
  selected,
  onClick,
  draggable,
}: {
  task: typeof allTasks[number]
  selected?: boolean
  onClick?: () => void
  draggable?: boolean
}) {
  return (
    <button
      className={`task-card ${selected ? "selected" : ""} ${
        draggable ? "drag-card" : ""
      }`}
      onClick={onClick}
    >
      <span className="checkbox" onClick={(e) => e.stopPropagation()} />
      <span className="task-body">
        <strong>{task.title}</strong>
        <span className="task-meta">
          <span className="tag-pill">{task.tag}</span>
          <span>
            <Icon name="clock" size={13} />
            {task.due}
          </span>
          {task.attach && (
            <span>
              <Icon name="paperclip" size={13} />
              {task.attach}
            </span>
          )}
        </span>
      </span>
      <span className={`priority p-${task.q}`} />
    </button>
  )
}

function Login({
  onLogin,
  dark,
  toggleTheme,
}: {
  onLogin: () => void
  dark: boolean
  toggleTheme: () => void
}) {
  const [register, setRegister] = useState(false)
  return (
    <main className="login-screen">
      <button
        className="theme-float"
        onClick={toggleTheme}
        aria-label="Сменить тему"
      >
        <Icon name={dark ? "sun" : "moon"} />
      </button>
      <div className="pattern" />
      <section className="login-card">
        <Logo />
        <div className="login-copy">
          <h1>{register ? "Создать аккаунт" : "С возвращением"}</h1>
          <p>
            {register
              ? "Начните управлять задачами спокойно"
              : "Войдите, чтобы продолжить работу"}
          </p>
        </div>
        <label className="field-label">
          Логин
          <div className="input-wrap">
            <Icon name="user" />
            <input
              defaultValue={register ? "" : "maria"}
              placeholder="Ваш логин"
            />
          </div>
        </label>
        {register && (
          <label className="field-label">
            E-mail
            <div className="input-wrap">
              <Icon name="mail" />
              <input placeholder="name@example.com" />
            </div>
          </label>
        )}
        <label className="field-label">
          Пароль
          <div className="input-wrap">
            <Icon name="lock" />
            <input
              type="password"
              defaultValue={register ? "" : "chocolate"}
              placeholder="Не менее 8 символов"
            />
            <Icon name="eye" />
          </div>
        </label>
        <Button onClick={onLogin} className="login-submit">
          {register ? "Зарегистрироваться" : "Войти"}
        </Button>
        <div className="login-switch">
          {register ? "Уже есть аккаунт?" : "Впервые здесь?"}{" "}
          <button onClick={() => setRegister(!register)}>
            {register ? "Войти" : "Зарегистрироваться"}
          </button>
        </div>
        <p className="demo-note">
          Прототип · данные сохраняются только в этом сеансе
        </p>
      </section>
    </main>
  )
}

function Header({
  dark,
  toggleTheme,
  openTask,
  openMenu,
}: {
  dark: boolean
  toggleTheme: () => void
  openTask: () => void
  openMenu: () => void
}) {
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={openMenu}>
        <Icon name="menu" />
      </button>
      <div className="top-logo">
        <Logo />
      </div>
      <label className="search">
        <Icon name="search" />
        <input placeholder="Найти задачу..." />
        <kbd>⌘ K</kbd>
      </label>
      <div className="top-actions">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label="Сменить тему"
        >
          <Icon name={dark ? "sun" : "moon"} />
        </button>
        <button className="icon-btn has-dot">
          <Icon name="bell" />
        </button>
        <div className="avatar">МК</div>
        <Button icon="plus" onClick={openTask}>
          Задача
        </Button>
      </div>
    </header>
  )
}

function Sidebar({
  page,
  setPage,
  open,
  close,
}: {
  page: Page
  setPage: (p: Page) => void
  open: boolean
  close: () => void
}) {
  return (
    <>
      {open && <button className="scrim" onClick={close} />}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="mobile-side-head">
          <Logo />
          <button className="icon-btn" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <nav>
          {nav.map((n) => (
            <button
              key={n.id}
              className={page === n.id ? "active" : ""}
              onClick={() => {
                setPage(n.id)
                close()
              }}
            >
              <Icon name={n.icon} />
              <span>{n.label}</span>
              {n.id === "done" && <em>12</em>}
            </button>
          ))}
        </nav>
        <div className="side-divider" />
        <div className="categories">
          <div className="side-heading">
            <span>Категории</span>
            <button>
              <Icon name="plus" size={15} />
            </button>
          </div>
          <div className="cat">
            <span className="cat-arrow">⌄</span>
            <Icon name="folder" size={16} />
            <b>Мои проекты</b>
          </div>
          <button className="project-link">
            <i className="dot blue" />
            Учёба <span>6</span>
          </button>
          <button className="project-link">
            <i className="dot brown" />
            Работа <span>9</span>
          </button>
          <button className="project-link">
            <i className="dot green" />
            Личное <span>4</span>
          </button>
        </div>
        <div className="side-profile">
          <div className="avatar">МК</div>
          <div>
            <strong>Мария К.</strong>
            <span>maria@example.com</span>
          </div>
          <Icon name="more" />
        </div>
      </aside>
    </>
  )
}

function BottomNav({
  page,
  setPage,
}: {
  page: Page
  setPage: (p: Page) => void
}) {
  const items = nav.filter((n) =>
    ["matrix", "calendar", "stats", "settings"].includes(n.id),
  )
  return (
    <nav className="bottom-nav">
      {items.map((n) => (
        <button
          key={n.id}
          className={page === n.id ? "active" : ""}
          onClick={() => setPage(n.id)}
        >
          <Icon name={n.icon} />
          <span>{n.id === "settings" ? "Профиль" : n.label}</span>
        </button>
      ))}
    </nav>
  )
}

function PageHead({
  eyebrow,
  title,
  subtitle,
  action,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  action?: React.ReactNode
}) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {action && <div className="head-action">{action}</div>}
    </div>
  )
}

const quadrants = [
  {
    key: "a",
    letter: "A",
    title: "Важно и срочно",
    hint: "Сделать сейчас",
    color: "#B4553E",
  },
  {
    key: "b",
    letter: "B",
    title: "Важно, но не срочно",
    hint: "Запланировать",
    color: "#7A9E7E",
  },
  {
    key: "c",
    letter: "C",
    title: "Не важно, но срочно",
    hint: "Делегировать",
    color: "#D9A441",
  },
  {
    key: "d",
    letter: "D",
    title: "Не важно и не срочно",
    hint: "Отложить",
    color: "#9C948C",
  },
]

function MatrixPage({ openTask }: { openTask: () => void }) {
  const [selected, setSelected] = useState(0)
  const [compact, setCompact] = useState(false)
  return (
    <div className="matrix-page">
      <PageHead
        eyebrow="Понедельник, 20 мая"
        title="Доброе утро, Мария"
        subtitle="Сегодня у вас 4 важные задачи"
      />
      <div className="mobile-matrix-tools">
        <Button kind="secondary" icon="filter">
          Фильтр
        </Button>
        <Button kind="ghost" icon="list" onClick={() => setCompact(!compact)}>
          {compact ? "Развернуть" : "Свернуть всё"}
        </Button>
      </div>
      <div className="matrix-layout">
        <section className={`matrix-grid ${compact ? "compact" : ""}`}>
          {quadrants.map((q) => {
            const tasks = allTasks.filter((t) => t.q === q.key)
            return (
              <article className={`quadrant q-${q.key}`} key={q.key}>
                <div className="quadrant-head">
                  <span className="q-letter" style={{ background: q.color }}>
                    {q.letter}
                  </span>
                  <div>
                    <h2>{q.title}</h2>
                    <p>{q.hint}</p>
                  </div>
                  <span className="count">{tasks.length}</span>
                  <button className="q-add" onClick={openTask}>
                    <Icon name="plus" size={17} />
                  </button>
                </div>
                <div className="tasks">
                  {tasks.map((task, i) => (
                    <TaskCard
                      key={task.title}
                      task={task}
                      draggable={q.key === "b" && i === 0}
                      selected={allTasks.indexOf(task) === selected}
                      onClick={() => setSelected(allTasks.indexOf(task))}
                    />
                  ))}
                </div>
              </article>
            )
          })}
        </section>
        <aside className="quick-view">
          <div className="quick-head">
            <span>Быстрый просмотр</span>
            <button>
              <Icon name="close" size={17} />
            </button>
          </div>
          <div className="quick-content">
            <span className="q-chip">A · Важно и срочно</span>
            <h2>{allTasks[selected].title}</h2>
            <p>
              Собрать ключевые результаты за квартал и подготовить понятные
              слайды для команды.
            </p>
            <div className="quick-row">
              <span>
                <Icon name="calendar" />
                Дедлайн
              </span>
              <b>Сегодня, 18:00</b>
            </div>
            <div className="quick-row">
              <span>
                <Icon name="folder" />
                Проект
              </span>
              <b>
                <i className="dot brown" />
                Работа
              </b>
            </div>
            <div className="quick-row">
              <span>
                <Icon name="tag" />
                Теги
              </span>
              <b className="tag-pill">{allTasks[selected].tag}</b>
            </div>
            <div className="quick-note">
              <strong>Заметка</strong>
              <p>Проверить цифры в финальном слайде и добавить выводы.</p>
            </div>
            <Button kind="secondary" onClick={openTask}>
              Открыть задачу
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}

const monthDays = Array.from({ length: 35 }, (_, i) => i - 2)
function CalendarPage({ openTask }: { openTask: () => void }) {
  const [view, setView] = useState<"День" | "Неделя" | "Месяц">("Месяц")
  const [day, setDay] = useState(20)
  const week = [
    "Пн, 20",
    "Вт, 21",
    "Ср, 22",
    "Чт, 23",
    "Пт, 24",
    "Сб, 25",
    "Вс, 26",
  ]
  return (
    <div>
      <PageHead
        title="Календарь"
        subtitle="Планируйте спокойно и без перегрузки"
        action={
          <Button icon="plus" onClick={openTask}>
            Задача
          </Button>
        }
      />
      <div className="calendar-toolbar">
        <div className="segmented">
          {(["День", "Неделя", "Месяц"] as const).map((v) => (
            <button
              className={view === v ? "active" : ""}
              onClick={() => setView(v)}
              key={v}
            >
              {v}
            </button>
          ))}
        </div>
        <div className="date-nav">
          <button>
            <Icon name="arrow" />
          </button>
          <button className="today">Сегодня</button>
          <button className="next">
            <Icon name="arrow" />
          </button>
          <h2>
            {view === "День"
              ? "20 мая 2025"
              : view === "Неделя"
                ? "20–26 мая 2025"
                : "Май 2025"}
          </h2>
        </div>
      </div>
      <div className="calendar-layout">
        <section className="calendar-main">
          {view === "Месяц" && (
            <div className="month-grid">
              {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((d) => (
                <div className="weekday" key={d}>
                  {d}
                </div>
              ))}
              {monthDays.map((d, i) => {
                const n = d < 1 ? 30 + d : d
                const muted = d < 1 || d > 31
                return (
                  <button
                    className={`day-cell ${
                      n === day && !muted ? "active" : ""
                    } ${muted ? "muted" : ""}`}
                    key={i}
                    onClick={() => !muted && setDay(n)}
                  >
                    <span>{n}</span>
                    {!muted && [3, 7, 12, 20, 22, 27, 29].includes(n) && (
                      <>
                        <i className="event a">Презентация</i>
                        {[12, 20, 27].includes(n) && (
                          <i className="event b">Курс</i>
                        )}
                      </>
                    )}
                    {n === 15 && !muted && (
                      <i className="event c span-event">Отпуск</i>
                    )}
                  </button>
                )
              })}
            </div>
          )}
          {view === "Неделя" && (
            <div className="week-grid">
              {week.map((d, i) => (
                <div className="week-col" key={d}>
                  <h3 className={i === 0 ? "today-label" : ""}>{d}</h3>
                  {allTasks.slice(i, i + (i < 3 ? 3 : 1)).map((t) => (
                    <div className={`week-task q-${t.q}`} key={t.title}>
                      <span>{t.title}</span>
                      <small>{t.due}</small>
                    </div>
                  ))}
                  <button className="day-add">
                    <Icon name="plus" />
                    Добавить
                  </button>
                </div>
              ))}
            </div>
          )}
          {view === "День" && (
            <div className="day-list">
              <div className="day-summary">
                <div>
                  <b>4</b>
                  <span>задачи</span>
                </div>
                <div>
                  <b>1</b>
                  <span>выполнена</span>
                </div>
                <div>
                  <b>2ч 30м</b>
                  <span>в фокусе</span>
                </div>
              </div>
              {allTasks.slice(0, 5).map((t, i) => (
                <div className="timed-task" key={t.title}>
                  <time>
                    {i === 0
                      ? "09:30"
                      : i === 1
                        ? "12:00"
                        : i === 2
                          ? "15:30"
                          : "—"}
                  </time>
                  <TaskCard task={t} />
                </div>
              ))}
              <Button kind="secondary" icon="plus" onClick={openTask}>
                Добавить задачу
              </Button>
            </div>
          )}
        </section>
        <aside className="calendar-aside">
          <div className="aside-card">
            <h3>Задачи на {day} мая</h3>
            {day === 20 ? (
              allTasks
                .slice(0, 3)
                .map((t) => <TaskCard task={t} key={t.title} />)
            ) : (
              <div className="empty-mini">
                <Icon name="calendar" />
                <p>На этот день задач нет</p>
              </div>
            )}
          </div>
          <div className="aside-card legend">
            <h3>Легенда квадрантов</h3>
            {quadrants.map((q) => (
              <span key={q.key}>
                <i style={{ background: q.color }} />
                {q.title}
              </span>
            ))}
          </div>
          <div className="aside-card">
            <h3>Фильтры</h3>
            <label>
              Проект
              <select>
                <option>Все проекты</option>
                <option>Работа</option>
                <option>Учёба</option>
              </select>
            </label>
            <label>
              Тег
              <select>
                <option>Все теги</option>
                <option>#важное</option>
              </select>
            </label>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Donut({ type }: { type: "projects" | "quadrants" }) {
  return (
    <div className={`donut ${type}`}>
      <div>
        <strong>{type === "projects" ? "24" : "18"}</strong>
        <span>задачи</span>
      </div>
    </div>
  )
}

function StatsPage() {
  const [range, setRange] = useState("Неделя")
  return (
    <div>
      <PageHead
        title="Статистика"
        subtitle="Ваш прогресс в спокойном темпе"
        action={
          <div className="segmented">
            {["Неделя", "Месяц", "Год"].map((x) => (
              <button
                className={range === x ? "active" : ""}
                onClick={() => setRange(x)}
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        }
      />
      <section className="metric-grid">
        <div className="metric">
          <span className="metric-icon brown">
            <Icon name="list" />
          </span>
          <div>
            <p>Всего задач</p>
            <strong>24</strong>
            <small>за {range.toLowerCase()}</small>
          </div>
        </div>
        <div className="metric">
          <span className="metric-icon green">
            <Icon name="check" />
          </span>
          <div>
            <p>Выполнено</p>
            <strong>
              18 <em>75%</em>
            </strong>
            <small>от всех задач</small>
          </div>
        </div>
        <div className="metric">
          <span className="metric-icon red">
            <Icon name="clock" />
          </span>
          <div>
            <p>Просрочено</p>
            <strong>2</strong>
            <small>требуют внимания</small>
          </div>
        </div>
      </section>
      <section className="charts-grid">
        <div className="chart-card">
          <div>
            <h2>По проектам</h2>
            <p>Распределение задач</p>
          </div>
          <div className="chart-content">
            <Donut type="projects" />
            <div className="chart-legend">
              <span>
                <i className="dot brown" />
                Работа <b>42%</b>
              </span>
              <span>
                <i className="dot blue" />
                Учёба <b>33%</b>
              </span>
              <span>
                <i className="dot green" />
                Личное <b>25%</b>
              </span>
            </div>
          </div>
        </div>
        <div className="chart-card">
          <div>
            <h2>По квадрантам</h2>
            <p>Баланс приоритетов</p>
          </div>
          <div className="chart-content">
            <Donut type="quadrants" />
            <div className="chart-legend">
              {quadrants.map((q, i) => (
                <span key={q.key}>
                  <i style={{ background: q.color }} />
                  Квадрант {q.letter}
                  <b>{[28, 39, 22, 11][i]}%</b>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="top-projects">
        <div className="section-title">
          <div>
            <h2>Топ проектов</h2>
            <p>По количеству выполненных задач</p>
          </div>
          <Button kind="ghost">
            Все проекты <Icon name="chevron" />
          </Button>
        </div>
        {[
          ["Работа", 9, 12, "brown"],
          ["Учёба", 6, 8, "blue"],
          ["Личное", 3, 6, "green"],
        ].map((p, i) => (
          <div className="progress-row" key={String(p[0])}>
            <span className="rank">{i + 1}</span>
            <i className={`dot ${p[3]}`} />
            <strong>{p[0]}</strong>
            <div className="progress">
              <i style={{ width: `${(Number(p[1]) / Number(p[2])) * 100}%` }} />
            </div>
            <span>
              {p[1]} из {p[2]}
            </span>
          </div>
        ))}
      </section>
    </div>
  )
}

function ProjectsPage({ openTask }: { openTask: () => void }) {
  const [project, setProject] = useState("Работа")
  const [showDone, setShowDone] = useState(false)
  return (
    <div>
      <PageHead
        title="Проекты и категории"
        subtitle="Порядок в задачах начинается со структуры"
        action={
          <div className="button-row">
            <Button kind="secondary" icon="plus">
              Категория
            </Button>
            <Button icon="plus">Проект</Button>
          </div>
        }
      />
      <div className="projects-layout">
        <aside className="project-tree">
          <div className="tree-head">
            <h3>Категории</h3>
            <button>
              <Icon name="more" />
            </button>
          </div>
          <div className="tree-category">
            <span>
              <Icon name="folder" />
              Основное
            </span>
            {["Работа", "Учёба", "Личное"].map((x, i) => (
              <button
                className={project === x ? "active" : ""}
                onClick={() => setProject(x)}
                key={x}
              >
                <i className={`dot ${["brown", "blue", "green"][i]}`} />
                {x}
                <em>{[9, 6, 4][i]}</em>
              </button>
            ))}
          </div>
          <div className="tree-category">
            <span>
              <Icon name="folder" />
              Идеи
            </span>
            {["Путешествия", "Когда-нибудь"].map((x) => (
              <button key={x}>
                <i className="dot gray" />
                {x}
                <em>2</em>
              </button>
            ))}
          </div>
          <Button kind="ghost" icon="plus">
            Категория
          </Button>
        </aside>
        <section className="project-tasks">
          <div className="project-title">
            <div>
              <i
                className={`dot ${
                  project === "Работа"
                    ? "brown"
                    : project === "Учёба"
                      ? "blue"
                      : "green"
                }`}
              />
              <div>
                <h2>{project}</h2>
                <p>
                  {project === "Работа"
                    ? "Рабочие задачи и цели"
                    : "Личные планы и задачи"}
                </p>
              </div>
            </div>
            <button className="icon-btn">
              <Icon name="more" />
            </button>
          </div>
          <div className="filter-row">
            <div className="tag-filters">
              <button className="active">Все</button>
              <button>#важное</button>
              <button>#встречи</button>
              <button>#команда</button>
              <button>
                <Icon name="plus" />
                Тег
              </button>
            </div>
            <label className="switch-label">
              <span>Показать выполненные</span>
              <input
                type="checkbox"
                checked={showDone}
                onChange={(e) => setShowDone(e.target.checked)}
              />
              <i />
            </label>
          </div>
          <div className="list-head">
            <span>Задачи</span>
            <em>{showDone ? "9" : "6"} активных</em>
          </div>
          <div className="project-list">
            {allTasks
              .filter((_, i) => i < 6)
              .map((t, i) => (
                <div
                  className={`project-task ${
                    showDone && i > 3 ? "completed" : ""
                  }`}
                  key={t.title}
                >
                  <TaskCard task={t} />
                  <div className="project-task-extra">
                    <span className={`q-badge q-${t.q}`}>
                      {String(t.q).toUpperCase()}
                    </span>
                    <button>
                      <Icon name="more" />
                    </button>
                  </div>
                </div>
              ))}
            <button className="add-task-row" onClick={openTask}>
              <Icon name="plus" />
              Добавить задачу
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function DonePage() {
  const [restored, setRestored] = useState<string[]>([])
  const completed = [
    "Отправить отчёт клиенту",
    "Купить билеты в театр",
    "Закончить модуль курса",
    "Заказать корм коту",
    "Провести планёрку",
  ]
  return (
    <div>
      <PageHead
        title="Выполненные задачи"
        subtitle="Здесь хранится всё, что уже сделано"
      />
      <div className="completed-toolbar">
        <div className="input-wrap filter-search">
          <Icon name="search" />
          <input placeholder="Найти выполненную задачу" />
        </div>
        <select>
          <option>Все проекты</option>
          <option>Работа</option>
          <option>Учёба</option>
        </select>
        <select>
          <option>Все теги</option>
          <option>#важное</option>
        </select>
      </div>
      <section className="completed-card">
        <div className="completed-group">
          <h3>
            Сегодня{" "}
            <span>{completed.filter((x) => !restored.includes(x)).length}</span>
          </h3>
          {completed
            .filter((x) => !restored.includes(x))
            .map((x, i) => (
              <div className="completed-row" key={x}>
                <span className="checked">
                  <Icon name="check" size={14} />
                </span>
                <div>
                  <strong>{x}</strong>
                  <span>
                    <span className="tag-pill">
                      {i % 2 ? "#личное" : "#работа"}
                    </span>{" "}
                    Выполнено в {10 + i}:20
                  </span>
                </div>
                <span className={`q-badge q-${["a", "c", "b", "d"][i % 4]}`}>
                  {["A", "C", "B", "D"][i % 4]}
                </span>
                <Button
                  kind="ghost"
                  icon="undo"
                  onClick={() => setRestored([...restored, x])}
                >
                  Вернуть в работу
                </Button>
              </div>
            ))}
        </div>
        {restored.length === completed.length && (
          <div className="empty-state">
            <span>
              <Icon name="check" size={30} />
            </span>
            <h3>Список пуст</h3>
            <p>Здесь появятся завершённые задачи</p>
          </div>
        )}
      </section>
    </div>
  )
}

function SettingsPage({
  dark,
  toggleTheme,
}: {
  dark: boolean
  toggleTheme: () => void
}) {
  const [toast, setToast] = useState(false)
  return (
    <div>
      <PageHead
        title="Настройки профиля"
        subtitle="Управляйте аккаунтом и внешним видом"
      />
      <div className="settings-layout">
        <div className="settings-main">
          <section className="settings-card">
            <div className="settings-title">
              <span>
                <Icon name="user" />
              </span>
              <div>
                <h2>Личные данные</h2>
                <p>Основная информация вашего профиля</p>
              </div>
            </div>
            <div className="profile-edit">
              <div className="big-avatar">
                МК
                <button>
                  <Icon name="paperclip" size={14} />
                </button>
              </div>
              <div className="form-grid">
                <label>
                  Логин
                  <input defaultValue="maria" />
                </label>
                <label>
                  E-mail
                  <input defaultValue="maria@example.com" />
                </label>
              </div>
            </div>
            <Button
              onClick={() => {
                setToast(true)
                setTimeout(() => setToast(false), 2400)
              }}
            >
              Сохранить изменения
            </Button>
          </section>
          <section className="settings-card">
            <div className="settings-title">
              <span>
                <Icon name="lock" />
              </span>
              <div>
                <h2>Смена пароля</h2>
                <p>Используйте не менее 8 символов</p>
              </div>
            </div>
            <div className="form-grid">
              <label>
                Текущий пароль
                <input type="password" placeholder="••••••••" />
              </label>
              <span />
              <label>
                Новый пароль
                <input type="password" placeholder="Новый пароль" />
              </label>
              <label>
                Повторите пароль
                <input type="password" placeholder="Повторите пароль" />
              </label>
            </div>
            <Button kind="secondary">Обновить пароль</Button>
          </section>
        </div>
        <aside className="settings-side">
          <section className="settings-card">
            <div className="settings-title">
              <span>
                <Icon name={dark ? "moon" : "sun"} />
              </span>
              <div>
                <h2>Внешний вид</h2>
                <p>Выберите тему приложения</p>
              </div>
            </div>
            <div className="theme-cards">
              <button
                className={!dark ? "active" : ""}
                onClick={() => dark && toggleTheme()}
              >
                <span className="theme-preview light">
                  <i />
                  <i />
                  <i />
                </span>
                <b>Светлая</b>
                <em>{!dark && <Icon name="check" size={14} />}</em>
              </button>
              <button
                className={dark ? "active" : ""}
                onClick={() => !dark && toggleTheme()}
              >
                <span className="theme-preview dark">
                  <i />
                  <i />
                  <i />
                </span>
                <b>Тёмная</b>
                <em>{dark && <Icon name="check" size={14} />}</em>
              </button>
            </div>
          </section>
          <section className="settings-card coming">
            <div className="soon">Скоро</div>
            <span className="custom-icon">
              <Icon name="grid" />
            </span>
            <h2>Кастомизация матрицы</h2>
            <p>Настройка цветов квадрантов, фона и персональных изображений.</p>
            <Button kind="secondary" disabled>
              Настроить
            </Button>
          </section>
        </aside>
      </div>
      {toast && (
        <div className="toast">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Изменения сохранены</strong>
            <p>Настройки профиля обновлены</p>
          </div>
          <button onClick={() => setToast(false)}>
            <Icon name="close" />
          </button>
        </div>
      )}
    </div>
  )
}

function TaskModal({ close }: { close: () => void }) {
  const [repeat, setRepeat] = useState("Не повторять")
  const [deleting, setDeleting] = useState(false)
  const [saved, setSaved] = useState(false)
  return (
    <div className="modal-layer">
      <button className="modal-scrim" onClick={close} />
      <section className="task-modal">
        <div className="modal-head">
          <div>
            <span className="eyebrow">Новая задача</span>
            <h2>Создать задачу</h2>
          </div>
          <button className="icon-btn" onClick={close}>
            <Icon name="close" />
          </button>
        </div>
        <div className="modal-scroll">
          <label className="field-label">
            Название
            <input
              className="plain-input"
              defaultValue="Подготовить презентацию"
              autoFocus
            />
          </label>
          <label className="field-label">
            Описание
            <textarea defaultValue="Собрать ключевые результаты и подготовить слайды для команды." />
          </label>
          <div className="field-label">
            Квадрант
            <div className="quadrant-select">
              {quadrants.map((q) => (
                <button className={q.key === "a" ? "active" : ""} key={q.key}>
                  <i style={{ background: q.color }}>{q.letter}</i>
                  <span>
                    {q.title}
                    <small>{q.hint}</small>
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="two-col">
            <label className="field-label">
              Проект
              <select>
                <option>Работа</option>
                <option>Учёба</option>
                <option>Личное</option>
              </select>
            </label>
            <label className="field-label">
              Дедлайн
              <div className="date-pair">
                <input type="date" defaultValue="2025-05-20" />
                <input type="time" defaultValue="18:00" />
              </div>
            </label>
          </div>
          <div className="field-label">
            Теги
            <div className="tags-input">
              <span className="tag-pill">
                #работа <button>×</button>
              </span>
              <span className="tag-pill">
                #важное <button>×</button>
              </span>
              <button>
                <Icon name="plus" size={14} /> создать тег
              </button>
            </div>
          </div>
          <div className="two-col">
            <label className="field-label">
              Повторение
              <select
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
              >
                <option>Не повторять</option>
                <option>Ежедневно</option>
                <option>Еженедельно</option>
                <option>Ежемесячно</option>
                <option>Ежегодно</option>
              </select>
            </label>
            <label className="field-label">
              Напоминание
              <select>
                <option>За 30 минут</option>
                <option>За 1 час</option>
                <option>За 1 день</option>
              </select>
            </label>
          </div>
          {repeat !== "Не повторять" && (
            <label className="field-label repeat-end">
              Окончание повторения
              <div>
                <label>
                  <input type="radio" name="end" defaultChecked /> Никогда
                </label>
                <label>
                  <input type="radio" name="end" /> После 10 повторений
                </label>
                <label>
                  <input type="radio" name="end" /> В дату
                </label>
              </div>
            </label>
          )}
          <div className="field-label">
            Заметка
            <div className="editor">
              <div className="editor-tools">
                <button>
                  <b>B</b>
                </button>
                <button>≡</button>
                <button>↗</button>
                <button>☑</button>
              </div>
              <textarea placeholder="Добавить заметку..." />
            </div>
          </div>
          <div className="field-label">
            Вложения
            <div className="drop-zone">
              <span>
                <Icon name="paperclip" />
              </span>
              <div>
                <strong>Перетащите файлы сюда</strong>
                <p>
                  или <button>выберите на компьютере</button> · до 10 МБ
                </p>
              </div>
            </div>
            <div className="file-row">
              <span>
                <Icon name="file" />
              </span>
              <div>
                <strong>Бриф_презентации.pdf</strong>
                <small>2,4 МБ</small>
              </div>
              <button>
                <Icon name="trash" />
              </button>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <Button kind="danger" icon="trash" onClick={() => setDeleting(true)}>
            Удалить
          </Button>
          <div>
            <Button kind="ghost" onClick={close}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                setSaved(true)
                setTimeout(close, 800)
              }}
            >
              {saved ? "Сохранено" : "Сохранить"}
            </Button>
          </div>
        </div>
        {deleting && (
          <div className="confirm-layer">
            <div className="confirm">
              <span className="danger-icon">
                <Icon name="trash" />
              </span>
              <h3>Удалить повторяющуюся задачу?</h3>
              <p>Выберите, удалить только эту задачу или всю серию.</p>
              <Button kind="danger" onClick={close}>
                Удалить всю серию
              </Button>
              <Button kind="secondary" onClick={close}>
                Только эту задачу
              </Button>
              <Button kind="ghost" onClick={() => setDeleting(false)}>
                Отмена
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState<Page>("login")
  const [dark, setDark] = useState(false)
  const [taskOpen, setTaskOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const content = useMemo(() => {
    if (page === "matrix")
      return <MatrixPage openTask={() => setTaskOpen(true)} />
    if (page === "calendar")
      return <CalendarPage openTask={() => setTaskOpen(true)} />
    if (page === "stats") return <StatsPage />
    if (page === "projects")
      return <ProjectsPage openTask={() => setTaskOpen(true)} />
    if (page === "done") return <DonePage />
    if (page === "settings")
      return <SettingsPage dark={dark} toggleTheme={() => setDark(!dark)} />
  }, [page, dark])

  if (page === "login")
    return (
      <div className={dark ? "app dark" : "app"}>
        <Login
          onLogin={() => setPage("matrix")}
          dark={dark}
          toggleTheme={() => setDark(!dark)}
        />
      </div>
    )
  return (
    <div className={dark ? "app dark" : "app"}>
      <Header
        dark={dark}
        toggleTheme={() => setDark(!dark)}
        openTask={() => setTaskOpen(true)}
        openMenu={() => setMenuOpen(true)}
      />
      <Sidebar
        page={page}
        setPage={setPage}
        open={menuOpen}
        close={() => setMenuOpen(false)}
      />
      <main className="content">{content}</main>
      <BottomNav page={page} setPage={setPage} />
      {taskOpen && <TaskModal close={() => setTaskOpen(false)} />}
    </div>
  )
}
