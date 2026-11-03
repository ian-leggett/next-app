# Factory config

Written by `factory-init`. Values are JSON. Edit with care: the lanes read this file.

| Key | Value |
| --- | --- |
| `repo` | `"ian-leggett/next-app"` |
| `project_number` | `2` |
| `project_id` | `"PVT_kwHOAJrxPs4BpLzq"` |
| `status_field_id` | `"PVTSSF_lAHOAJrxPs4BpLzqzhnojOw"` |
| `status_options` | `{"Backlog":"09fc505c","Ready":"3013bf69","In progress":"1008185e","QA Review":"850ed673","In staging":"24c25148","Done":"5888391e"}` |
| `base_branch` | `"main"` |
| `smoke_command` | `"npm run test:e2e"` |
| `bypass_secret_file` | `"/Users/ianleggett/.factory/next-app"` |
| `dev_command` | `"npm run dev -- --port $PORT"` |
| `verify_commands` | `["npx tsc --noEmit","npx vitest run","npm run lint"]` |
| `bounce_cap` | `5` |
| `stuck_repeats` | `2` |
| `parallel_cap` | `3` |
| `port_range` | `[4100,4199]` |
| `skill_hashes` | `{"implement":"4804b466ab26c9b9d8d42917547db133d1f20a9f","to-tickets":"2dee20ad722a31c04ededf9f2d83842473573045","setup-matt-pocock-skills":"aafaabf96fa3945d8a4069317a7a6d36b7169670","code-review":"fee7bb5fdddc069d58cbea09b2c36b5a859eac05","grilling":"28aceb4c9567b985cb47f7db88cf23c9f33af8b8","tdd":"667dbdd00c09d0e2189e082986e6a4d61a67c2a6","codebase-design":"07ba1cd60efc12d0d3a083005c1d9651cf15e39a"}` |
