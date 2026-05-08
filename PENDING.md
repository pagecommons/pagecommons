# Page Commons — Pending Work

## Priority 1: Pre-Launch Polish (Target: June 1, 2026)

### Testing & Validation
- [ ] Full device testing on Kobo Libra Colour (v0.27 rebuild)
- [ ] Full device testing on Kindle (any model)
- [ ] Test Discovery mode integration with Surprise Me
- [ ] Test manual entry Google Books lookup across different queries
- [ ] Test About toggle doesn't interfere with book result tapping
- [ ] Test back navigation flow (search → book-detail → search)
- [ ] Verify Surprise Me AI with various genre/language combinations

### UI/UX Polish
- [ ] Move tagline "Just books. No noise." to right side of header
- [ ] Consider minimum width/responsiveness on very large e-ink screens
- [ ] Review all button text for consistency and brevity
- [ ] Verify all 44px minimum tap targets on device

### AI Companion Refinement
- [ ] Implement reply length enforcement for companion messages
- [ ] Review and improve genre list (currently 8 options)
- [ ] Test Gemini free tier performance under various contexts
- [ ] Add graceful fallback if Gemini API fails during Surprise Me

## Priority 2: V2 Features (Post-Launch, Community Rooms)

### Book Rooms Infrastructure
- [ ] Create #book-room screen (read-only view of all notes in a book)
- [ ] Implement note posting UI (anonymous by default)
- [ ] Add moderation tools for book owners/admins
- [ ] Implement block/mute functionality
- [ ] Design note threading/reply system
- [ ] Create notification feed for note activity

### Book Shelf Visibility
- [ ] Add privacy toggle: shelf visibility (private/friends-only/public)
- [ ] Implement shelf following (with permission)
- [ ] Create "Books in Common" discovery view
- [ ] Add reading status aggregates for books with multiple readers

## Priority 3: V3 Features (Deep Connections)

### Book-Mate System
- [ ] Mutual reading detection (same book + reading status match)
- [ ] Conversation initiation (direct messaging between readers)
- [ ] Reading progress synchronization
- [ ] Reading pace sync (discuss finishing timeline)
- [ ] Annotation sharing (with explicit consent)

## Technical Debt & Known Limitations

### Do Not Change Without Approval
- Single-page app architecture (index.html + app.js)
- Permanent IIFE forcing #screen-home visibility
- Batch AI responses (never stream)
- ES5-only JavaScript (Babel IE 11 transpilation)
- E-ink design constraints (no animations, gradients, CSS variables)
- Privacy-first localStorage approach (no server persistence v1)

### Optimizations Deferred
- Code splitting (single file maintains simplicity)
- CSS minification (keep human-readable)
- Image optimization (relies on Google Books proxy)
- Service worker / offline-first (may conflict with e-ink updates)
- Database migration (in favor of localStorage for privacy)

## Bug Reports / Edge Cases

### Under Investigation
- None currently reported

### Won't Fix (By Design)
- Genre/language suggestions may repeat across session (intentional)
- Manual entry doesn't remember previous searches (privacy first)
- No user accounts or cross-device sync (intentional)

## Deployment Checklist (Pre-Launch)

- [ ] All v0.27 features tested on actual devices
- [ ] Version hash updated to reflect final commit
- [ ] STATUS.md confirms all critical features working
- [ ] No console errors on Kobo or Kindle
- [ ] Network tests confirm /api/* endpoints accessible
- [ ] Performance: app.js loads in <2s on 4G
- [ ] Reddit launch post prepared with screenshots
