# Portfolio Sanity Client

My personal portfolio website built with [Astro](https://astro.build/) project. It uses [Sanity](https://www.sanity.io/) as the CMS (data store). The project is statically generated and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Getting Started

### 🤫 Environment Variables

Fill up the .env file with the variables in the .env.example

| Key                             | Description                                                      |
| :------------------------------ | :--------------------------------------------------------------- |
| `SANITY_API_PROJECT_ID`         | Project ID of your Sanity project. Defaults to **MY** project Id |
| `SANITY_API_DATASET`            | Dataset name of your Sanity project. Defaults to `production`    |
| `SANITY_API_VERSION`            | API version of your Sanity project. Defaults to `2022-03-07`     |
| `SANITY_VISUAL_EDITING_ENABLED` | Enable visual editing in the studio. Defaults to `false`         |
| `SANITY_API_READ_TOKEN`         | Read token for the sanity project                                |
| `POSTHOG_API_KEY`               | API key for Posthog                                              |
| `POSTHOG_API_HOST`              | Host for Posthog events. Defaults to `https://us.i.posthog.com   |
| `POSTHOG_UI_HOST`               | UI Host for Posthog events. Defaults to `https://us.posthog.com  |
| `WEBSITE_URL`                   | URL of the website. Defaults to `https://obifortune.com`         |
| `WAKATIME_API_KEY`              | API key for the wakatime API                                     |

### 🧞 Commands

All commands are run from the root of the project, from a terminal with `pnpm run`:

| Command      | Action                                                                          |
| :----------- | :------------------------------------------------------------------------------ |
| `dev`        | Starts local dev server at `localhost:4321` + studio at `localhost:4321/studio` |
| `build`      | Build your production site to `./dist/`                                         |
| `preview`    | Preview your build locally with wrangler, before deploying                      |
| `deploy`     | Deploy your build to cloudflare with wrangler                                   |
| `cf-typegen` | Generate types from bindings and module rules in configuration                  |
| `sa-typegen` | Extract sanity schema info and generate types                                   |
| `lint`       | Run eslint on the project                                                       |
| `lint:fix`   | Run eslint on the project and resolve auto-fixable issues                       |

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

## Patches

- @tabler/icons-react@3.29.0: Stop package from importing ALL icons - [issue](https://github.com/tabler/tabler-icons/issues/1233)
