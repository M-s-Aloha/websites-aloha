<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep shared website navigation and footer in the root layout and service content in a single typed catalogue, so all service links and detail pages stay consistent.
- Keep package scopes and pricing provenance in the shared service catalogue, so every service page distinguishes suggested rates and displays the same proposed inclusions.
- Use dedicated TanStack leaf routes with page-specific metadata for shareable content, so navigation and search indexing remain reliable.
- Keep the assistant's AI calls in server-only modules and stream UI messages to a single in-memory conversation, so credentials stay private without retaining visitor chats.
- Shared contact forms use a prefilled WhatsApp click-to-chat handoff, never report delivery, and retain a retry link, so visitor-controlled sending remains honest and recoverable.
- Package cards and their keyboard-accessible buttons select the same enquiry plan and focus the name field, so selection and WhatsApp handoff stay consistent.
- Derive sitemap static pages from required route-level sitemap decisions and dynamic service URLs from the shared catalogue, so discovery follows public content without duplicate lists; omit lastmod without authoritative page timestamps.
