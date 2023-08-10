import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'src/app/services/group.service';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css'],
})
export class CreateGroupComponent implements OnInit {
  constructor(
    private _srvGroup: GroupService,
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { }
  ) {}

  ngOnInit(): void {
    
  }


  createGroup(){

  }

  onNoClick(): void {
    this.dialogRef.close('ok');
  }
}
