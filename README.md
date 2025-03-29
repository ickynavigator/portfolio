# Portfolio Sanity Client

My personal portfolio website built with [Astro](https://astro.build/) project. It uses [Sanity](https://www.sanity.io/) as the CMS (data store). The project is statically generated and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Getting Started

### 🤫 Environment Variables

Fill up the .dev.vars file with the variables in the .env.example

| Key                                    | Description                                                      |
| :------------------------------------- | :--------------------------------------------------------------- |
| `WEBSITE_URL`                          | URL of the website. Defaults to `https://obifortune.com`         |
| `PUBLIC_SANITY_VISUAL_EDITING_ENABLED` | Enable visual editing in the studio. Defaults to `false`         |
| `SANITY_API_READ_TOKEN`                | Read token for the sanity project                                |
| `PUBLIC_POSTHOG_API_KEY`               | API key for Posthog                                              |
| `PUBLIC_POSTHOG_API_HOST`              | Host for Posthog events. Defaults to `https://us.i.posthog.com`  |
| `PUBLIC_POSTHOG_UI_HOST`               | UI Host for Posthog events. Defaults to `https://us.posthog.com` |
| `WAKATIME_API_KEY`                     | API key for the wakatime API                                     |
| `LASTFM_API_KEY`                       | Last.fm API key                                                  |
| `LASTFM_USER`                          | Last.fm username                                                 |
| `CLOUDFLARE_API_TOKEN`                 | Cloudflare API token. Used for purging cache.                    |
| `CLOUDFLARE_ZONE_ID`                   | Zone ID for the Cloudflare project.                              |

### 🧞 Commands

All commands are run from the root of the project, from a terminal with `pnpm run`:

| Command      | Action                                                                                 |
| :----------- | :------------------------------------------------------------------------------------- |
| `dev`        | Starts local dev server at `localhost:4321`                                            |
| `build`      | Build your production site to `./dist/`, will generate app types and check astro setup |
| `preview`    | Deploy a local preview of the build with wrangler                                      |
| `typegen`    | Generate all user types                                                                |
| `cf-typegen` | Generate types from bindings and module rules in configuration                         |
| `sa-dev`     | Starts sanity dev server at `localhost:3333`                                           |
| `sa-deploy`  | Deploy sanity schema to the cloud                                                      |
| `sa-typegen` | Extract sanity schema info and generate types                                          |
| `lint`       | Run eslint on the project                                                              |
| `lint:fix`   | Run eslint on the project and resolve auto-fixable issues                              |
| `typecheck`  | Run tsc to check for type errors                                                       |

<details>
<summary>Setting up Sanity</summary>

### Setting up the sanity project

You need to create a sanity project to work with this portfolio. This can be done by running this in the root of the app

```bash
pnpm create sanity@latest
```

This will prompt you to do a few things

1. Login to your sanity
1. Create a new project
1. Don't add configuration files (this has already been done for you)
1. Select `clean project with no predefined schemas`. You can delete the newly created sanity changes
1. Go to the [Sanity dashboard](https://www.sanity.io/manage) and select your project to view your project ID and other details

</details>
