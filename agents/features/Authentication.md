# AUTHENTICATION.md — Job Portal System

## 1️⃣ Register

`POST /api/auth/register`

1. Validate input (Zod, `.strict()` — no extra fields allowed)
2. Block `role: ADMIN` from public input — only `CANDIDATE`/`RECRUITER` allowed
3. Check email doesn't already exist
4. Hash password with `bcryptjs`
5. Create user → return success response (no password)
 ## After the registration the User redirect to the Login page (/login).

---

## 2️⃣ Login

`POST /api/auth/login`

1. Validate `email` + `password`
2. Find user → compare password with `bcrypt.compare`
3. ❌ Wrong email OR wrong password → same generic error: `"Invalid credentials"`
4. ❌ Soft-deleted user → reject
5. ✅ Success → issue access + refresh cookies → return user (no password)


## Then the user redirct to the Role base Dashboard.

## After both register and proper completion of the login,  the admin Pannel must be update that the authenticate user is login in to the website .
 (The Admin is seed through special email and password)
   - email: admin@jps.np
   - password: PasswordJPS002030

---

## 3️⃣ Stay Logged In (Refresh)

`POST /api/auth/refresh`

1. Read refresh token from cookie (never from body)
2. Valid → issue **new** access + **new** refresh token (old one is revoked — this is called **rotation**)
3. Reused/invalid old token → treat as theft → revoke **all** sessions for that user → force re-login

---

## 4️⃣ Logout

`POST /api/auth/logout`

1. Clear both cookies
2. Delete refresh token record from DB




## Checklist Before Completing Any Auth-Related Task

- [ ] Zod validation with `.strict()` on every auth request
- [ ] Passwords hashed with `bcryptjs`, never stored/logged in plain text
- [ ] Access + refresh tokens issued as httpOnly cookies only
- [ ] Refresh token rotation implemented; reuse triggers full revocation
- [ ] `authenticate` + `authorize` middleware applied explicitly per protected route
- [ ] No role/permission escalation possible via request body
- [ ] Generic error messages (no user enumeration)
- [ ] No secrets/tokens in logs, responses, or client-exposed code
- [ ] No schema change without prior notification
- [ ] Response envelope matches `{ success, data, error }`