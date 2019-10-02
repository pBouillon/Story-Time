import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent implements OnInit {

  /**
   * @summary Generated URL of the story JSON file
   */
  public jsonUrl: SafeUrl;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private editorService: EditorService,
  ) { }

  ngOnInit() {
    this.jsonUrl = this.generateDownloadJsonUri();
  }

  /**
   * @summary Generate the download URL of the story JSON file
   * @return The assoriated URL
   */
  public generateDownloadJsonUri() {
    // Fetch story data
    const toSerialize = JSON.stringify({
      meta: this.editorService.getCurrentStoryMeta(),
      story: this.editorService.getCurrentStoryChapters(),
    });

    // Generate the associated URI
    const format = 'data:text/json;charset=UTF-8,';
    return this.sanitizer.bypassSecurityTrustUrl(format + encodeURIComponent(toSerialize));
  }

  /**
   * @summary Generate the name of the file to export
   *          The name is built as `<story title>.<story extension>`
   * @returns The generated name
   */
  public getExportedFileName(): string {
    const storyName = this.editorService
      .getCurrentStoryMeta()
      .title
      .trim()
      .toLowerCase()
      .replace(/ /g, '_', );

    return `${storyName}${this.editorService.EXTENSION_NAME}`;
  }

  /**
   * @summary Redirect the user to the previous page
   */
  public onBack(): void {
    this.router.navigate([`${AppRoutes.Writing}/${AppRoutes.Content}`]);
  }

  /**
   * @summary Redirect the user to the main menu and clear its cache
   */
  public onMenu(): void {
    // Clear the stored story
    this.editorService.clearAllStoryData();

    // Redirect the user
    this.router.navigate([`${AppRoutes.Index}`]);
  }

}
