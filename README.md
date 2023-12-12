# Blog Project

Collect documents on all topics. Watch at my [Blog](https://27hohuuduc.github.io/).

> **Note:** The library package is published at [GitHub/27hohuuduc](https://github.com/27hohuuduc)

## Angular Note

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.2.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Rule

### Source structure

**AppModule**
- Large Component must be **declarations**.
- Other Component like as Icon, Button, etc; If it is reused a lot, then import into **AppModule**, else import at the **Used component**.  
- Modules need to be declared separately in the modules directory.

**Common Style**
- Use **common.scss** for duplicate stype.
- Styles of a *Tag* or *Variable* should be placed at **styles.scss**.

**Common Script**
- *Functions*, *Classes* or *Types* used in multiple modules must be defined in **shared**.
- Don't import directly from the script file, must be made via **index.ts**.
- Import **Feature modules** instead of import **Class**.

### Format Code

**Handle in html**
- Line-break when be end of handle or branch of handle be complete.

### *Updating*