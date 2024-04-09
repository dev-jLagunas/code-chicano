import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
})
export class AboutMeComponent {
  myStory: string[] = [
    `My name is Juan. I have been teaching myself programming for the 
  last 16 months. I never thought myself skilled enough to become a programmer 
  and up until I found programming I was absolutely lost in my career. When I was younger
  I didn't have anyone to teach me the importance of discipline and taking action. It wasn't
  until I gained more and more experience through trial and error, lots and lots of error, that
  I finally realized that with hard work, persistance, grit, and discipline anything becomes less
  daunting over time.`,
    `That's where I am now. I am putting in the work to reach my ultimate goal
  of becoming a professional programmer. Luckily, I am in love with this work. Programming gives me
  an opportunity to use stimulate my thoughts, to find solutions to interesting problems, to be creative,
  to forget the world for hours upon hours, and to finallly give me peace of mind about that ever so
  important career. I may have started late in my life, but I feel that all my experiences, my failures, my
  past lousy jobs, all led me to this.`,
  ];

  myStack: string[] = [
    'HTML',
    'Javascript',
    'CSS',
    'SCSS',
    'Tailwind',
    'Typescript',
    'Angular',
    'Vue',
    'Node.js',
    'Bootstrap',
  ];

  myBlog: string[] = [
    `My goal by creating this blog is primarily to showcase the projects I created and as
  a way to let employers know how serious I take becoming a great programmer. Furthermore, I feel that writing
  my thoughts, my experiences, and the process of creating these projects will really help cement the knowledge
  into my brain. There is so much to learn with programming so its really easy to forget concepts. I believe
  the writing process will help alleviate some of this.`,
    `Lastly, I  hope another person with a similar background
  as myself sees this and is inspired to continue on their journey. I hope they can conceptualize the kind of
  person I once was and how far I have come in my life and that motivates them to move forward. Of course, later
  in my life, after a few year of programming, I know this blog will serve as a reminder of all the good, of all the
  bad, and everything else this process brought to me.`,
  ];
}
