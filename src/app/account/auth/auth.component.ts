import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ToastService } from '../login/toast-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  fieldTextType = false;
  error = '';
  year: number = new Date().getFullYear();
  showNavigationArrows = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private authfake: AuthfakeauthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) {
    // Redirection si déjà connecté
    const user = this.authfake.currentUserValue;
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    // Formulaire de connexion
    this.loginForm = this.fb.group({
      email: ['admin@osisgroup.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    // Redirection si déjà logué
    if (localStorage.getItem('token')) {
      this.router.navigate(['/dashboard']);
    }
  }

  // Raccourci pour accéder facilement aux champs
  get f() {
    return this.loginForm.controls;
  }

  // Envoi du formulaire
  onSubmit(): void {
  this.submitted = true;

  if (this.loginForm.invalid) {
    console.log('🚪 Formulaire invalide → on sort');
    return;
  }

  const email = this.f['email'].value;
  const password = this.f['password'].value;
  console.log('👉 onSubmit appelé avec :', { email, password });

  this.authfake.login(email, password).subscribe({
    next: (res: any) => {
      console.log('🎯 Component reçoit :', res);

      /* 1.  Pas de champ "status" → on considère que si on a un token c’est OK */
      if (res && res.token) {
        localStorage.setItem('currentUser', JSON.stringify(res));
        localStorage.setItem('token', res.token);
        this.toastService.show('Connexion réussie ✅', {
          classname: 'bg-success text-white',
          delay: 4000,
        });
        console.log('🧭 Navigate vers /landing2');
        this.router.navigate(['/landing2']);
      } else {
        console.log('❌ Pas de token dans la réponse → identifiants incorrects');
        this.toastService.show('Identifiants incorrects', {
          classname: 'bg-danger text-white',
          delay: 4000,
        });
      }
    },
    error: (err) => {
      console.log('💥 Erreur dans component :', err);
      this.toastService.show('Erreur de connexion au serveur', {
        classname: 'bg-danger text-white',
        delay: 4000,
      });
    },
  });
}

  // Afficher/masquer le mot de passe
  toggleFieldTextType(): void {
    this.fieldTextType = !this.fieldTextType;
  }
}
