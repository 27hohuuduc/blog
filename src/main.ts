import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { errorLog } from './api';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => errorLog(err));
