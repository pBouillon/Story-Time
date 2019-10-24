/**
 * MIT License
 *
 * Copyright © 2019 ADAM Timothée, BOUILLON Pierre, VARNIER Victor
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { Component, Input, OnInit } from '@angular/core';
import { IStory } from 'src/app/shared/story';
import { PlayingService } from './playing.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.scss']
})
export class PlayingComponent implements OnInit {

  /**
   * @summary User's selected story
   */
  @Input()
  public playedStory: IStory;

  /**
   * @summary Default constructor
   * @param playingService Playing service logic
   * @param toastrService Toastr service to notify the user
   */
  constructor(
    public playingService: PlayingService,
    public router: Router,
    public toastrService: ToastrService,
  ) { }

  /**
   * @summary Initialize the component
   */
  ngOnInit() {
    // Set the provided story as the one to be played
    this.playingService.playedStory = this.playedStory;

    this.playingService.startNewGame();
  }

  /**
   * @todo doc
   * @param answer
   */
  public handleAnswer(answer: string): void {
    const isAnswerValid =
      this.playingService.currentChapter.expectedWord.toLowerCase() === answer.toLowerCase();

    if (isAnswerValid) {
      this.toastrService.success('Bien joué !');
      this.playingService.playNextChapter();
    } else {
      this.toastrService.warning('Mauvaise réponse !');
    }
  }

  /**
   * @todo doc
   */
  public onSelectionMenu(): void {
    this.router.navigate([`${AppRoutes.Selection}`]);
  }

}
