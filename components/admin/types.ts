/** Listeneintrag aus GET /api/users. */
export type UserListItem = {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

/** Ein Termin eines Header-News-Eintrags. */
export type HeaderNewsDateItem = {
  /** All-Day: "YYYY-MM-DD" · timed: ISO-String. */
  start: string;
  end: string | null;
  allDay: boolean;
};

/** Eintrag aus GET /api/header-news (Datumsfelder als Strings). */
export type HeaderNewsItem = {
  id: string;
  label: string;
  message: string;
  dates: HeaderNewsDateItem[];
  location: string | null;
  published: boolean;
  /** ISO-Strings oder null. */
  publishUp: string | null;
  publishDown: string | null;
  createdAt: string;
  updatedAt: string;
};
