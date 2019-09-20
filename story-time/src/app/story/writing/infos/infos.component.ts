import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.sass']
})
export class InfosComponent implements OnInit {

  /**
   * Default constructor
   * @param editorService Editor toolbox
   * @see EditorService in '../editor.service.ts'
   */
  constructor(
    private editorService: EditorService,
  ) { }

  ngOnInit() { }

}
