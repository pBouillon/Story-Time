import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { EditorService } from '../story/writing/editor.service';
import { IStoryMeta, StoryMeta } from '../shared/story-meta';
import { AppRoutes } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ContentWritingGuard implements CanActivate {

  constructor(
    private editorService: EditorService,
    private router: Router,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const storedStoryMeta = this.editorService
      .getCurrentStoryMeta();

    const isContentAccessGranted = storedStoryMeta !== null
      && storedStoryMeta.author !== ''
      && storedStoryMeta.overview !== ''
      && storedStoryMeta.title !== '';

    if (!isContentAccessGranted) {
      this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
    }

    return isContentAccessGranted;
  }

}
