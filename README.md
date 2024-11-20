# Portfolio Sanity Client

My personal portfolio website built with [Astro](https://astro.build/) project. It uses [Sanity](https://www.sanity.io/) as the CMS (data store). The project is statically generated and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## Getting Started

### 🤫 Environment Variables

Fill up the .env file with the variables in the .env.example

| Key                            | Description                                                      |
| :----------------------------- | :--------------------------------------------------------------- |
| `PUBLIC_SANITY_API_PROJECT_ID` | Project ID of your Sanity project. Defaults to **MY** project Id |
| `PUBLIC_SANITY_API_DATASET`    | Dataset name of your Sanity project. Defaults to `production`    |
| `PUBLIC_SANITY_API_VERSION`    | API version of your Sanity project. Defaults to `2022-03-07`     |
| `SANITY_API_WRITE_TOKEN`       | API token with write access to your Sanity project               |

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
