import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.mode';
import { GroupService } from 'src/app/services/group.service';
import { CreateGroupComponent } from './complements/create-group/create-group.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groups: Group[] = [];
  constructor(
    private matDialog: MatDialog,
    private router: Router,
    private _srvGroup: GroupService
  ) {}

  ngOnInit(): void {
    this._srvGroup.getGroups().subscribe( res =>{
       this.groups = res['data'];
       console.log(this.groups);
       
    });

  }

  openDialog(): void {
    let dialogRef = this.matDialog.open(CreateGroupComponent, {
      height: '370px',
      // width: '600px',
      data: { name: 'algo' },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  createGroup() {
    this.router.navigateByUrl('/dashboard/crear-grupo');
  }
}
