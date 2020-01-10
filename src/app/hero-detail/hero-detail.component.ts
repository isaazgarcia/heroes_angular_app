import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {MessageService} from '../message.service';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../hero.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})

export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    public route: ActivatedRoute,
    public heroService: HeroService,
    public location: Location,
    public messageService: MessageService) {
  }

  ngOnInit() {
    this.getHero();
  }

  onInputChange(hero: Hero): void {
    this.messageService.addMessage('Hero Input Change: ' + hero.name);
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
