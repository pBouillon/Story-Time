import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
   * @todo: doc
   */
  public onBack(): void { 
    // TODO
  }
  
  /**
   * @todo: doc
   */
  public onExport(): void { 
    // TODO
  }

  /**
   * @todo: doc
   */
  public onMenu(): void {
    // TODO
  }
}
