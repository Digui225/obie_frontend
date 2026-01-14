import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LandingService {
  // 🔹 Clé versionnée pour éviter conflits et faciliter les migrations
  private readonly LANDING_KEY = 'app_landing_seen_v2';
  
  // 🔹 Clé de sauvegarde pour détecter les suppressions malveillantes
  private readonly LANDING_BACKUP_KEY = 'app_landing_backup_v2';
  
  // 🔹 Timestamp pour traçage
  private readonly LANDING_TIMESTAMP_KEY = 'app_landing_timestamp_v2';

  /**
   * ✅ Marque le landing comme vu avec protection anti-suppression
   */
  markLandingSeen(): void {
    try {
      const timestamp = new Date().toISOString();
      const value = 'true';
      
      localStorage.setItem(this.LANDING_KEY, value);
      localStorage.setItem(this.LANDING_TIMESTAMP_KEY, timestamp);
      localStorage.setItem(this.LANDING_BACKUP_KEY, value);
      
      console.log('📍 LandingService: markLandingSeen() ✅', { timestamp });
    } catch (error) {
      console.error('❌ LandingService: Erreur lors du marquage du landing', error);
    }
  }

  /**
   * ✅ Vérifie si le landing a été vu (avec log détaillé)
   */
  hasSeenLanding(): boolean {
    try {
      const primary = localStorage.getItem(this.LANDING_KEY);
      const backup = localStorage.getItem(this.LANDING_BACKUP_KEY);
      const timestamp = localStorage.getItem(this.LANDING_TIMESTAMP_KEY);
      
      // Si la clé primaire a disparu mais la backup existe, restaure
      if (!primary && backup === 'true') {
        console.warn('⚠️ LandingService: Clé primaire manquante, restauration depuis backup');
        localStorage.setItem(this.LANDING_KEY, 'true');
        return true;
      }
      
      const result = primary === 'true';
      console.log('📍 LandingService: hasSeenLanding() →', result, { primary, backup, timestamp });
      return result;
    } catch (error) {
      console.error('❌ LandingService: Erreur lors de la vérification', error);
      return false;
    }
  }

  /**
   * 🚨 Réinitialise le landing (pour tests uniquement - à supprimer en prod)
   */
  resetLanding(): void {
    console.warn('🚨 LandingService: resetLanding() appelé - Suppression des données');
    localStorage.removeItem(this.LANDING_KEY);
    localStorage.removeItem(this.LANDING_BACKUP_KEY);
    localStorage.removeItem(this.LANDING_TIMESTAMP_KEY);
  }

  /**
   * ✅ Vérifie l'intégrité des données (outil de debug)
   */
  checkIntegrity(): void {
  const keys = [this.LANDING_KEY, this.LANDING_BACKUP_KEY, this.LANDING_TIMESTAMP_KEY];
  const values = keys.map(k => ({ key: k, value: localStorage.getItem(k) }));
  console.log('🔍 LandingService Integrity Check:');
  console.table(values);
}
}