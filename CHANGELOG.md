# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.0.2 - 2025-04-24]
### Added

### Changed
- single-spa 6, single-spa-layout 3, zone.js 0.16
- TypeScript 6.0, webpack-cli 7, webpack-dev-server 6, ESLint 10 (flat config), Jest 30, Prettier 3, Husky 9
- Docker: node:26-alpine (LTS), npm ci, nginx:1.30-alpine
- Build: DefinePlugin only embeds TEILER_BACKEND_URL, TEILER_DASHBOARD_URL, DEFAULT_LANGUAGE and HTTP_RELATIVE_PATH instead of the whole build environment (process.env)

## [1.0.1 - 2025-04-24]
### Changed
- Embed libraries

## [1.0.0 - 2023-12-13]
### Added
- First version
- Teiler core config
- React support
- Teiler UI title
- Multi-language support for teiler-ui
- Generate single-spa-router from teiler-core import-map
- Docker ignore
- Rename Teiler Orchestrator, Teiler Dashboard and Teiler Backend
- Main in Docker CI

## Changed
- Title
- Rename developer to develop
- Rename: Teiler Orchestrator

## Fixed
- Show env.js of teiler-ui in html head
- Add http relative path (compatibility with traefik)
