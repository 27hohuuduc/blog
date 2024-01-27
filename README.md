<h1 ><b>Blog Project</b></h1>

Collect documents on all topics. Watch at my [Blog](https://27hohuuduc.github.io/).
> Source NodeJS at [blog-server](https://github.com/27hohuuduc/blog-server).

> **:information_source: Note:** The library package is published at [GitHub/27hohuuduc](https://github.com/27hohuuduc).

# Table of contents
- [Development Diaries](#development-diaries)
- [Rules](#rule)
    - [Source structure](#source-structure)
    - [Format Code](#format-code)

# Development Diaries
| Date      | Description |
| :-:       | :---        |
| 17/12/2023 | Create module for dashboard page (apply lazy loading) |
| 19/12/2023 | Apply environment variables |
| 30/12/2023 | Update Angular 17 |

# Rule

## Source structure

### AppModule
- Large Component must be **declarations**.
- Other Component like as Icon, Button, etc; If it is reused a lot, then import into **AppModule**, else import at the **Used component**.  
- Modules need to be declared separately in the modules directory.

### Common Style
- Use **common.scss** for duplicate stype.
- Styles of a *Tag* or *Variable* should be placed at **styles.scss**.

### Common Script
- *Functions*, *Classes* or *Types* used in multiple modules must be defined in **shared**.
- Don't import directly from the script file, must be made via **index.ts**.
- Import **Feature modules** instead of import **Class**.
- Use `HostBinding` instead of `host` property.

## Format Code

### Handle in html
- Line-break when be end of handle or branch of handle be complete.

### *Updating*
