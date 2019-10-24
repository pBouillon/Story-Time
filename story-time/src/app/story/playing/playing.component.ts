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
   * @summary Handle the answer provided by the played chapter's component
   * @param answer Provided answer for the current chapter of the `playingService`
   */
  public handleAnswer(answer: string): void {
    // Sumbit the answer to the system
    const isAnswerValid = this.playingService.tryValidateCurrentChapter(answer);

    // On success, move on to the next chapter
    if (isAnswerValid) {
      this.toastrService.success('Bien joué !');
      this.playingService.playNextChapter();
      return;
    }

    // On failure, if the user still have remaining tries, show how many tries he still has
    if (!this.playingService.isChapterFailed) {
      this.toastrService.warning(
        `Encore ${this.playingService.remainingTries} essai.s pour trouver !`,
        'Mauvaise réponse ...'
      );
    }
  }

  /**
   * @summary Redirect the user to the selection menu
   */
  public onSelectionMenu(): void {
    this.router.navigate([AppRoutes.Selection]);
  }

}
