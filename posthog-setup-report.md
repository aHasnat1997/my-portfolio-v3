# PostHog post-wizard report

The wizard integrated PostHog into this Astro View Transitions portfolio. It installed `posthog-js`, configured browser-safe environment variables, initialized analytics once through the shared layout with automatic History API pageviews, preserved autocapture and session recording defaults, and instrumented the portfolio's primary engagement and contact conversion actions. The production build completed successfully.

| Event | Description | File |
| --- | --- | --- |
| `hero_cta_clicked` | A visitor clicked a primary portfolio call to action from the hero section. | `src/components/hero/index.astro` |
| `project_opened` | A visitor opened a featured project's detailed case study. | `src/components/projects/index.astro` |
| `project_image_opened` | A visitor opened a project screenshot in the expanded image viewer. | `src/pages/projects/components/_image-carousel.tsx` |
| `contact_channel_clicked` | A visitor selected a direct email, GitHub, or LinkedIn contact channel. | `src/components/contact/index.astro` |
| `contact_form_submitted` | A visitor successfully submitted the portfolio contact form. | `src/components/contact/index.astro` |
| `contact_form_failed` | A visitor's portfolio contact form submission failed. | `src/components/contact/index.astro` |
| `company_link_clicked` | A visitor opened the current employer link from the experience section. | `src/components/experience/index.astro` |
| `not_found_home_clicked` | A visitor recovered from a missing page by clicking the home link. | `src/pages/404.astro` |

## Next steps

We've built insights and a dashboard to monitor user behavior based on the events instrumented:

- [Analytics basics dashboard](https://us.posthog.com/project/523213/dashboard/1886652)
- [Portfolio contact funnel](https://us.posthog.com/project/523213/insights/CcnyQ8yP)
- [Project interest funnel](https://us.posthog.com/project/523213/insights/7R54udNS)
- [Contact outcomes](https://us.posthog.com/project/523213/insights/m9lJ35pJ)
- [Portfolio engagement signals](https://us.posthog.com/project/523213/insights/nF0wgTsF)
- [Navigation recovery](https://us.posthog.com/project/523213/insights/NTQJRlpQ)

## Verify before merging

- [ ] Run a full production build and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or the bundler upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in the project. This context can support further agent development with current PostHog integration practices.
