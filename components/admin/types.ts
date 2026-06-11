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

/** Eintrag aus GET /api/header-news (Datumsfelder als Strings). */
export type HeaderNewsItem = {
  id: string;
  label: string;
  message: string;
  allDay: boolean;
  /** All-Day: "YYYY-MM-DD" · timed: ISO-String. */
  eventStart: string;
  eventEnd: string | null;
  location: string | null;
  published: boolean;
  /** ISO-Strings oder null. */
  publishUp: string | null;
  publishDown: string | null;
  createdAt: string;
  updatedAt: string;
};
