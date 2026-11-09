# Interactive Electric Kettle

A class prototype exploring variables, state, events, conditions, and repetition using observations of a real electric kettle.

## Interactive versions

Open a version below and use its controls:

- [Version 1 — State & Control Flow Model](https://zx2602.github.io/interactive-electric-kettle/version1/)
- [Version 2 — Logic Revision](https://zx2602.github.io/interactive-electric-kettle/version2/)
- [Version 3 — Temperature Maintenance Cycle](https://zx2602.github.io/interactive-electric-kettle/version3/)

## How the model evolves

| Version | State and behavior |
| --- | --- |
| 1 | Tracks lid, target temperature, and heating status. OPEN opens the lid; BOIL selects 100°C; SET TEMP cycles 70 → 80 → 90 → 100 → 70; START / STOP toggles heating status. No temperature simulation. |
| 2 | Adds manual lid closing and a separate current temperature, initially 20°C. Target selection is hidden and locked while heating. Temperature rises by 1°C every 100 ms until the target is reached. The temperature increase ends, but the heating status remains active until STOP. No cooling or maintenance cycle. |
| 3 | Separates `isRunning` from `heaterOn`. Heating pauses at the target, simulated cooling continues until 5°C below the target, then heating restarts. The cycle repeats until STOP. Heating rises by 1°C every 500 ms; cooling falls by 1°C every 100 ms. |

All versions start with the lid closed and the selected target at 70°C. BOIL selects a target without starting the kettle. In Versions 2 and 3, the manual lid-closing action represents physically pushing the lid down, rather than an extra control on the real kettle. Lid actions do not affect the temperature or operating states.

## Files

```text
version1/
  index.html
  styles.css
  script.js
version2/
  index.html
  styles.css
  script.js
version3/
  index.html
  styles.css
  script.js
```

Each folder is self-contained: its HTML loads its own CSS and JavaScript using relative paths. No shared files, packages, backend, build step, or external libraries are required. The pre-existing root-level application is retained.

## Run locally

Download or clone the repository, then open the desired version's `index.html` in a browser. Keep its three files in the same folder. Reloading resets the model to its initial state.

## GitHub Pages

GitHub Pages publishes from the root of the `main` branch. The three version URLs above use their respective subfolders. Repository settings: **Settings → Pages → Deploy from a branch → main → / (root)**.

## Simulation boundaries

Temperature steps, timing, and the exact 5°C threshold are simplified demonstrations, not realistic thermodynamics. The prototypes do not model water levels, steam, sound, or lid safety systems. Version 3 deliberately holds the current temperature after STOP; it does not simulate cooling while stopped.

The Version 3 page's existing timing note predates the heating-only slowdown; its JavaScript uses 500 ms for heating and 100 ms for cooling. The version files are preserved without editing their behavior or interface.

## Version preservation and checks

Versions 1 and 2 were restored from their original code and edits recorded in the project conversation. Version 3 is an unchanged copy of the final local version, including its heating-only timing adjustment.

Checks cover each folder's local asset links and DOM references, Version 1 state changes, Version 2 target locking and temperature stopping, and Version 3 repeated maintenance cycles, phase-specific timing, STOP behavior, and lid independence. Logic checks use controlled timer ticks and a simulated DOM; they do not replace a visual browser review.
