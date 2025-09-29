import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss']
})
export class StatComponent implements OnInit {

  @Input() title: string | undefined;
  @Input() value: any | undefined;
  @Input() icon: string | undefined;
  @Input() persantage: string | undefined;
  @Input() profit: string | undefined;
  @Input() link: { text: string, url: string } | undefined;

  isDarkMode = false;
  private sub?: Subscription;

  constructor(private themeService: ThemeService) {}

  ngOnInit() {
    this.sub = this.themeService.mode$.subscribe(mode => {
      this.isDarkMode = (mode === 'dark');
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
