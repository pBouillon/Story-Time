import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  /**
   * @summary Default message to close snackbar message
   */
  private SNACKBAR_DEFAULT_CLOSE_MESSAGE = 'Fermer';

  /**
   * @summary Default duration for snackbar messages
   */
  private SNACKBAR_DEFAULT_DURATION = 3_000;

  /**
   * Default constructor
   * @param snackBar Toolbox for snackbar displays
   */
  constructor(
    private snackBar: MatSnackBar,
  ) { }

  /**
   * @summary Show a snackbar message for `displayTime` ms
   * @param title Snackbar's title
   * @param message Snackbar's message
   * @param displayTime Snackbar's duration
   */
  public open(
    message: string,
    closeMessage: string = this.SNACKBAR_DEFAULT_CLOSE_MESSAGE,
    displayTime: number = this.SNACKBAR_DEFAULT_DURATION): void {
      this.snackBar.open(message, closeMessage, {
        duration: displayTime,
      });
  }
}
