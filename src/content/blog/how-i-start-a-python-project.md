---
title: How I start a Python project
date: 2026-02-04
description: A practical template for starting, linting, documenting, and versioning Python projects using uv, ruff, MkDocs etc.
tags: [python, developer]
coverImage:  "https://images.giraycoskun.dev/blog-banner-how-start-python-project.png"
imageCredit:
  name: "Gemini"
author:
  name: Giray Coskun
  avatar: https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4
draft: false
---

## Intro

This template captures a minimal, modern setup for Python projects: dependency & environment management with uv, linting and formatting with ruff, documentation with MkDocs + mkdocstrings, and versioning via Git tags (optionally automated with bump-my-version). Copy commands as-is and adapt names to your project.

## Package Manager: uv

[uv](https://docs.astral.sh/uv/) manages virtual environments and dependencies. There are many choices from plain old pip to more complex tools like Poetry. However I prefer uv for its simplicity and speed. And it can also manage Python installations.

### Initialize a new project

```bash
mkdir my-python-project && cd my-python-project
uv init --app .
uv venv --python 3.14
```

### Add Dependencies

```bash
uv add requests numpy pandas         # runtime dependencies
uv add --dev ruff mkdocs-material
uv sync
```

## Lint & Format

I use [ruff](https://docs.astral.sh/ruff/) for both linting and formatting to keep things simple.


```toml
# pyproject.toml (ruff)
[tool.ruff]
line-length = 120
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]
ignore = []

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
skip-magic-trailing-comma = false
```

```bash
uv run ruff check --fix .
uv run ruff format .
```


## Create Docs

[mkdocs](https://www.mkdocs.org/) with [mkdocs-material](https://squidfunk.github.io/mkdocs-material/) are my favorite tools for creating project documentation. One of the best plugins is [mkdocstrings](https://mkdocstrings.github.io/) which can automatically generate API reference docs from your code, type hints and docstrings.


```bash
uv add --dev mkdocs-material mkdocstrings
uv run mkdocs new .
# creates mkdocs.yml and docs/index.md
```

### Enable mkdocstrings (Python)

```yaml
site_name: My Python Project
theme:
  name: material
plugins:
  - search
  - mkdocstrings:
      handlers:
        python:
          options:
            show_source: true
```

### Reference your code in docs/index.md

```markdown
# API Reference

::: my_package.module
```

### Serve or build

```bash
uv run mkdocs serve   # local preview
uv run mkdocs build   # outputs to site/
```

## Versioning {#versioning}

Keep a single source of truth in pyproject.toml and tag releases in Git. Optional automation via bump-my-version.

### pyproject.toml (project metadata)

```toml
[project]
name = "my-python-project"
version = "0.1.0"
description = "Awesome project"
requires-python = ">=3.12"
authors = [{ name = "Giray Coskun" }]
readme = "README.md"
```

### Version Bump

```bash
# usage
uv version --bump minor   # 0.1.0 -> 0.2.0 (major, minor, patch, pre)
git add . && git commit -m "chore: release v0.2.0"
git push && git push --tags
```
