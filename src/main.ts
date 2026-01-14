import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// 🧹  clean localStorage une fois (à supprimer après le test)
//localStorage.clear();


if (environment.production) {
  enableProdMode();
}

/* // main.ts (tout en haut)

// ⛔️ BLOQUE localStorage.clear()
const originalClear = localStorage.clear;
localStorage.clear = function() {
  console.error('🚨 EXTENSION TENTE DE VIDER LE STORAGE !');
  console.trace();
  // Ne rien faire (bloque le vidage)
};

// 🔍 Surveille les suppressions
const originalRemoveItem = localStorage.removeItem;
localStorage.removeItem = function(key: string) {
  if (key === 'token' || key === 'currentUser') {
    console.error(`🚨 SUPPRESSION DE ${key} DÉTECTÉE !`);
    console.trace();
  }
  originalRemoveItem.call(localStorage, key);
};

// ⭐ Surveille les changements
window.addEventListener('storage', (e) => {
  console.log('🌐 STORAGE CHANGED:', e.key, '→', e.newValue);
}); */

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  