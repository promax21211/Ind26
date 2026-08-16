-- Optional seed data for local development so the admin preview has
-- something to show. Not applied automatically in production.
-- Run migrations/0001_init.sql AND migrations/0002_add_name_nickname.sql
-- before this file, since it fills in the name/nickname columns.
-- Every seeded account shares the demo password: Freedom79Demo!
-- (hashed below with the same PBKDF2 scheme used by lib/crypto.js — this
-- is only so the seed data is realistic, nothing here is a real user.)

INSERT INTO users (email, password_hash, name, nickname, promo_code, discord_status, created_at) VALUES
  ('arjun.mehta@example.com', 'bee80e97b6e109a46ebc5ecfed67770c:bb5970de7bc395a0fdae8e2d0a9f8f5a2290eca219449d2b4cc0d7249506337c', 'Arjun Mehta', 'Arjun', 'IND26FREEDOM', 'verified', '2026-08-14 09:12:00'),
  ('priya.sharma@example.com', '2d61b0a30412c7247aa629eada662e66:a72b904749a1b28decdd921ba280f4f4c5582e45fd32f5da5dcd567c0b2392e9', 'Priya Sharma', 'Priya', 'IND26FREEDOM', 'not_verified', '2026-08-14 08:40:00'),
  ('rohan.iyer@example.com', '5bce79cfdc5bf857f1f91a5da207ef50:b6829fe608fb735fdbd1438b2503bd8f38fe90fa13f7b4ad5e643aba4ba70ea2', 'Rohan Iyer', 'Rohan', NULL, 'verified', '2026-08-13 19:05:00'),
  ('sneha.kapoor@example.com', '08585c5c7354b8172a5b32b805a024d3:5ca2beb72d3eaeb8dc61335aa479f7806a5898956c052e3e21e36ec0cbcd1d67', 'Sneha Kapoor', 'Sneha', 'IND26FREEDOM', 'pending', '2026-08-13 14:22:00'),
  ('vikram.nair@example.com', 'b177dd0f0e542ee7530620019cf8717e:2b14b420c2e1d3b656100cdfce2c94f038e5e78ff8da644273ce0e15fc974303', 'Vikram Nair', 'Vikram', NULL, 'not_verified', '2026-08-12 11:51:00'),
  ('ananya.das@example.com', '6e2380b096ddd43be79558f7fbfe2c4b:38737984cb5076d0121daf2b2aaac9ef043a5354bc792e6fac7b75eeb142c98f', 'Ananya Das', 'Ananya', 'IND26FREEDOM', 'verified', '2026-08-12 10:03:00'),
  ('karthik.rao@example.com', '27078c648a2a8ac7f4b9344c9d1cab0f:fab25d6e6a1e58b0272ebdd7094e43348563556f20e3d9ec1bd20b6c6b83a1ae', 'Karthik Rao', 'Karthik', NULL, 'not_verified', '2026-08-11 17:47:00'),
  ('meera.joshi@example.com', 'c5b8ae72eadb374571c5ffeccd317a04:d81a15747775b9427cf5ac2f3e536f55ef122d22df63ad100dbb771bd29cc8fe', 'Meera Joshi', 'Meera', 'IND26FREEDOM', 'verified', '2026-08-11 09:30:00');
