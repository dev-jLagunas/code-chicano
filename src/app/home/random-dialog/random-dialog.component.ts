import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-random-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './random-dialog.component.html',
  styleUrl: './random-dialog.component.scss',
})
export class RandomDialogComponent {
  thoughts: string[] = [
    'The first computer programmer was a woman named Ada Lovelace.',
    'The first high-level (very close to English) programming language was FORTRAN. It was invented by IBM for scientific computing.',
    'The first computer mouse was made of wood and was invented by Doug Engelbart in 1964.',
    'The first computer game was created in 1961. It was called "Spacewar!" and was invented at MIT.',
    'The first virus was created in 1983 by a 15-year-old high school student.',
    'The term "bug" was first used by Grace Hopper when she found a moth causing problems in a mechanical computer.',
    'The first domain name ever registered was Symbolics.com.',
    'The first 1GB hard disk drive was announced in 1980 which weighed about 550 pounds, and had a price tag of $40,000.',
    'The QWERTY keyboard was designed to slow you down. If you want to type faster, try the Dvorak Simplified Keyboard.',
    'The first microprocessor created by Intel was the 4004. It was designed for a calculator, and in that time nobody imagined where it would lead.',
    'The first actual computer "bug" was a dead moth which was stuck in a Harvard Mark II computer in 1947.',
    'The password for the computer controls of nuclear tipped missiles of the U.S was 00000000 for eight years.',
    'The average computer user blinks 7 times a minute, less than half the normal rate of 20.',
    'The first known computer programmer was Ada Lovelace, who created an algorithm for the Analytical Engine (a general-purpose computer designed by Charles Babbage).',
    'The Apollo moon landings were made possible by computers with less processing power than a modern smartphone.',
    'The first computer was almost 2.5 meters high and weighed nearly 30,000kg.',
    'More than 80% of the emails sent daily are spams.',
    'The house where Bill Gates lives, was designed using a Macintosh computer.',
    'The first electro-mechanical computer was developed in 1939 by Howard Aiken.',
    'The first digital computer, ENIAC, weighed almost 27 tons and took up 1800 square feet.',
  ];

  getRandomFact(): string {
    const randomIndex = Math.floor(Math.random() * this.thoughts.length);
    return this.thoughts[randomIndex];
  }
}
