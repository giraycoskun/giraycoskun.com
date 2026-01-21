---
title: How I start a Python project
date: 2026-01-09
description: A practical template for starting, linting, documenting, and versioning Python projects using uv, ruff, MkDocs etc.
tags: [python, developer]
author:
  name: Giray Coskun
  avatar: https://avatars.githubusercontent.com/u/37620872?s=400&u=3b9d821e80e76abc209441bc88b128956e77cbd2&v=4
draft: true
---

## Intro

This template captures a minimal, modern setup for Python projects: dependency & environment management with uv, linting and formatting with ruff, documentation with MkDocs + mkdocstrings, and versioning via Git tags (optionally automated with bump-my-version). Copy commands as-is and adapt names to your project.

## Package Manager: uv

uv manages virtual environments and dependencies fast. Recommended on macOS:

### Install uv

```bash
curl -Ls https://astral.sh/uv/install.sh | sh
# or via Homebrew
brew install uv
```

### Initialize a new project

```bash
mkdir my-python-project && cd my-python-project
uv init
uv venv
source .venv/bin/activate
```

### Add core tools

```bash
uv add --dev ruff mkdocs mkdocstrings mkdocstrings-python bump-my-version
```

## Lint & Format

Use ruff for both linting and formatting to keep things simple.

### pyproject.toml (ruff)

```toml
[tool.ruff]
line-length = 100
target-version = "py312"

[tool.ruff.lint]
select = ["E", "F", "I", "UP", "B", "SIM"]
ignore = []

[tool.ruff.format]
quote-style = "double"
indent-style = "space"
skip-magic-trailing-comma = false
```

### Run checks

```bash
uv run ruff check .
uv run ruff format .
```

## Create Docs

MkDocs + mkdocstrings generates clean docs from your code and docstrings.

### Bootstrap docs

```bash
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

### Manual release flow

```bash
# update version in pyproject.toml
git add pyproject.toml && git commit -m "chore: release v0.2.0"
git tag -a v0.2.0 -m "Release v0.2.0"
git push && git push --tags
```

### Automated bumping (bump-my-version)

```toml
[tool.bumpversion]
current_version = "0.1.0"
commit = true
tag = true

[[tool.bumpversion.files]]
filename = "pyproject.toml"
```

```bash
# usage
uv run bump-my-version bump minor   # 0.1.0 -> 0.2.0
```
