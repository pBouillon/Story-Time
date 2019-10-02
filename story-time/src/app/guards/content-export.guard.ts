import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { EditorService } from '../story/writing/editor.service';
import { AppRoutes } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class ContentExportGuard implements CanActivate {

  constructor(
    private editorService: EditorService,
    private router: Router,
  ) { }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let canActivate = true;

    const storedStoryMeta = this.editorService
      .getCurrentStoryMeta();

    const storedStoryChapters = this.editorService
      .getCurrentStoryChapters();

    canActivate = !(storedStoryMeta !== null
      && storedStoryMeta.author !== ''
      && storedStoryMeta.overview !== ''
      && storedStoryMeta.title !== '');

    if (storedStoryChapters === null) {
      canActivate = false;
    } else {
      storedStoryChapters.forEach(chapter => {
        if (chapter.content === ''
          || chapter.expectedWord === ''
          || chapter.messageFailure === ''
          || chapter.question === '') {
          canActivate = false;
        }
      });
    }

    if (!canActivate) {
      this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Infos}`]);
    }

    return canActivate;
  }

}
