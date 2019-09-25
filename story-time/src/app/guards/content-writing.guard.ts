import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { EditorService } from '../story/writing/editor.service';
import { IStoryMeta } from '../shared/story-meta';

@Injectable({
  providedIn: 'root'
})
export class ContentWritingGuard implements CanActivate {

  constructor(
    private editorService: EditorService
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const storedStoryMeta = this.editorService
        .getCurrentStoryMeta();

      return this.areRequiredPropertiesFilled(storedStoryMeta);
  }

  /**
   * @todo doc
   */
  private areRequiredPropertiesFilled(storyMeta: IStoryMeta): boolean {
    /**
     * @todo doc
     * @param str
     */
    function isBlankOrEmpty(str: string) {
      return (!str || /^\s*$/.test(str));
    }

    return !isBlankOrEmpty(storyMeta.author)
      && !isBlankOrEmpty(storyMeta.overview)
      && !isBlankOrEmpty(storyMeta.title);
  }

}
