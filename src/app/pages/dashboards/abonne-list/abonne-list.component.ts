import { Component, OnInit } from '@angular/core';
import { dimAbonneService } from 'src/app/core/services/dim-abonne.service';
import { dim_abonne } from 'src/app/core/models/dim-abonne-model';

@Component({
  selector: 'app-abonne-list',
  templateUrl: './abonne-list.component.html',
  styleUrls: ['./abonne-list.component.scss']
})
export class AbonneListComponent implements OnInit {
  abonnes: dim_abonne[] = []; // Pour stocker la liste des abonnés
  loading: boolean = false; // Pour indiquer si les données sont en cours de chargement
  errorMessage: string | null = null; // Pour stocker les messages d'erreur

  constructor(private abonneService: dimAbonneService) {}

  ngOnInit(): void {
    this.fetchAbonnes();
  }

  fetchAbonnes(): void {
    this.loading = true;
    this.errorMessage = null;

    this.abonneService.getAll().subscribe({
      next: (data: dim_abonne[]) => {
        this.abonnes = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors de la récupération des abonnés.';
        this.loading = false;
      },
      complete: () => {
        console.log('Chargement des abonnés terminé.');
      }
    });
  }
}
