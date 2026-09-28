/**
 * types.ts
 *
 * The one thing JS never had: a shared, explicit shape for the data
 * flowing through the app. Every component that used to just "know"
 * what an article or a user looked like now imports these instead.
 */

/** One article, exactly as db.json's "articles" collection stores it. */
export interface Article {
  id: number
  title: string
  category: string
  author: string
  description: string
  likes: number
  isFavourite: boolean
}

/**
 * One user, exactly as db.json's "users" collection stores it.
 *
 * Yes, this includes password as a plain string, matching the mock
 * auth exactly. Typing it doesn't make it safer — it just describes
 * the shape honestly.
 */
export interface User {
  id: number
  username: string
  password: string
  name: string
}

/**
 * The two screens a logged-in user can be looking at. This was "just a
 * string" in the JS version (currentView, initialised to 'dashboard').
 * A union of string literals says "still a plain string at runtime,
 * but only these two exact values are ever valid" — so a typo like
 * onNavigate('artcles') becomes a compile error instead of a silently
 * dead nav button.
 */
export type View = 'dashboard' | 'articles'